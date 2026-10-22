'use strict';
// SongDive 2.0: static-site demo. The sample catalog and rarity scores are illustrative,
// NOT based on Spotify streams or actual player submissions.
const songs = [
['Yellow','Coldplay',2000,269],['Purple Rain','Prince',1984,521],['Blue Monday','New Order',1983,449],
['Back in Black','AC/DC',1980,255],['Red Right Hand','Nick Cave & the Bad Seeds',1994,371],
['Black Dog','Led Zeppelin',1971,295],['Eye of the Tiger','Survivor',1982,245],
['22','Taylor Swift',2012,232],['505','Arctic Monkeys',2007,253],['7 Rings','Ariana Grande',2019,179],
['Call Me Maybe','Carly Rae Jepsen',2011,193],['Diamonds','Rihanna',2012,225],
['Some Nights','fun.',2012,277],['Free Bird','Lynyrd Skynyrd',1973,547],
['American Pie','Don McLean',1971,516],['Rocket Man','Elton John',1972,282],
['Shape of You','Ed Sheeran',2017,234],['Sweet Home Alabama','Lynyrd Skynyrd',1974,283],
['California Gurls','Katy Perry',2010,234],['New York State of Mind','Billy Joel',1976,360],
['Hotel California','Eagles',1976,391],['Africa','Toto',1982,295]
].map(([title,artist,year,seconds])=>({title,artist,year,seconds}));
const prompts = [
{text:'Name a song with a color in its title.',test:s=>/yellow|purple|blue|black|red|green|white|pink|gold|silver/i.test(s.title)},
{text:'Name a song released in 2012.',test:s=>s.year===2012},
{text:'Name a song with a number in its title.',test:s=>/\d/.test(s.title)},
{text:'Name a song with a U.S. state in its title.',test:s=>/alabama|california|new york/i.test(s.title)},
{text:'Name a song longer than 7 minutes.',test:s=>s.seconds>420},
{text:'Name a song with an animal in its title.',test:s=>/dog|tiger|bird|cat|horse|wolf/i.test(s.title)},
{text:'Name a song released before 1980.',test:s=>s.year<1980},
{text:'Name a song released in the 1980s.',test:s=>s.year>=1980&&s.year<1990},
{text:'Name a song with a place in its title.',test:s=>/california|alabama|africa|new york/i.test(s.title)},
{text:'Name a song released in the 2000s.',test:s=>s.year>=2000&&s.year<2010}
];
const $=id=>document.getElementById(id);
const ROUND_COUNT=7,ROUND_SECONDS=20,MAX_SCORE=630;
let dailyPrompts=[],roundIndex=0,totalScore=0,deadline=0,timer=null,locked=false,history=[],filterTier='ALL',soundEnabled=false,audioContext=null;
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
function getDailyPrompts(){let seed=0;for(const c of dateKey())seed=(Math.imul(seed,31)+c.charCodeAt(0))>>>0;
const pool=[...prompts];for(let i=pool.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,ROUND_COUNT);}
function normalize(s){return s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');}
function findSong(input){const q=normalize(input);if(!q)return null;
return songs.find(s=>normalize(s.title)===q||normalize(`${s.title} ${s.artist}`)===q||normalize(`${s.title} by ${s.artist}`)===q)||null;}
function scoreFor(song,prompt){if(!song||!prompt.test(song))return {points:0,tier:'MISS'};
// Stable DEMO ranking only. Not a claim about a song's real popularity.
const eligible=songs.filter(prompt.test).sort((a,b)=>a.title.localeCompare(b.title));
const position=eligible.findIndex(s=>s===song);const fraction=eligible.length===1?1:position/(eligible.length-1);
const points=[25,40,65,90][Math.min(3,Math.floor(fraction*4))];
return {points,tier:points===90?'ULTRA RARE':points===65?'RARE':points===40?'UNCOMMON':'COMMON'};}
function stopTimer(){if(timer!==null){clearInterval(timer);timer=null;}}
function updateTimer(){const remaining=Math.max(0,Math.ceil((deadline-performance.now())/1000));$('timer').textContent=remaining;$('timerWrap').classList.toggle('danger',remaining<=5);if(remaining<=0&&!locked)finishRound(null,true);}
function startGame(){stopTimer();dailyPrompts=getDailyPrompts();roundIndex=0;totalScore=0;history=[];$('shareBtn').innerHTML='Share my score <span>↗</span>';startRound();}
function startRound(){stopTimer();locked=false;$('roundLabel').textContent=`ROUND ${roundIndex+1} / ${ROUND_COUNT}`;$('promptText').textContent=dailyPrompts[roundIndex].text;
$('songSearch').value='';$('songSearch').disabled=false;$('submitBtn').disabled=false;$('feedback').textContent='';$('feedback').className='feedback';
$('progressBar').style.width=`${roundIndex/ROUND_COUNT*100}%`;showScreen('game');deadline=performance.now()+ROUND_SECONDS*1000;updateTimer();timer=setInterval(updateTimer,100);$('songSearch').focus();}
function feedback(text){$('feedback').textContent=text;$('feedback').className='feedback';$('songSearch').select();playTone('wrong');}
function tryGuess(){if(locked)return;if(performance.now()>=deadline){finishRound(null,true);return;}
const input=$('songSearch').value.trim();if(!input){feedback('The mic is on! Type a song first.');return;}
const song=findSong(input);if(!song){feedback("That song hasn't been sung yet! (At least not in our demo catalog.)");return;}
if(!dailyPrompts[roundIndex].test(song)){feedback('Great song, wrong gig! Try again.');return;}
finishRound(song,false);}
function finishRound(song,expired){if(locked)return;locked=true;stopTimer();const prompt=dailyPrompts[roundIndex];const {points,tier}=scoreFor(song,prompt);totalScore+=points;
history.push({prompt:prompt.text,song:song?`${song.title} — ${song.artist}`:'No correct answer',points,tier});
$('songSearch').disabled=true;$('submitBtn').disabled=true;$('resultIcon').textContent=points?'♫':'×';$('resultEyebrow').textContent=expired?"TIME'S UP":'ANSWER LOCKED';
$('resultTitle').textContent=song?song.title:"Time's up!";$('resultArtist').textContent=song?song.artist:'The clock won this round.';
$('tierLabel').textContent=tier==='ULTRA RARE'?'HEADLINER · 90':tier;$('points').textContent=points;$('scoreCard').dataset.tier=tier;
$('resultMessage').textContent=points?`${points} points! Nice pull from the record collection.`:'No points this time. The next track is yours.';
$('continueBtn').innerHTML=roundIndex===ROUND_COUNT-1?'See your music identity <span>→</span>':'Next round <span>→</span>';
showScreen('result');if(points){playTone('win');if(points>=65)celebrate(points>=90?45:25);}else playTone('wrong');}
function nextRound(){roundIndex++;if(roundIndex>=ROUND_COUNT)showFinal();else startRound();}
function showFinal(){stopTimer();$('finalScore').textContent=totalScore;const rank=ranks.find(r=>totalScore<=r.max)||ranks.at(-1);
$('rankName').textContent=rank.name;$('rankDescription').textContent=rank.description;$('finalMessage').textContent='Your seven-song set is in the books. Ready to explore the setlist?';
const list=$('finalList');list.replaceChildren();history.forEach((h,i)=>{const row=document.createElement('div');row.className='final-row';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=`${i+1}. ${h.song}`;const detail=document.createElement('small');detail.textContent=h.prompt;info.append(title,detail);const pts=document.createElement('b');pts.textContent=`+${h.points}`;pts.style.color=h.points>=90?'var(--ultra)':h.points>=65?'var(--rare)':h.points>=40?'var(--uncommon)':'var(--common)';row.append(info,pts);list.append(row);});
const select=$('roundFilter');select.replaceChildren();dailyPrompts.forEach((p,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=`Round ${i+1}: ${p.text}`;select.append(opt);});select.value='0';filterTier='ALL';$('answerSearch').value='';updateFilterButtons();renderAnswers();showScreen('final');celebrate(55);playTone('final');}
function updateFilterButtons(){document.querySelectorAll('[data-tier]').forEach(b=>{if(b.closest('#tierFilters'))b.classList.toggle('active',b.dataset.tier===filterTier);});}
function renderAnswers(){const idx=Number($('roundFilter').value)||0,prompt=dailyPrompts[idx];if(!prompt)return;
const query=normalize($('answerSearch').value);const matches=songs.filter(s=>prompt.test(s)).map(s=>({...s,score:scoreFor(s,prompt)})).filter(s=>(filterTier==='ALL'||s.score.tier===filterTier)&&(!query||normalize(`${s.title} ${s.artist}`).includes(query))).sort((a,b)=>b.score.points-a.score.points||a.title.localeCompare(b.title));
$('answerCount').textContent=`${matches.length} matching song${matches.length===1?'':'s'} in our demo catalog · Scores are illustrative, not streaming data.`;
const list=$('answerList');list.replaceChildren();if(!matches.length){const p=document.createElement('p');p.className='answer-count';p.textContent='No matches in this filter. Try another.';list.append(p);return;}
for(const s of matches){const row=document.createElement('div');row.className='answer-row';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=s.title;const artist=document.createElement('small');artist.textContent=`${s.artist} · ${s.year}`;info.append(title,artist);const badge=document.createElement('span');badge.className='tier-chip';badge.dataset.tier=s.score.tier;badge.textContent=`${s.score.points} PTS`;row.append(info,badge);list.append(row);}}
function celebrate(count){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const layer=$('celebration');layer.replaceChildren();const colors=['#ff69c8','#c0ff70','#b69aff','#ffd46d','#7de9f3'];for(let i=0;i<count;i++){const piece=document.createElement('i');piece.className='particle';piece.style.left=`${Math.random()*100}%`;piece.style.background=colors[i%colors.length];piece.style.animationDelay=`${Math.random()*.45}s`;piece.style.animationDuration=`${1.2+Math.random()*1.3}s`;layer.append(piece);piece.addEventListener('animationend',()=>piece.remove(),{once:true});}}
function playTone(kind){if(!soundEnabled)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;audioContext??=new AC();if(audioContext.state==='suspended')audioContext.resume();const notes=kind==='win'?[440,554,659]:kind==='final'?[392,494,587,784]:[220,180];notes.forEach((freq,i)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain(),start=audioContext.currentTime+i*.105;osc.type=kind==='wrong'?'triangle':'sine';osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.085,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+.17);osc.connect(gain).connect(audioContext.destination);osc.start(start);osc.stop(start+.19);});}catch(e){/* sound is optional */}}
async function shareScore(){const rank=ranks.find(r=>totalScore<=r.max)||ranks.at(-1);const message=`🎵 SongDive Daily Seven\n${rank.name}\n${totalScore}/${MAX_SCORE} points\nhttps://cocopuffers.github.io/Songdive/`;try{if(navigator.share){await navigator.share({text:message});return;}await navigator.clipboard.writeText(message);$('shareBtn').textContent='Copied to clipboard!';}catch(e){if(e.name!=='AbortError')window.prompt('Copy your score:',message);}}
$('startBtn').addEventListener('click',startGame);$('guessForm').addEventListener('submit',e=>{e.preventDefault();tryGuess();});$('continueBtn').addEventListener('click',nextRound);$('restartBtn').addEventListener('click',startGame);$('shareBtn').addEventListener('click',shareScore);
$('roundFilter').addEventListener('change',renderAnswers);$('answerSearch').addEventListener('input',renderAnswers);$('tierFilters').addEventListener('click',e=>{const button=e.target.closest('button[data-tier]');if(!button)return;filterTier=button.dataset.tier;updateFilterButtons();renderAnswers();});
$('soundBtn').addEventListener('click',()=>{soundEnabled=!soundEnabled;$('soundBtn').textContent=soundEnabled?'♫ ON':'♫ OFF';$('soundBtn').setAttribute('aria-pressed',String(soundEnabled));if(soundEnabled)playTone('win');});
$('homeLink').addEventListener('click',e=>{e.preventDefault();if(!confirm('Return to the home screen? Your current run will be lost.'))return;stopTimer();showScreen('intro');});
showScreen('intro');
