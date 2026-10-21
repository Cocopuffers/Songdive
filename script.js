"use strict";

// SongDive prototype: sample song catalog and illustrative rarity scoring.
// Scores are not based on real player submission statistics.

const songs = [
  ["Yellow", "Coldplay", 2000, 269],
  ["Purple Rain", "Prince", 1984, 521],
  ["Blue Monday", "New Order", 1983, 449],
  ["Back in Black", "AC/DC", 1980, 255],
  ["Red Right Hand", "Nick Cave & the Bad Seeds", 1994, 371],
  ["Black Dog", "Led Zeppelin", 1971, 295],
  ["Eye of the Tiger", "Survivor", 1982, 245],
  ["22", "Taylor Swift", 2012, 232],
  ["505", "Arctic Monkeys", 2007, 253],
  ["7 Rings", "Ariana Grande", 2019, 179],
  ["Call Me Maybe", "Carly Rae Jepsen", 2011, 193],
  ["Diamonds", "Rihanna", 2012, 225],
  ["Some Nights", "fun.", 2012, 277],
  ["Free Bird", "Lynyrd Skynyrd", 1973, 547],
  ["American Pie", "Don McLean", 1971, 516],
  ["Rocket Man", "Elton John", 1972, 282],
  ["Shape of You", "Ed Sheeran", 2017, 234],
  ["Sweet Home Alabama", "Lynyrd Skynyrd", 1974, 283],
  ["California Gurls", "Katy Perry", 2010, 234],
  ["New York State of Mind", "Billy Joel", 1976, 360],
  ["Hotel California", "Eagles", 1976, 391],
  ["Africa", "Toto", 1982, 295]
].map(([title, artist, year, seconds]) => ({
  title,
  artist,
  year,
  seconds
}));

const prompts = [
  {
    text: "Name a song with a color in its title.",
    test: song => /yellow|purple|blue|black|red|green|white|pink|gold|silver/i.test(song.title)
  },
  {
    text: "Name a song released in 2012.",
    test: song => song.year === 2012
  },
  {
    text: "Name a song with a number in its title.",
    test: song => /\d/.test(song.title)
  },
  {
    text: "Name a song with a U.S. state in its title.",
    test: song => /alabama|california|new york/i.test(song.title)
  },
  {
    text: "Name a song longer than 7 minutes.",
    test: song => song.seconds > 420
  },
  {
    text: "Name a song with an animal in its title.",
    test: song => /dog|tiger|bird|cat|horse|wolf/i.test(song.title)
  },
  {
    text: "Name a song released before 1980.",
    test: song => song.year < 1980
  },
  {
    text: "Name a song released in the 1980s.",
    test: song => song.year >= 1980 && song.year < 1990
  },
  {
    text: "Name a song with a place in its title.",
    test: song => /california|alabama|africa|new york/i.test(song.title)
  },
  {
    text: "Name a song released in the 2000s.",
    test: song => song.year >= 2000 && song.year < 2010
  }
];

const $ = id => document.getElementById(id);

const ROUND_COUNT = 7;
const ROUND_SECONDS = 20;
const MAX_SCORE = 630;

let dailyPrompts = [];
let roundIndex = 0;
let totalScore = 0;
let secondsLeft = ROUND_SECONDS;
let timer = null;
let selectedSong = null;
let locked = false;
let history = [];

function showScreen(screenId) {
  ["intro", "game", "result", "final"].forEach(id => {
    const element = $(id);
    if (element) element.classList.toggle("hidden", id !== screenId);
  });
}

function getDailyPrompts() {
  const today = new Date();
  const dateKey = [
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  ].join("-");

  let seed = 0;

  for (const char of dateKey) {
    seed = (Math.imul(seed, 31) + char.charCodeAt(0)) >>> 0;
  }

  const shuffled = [...prompts];

  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, ROUND_COUNT);
}

function stopTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function updateTimer() {
  $("timer").textContent = secondsLeft;

  if (secondsLeft <= 5) {
    $("timer").style.color = "#ff7b7b";
  } else {
    $("timer").style.color = "";
  }
}

function startGame() {
  stopTimer();

  dailyPrompts = getDailyPrompts();
  roundIndex = 0;
  totalScore = 0;
  history = [];

  startRound();
}

function startRound() {
  stopTimer();

  selectedSong = null;
  locked = false;
  secondsLeft = ROUND_SECONDS;

  $("roundLabel").textContent =
    `ROUND ${roundIndex + 1} OF ${ROUND_COUNT}`;

  $("promptText").textContent = dailyPrompts[roundIndex].text;
  $("songSearch").value = "";
  $("songSearch").disabled = false;

  $("suggestions").replaceChildren();
  $("selectedSong").replaceChildren();
  $("selectedSong").classList.add("hidden");

  $("submitBtn").disabled = true;
  $("feedback").textContent = "";

  $("progressBar").style.width =
    `${(roundIndex / ROUND_COUNT) * 100}%`;

  updateTimer();
  showScreen("game");

  $("songSearch").focus();

  timer = setInterval(() => {
    secondsLeft--;
    updateTimer();

    if (secondsLeft <= 0) {
      submitAnswer(true);
    }
  }, 1000);
}

function searchSongs() {
  if (locked) return;

  const query = $("songSearch").value.trim().toLowerCase();
  const suggestions = $("suggestions");

  suggestions.replaceChildren();

  if (!query) return;

  const matches = songs
    .filter(song =>
      `${song.title} ${song.artist}`.toLowerCase().includes(query)
    )
    .slice(0, 8);

  if (matches.length === 0) {
    suggestions.textContent = "No matching songs in the demo catalog.";
    return;
  }

  for (const song of matches) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${song.title} — ${song.artist}`;

    button.addEventListener("click", () => {
      selectSong(song);
    });

    suggestions.appendChild(button);
  }
}

function selectSong(song) {
  if (locked) return;

  selectedSong = song;

  $("songSearch").value = `${song.title} — ${song.artist}`;
  $("suggestions").replaceChildren();

  $("selectedSong").textContent =
    `Selected: ${song.title} — ${song.artist}`;

  $("selectedSong").classList.remove("hidden");
  $("submitBtn").disabled = false;
}

function calculateScore(song, prompt) {
  if (!song || !prompt.test(song)) {
    return { points: 0, tier: "MISS" };
  }

  const eligible = songs
    .filter(prompt.test)
    .sort((a, b) => a.title.localeCompare(b.title));

  const position = eligible.findIndex(item => item === song);

  if (position < 0) {
    return { points: 0, tier: "MISS" };
  }

  // Prototype rarity: deterministic position in the sample catalog.
  // Replace with actual submission statistics for a public release.
  const fraction = eligible.length === 1
    ? 1
    : position / (eligible.length - 1);

  const points = [25, 40, 65, 90][
    Math.min(3, Math.floor(fraction * 4))
  ];

  const tier =
    points === 90 ? "ULTRA RARE" :
    points === 65 ? "RARE" :
    points === 40 ? "UNCOMMON" : "COMMON";

  return { points, tier };
}

function submitAnswer(timeExpired = false) {
  if (locked) return;

  locked = true;
  stopTimer();

  const prompt = dailyPrompts[roundIndex];
  const song = timeExpired ? null : selectedSong;
  const { points, tier } = calculateScore(song, prompt);

  totalScore += points;

  history.push({
    prompt: prompt.text,
    song: song ? `${song.title} — ${song.artist}` : "No answer",
    points
  });

  $("songSearch").disabled = true;
  $("submitBtn").disabled = true;

  $("resultIcon").textContent = points > 0 ? "♪" : "×";
  $("resultEyebrow").textContent =
    timeExpired ? "TIME'S UP" : "ANSWER LOCKED IN";

  $("resultTitle").textContent =
    song ? song.title : "Time's up!";

  $("resultArtist").textContent =
    song ? song.artist : "No song submitted";

  $("tierLabel").textContent = tier;
  $("points").textContent = points;

  $("resultMessage").textContent =
    timeExpired
      ? "No points this round. Try another prompt!"
      : points > 0
        ? `Nice pick! You earned ${points} points.`
        : "That song doesn't match this prompt.";

  $("continueBtn").textContent =
    roundIndex === ROUND_COUNT - 1
      ? "See final score →"
      : "Next round →";

  showScreen("result");
}

function continueGame() {
  roundIndex++;

  if (roundIndex >= ROUND_COUNT) {
    showFinalScore();
  } else {
    startRound();
  }
}

function showFinalScore() {
  stopTimer();

  $("finalScore").textContent = totalScore;

  $("finalMessage").textContent =
    totalScore >= 450
      ? "Incredible deep cuts!"
      : totalScore >= 250
        ? "Nice work! You know your music."
        : "Keep digging for those hidden gems!";

  const finalList = $("finalList");
  finalList.replaceChildren();

  history.forEach((entry, index) => {
    const item = document.createElement("div");

    item.textContent =
      `${index + 1}. ${entry.song} — ${entry.points} pts`;

    finalList.appendChild(item);
  });

  showScreen("final");
}

async function shareScore() {
  const text =
    `SongDive Daily Seven 🎵\n` +
    `I scored ${totalScore}/${MAX_SCORE}!\n` +
    `https://cocopuffers.github.io/Songdive/`;

  try {
    await navigator.clipboard.writeText(text);
    $("shareBtn").textContent = "Copied!";
  } catch (error) {
    window.prompt("Copy your score:", text);
  }
}

// Connect the game to the buttons in index.html.
$("startBtn").addEventListener("click", startGame);
$("songSearch").addEventListener("input", searchSongs);

$("submitBtn").addEventListener("click", () => {
  submitAnswer(false);
});

$("continueBtn").addEventListener("click", continueGame);
$("restartBtn").addEventListener("click", startGame);
$("shareBtn").addEventListener("click", shareScore);

// Show the welcome screen when the page first loads.
showScreen("intro");
