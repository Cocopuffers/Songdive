// Demo-only song metadata. Expand with licensed/verified catalog before public launch.
const songs=[
['Yellow','Coldplay',2000,269],['Purple Rain','Prince',1984,521],['Blue Monday','New Order',1983,449],['Back in Black','AC/DC',1980,255],['Red Right Hand','Nick Cave & the Bad Seeds',1994,371],['Black Dog','Led Zeppelin',1971,295],['Eye of the Tiger','Survivor',1982,245],['22','Taylor Swift',2012,232],['505','Arctic Monkeys',2007,253],['7 Rings','Ariana Grande',2019,179],['Call Me Maybe','Carly Rae Jepsen',2011,193],['Diamonds','Rihanna',2012,225],['Some Nights','fun.',2012,277],['Free Bird','Lynyrd Skynyrd',1973,547],['American Pie','Don McLean',1971,516],['Rocket Man','Elton John',1972,282],['Shape of You','Ed Sheeran',2017,234],['Sweet Home Alabama','Lynyrd Skynyrd',1974,283],['California Gurls','Katy Perry',2010,234],['New York State of Mind','Billy Joel',1976,360],['Hotel California','Eagles',1976,391],['Africa','Toto',1982,295],['September','Earth, Wind & Fire',1978,215],['Hey Jude','The Beatles',1968,431],['Bohemian Rhapsody','Queen',1975,354],['Take On Me','a-ha',1985,225],['Piano Man','Billy Joel',1973,336],['Mr. Brightside','The Killers',2003,222],['Bad Romance','Lady Gaga',2009,295],['Viva la Vida','Coldplay',2008,242]
].map(([title,artist,year,seconds])=>({title,artist,year,seconds}));
const prompts=[
{q:'Name a song with a color in its title.',test:s=>/yellow|purple|blue|black|red|green|white|pink|gold|silver/i.test(s.title)},
{q:'Name a song released in 2012.',test:s=>s.year===2012},
{q:'Name a song with a number in its title.',test:s=>/\d/.test(s.title)},
{q:'Name a song with a U.S. state in its title.',test:s=>/alabama|california|new york/i.test(s.title)},
{q:'Name a song longer than 7 minutes.',test:s=>s.seconds>420},
{q:'Name a song with an animal in its title.',test:s=>/dog|tiger|bird|cat|horse|wolf/i.test(s.title)},
{q:'Name a song released before 1980.',test:s=>s.year<1980},
{q:'Name a song released in the 1980s.',test:s=>s.year>=1980&&s.year<1990},
{q:'Name a song with a place in its title.',test:s=>/california|alabama|africa|new york/i.test(s.title)},
{q:'Name a song released in the 2000s.',test:s=>s.year>=2000&&s.year<2010}
];
// Illustrative rarity tiers based on the rank of the answer within eligible demo songs.
// Real release must use actual submission-frequency statistics.
const tiers=[25,40,65,90];let selected=[],idx=0,total=0,seconds=20,timer=null,locked=false;
const el=id=>document.getElementById(id);
function daily(){const d=new Date(),key=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;let seed=[...key].reduce((a,c)=>a*31+c.charCodeAt(0),7)>>>0;let pool=[...prompts];for(let i=pool.length-1;i>0;i--){seed=(1664525*seed+1013904223)>>>0;const j=seed%(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,7)}
function start(){selected=daily();idx=0;total=0;el('welcome').hidden=true;el('end').hidden=true;el('game').hidden=false;show()}
function show(){locked=false;seconds=20;el('round').textContent=`ROUND ${idx+1} / 7`;el('total').textContent=`${total} PTS`;el('progress').style.width=`${idx/7*100}%`;el('prompt').textContent=selected[idx].q;el('search').value='';el('search').disabled=false;el('feedback').textContent='';el('next').hidden=true;render();tick();clearInterval(timer);timer=setInterval(()=>{seconds--;tick();if(seconds<=0){clearInterval(timer);finish(null)}},1000)}
function tick(){el('clock').textContent=`⏱ ${seconds}s`}
function render(){const query=el('search').value.toLowerCase().trim(),list=el('results');list.replaceChildren();if(!query||locked)return;const hits=songs.filter(s=>`${s.title} ${s.artist}`.toLowerCase().includes(query)).slice(0,8);for(const song of hits){const b=document.createElement('button');b.textContent=`${song.title} — ${song.artist}`;b.onclick=()=>finish(song);list.appendChild(b)}if(!hits.length)list.textContent='No matching song in the demo catalog.'}
function finish(song){if(locked)return;locked=true;clearInterval(timer);el('search').disabled=true;el('results').replaceChildren();const valid=song&&selected[idx].test(song);let points=0;if(valid){const eligible=songs.filter(selected[idx].test).sort((a,b)=>a.title.localeCompare(b.title));const rank=eligible.findIndex(s=>s===song);const rarity=eligible.length===1?0:rank/(eligible.length-1);points=tiers[Math.min(3,Math.floor(rarity*4))];total+=points;}el('feedback').textContent=!song?'⏰ Time is up — 0 points.':valid?`✓ ${song.title} — ${song.artist}: +${points} points (demo tier)`:`✕ ${song.title} does not fit this prompt — 0 points.`;el('total').textContent=`${total} PTS`;el('next').textContent=idx===6?'See results →':'Next round →';el('next').hidden=false}
function next(){idx++;if(idx===7){el('game').hidden=true;el('end').hidden=false;el('final').textContent=`${total} / 630`;return}show()}
el('startBtn').onclick=start;el('again').onclick=start;el('next').onclick=next;el('search').oninput=render;el('share').onclick=async()=>{const t=`I scored ${total}/630 on SongDive Daily Seven 🎵`;try{await navigator.clipboard.writeText(t);el('share').textContent='Copied!'}catch{el('share').textContent=t}};
