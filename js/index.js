const audio = document.querySelector(".song");
const play = document.querySelector(".button-play");
const nextSound = document.querySelector(".forward");
const backSound = document.querySelector(".backward");
const range = document.querySelector(".music-time");
const widthMusic = document.querySelector(".progress");
const back = document.querySelector(".back");
const playerImage = document.querySelector(".music-image");
const time = document.querySelector(".time");
const ollTime = document.querySelector(".total-time");
let autor = document.querySelector(".autor");
let title = document.querySelector(".title");
const arrSound = ["beyonce", "assets_audio_dontstartnow"];
const arrAutor = ["Beyonce", "Dua Lipa"];
const arrTitle = ["Don't Hurt Yourself", "Don't Start Now"];
const totalTime = ["3:53", "3:23"];

let isPlay = false;
let playNum = 0;

function loadSong(index) {
  autor.innerHTML = arrAutor[index];
  title.innerHTML = arrTitle[index];
  audio.src = "./assets/audio/" + arrSound[index] + ".mp3";
  ollTime.innerHTML = totalTime[index];
  back.style.backgroundImage = `url(./assets/img/${index}.png)`;
  playerImage.style.backgroundImage = `url(./assets/img/${index}.png)`;
}

loadSong(playNum);

function playAudio() {
  audio.play();
  playerImage.classList.add("music-image-active");
  back.classList.add("animation");
  isPlay = true;
}

function pauseAudio() {
  audio.pause();
  playerImage.classList.remove("music-image-active");
  back.classList.remove("animation");
  isPlay = false;
}

// next and prev cound

function playNext() {
  playNum++;
  if (playNum > arrSound.length - 1) {
    playNum = 0;
  }
  loadSong(playNum);
  playAudio();
}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = arrAutor.length - 1;
  }
  loadSong(playNum);
  playAudio();
}

//button play

function playAndPause() {
  if (isPlay === false) {
    playAudio();
    play.classList.add("button-pause");
  } else {
    pauseAudio();
    play.classList.remove("button-pause");
  }
}

function nowTime(current) {
  const minuts = Math.floor(current / 60);
  const sec = `${current % 60}`.padStart(2, "0");
  const second = Math.floor(sec);

  return `${minuts}:${
    second < 10 ? "0" + second : second % 10 !== 0 ? second : second + ""
  }`;
}

function musicTime(e) {
  const { duration, currentTime } = e.srcElement;
  const progress = (currentTime / duration) * 100;
  widthMusic.style.width = progress + "%";
  time.innerHTML = nowTime(currentTime);
}

function clickWidth(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

play.addEventListener("click", playAndPause);
nextSound.addEventListener("click", playNext);
backSound.addEventListener("click", playPrev);
audio.addEventListener("timeupdate", musicTime);
range.addEventListener("click", clickWidth);
