const input = document.querySelector(".content input");
const btn = document.querySelector(".content button");
const input_part = document.querySelector(".input-part");
const weather_part = document.querySelector(".weather-part");
const back_icon = document.querySelector(".icon-back");
const info_text = document.querySelector(".input-part p");
const numb = document.querySelector(".weather-part .temp .numb");
const weather_info = document.querySelector(".weather-part .weather");
const location1 = document.querySelector(".location span");
const feels_like_numb = document.querySelector(".numb-2");
const humidity_value = document.querySelector(".humidity .details span");
const wIcon = document.querySelector(".weather-part img");

var api;
const API_key='1235c40b0ff893a0b429a854a72980e1';

input.addEventListener("keyup", e=>{
    if(e.key=="Enter" && input.value!=""){
        requestApi(input.value);
    }
});

btn.addEventListener("click", e=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else{
        alert("Your browser doesn't support geolocalisation api");
    }
});

back_icon.addEventListener("click", e=>{
    changeDisplayToInput();
});

function changeDisplayToInput(){
    back_icon.style.display = "none";
    input_part.style.display="block";
    weather_part.style.display="none";
}

function changeInputToDisplay(){
    back_icon.style.display = "block";
    input_part.style.display="none";
    weather_part.style.display="flex";
}

function requestApi(city){
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
    fetchData();
}

function success(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key}`;
    fetchData();
}

function error(error){
    console.log(error);
    info_text.innerText = error.message;
    info_text.classList.add("error");
}

function fetchData(){
    info_text.innerHTML="Getting weather details...";
    info_text.classList.add("pending");

    fetch(api).then(res=>{
        return res.json();
    }).then(data=>{
        console.log(data.name);
        displayData(data);
    }).catch(()=>{
        info_text.innerText="Something went wrong";
        info_text.classList.replace("pending", "error");
        console.log("Some error");
    })
}
function displayData(data){
    if(data.cod==404){
        info_text.innerText=`${input.value} isn't a valid city name`;
        info_text.classList.replace("pending", "error");
    }
    else{
        changeInputToDisplay();

        const city = data.name;
        const country = data.sys.country;
        const weather_id = data.weather[0].id;
        const weather_dis = data.weather[0].description;
        const temp = data.main.temp;
        const feels_like = data.main.feels_like;
        const humidity = data.main.humidity;

        numb.innerText=Math.floor(temp);
        weather_info.innerText=weather_dis;
        location1.innerText=`${city}, ${country}`;
        feels_like_numb.innerText=Math.floor(feels_like);
        humidity_value.innerText=`${humidity}%`;

        if(weather_id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(weather_id >= 200 && weather_id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(weather_id >= 600 && weather_id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(weather_id >= 701 && weather_id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(weather_id >= 801 && weather_id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((weather_id >= 500 && weather_id <= 531) || (weather_id >= 300 && weather_id <= 321)){
            wIcon.src = "icons/rain.svg";
        }

        info_text.innerText="";
        info_text.classList.remove("pending", "error");
        input.value="";
    }
}

const image = ["./image/i1.jpg", "./image/i3.jpg", "./image/i4.jpg", "./image/i5.jpg", "./image/i6.jpg",
"./image/i7.jpg", "./image/i8.jpg", "./image/i9.jpg", "./image/i10.jpg", "./image/i11.jpg", "./image/i12.jpg", "./image/i13.jpg",
"./image/i14.jpg", "./image/i15.jpg", "./image/i16.jpg", "./image/i17.jpg", "./image/i18.jpg" ];

// var i=0;

// function changeBackground() {
//     document.body.style.backgroundImage = "url("+image[i]+")";
//     i++;
//     if(i==16){
//         i=0;
//     }
// }
// setInterval(changeBackground, 10000);

    // var interval=0;
    // Timer();

    // function Timer() {
    //     // clearInterval(interval);
    //     interval = setInterval(changeImage, 5000);
    // }
  
    // function changeImage() {   
    //     var i = Math.floor((Math.random() * 17));
    //     document.body.style.backgroundImage="url("+image[i]+")";
        
    // }