const song = new Audio();
const ctrlIcon = document.getElementById("ctrlIcon");
const progress = document.getElementById("progress");
const songListContainer = document.getElementById("song-list");
const searchInput = document.getElementById("search-input");

let songs = [
  {
    title: "Winning Speech",
    artist: "Karan Aujla",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    img: "https://picsum.photos/200/200?random=1"
  },
  {
    title: "Softly",
    artist: "Karan Aujla",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    img: "https://picsum.photos/200/200?random=2"
  },
  {
    title: "Case",
    artist: "Diljit Dosanjh",
    src: "https://cdn.pixabay.com/audio/2022/03/15/audio_88440c6c72.mp3",
    img: "https://picsum.photos/200/200?random=3"
  }
];

let songIndex = 0;

function loadSong(index) {
  song.src = songs[index].src;
  document.getElementById("song-title").innerText = songs[index].title;
  document.getElementById("artist-name").innerText = songs[index].artist;
  document.getElementById("track-img").src = songs[index].img;
}

function playPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.replace("fa-play", "fa-pause");
  } else {
    song.pause();
    ctrlIcon.classList.replace("fa-pause", "fa-play");
  }
}

function playThisSong(index) {
  songIndex = index;
  loadSong(songIndex);
  song.play();
  ctrlIcon.classList.replace("fa-play", "fa-pause");
}

function displaySongs(list) {
  songListContainer.innerHTML = "";
  list.forEach((s, i) => {
    songListContainer.innerHTML += `
            <div class="song-item" onclick="playThisSong(${songs.indexOf(s)})">
                <img src="${s.img}">
                <div><h3>${s.title}</h3><p>${s.artist}</p></div>
            </div>`;
  });
}

searchInput.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();
  const filtered = songs.filter((s) => s.title.toLowerCase().includes(val));
  displaySongs(filtered);
});

song.ontimeupdate = () => {
  progress.value = (song.currentTime / song.duration) * 100;
};
progress.oninput = () => {
  song.currentTime = (progress.value * song.duration) / 100;
};

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  playThisSong(songIndex);
}
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playThisSong(songIndex);
}

displaySongs(songs);
loadSong(songIndex);
