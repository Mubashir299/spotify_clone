console.log("Wellcome to spotify")
// Initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/let-me-love-you.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let songItemPlay = document.getElementsByClassName('songItemPlay');
let dur;

let songs = [
    { songName: "let me love you", filePath: "songs/let-me-love-you.mp3", coverPath: "covers/1.jpg" },
    { songName: "song#2", filePath: "songs/1.mp3", coverPath: "covers/2.jpg" },
    { songName: "song#3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "song#4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "song#5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "song#6", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "song#7", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "song#8", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "song#9", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "song#10", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },

]

songItems.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;

})
// audioElement.play();
// Handle play/pause click
masterPlay.addEventListener('click', () => {
    
    if (audioElement.paused || audioElement.currentTime <= 0) {
        
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
       

    }
    setInterval(checkSongTime, 1000);
        function checkSongTime() {
            // code to check the current time of the song and to display it
            var time = audioElement.currentTime;
            var minutes = Math.floor(time / 60);
            var seconds = Math.floor(time - minutes * 60);
            dur = minutes + ":" + seconds;
            document.getElementById('time').innerText = dur;
            console.log(dur);
        }
})

//Listen to event
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {

    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

    element.addEventListener('click', (e) => {
        console.log(e.target)
        console.log(audioElement.currentTime);
        songIndex = parseInt(e.target.id)

        makeAllPlays();
        // gif.style.opacity = 1;
        if (audioElement.paused) {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause-circle');
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.src = `${songs[songIndex].filePath}`;
            // audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-circle-play');
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
        setInterval(checkSongTime, 1000);
        function checkSongTime() {
            // code to check the current time of the song and to display it
            var time = audioElement.currentTime;
            var minutes = Math.floor(time / 60);
            var seconds = Math.floor(time - minutes * 60);
            dur = minutes + ":" + seconds;
            document.getElementById('time').innerText = dur;
            console.log(dur);
        }
    })
    //find the Audio duriation
    // audioElement.addEventListener('time', () => {
    //     var time = audioElement.duration;
    //     var minutes = Math.floor(time / 60);
    //     var seconds = Math.floor(time - minutes * 60);
    //     dur = minutes + ":" + seconds;
    //     document.getElementById('time').innerText = dur;
    //     console.log(dur);
    // })

})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `${songs[songIndex].filePath}`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `${songs[songIndex].filePath}`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');
})

//Audio auto play next song when previous song is finished

audioElement.addEventListener('ended', (e) => {
    //play next song
    audioElement.pause();
    songIndex = songIndex + 1;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `${songs[songIndex].filePath}`;
    audioElement.load();
    audioElement.play();
});


