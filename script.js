var heroEl = document.querySelector(".heroText");
var yearEl = document.querySelector(".heroYear");
var horoEl = document.querySelector(".horo")
var figYearEl;
var submitBtn = document.querySelector("button");
var pastSearches = document.querySelector(".pastHeroes")



var sunSign = function(month, day) {

    if (month == "12"){ 
            
        if (day < 22) 
        sign = "sagittarius"; 
        else
        sign ="capricorn "; 
    } 
        
    else if (month == "1"){ 
        if (day < 20) 
        sign = "capricorn"; 
        else
        sign = "aquarius"; 
    } 
        
    else if (month == "2"){ 
        if (day < 19) 
        sign = "aquarius"; 
        else
        sign = "pisces"; 
    } 
        
    else if(month == "3"){ 
        if (day < 21)  
        sign = "pisces"; 
        else
        sign = "aries"; 
    } 
    else if (month == "4"){ 
        if (day < 20) 
        sign = "aries"; 
        else
        sign = "taurus"; 
    } 
        
    else if (month == "5"){ 
        if (day < 21) 
        sign = "taurus"; 
        else
        sign = "gemini"; 
    } 
        
    else if( month == "6"){ 
        if (day < 21) 
        sign = "gemini"; 
        else
        sign = "cancer"; 
    } 
        
    else if (month == "7"){ 
        if (day < 23) 
        sign = "cancer"; 
        else
        sign = "leo"; 
    } 
        
    else if( month == "8"){ 
        if (day < 23)  
        sign = "leo"; 
        else
        sign = "virgo"; 
    } 
        
    else if (month == "9"){ 
        if (day < 23) 
        sign = "virgo"; 
        else
        sign = "libra"; 
    } 
        
    else if (month == "10"){ 
        if (day < 23) 
        sign = "libra"; 
        else
        sign = "scorpio"; 
    } 
        
    else if (month == "11"){ 
        if (day < 22) 
        sign = "scorpio"; 
        else
        sign = "sagittarius"; 
    }
    return sign;
};

var month = 1;
var day = 18;

var sign = sunSign(month, day)

submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    var url = 'https://aztro.sameerkumar.website/?sign=' + sign + '&day=today';
    fetch(url, {method: "POST"})
    .then(response => response.json())
    .then(json => {
        var {description} = json;
        // console.log(json);
        horoEl.textContent = description;
        localStorage.setItem("sign", sign)
    });

    var url = 'https://byabbe.se/on-this-day/' + month + '/' + day + '/births.json';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        // console.log(json);
        const {births} = json;
        var randBirth = births[Math.floor(Math.random()*births.length)];
        heroEl.textContent = randBirth.description + " is a " + sign;
        yearEl.textContent = "...and was born in the year " + randBirth.year;
        localStorage.setItem("figure", randBirth.description);
    });
});