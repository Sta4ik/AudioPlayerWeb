let music = [
    "assets/audio/9mice-Jenna.mp3",
    "assets/audio/9mice-nirvana.mp3",
    "assets/audio/9mice-distance.mp3"
];

let musicInfo = [
    "9mice - Jenna",
    "9mice - nirvana",
    "9mice - distance"
];

let musicImage = [
    "assets/image/icon9mm.png",
    "assets/image/icon9mm.png",
    "assets/image/icon9mm.png"
];

let audio = document.getElementById("audio");
let allMusic = document.getElementById("allMusic");
let trackInfo = document.getElementById("trackInfo");
let musicCard = document.getElementById("musicCard");
let image = document.getElementById("image");
const nextBut = document.getElementById("next");
const backBut = document.getElementById("back");
const playBut = document.getElementById("play");
const backToListBut = document.getElementById("toAllMusic");
const randomBut = document.getElementById("randomTrack");
const nowTime = document.getElementById("nowTime");
const duration = document.getElementById("duration");
const regulTime = document.getElementById("regulTime");

let counter = 0;
audio.src = music[counter];
trackInfo.textContent = musicInfo[counter];
image.src = musicImage[counter];


function next(){
    counter = (counter + 1) % music.length;
    audio.src = music[counter];
    trackInfo.textContent = musicInfo[counter];
    image.src = musicImage[counter];
    audio.play();
    playBut.textContent = "pause"
};

function back(){
    counter = (counter - 1 + music.length) % music.length;
    audio.src = music[counter];
    trackInfo.textContent = musicInfo[counter];
    image.src = musicImage[counter];
    audio.play();
    playBut.textContent = "pause"
};

function play(){
    if(audio.paused){
        audio.play();
        playBut.textContent = 'pause';
    }else{
        audio.pause();
        playBut.textContent = 'play';
    }
};

function selectionTrack(i){
    counter = i;
    audio.src = music[i];
    trackInfo.textContent = musicInfo[i];
    image.src = musicImage[counter];
    audio.play();
    playBut.textContent = "pause";
    allMusic.style.display = "none";
    musicCard.style.display = "block";
};

function toAllMusic(){
    allMusic.style.display = "block";
    musicCard.style.display = "none";
    audio.pause();
};

function randomTrack(){
    counter = Math.floor(Math.random() * music.length);
    audio.src = music[counter];
    trackInfo.textContent = musicInfo[counter];
    image.src = musicImage[counter];
    allMusic.style.display = "none";
    musicCard.style.display = "block";
    audio.play();
    playBut.textContent = "pause";
};

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

function getDuration(){
    regulTime.max = Math.floor(audio.duration);
    duration.textContent = formatTime(Math.floor(audio.duration));
}

function updateRegulTime(){
    regulTime.value = Math.floor(audio.currentTime);
    nowTime.textContent = formatTime(Math.floor(audio.currentTime));
}

function changeTime(){
    audio.currentTime = regulTime.value;
}

for(let i = 0; i < musicInfo.length; ++i){
    let track = document.createElement("div");
    track.textContent = musicInfo[i];
    track.addEventListener('click', function(){selectionTrack(i)});
    allMusic.appendChild(track);
};

nextBut.addEventListener('click', next);
backBut.addEventListener('click', back);
playBut.addEventListener('click', play);
backToListBut.addEventListener('click', toAllMusic);
randomBut.addEventListener('click', randomTrack);

audio.addEventListener('ended', next);
audio.addEventListener("loadedmetadata", getDuration);
audio.addEventListener("timeupdate", updateRegulTime);
regulTime.addEventListener("input", changeTime);