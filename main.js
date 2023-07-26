const videoContainer = document.querySelector(".video-container");

let api_key = "AIzaSyASMTqe5IUc5lMihS72OSH3qUEs4VreKwE";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams ({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})



const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams ({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoContainer.innerHTML += `
    <div class="video" onclick= "location.href = 'https://youtube.com/watch?v = ${data.id}'">
        <img src= "${data.snippet.thumbnails.high.url}" class= "thumbnail" alt="">
        <div class= "contents">
            <img src= "${data.channelThumbnail}" class= "channel-icon" alt= "">
            <div class= "info">
                <h4 class= "title"> ${data.snippet.title} </h4>
                <p class= "channel-name"> ${data.snippet.channelTitle} </p>
            </div>
        </div>
    </div>
    `;
}


//search logic

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search");

let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener ( "click", () =>{
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

//show menu

const menu = document.querySelector("#menu");
const sideBar = document.querySelector("#sidebar");

menu.addEventListener('click', function(){
    sideBar.classList.toggle('show-menu');
});













