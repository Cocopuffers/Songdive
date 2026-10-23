'use strict';
// SongDive 3.2: static-site curated catalog and editorial rarity. No streaming or player analytics.
// SongDive 3.2 curated catalog. Rank is editorial ordering within artist, NOT streaming statistics.
let songs = [];
let titleIndex = new Map();
let artistGroups = new Map();
let catalogReady = false;
function rebuildIndexes(){
  titleIndex=new Map();artistGroups=new Map();
  for(const song of songs){
    for(const key of songKeys(song)){
      if(!titleIndex.has(key))titleIndex.set(key,[]);
      titleIndex.get(key).push(song);
    }
    const key=normalize(song.artist);
    if(!artistGroups.has(key))artistGroups.set(key,[]);
    artistGroups.get(key).push(song);
  }
}
async function loadCatalog(){
  const status=$('catalogStatus');
  try{
    const response=await fetch('catalog-expanded.json?v=3.2');
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const rows=await response.json();
    if(!Array.isArray(rows)||rows.length<1000)throw new Error('Catalog is missing records');
    songs=rows.filter(s=>s&&typeof s.title==='string'&&typeof s.artist==='string')
      .map(s=>({title:s.title,artist:s.artist,genre:s.genre||'pop',
        rank:Number.isFinite(s.rank)?s.rank:50,credits:Array.isArray(s.credits)?s.credits:[]}));
    rebuildIndexes();
    catalogReady=true;
    status.textContent=`${songs.length.toLocaleString()} song records loaded · Provisional rarity for imported songs`;
    $('startBtn').disabled=false;
  }catch(error){
    status.textContent='Catalog could not load. Check that catalog-expanded.json was uploaded alongside the website files.';
    console.error('SongDive catalog load failed:',error);
  }
}
const titleRules = [
  ['Name a song with a color in its title.', /\b(yellow|purple|blue|black|red|green|white|pink|gold|silver|golden)\b/i],
  ['Name a song with a number in its title.', /\d/],
  ['Name a song with a place in its title.', /\b(california|alabama|africa|new york|america|american|paradise|london|tokyo|vegas|oklahoma|galway|georgia|carolina|texas|home|city|ocean)\b/i],
  ['Name a song with an animal in its title.', /\b(dog|tiger|bird|cat|horse|wolf|butterfly|sharks|doves)\b/i],
  ['Name a song with a day or time in its title.', /\b(mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?|sundays?|day|days|night|nights|morning|mornings|evening|evenings|afternoon|midnight|noon|dawn|dusk|tonight|today|tomorrow|yesterday|time|hour|hours|minute|minutes|second|seconds|am|pm|january|february|march|april|may|june|july|august|september|october|november|december|spring|summer|autumn|winter)\b|\b\d{1,2}\s*(?::|\.)\s*\d{2}\b|\b\d{1,2}\s*(?:am|pm)\b|\b\d{1,2}\s+to\s+\d{1,2}\b/i],
  ['Name a song with love in its title.', /\blove\b/i],
  ['Name a song with a weather word in its title.', /\b(rain|thunder|hurricane|sky|sun|sunflower|snow|storm|fire)\b/i],
  ['Name a song with a feeling in its title.', /\b(happy|happier|sad|sorry|bad|good|crazy|beautiful|lonely|fearless|jealousy|hate)\b/i]
];
let prompts=[];
function buildPrompts(){
 prompts=[
 ...titleRules.map(([text,regex])=>({text,test:s=>regex.test(s.title)})),
 ...['pop','hiphop','rnb','rock','country','latin'].map(genre=>({text:`Name a ${ {pop:'pop',hiphop:'rap or hip-hop',rnb:'R&B',rock:'rock',country:'country',latin:'Latin'}[genre] } song.`,test:s=>s.genre===genre})),
 ...[...new Set(songs.map(s=>s.artist))].filter(artist=>
    (artistGroups.get(normalize(artist))||[]).length>=9)
    .map(artist=>({text:`Name a song by ${artist}.`,
      test:s=>normalize(s.artist)===normalize(artist)||s.credits.some(c=>normalize(c)===normalize(artist))}))
 ].filter(p=>songs.some(p.test));
}
const $=id=>document.getElementById(id);
const ROUND_COUNT=7,ROUND_SECONDS=25,MAX_SCORE=630;
let sessionNumber=0,dailyPrompts=[],roundIndex=0,totalScore=0,deadline=0,timer=null,locked=false,history=[],filterTier='ALL',soundEnabled=false,audioContext=null,musicLoop=null,musicStep=0,masterGain=null;
const ranks=[
{max:99,name:'Novice Head Bopper',description:'You know the beat. The lyrics? Not so much.'},
{max:199,name:'Shower Concert Star',description:'Your bathroom acoustics are carrying your career.'},
{max:299,name:'Certified Aux Hog',description:'Nobody gave you the aux. You took it.'},
{max:399,name:'Playlist Menace',description:"You've got a playlist for situations that haven't happened yet."},
{max:499,name:'Melody Mastermind',description:"You've got a song for literally everything."},
{max:579,name:'Human Jukebox',description:'Somebody says a word and you start singing.'},
{max:630,name:'The Final Encore',description:"The crowd left an hour ago. You're still performing."}
];
function showScreen(id){['intro','game','result','final'].forEach(name=>$(name).classList.toggle('hidden',name!==id));}
function dateKey(){// UTC ensures everyone gets the same daily prompts on the same UTC date.
return new Date().toISOString().slice(0,10);}
function getDailyPrompts(){let seed=0;for(const c of dateKey()+':'+sessionNumber)seed=(Math.imul(seed,31)+c.charCodeAt(0))>>>0;
const pool=[...prompts];for(let i=pool.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,ROUND_COUNT);}
function normalize(s){return String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');}
// Exact title, title + artist, and common release suffixes are recognized without a correction.
function songKeys(song){const title=normalize(song.title),artist=normalize(song.artist);
  return [title,`${title} ${artist}`,`${title} by ${artist}`];}
function findSong(input,prompt){const q=normalize(input);if(!q)return null;
 const matches=titleIndex.get(q)||[];
 const eligible=matches.filter(prompt.test);
 return eligible.length?eligible.sort((a,b)=>(a.rank||50)-(b.rank||50))[0]:null;
}
function editDistance(a,b){const previous=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){let prior=previous[0];previous[0]=i;
    for(let j=1;j<=b.length;j++){const saved=previous[j];previous[j]=Math.min(previous[j]+1,previous[j-1]+1,prior+(a[i-1]===b[j-1]?0:1));prior=saved;}}
  return previous[b.length];}
function findCorrection(input,prompt){const q=normalize(input);if(q.length<4)return null;
  const eligible=songs.filter(song=>prompt.test(song) &&
    Math.abs(normalize(song.title).length-q.length)<=Math.max(3,Math.floor(q.length*.2)) &&
    (normalize(song.title).startsWith(q.slice(0,2)) || normalize(song.title).split(' ').some(w=>w.startsWith(q.slice(0,3)))));
  const candidates=eligible.slice(0,2500).map(song=>{
    const distances=songKeys(song).map(key=>editDistance(q,key));
    return {song,distance:Math.min(...distances)};
  }).sort((a,b)=>a.distance-b.distance);
  if(!candidates.length)return null;
  const best=candidates[0],runnerUp=candidates[1];
  // A 75% similarity floor alone is too permissive for short titles.
  const allowance=Math.min(3,Math.max(1,Math.floor(q.length*.2)));
  if(best.distance>allowance || (runnerUp&&runnerUp.distance<=best.distance+1))return null;
  return best.song;
}
let pendingCorrection=null;
function clearCorrection(){pendingCorrection=null;$('feedback').classList.remove('good');}
function usedSong(song){return history.some(h=>h.songKey===normalize(`${song.title} ${song.artist}`));}
function scoreFor(song,prompt){
 if(!song||!prompt.test(song))return {points:0,tier:'MISS'};
 // Imported rank=50 means popularity UNKNOWN, not objectively ultra-rare.
 // Give unranked imports a provisional Rare tier pending real popularity data.
 let points;
 if(song.rank>=50){points=65;}
 else {
   const peers=artistGroups.get(normalize(song.artist))||[];
   const curated=peers.filter(s=>s.rank<50);
   const position=curated.filter(s=>s.rank<song.rank).length;
   const fraction=curated.length<=1?0:position/(curated.length-1);
   points=[25,40,65,90][Math.min(3,Math.floor(fraction*4))];
 }
 return {points,tier:points===90?'ULTRA RARE':points===65?'RARE':points===40?'UNCOMMON':'COMMON'};
}
// SongDive 2.4: the countdown is an explicit, cancellable round state.
let countdownHandle=null, countdownToken=0, roundReady=false;
function cancelCountdown(){
  countdownToken++;
  if(countdownHandle!==null)clearTimeout(countdownHandle);
  countdownHandle=null;
  const overlay=$('roundCountdown');overlay.classList.add('hidden');$('questionCard').classList.remove('question-arriving','question-ready');
}
function stopTimer(){if(timer!==null){clearInterval(timer);timer=null;}}
function updateTimer(){const remaining=Math.max(0,Math.ceil((deadline-performance.now())/1000));$('timer').textContent=remaining;$('timerWrap').classList.toggle('danger',remaining<=5);if(remaining<=0&&!locked)expireRound();}
function startGame(){if(!catalogReady)return;cancelCountdown();clearCelebration();stopTimer();sessionNumber++;dailyPrompts=getDailyPrompts();roundIndex=0;totalScore=0;history=[];clearCorrection();$('shareBtn').innerHTML='Share my score <span>↗</span>';startRound();}
function startRound(){
  cancelCountdown();stopTimer();roundReady=false;locked=false;
  $('roundLabel').textContent=`ROUND ${roundIndex+1} / ${ROUND_COUNT}`;
  $('promptText').textContent=dailyPrompts[roundIndex].text;
  $('songSearch').value='';clearCorrection();$('songSearch').disabled=true;$('submitBtn').disabled=true;
  $('feedback').textContent='';$('feedback').className='feedback';
  $('progressBar').style.width=`${roundIndex/ROUND_COUNT*100}%`;
  $('timer').textContent=ROUND_SECONDS;$('timerWrap').classList.remove('danger');
  showScreen('game');
  const card=$('questionCard'),countdown=$('roundCountdown'),number=$('roundCountdownNumber');
  card.classList.remove('question-arriving','question-ready');
  void card.offsetWidth;card.classList.add('question-arriving');
  countdown.classList.remove('hidden');
  const token=countdownToken;
  let count=3;
  function step(){
    if(token!==countdownToken)return;
    if(count>=1){
      number.textContent=String(count);
      number.classList.remove('count-pop');void number.offsetWidth;number.classList.add('count-pop');
      count--;countdownHandle=setTimeout(step,1000);return;
    }
    countdown.classList.add('hidden');countdownHandle=null;
    card.classList.remove('question-arriving');card.classList.add('question-ready');
    roundReady=true;$('songSearch').disabled=false;$('submitBtn').disabled=false;
    deadline=performance.now()+ROUND_SECONDS*1000;updateTimer();timer=setInterval(updateTimer,100);
    $('songSearch').focus({preventScroll:true});
  }
  step();
}
function feedback(text){$('feedback').textContent=text;$('feedback').className='feedback';$('songSearch').select();playTone('wrong');}
function tryGuess(){
  if(locked||!roundReady)return;
  if(performance.now()>=deadline){expireRound();return;}
  const input=$('songSearch').value.trim();
  if(!input){feedback('The mic is on! Type a song first.');return;}
  // A second Enter locks the suggestion, but the timer never pauses.
  if(pendingCorrection && normalize(input)===normalize(pendingCorrection.title)){
    const song=pendingCorrection;clearCorrection();
    if(usedSong(song)){feedback('You already played that song! Try another.');return;}
    finishRound(song,false);return;
  }
  clearCorrection();
  const song=findSong(input,dailyPrompts[roundIndex]);
  if(song){
    if(!dailyPrompts[roundIndex].test(song)){feedback('Great song, wrong gig! Try again.');return;}
    if(usedSong(song)){feedback('That song is already in your setlist! Try another.');return;}
    finishRound(song,false);return;
  }
  const suggestion=findCorrection(input,dailyPrompts[roundIndex]);
  if(suggestion){
    if(usedSong(suggestion)){feedback('You already used that song! Try another.');return;}
    pendingCorrection=suggestion;$('songSearch').value=suggestion.title;
    $('feedback').textContent='🎵 Was this the song caught in your head? Press Enter again to lock it in.';
    $('feedback').className='feedback good';$('songSearch').focus({preventScroll:true});
    $('songSearch').setSelectionRange(suggestion.title.length,suggestion.title.length);
    return;
  }
  feedback("That title isn't in this prompt's catalog yet. Try another!");
}
function expireRound(){
  if(locked)return;
  // A valid suggestion already placed in the box counts when the clock expires.
  const song=pendingCorrection && normalize($('songSearch').value)===normalize(pendingCorrection.title)
    && !usedSong(pendingCorrection) ? pendingCorrection : null;
  clearCorrection();finishRound(song,true);
}
function finishRound(song,expired){if(locked)return;locked=true;roundReady=false;stopTimer();const prompt=dailyPrompts[roundIndex];const {points,tier}=scoreFor(song,prompt);totalScore+=points;
history.push({prompt:prompt.text,song:song?`${song.title} — ${song.artist}`:'No correct answer',songKey:song?normalize(`${song.title} ${song.artist}`):null,points,tier});
clearCorrection();$('songSearch').disabled=true;$('submitBtn').disabled=true;$('resultIcon').textContent=points?'♫':'×';$('resultEyebrow').textContent=expired?(song?'SAVED AT THE BUZZER':"TIME'S UP"):'ANSWER LOCKED';
$('resultTitle').textContent=song?song.title:"Time's up!";$('resultArtist').textContent=song?song.artist:'The clock won this round.';
$('tierLabel').textContent=tier==='ULTRA RARE'?'HEADLINER · 90':tier;$('points').textContent=points;$('scoreCard').dataset.tier=tier;
$('resultMessage').textContent=points?`${points} points! Nice pull from the record collection.`:'No points this time. The next track is yours.';
$('continueBtn').innerHTML=roundIndex===ROUND_COUNT-1?'See your music identity <span>→</span>':'Next round <span>→</span>';
showScreen('result');if(points){playRarity(points);celebrate(points);}else playTone('wrong');}
function nextRound(){cancelCountdown();clearCelebration();roundIndex++;if(roundIndex>=ROUND_COUNT)showFinal();else startRound();}
function showFinal(){stopTimer();$('finalScore').textContent=totalScore;const rank=ranks.find(r=>totalScore<=r.max)||ranks.at(-1);
$('rankName').textContent=rank.name;$('rankDescription').textContent=rank.description;$('finalMessage').textContent='Your seven-song set is in the books. Ready to explore the setlist?';
const list=$('finalList');list.replaceChildren();history.forEach((h,i)=>{const row=document.createElement('div');row.className='final-row';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=`${i+1}. ${h.song}`;const detail=document.createElement('small');detail.textContent=h.prompt;info.append(title,detail);const pts=document.createElement('b');pts.textContent=`+${h.points}`;pts.style.color=h.points>=90?'var(--ultra)':h.points>=65?'var(--rare)':h.points>=40?'var(--uncommon)':'var(--common)';row.append(info,pts);list.append(row);});
const select=$('roundFilter');select.replaceChildren();dailyPrompts.forEach((p,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=`Round ${i+1}: ${p.text}`;select.append(opt);});select.value='0';filterTier='ALL';$('answerSearch').value='';updateFilterButtons();renderAnswers();showScreen('final');playTone('final');}
function updateFilterButtons(){document.querySelectorAll('[data-tier]').forEach(b=>{if(b.closest('#tierFilters'))b.classList.toggle('active',b.dataset.tier===filterTier);});}
function renderAnswers(){const idx=Number($('roundFilter').value)||0,prompt=dailyPrompts[idx];if(!prompt)return;
const query=normalize($('answerSearch').value);
const matches=songs.filter(s=>prompt.test(s)).map(s=>({...s,score:scoreFor(s,prompt)}))
  .filter(s=>(filterTier==='ALL'||s.score.tier===filterTier)&&(!query||normalize(`${s.title} ${s.artist}`).includes(query)));
const groups=new Map();
for(const s of matches){const artist=normalize(s.artist);if(!groups.has(artist))groups.set(artist,[]);groups.get(artist).push(s);}
for(const group of groups.values())group.sort((a,b)=>a.title.localeCompare(b.title));
const artists=[...groups.keys()].sort((a,b)=>a.localeCompare(b));
const ordered=[];
while(ordered.length<150 && artists.length){
 for(let i=0;i<artists.length && ordered.length<150;){
  const group=groups.get(artists[i]);ordered.push(group.shift());
  if(!group.length)artists.splice(i,1);else i++;
 }
}
$('answerCount').textContent=`${matches.length} matching song${matches.length===1?'':'s'} in our expanded catalog · Showing up to 150 across different artists · Imported-song rarity is provisional, not streaming data.`;
const list=$('answerList');list.replaceChildren();if(!matches.length){const p=document.createElement('p');p.className='answer-count';p.textContent='No matches in this filter. Try another.';list.append(p);return;}
for(const s of ordered){const row=document.createElement('div');row.className='answer-row';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=s.title;const artist=document.createElement('small');artist.textContent=`${s.artist} · ${s.genre.toUpperCase()}`;info.append(title,artist);const badge=document.createElement('span');badge.className='tier-chip';badge.dataset.tier=s.score.tier;badge.textContent=`${s.score.points} PTS`;row.append(info,badge);list.append(row);}}
// All audio is synthesized locally with Web Audio: no licensed recordings or downloads.
function ensureAudio(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;audioContext??=new AC();if(audioContext.state==='suspended')audioContext.resume();if(!masterGain){masterGain=audioContext.createGain();masterGain.gain.value=.55;masterGain.connect(audioContext.destination);}return true;}
function synth(freq,when,duration=.2,volume=.06,type='sine',destination=null){if(!audioContext)return;const osc=audioContext.createOscillator(),env=audioContext.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,when);env.gain.setValueAtTime(.0001,when);env.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),when+.018);env.gain.exponentialRampToValueAtTime(.0001,when+duration);osc.connect(env).connect(destination||masterGain);osc.start(when);osc.stop(when+duration+.02);}
function playTone(kind){if(!soundEnabled||!ensureAudio())return;const t=audioContext.currentTime+.015;const notes=kind==='final'?[392,494,587,784,988]:kind==='wrong'?[230,196]:[440,554,659];notes.forEach((f,i)=>synth(f,t+i*.11,kind==='final'?.48:.17,kind==='wrong'?.022:.075,kind==='wrong'?'triangle':'sine'));}
function playRarity(points){if(!soundEnabled||!ensureAudio())return;const t=audioContext.currentTime+.02;const settings={25:{notes:[392,494],vol:.035,dur:.19,type:'sine',gap:.15},40:{notes:[392,494,587],vol:.057,dur:.26,type:'sine',gap:.13},65:{notes:[392,523,659,784],vol:.08,dur:.4,type:'triangle',gap:.12},90:{notes:[262,392,523,659,784,1047],vol:.095,dur:.64,type:'triangle',gap:.11}};const v=settings[points]||settings[25];v.notes.forEach((f,i)=>{synth(f,t+i*v.gap,v.dur,v.vol,v.type);if(points>=65)synth(f*2,t+i*v.gap+.055,v.dur*.8,v.vol*.26,'sine');});if(points===90){synth(131,t,.8,.09,'sine');synth(196,t+.17,.7,.06,'triangle');}}
// Soft, original generative loop: a repeating chord bed and a gentle melodic pulse.
const chords=[[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66],[164.81,196,246.94]];
function musicTick(){if(!soundEnabled||!audioContext||audioContext.state!=='running')return;const t=audioContext.currentTime+.035;const chord=chords[Math.floor(musicStep/4)%chords.length];if(musicStep%4===0){chord.forEach((f,i)=>synth(f,t,2.8,.012,'sine'));synth(chord[0]/2,t,1.4,.025,'triangle');}const melody=[0,2,1,2,0,1,2,1][musicStep%8];synth(chord[melody]*2,t,.22,.011,'sine');musicStep++;}
function startMusic(){if(!soundEnabled||!ensureAudio())return;stopMusic();musicTick();musicLoop=setInterval(musicTick,650);document.body.classList.add('music-on');}
function stopMusic(){if(musicLoop!==null){clearInterval(musicLoop);musicLoop=null;}document.body.classList.remove('music-on');}
// SongDive 2.4: every celebration restarts its own wave, even on repeated tiers.
let celebrationCleanup=null, celebrationToken=0, vinylFrame=null, vinylBoost=1;
function updateVinylSpeed(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const animations=[...document.querySelectorAll('.vinyl')].flatMap(el=>el.getAnimations()).filter(a=>a.effect);
  for(const animation of animations)animation.playbackRate=vinylBoost;
}
function spinRecords(points){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const target=({25:1.6,40:2.8,65:5,90:9})[points]||1;
  if(vinylFrame!==null)cancelAnimationFrame(vinylFrame);
  const started=performance.now(),start=vinylBoost;
  function animate(now){
    const elapsed=now-started;
    // Fast acceleration followed by a leisurely five-second coast back to idle.
    const desired=elapsed<380?start+(target-start)*(1-Math.pow(1-elapsed/380,3)):
      1+(target-1)*Math.pow(Math.max(0,1-(elapsed-380)/5400),2);
    vinylBoost=Math.max(1,desired);updateVinylSpeed();
    if(elapsed<5780)vinylFrame=requestAnimationFrame(animate);
    else{vinylBoost=1;updateVinylSpeed();vinylFrame=null;}
  }
  vinylFrame=requestAnimationFrame(animate);
}
function igniteVinyl(tier,duration){
  const colors={common:['#d6dce9','#9da9bc'],uncommon:['#72ffac','#d6ff9b'],rare:['#c99cff','#8d55ff'],headliner:['#ffe78d','#ff9e36']}[tier];
  document.querySelectorAll('.vinyl-fire').forEach((fire,recordIndex)=>{
    fire.replaceChildren();
    const count={common:9,uncommon:20,rare:30,headliner:46}[tier];
    for(let i=0;i<count;i++){
      const spark=document.createElement('i');spark.className='vinyl-spark';
      const angle=Math.random()*Math.PI*2;
      const radius=45+Math.random()*6;
      spark.style.left=`${50+Math.cos(angle)*radius}%`;
      spark.style.top=`${50+Math.sin(angle)*radius}%`;
      spark.style.background=colors[i%colors.length];
      spark.style.setProperty('--sx',`${Math.cos(angle)*(15+Math.random()*55)}px`);
      spark.style.setProperty('--sy',`${Math.sin(angle)*(15+Math.random()*55)}px`);
      spark.style.setProperty('--spark-delay',`${Math.random()*1.5}s`);
      spark.style.setProperty('--spark-life',`${1+Math.random()*1.7}s`);
      fire.append(spark);
    }
  });
}
function clearCelebration(){
  celebrationToken++;
  if(celebrationCleanup!==null){clearTimeout(celebrationCleanup);celebrationCleanup=null;}
  document.body.classList.remove('celebrate-common','celebrate-uncommon','celebrate-rare','celebrate-headliner');
  const layer=$('celebration');layer.className='celebration';layer.replaceChildren();
  document.querySelectorAll('.vinyl-fire').forEach(el=>el.replaceChildren());
  $('revealOverlay').className='reveal-overlay';
}
function celebrate(points){
  clearCelebration();spinRecords(points);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const token=celebrationToken;
  const tier=points===90?'headliner':points===65?'rare':points===40?'uncommon':'common';
  const duration={common:3600,uncommon:4700,rare:7000,headliner:8500}[tier];
  const layer=$('celebration');
  // A newly created ring element is guaranteed to start a fresh animation.
  layer.className=`celebration effect-${tier}`;
  const rippleCount=tier==='rare'||tier==='headliner'?1:0;
  for(let r=0;r<rippleCount;r++){
    const ring=document.createElement('div');ring.className=`cinema-ring cinema-${tier}`;
    ring.style.setProperty('--ring-delay',`${r*(tier==='rare'?.52:.44)}s`);
    layer.append(ring);
  }
  document.body.classList.add(`celebrate-${tier}`);
  igniteVinyl(tier,duration);
  if(tier==='headliner'){
    $('revealName').textContent='HEADLINER';$('revealPoints').textContent='+90';
    $('revealOverlay').className='reveal-overlay';void $('revealOverlay').offsetWidth;
    $('revealOverlay').className='reveal-overlay reveal-active';
  }
  const count={common:32,uncommon:150,rare:165,headliner:300}[tier];
  const colors={common:['#e4e8ff','#aeb8ce'],uncommon:['#70ffac','#e4ff9b','#6df6ec'],rare:['#bba1ff','#e8caff','#fff7db','#80f1ff'],headliner:['#ffe36e','#fff6c1','#ffb83d','#f886de','#8ffaff']}[tier];
  for(let i=0;i<count;i++){
    const p=document.createElement('i');p.className=`fx-piece fx-${tier}`;p.style.background=colors[i%colors.length];
    const angle=Math.random()*Math.PI*2;
    const distance=(tier==='headliner'?120:tier==='rare'?90:45)+Math.random()*(tier==='headliner'?650:tier==='rare'?480:340);
    p.style.setProperty('--dx',`${Math.cos(angle)*distance}px`);p.style.setProperty('--dy',`${Math.sin(angle)*distance}px`);
    p.style.setProperty('--turn',`${(Math.random()-.5)*1300}deg`);
    p.style.setProperty('--delay',`${Math.random()*(tier==='headliner'?.65:.38)}s`);
    p.style.setProperty('--life',`${(duration/1000)*(.58+Math.random()*.36)}s`);
    p.style.setProperty('--size',`${tier==='common'?3+Math.random()*5:5+Math.random()*11}px`);
    if(tier==='uncommon'){
      p.style.left=`${15+Math.random()*70}%`;p.style.top=`${-8-Math.random()*25}%`;
      p.style.setProperty('--dx',`${(Math.random()-.5)*230}px`);
      p.style.setProperty('--dy',`${window.innerHeight*(.9+Math.random()*.6)}px`);
    }else{p.style.left=`${47+Math.random()*6}%`;p.style.top=`${40+Math.random()*13}%`;}
    layer.append(p);
  }
  celebrationCleanup=setTimeout(()=>{
    if(token!==celebrationToken)return;
    layer.classList.add('effect-dissolving');
    document.body.classList.remove('celebrate-common','celebrate-uncommon','celebrate-rare','celebrate-headliner');
    celebrationCleanup=setTimeout(()=>{
      if(token!==celebrationToken)return;
      layer.replaceChildren();layer.className='celebration';$('revealOverlay').className='reveal-overlay';celebrationCleanup=null;
    },3000);
  },duration-2000);
}
async function shareScore(){const rank=ranks.find(r=>totalScore<=r.max)||ranks.at(-1);const message=`🎵 SongDive 3.2 Daily Seven\n${rank.name}\n${totalScore}/${MAX_SCORE} points\nhttps://cocopuffers.github.io/Songdive/`;try{if(navigator.share){await navigator.share({text:message});return;}await navigator.clipboard.writeText(message);$('shareBtn').textContent='Copied to clipboard!';}catch(e){if(e.name!=='AbortError')window.prompt('Copy your score:',message);}}
$('songSearch').addEventListener('input',()=>{if(pendingCorrection){clearCorrection();$('feedback').textContent='';$('feedback').className='feedback';}});
$('startBtn').addEventListener('click',startGame);$('guessForm').addEventListener('submit',e=>{e.preventDefault();tryGuess();});$('continueBtn').addEventListener('click',nextRound);$('restartBtn').addEventListener('click',startGame);$('shareBtn').addEventListener('click',shareScore);
$('roundFilter').addEventListener('change',renderAnswers);$('answerSearch').addEventListener('input',renderAnswers);$('tierFilters').addEventListener('click',e=>{const button=e.target.closest('button[data-tier]');if(!button)return;filterTier=button.dataset.tier;updateFilterButtons();renderAnswers();});
$('soundBtn').addEventListener('click',()=>{soundEnabled=!soundEnabled;$('soundBtn').textContent=soundEnabled?'♫ ON':'♫ OFF';$('soundBtn').setAttribute('aria-pressed',String(soundEnabled));if(soundEnabled){startMusic();playTone('win');}else stopMusic();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMusic();else if(soundEnabled)startMusic();});
$('homeLink').addEventListener('click',e=>{e.preventDefault();if(!confirm('Return to the home screen? Your current run will be lost.'))return;cancelCountdown();stopTimer();clearCelebration();showScreen('intro');});
showScreen('intro');
$('startBtn').disabled=true;
loadCatalog().then(()=>{if(catalogReady)buildPrompts();});
