let songs = [];
let currentIndex = 0;
let isPlaying = false;
let audio = new Audio();

const albumDiv = document.getElementById("album");
const songInfo = document.getElementById("song-info");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

async function loadSongs() {
  const response = await fetch("songs.json");
  songs = await response.json();
  updateUI();
}

function updateUI() {
  const song = songs[currentIndex];
  albumDiv.style.backgroundImage = `url(${song.cover})`;
  updateTextDisplay();
  audio.src = song.file;
}

function updateTextDisplay() {
  const song = songs[currentIndex];
  const songInfoElement = document.getElementById("song-info");
  
  if (isPlaying) {
    // When playing: show scrolling marquee
    songInfoElement.innerHTML = `<marquee behavior="scroll" direction="left">${song.title} - ${song.artist}</marquee>`;
  } else {
    // When stopped/paused: show static text aligned left
    songInfoElement.innerHTML = `${song.title} - ${song.artist}`;
  }
}

playBtn.onclick = () => {
  playBtn.style.transform = 'translate(-50%, -50%) translateY(1px)';
  setTimeout(() => {
    playBtn.style.transform = 'translate(-50%, -50%)';
  }, 100);
  
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    playIcon.src = "assets/mp3-components/button_play_pause_trimmed.png";
    updateTextDisplay(); // Update text to scrolling mode
  } else {
    audio.pause();
    isPlaying = false;
    playIcon.src = "assets/mp3-components/button_play_pause_trimmed.png";
    updateTextDisplay(); // Update text to static mode
  }
};

nextBtn.onclick = () => {
  nextBtn.style.transform = 'translateY(-50%) translateY(1px)';
  setTimeout(() => {
    nextBtn.style.transform = 'translateY(-50%)';
  }, 100);
  
  currentIndex = (currentIndex + 1) % songs.length;
  updateUI();
  if (isPlaying) {
    audio.play();
    updateTextDisplay(); // Ensure text shows correct state
  }
};

prevBtn.onclick = () => {
  prevBtn.style.transform = 'translateY(-50%) translateY(1px)';
  setTimeout(() => {
    prevBtn.style.transform = 'translateY(-50%)';
  }, 100);
  
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  updateUI();
  if (isPlaying) {
    audio.play();
    updateTextDisplay(); // Ensure text shows correct state
  }
};

loadSongs();
