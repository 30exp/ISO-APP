/* -------------------------------------------------------
   Function for getting weather information
   ------------------------------------------------------- */

function weatherBalloon() {
  var key = 'a834dd769df9f9539e895993e8f85593';
  var lat = '36.311005';
  var lon = '-94.127434';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    drawWeather(data);
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

var months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];

var current_date = new Date();

var format_date = months[current_date.getMonth()] + ' ' + current_date.getDate() + ', ' + current_date.getFullYear();

$('.today-date').text(format_date);

$('button').click(function(){
  $('.home').addClass('open');
})

/* -------------------------------------------------------
   Function for display weather information
   ------------------------------------------------------- */

function drawWeather( d ) {

  // placeholder div for testing output
    changeTheme( d.current.weather[0].description );

  $('.now').html( convertTemp(d.current.temp) );

  $('.now-humd').html(d.current.humidity);
  $('.now-wind').html(d.current.wind_speed);
  $('.now-lght').html( convertTime(d.current.sunrise) );
  $('.now-nght').html( convertTime(d.current.sunset) );

     $('.n-zero').html( displayDay(0) );
  $('.now-high').html( convertTemp(d.daily[0].temp.max) );
  $('.now-low').html( convertTemp(d.daily[0].temp.min) );
   $('.day-n-one').html( displayDay(1) );
    $('.one-high').html( convertTemp(d.daily[1].temp.max) );
  $('.one-low').html( convertTemp(d.daily[1].temp.min) );
     $('.day-n-two').html( displayDay(2) );
    $('.two-high').html( convertTemp(d.daily[2].temp.max) );
  $('.two-low').html( convertTemp(d.daily[2].temp.min) );
     $('.day-n-three').html( displayDay(3) );
    $('.three-high').html( convertTemp(d.daily[3].temp.max) );
  $('.three-low').html( convertTemp(d.daily[3].temp.min) );
     $('.day-n-four').html( displayDay(4) );
    $('.four-high').html( convertTemp(d.daily[4].temp.max) );
  $('.four-low').html( convertTemp(d.daily[4].temp.min) );
     $('.day-n-five').html( displayDay(5) );
    $('.five-high').html( convertTemp(d.daily[5].temp.max) );
  $('.five-low').html( convertTemp(d.daily[5].temp.min) );
     $('.day-n-six').html( displayDay(6) );
    $('.six-high').html( convertTemp(d.daily[6].temp.max) );
  $('.six-low').html( convertTemp(d.daily[6].temp.min) );

  $('.one-icon').html( printGraphic(d.daily[1].weather[0].description))
  $('.two-icon').html( printGraphic(d.daily[2].weather[0].description))
  $('.three-icon').html( printGraphic(d.daily[3].weather[0].description))
  $('.four-icon').html( printGraphic(d.daily[4].weather[0].description))
  $('.five-icon').html( printGraphic(d.daily[5].weather[0].description))
  $('.six-icon').html( printGraphic(d.daily[6].weather[0].description))

  $('.one-deci').html( printDecision(d.daily[1].weather[0].description))
  $('.two-deci').html( printDecision(d.daily[2].weather[0].description))
  $('.three-deci').html( printDecision(d.daily[3].weather[0].description))
  $('.four-deci').html( printDecision(d.daily[4].weather[0].description))
  $('.five-deci').html( printDecision(d.daily[5].weather[0].description))
  $('.six-deci').html( printDecision(d.daily[6].weather[0].description))
}

/* -------------------------------------------------------
   Function for printing weather-specific class on body
   ------------------------------------------------------- */

function changeTheme(d){
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    $('.top').addClass('rainy');
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    $('.top').addClass('cloudy');
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    $('.top').addClass('sunny');
  // if none of those cases are true, assume it's clear
  } else {
    $('.top').addClass('clear');
  }

  if( d.indexOf('rain') > 0 ) {
    $('.bottom').addClass('rainy');
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    $('.bottom').addClass('cloudy');
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    $('.bottom').addClass('sunny');
  // if none of those cases are true, assume it's clear
  } else {
    $('.bottom').addClass('clear');
  }

}


/* -----------------------------------------------
   Function for printing weather-specific graphic
   ----------------------------------------------- */

function printGraphic(d){
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    return '<img src="img/svg/Cloud.svg" alt="Cloud icon">';
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    return '<img src="img/svg/Cloud-Rain.svg" alt="Cloud icon">';
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  // if none of those cases are true, assume it's clear
  } else {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  }
}


/* -----------------------------------------------
   Function for converting time to hours/minutes
   DO NOT EDIT
   ----------------------------------------------- */

function convertTime(t){

  var unixTimestamp = t;
  // since javascript works in milliseconds, you should convert 
  // the time into milliseconds by multiplying it by 1000.
  var date = new Date(unixTimestamp * 1000);
  // hours part from the timestamp (extra code needed to convert from military)
  var hours = (date.getHours() + 24) % 12 || 12;;
  // minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // will display time in 11:10 format
  var formatTime = hours + ':' + minutes.substr(-2);
  // send formatted date back
  return formatTime;

}


/* -----------------------------------------------
   Function for converting temp to fahrenheit
   DO NOT EDIT
   ----------------------------------------------- */

function convertTemp(t){

  return Math.round(((parseFloat(t)-273.15)*1.8)+32);

}


/* -----------------------------------------------
   Function for creating day of the week
   EDIT FORMAT OF DAY NAMES ONLY ("Monday", etc)
   ----------------------------------------------- */

// based on a system where 0 = today, 1 = tomorrow, etc.
// note: the number system below does not immediately correlate
// for example, 0 for today does not line up with 0 for Sunday below
// how this works – in the return statement, d.getDay() gets today's date
// as a number (if today is Thursday, d.getDay() will be 4)
// adding "n" to this number gives you how many days from today.
// n is passed as an argument to the displayDay() function
// in the main body of the code above.
// if today is Thursday, the 4th day of the week,
// and the number 2 is passed as an argument, 
// the function will return the number 6. 6 maps to Saturday in the 
// weekday array below.

function displayDay(n){


  var d = new Date();
  var weekday = new Array();

  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  var dispDay = d.getDay() + n;

  // adjust number system for numbers over 6
  // subtract 7 from totals higher than 6
  // to keep the day numbers in the array range above
  if(dispDay > 6){
    dispDay = dispDay - 7;
  }

  return weekday[ dispDay ];


}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function() {
  weatherBalloon();
}