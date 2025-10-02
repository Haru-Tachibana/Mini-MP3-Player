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
  songInfo.textContent = `Now Play: ${song.title} - ${song.artist}`;
  audio.src = song.file;
}

playBtn.onclick = () => {
  // Add visual click feedback
  playBtn.style.transform = 'scale(0.9)';
  setTimeout(() => {
    playBtn.style.transform = '';
  }, 100);
  
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    playIcon.src = "assets/button_play_pause.png"; // You can create separate pause icon later
    songInfo.textContent = `▶ Now Play: ${songs[currentIndex].title} - ${songs[currentIndex].artist}`;
  } else {
    audio.pause();
    isPlaying = false;
    playIcon.src = "assets/button_play_pause.png"; // You can create separate play icon later
    songInfo.textContent = `❚❚ Paused: ${songs[currentIndex].title} - ${songs[currentIndex].artist}`;
  }
};

nextBtn.onclick = () => {
  // Add visual click feedback
  nextBtn.style.transform = 'scale(0.9)';
  setTimeout(() => {
    nextBtn.style.transform = '';
  }, 100);
  
  currentIndex = (currentIndex + 1) % songs.length;
  updateUI();
  if (isPlaying) audio.play();
};

prevBtn.onclick = () => {
  // Add visual click feedback
  prevBtn.style.transform = 'scale(0.9)';
  setTimeout(() => {
    prevBtn.style.transform = '';
  }, 100);
  
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  updateUI();
  if (isPlaying) audio.play();
};

loadSongs();
