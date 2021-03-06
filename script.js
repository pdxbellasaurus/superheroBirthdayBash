var heroEl = document.querySelector(".heroText");
var yearEl = document.querySelector(".heroYear");
var horoEl = document.querySelector(".horo")
var figYearEl;
var submitBtn = document.querySelector("button");



var sunSign = function(month, day) {

    if (month == "12"){ 
            
        if (day < 22) 
        sign = "Sagittarius"; 
        else
        sign ="Capricorn"; 
    } 
        
    else if (month == "1"){ 
        if (day < 20) 
        sign = "Capricorn"; 
        else
        sign = "Aquarius"; 
    } 
        
    else if (month == "2"){ 
        if (day < 19) 
        sign = "Aquarius"; 
        else
        sign = "Pisces"; 
    } 
        
    else if(month == "3"){ 
        if (day < 21)  
        sign = "Pisces"; 
        else
        sign = "Aries"; 
    } 
    else if (month == "4"){ 
        if (day < 20) 
        sign = "Aries"; 
        else
        sign = "Taurus"; 
    } 
        
    else if (month == "5"){ 
        if (day < 21) 
        sign = "Taurus"; 
        else
        sign = "Gemini"; 
    } 
        
    else if( month == "6"){ 
        if (day < 21) 
        sign = "Gemini"; 
        else
        sign = "Cancer"; 
    } 
        
    else if (month == "7"){ 
        if (day < 23) 
        sign = "Cancer"; 
        else
        sign = "Leo"; 
    } 
        
    else if( month == "8"){ 
        if (day < 23)  
        sign = "Leo"; 
        else
        sign = "Virgo"; 
    } 
        
    else if (month == "9"){ 
        if (day < 23) 
        sign = "Virgo"; 
        else
        sign = "Libra"; 
    } 
        
    else if (month == "10"){ 
        if (day < 23) 
        sign = "Libra"; 
        else
        sign = "scorpio"; 
    } 
        
    else if (month == "11"){ 
        if (day < 22) 
        sign = "scorpio"; 
        else
        sign = "Sagittarius"; 
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