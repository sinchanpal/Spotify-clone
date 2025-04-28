console.log("Welcome to spotify");


//Initialize Variables

let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.querySelector(".masterSongName");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = document.querySelectorAll('.songItem');
let songItemPlay = document.querySelectorAll(".songItemPlay");
let previousBtn = document.querySelector("#previousBtn");
let nextBtn = document.querySelector("#nextBtn");
let body = document.getElementsByTagName("body");
let mainBox = document.querySelector(".mainBox");
let songVideo=document.getElementById("songVideo");


//store songs information in the array of objects
let songs = [
    { songName: "All the Stars", filePath: "songs/1.mp3", coverPath: "images/1.jpg", timeStamp: "3:52", videoPath: "videos/1.mp4" },
    { songName: "unforgettable", filePath: "songs/2.mp3", coverPath: "images/2.jpg", timeStamp: "3:53", videoPath: "videos/2.mp4" },
    { songName: "Zaalima", filePath: "songs/3.mp3", coverPath: "images/3.jpg", timeStamp: "4:59", videoPath: "videos/3.mp4" },
    { songName: "Falak Tak", filePath: "songs/4.mp3", coverPath: "images/4.jpg", timeStamp: "5:56", videoPath: "videos/4.mp4" },
    { songName: "Lean On (feat. MØ)", filePath: "songs/5.mp3", coverPath: "images/5.jpg", timeStamp: "2:56", videoPath: "videos/5.mp4" },
    { songName: "Bikhra", filePath: "songs/6.mp3", coverPath: "images/6.jpg", timeStamp: "4:48", videoPath: "videos/6.mp4" },
    { songName: "Jawan: Zinda Banda", filePath: "songs/7.mp3", coverPath: "images/7.jpg", timeStamp: "4:24", videoPath: "videos/7.mp4" },
    { songName: "Malhari", filePath: "songs/8.mp3", coverPath: "images/8.jpg", timeStamp: "4:10", videoPath: "videos/8.mp4" }
]
// audioElement.play();
// let masterPlay = document.getElementById("masterPlay");


function updateVideo(index){      //change
    songVideo.src=songs[index-1].videoPath;
    songVideo.load();
    songVideo.play();
    songVideo.style.opacity=1;
}

//adding song name , cover path ,time stamp in the song list
songItems.forEach((element, i) => {

    // console.log(element, i);
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerHTML = songs[i].songName;
    element.querySelector(".timeStamp").innerHTML = songs[i].timeStamp;
});

//Handle play/pause on masterPlay click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;

        makeAllPlay();   //ai bug fix
        document.getElementById(songIndex).classList.remove("fa-circle-play");
        document.getElementById(songIndex).classList.add("fa-circle-pause");
        document.body.style.backgroundColor = "#0f172a";
        mainBox.classList.add("glowAnimation");
        mainBox.style.backgroundImage = `url('${songs[songIndex - 1].coverPath}')`; //here the background img is change according to clicked song 
        updateVideo(songIndex);//change
        
    } else {
        audioElement.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;

        makeAllPlay();
        document.body.style.backgroundColor = "white";
        mainBox.classList.remove("glowAnimation");
        mainBox.style.backgroundImage = "url('images/girl-with-black-headphone\ copy.webp')"  //here the background img is change according to clicked song 
        songVideo.style.opacity=0;//change
    }
});


//change Time 
audioElement.addEventListener("timeupdate", () => {
    // console.log("timeupdate");
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;

    if (myProgressBar.value == 100) {

        if (songIndex >= 7) {
            songIndex = 1;
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.play();
            audioElement.currentTime = 0;
            masterSongName.innerHTML = songs[songIndex - 1].songName;
            mainBox.style.backgroundImage = `url('${songs[songIndex - 1].coverPath}')`;  //here the background img is change according to clicked song 
            makeAllPlay();
            document.getElementById(songIndex).classList.remove("fa-circle-play");
            document.getElementById(songIndex).classList.add("fa-circle-pause");
            updateVideo(songIndex);//change
        }
        else {
            songIndex += 1;
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.play();
            audioElement.currentTime = 0;
            masterSongName.innerHTML = songs[songIndex - 1].songName;
            mainBox.style.backgroundImage = `url('${songs[songIndex - 1].coverPath}')`;  //here the background img is change according to clicked song 
            makeAllPlay();
            document.getElementById(songIndex).classList.remove("fa-circle-play");
            document.getElementById(songIndex).classList.add("fa-circle-pause");
            updateVideo(songIndex);//change
        }

    }
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
    // console.log(audioElement.currentTime);
})

const makeAllPlay = () => {
    songItemPlay.forEach((element) => {
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
    })

}




// song play from the song list
songItemPlay.forEach((element) => {
    element.addEventListener("click", (e) => {
        let targetSong = e.target;
        let clickedIndex = parseInt(targetSong.id);

        // If the clicked song is the current song
        if (songIndex === clickedIndex) {
            if (audioElement.paused) {
                audioElement.play();
                targetSong.classList.remove("fa-circle-play");
                targetSong.classList.add("fa-circle-pause");
                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");
                gif.style.opacity = 1;
                document.body.style.backgroundColor = "#0f172a";
                mainBox.classList.add("glowAnimation");
                mainBox.style.backgroundImage = `url('${songs[songIndex - 1].coverPath}')`; //here the background img is change according to clicked song 
                updateVideo(songIndex);//change

            } else {
                audioElement.pause();
                targetSong.classList.add("fa-circle-play");
                targetSong.classList.remove("fa-circle-pause");
                masterPlay.classList.add("fa-circle-play");
                masterPlay.classList.remove("fa-circle-pause");
                gif.style.opacity = 0;
                document.body.style.backgroundColor = "white";
                mainBox.classList.remove("glowAnimation");
                mainBox.style.backgroundImage = "url('images/girl-with-black-headphone\ copy.webp')"; //here the background img is change according to clicked song 
                songVideo.style.opacity=0;//change
            }
        } else {
            makeAllPlay();
            songIndex = clickedIndex;
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.play();
            audioElement.currentTime = 0;

            targetSong.classList.remove("fa-circle-play");
            targetSong.classList.add("fa-circle-pause");
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity = 1;
            masterSongName.innerHTML = songs[songIndex - 1].songName;
            document.body.style.backgroundColor = "#0f172a";
            mainBox.classList.add("glowAnimation");
            mainBox.style.backgroundImage = `url('${songs[songIndex - 1].coverPath}')`;   //here the background img is change according to clicked song 
            updateVideo(songIndex);//change
        }
    });
});


previousBtn.addEventListener(("click"), () => {

    if (songIndex <= 1) {
        songIndex = 7;
    } else {
        songIndex = songIndex - 1;
    }

    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime = 0;

    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    masterSongName.innerHTML = songs[songIndex - 1].songName;
    mainBox.style.backgroundImage = `url('${songs[songIndex - 1].coverPath}')`; //here the background img is change according to clicked song 


    makeAllPlay();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    document.body.style.backgroundColor = "#0f172a";
    mainBox.classList.add("glowAnimation");
    updateVideo(songIndex);//change

});


nextBtn.addEventListener(("click"), () => {

    if (songIndex > 7) {
        songIndex = 1;
    } else {
        songIndex = songIndex + 1;
    }

    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime = 0;

    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    masterSongName.innerHTML = songs[songIndex - 1].songName;
    mainBox.style.backgroundImage = `url('${songs[songIndex - 1].coverPath}')`; //here the background img is change according to clicked song 

    makeAllPlay();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    document.body.style.backgroundColor = "#0f172a";
    mainBox.classList.add("glowAnimation");
    updateVideo(songIndex);//change

});

