var charEl = document.querySelector("#character");
// var yearEl = document.querySelector("#birthyear");
var horoEl = document.querySelector("#horo")
var figYearEl;
var submitBtn = document.querySelector("#submitBtn");
// var pastSearches = document.querySelector("#pastSearches")
var searches = [];
var signEl = document.querySelector("#sunSign")
var birthmonth = document.querySelector(".birthmonth")
var birthday = document.querySelector(".birthday")
var descEl = document.querySelector("#description")

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

var month;
var day;
var sign;


submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log("clicked!")

    month = birthmonth.value;
    day = birthday.value;

    sign = sunSign(month, day);
    signEl.textContent = sign;
    var url = 'https://aztro.sameerkumar.website/?sign=' + sign + '&day=today';
    fetch(url, {method: "POST"})
    .then(response => response.json())
    .then(json => {
        var {description} = json;
        console.log(json);
        horoEl.textContent = description;
    });

    var url = 'https://byabbe.se/on-this-day/' + month + '/' + day + '/births.json';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        const {births} = json;
        var randBirth = births[Math.floor(Math.random()*births.length)];
        charEl.innerHTML = "<a href='" + randBirth.wikipedia[0].wikipedia + "'>" + randBirth.wikipedia[0].title + "</a>";
        descEl.textContent = randBirth.description;
        // yearEl.textContent = "...and was born in the year " + randBirth.year;
        var date = month + "/" + day;

        $("#pastSearches").find("a").remove()

        searches.push(date);
        localStorage.setItem("searches", JSON.stringify(searches));
        for (i=0; i < searches.length; i++) {
            var a = document.createElement("a");
            a.classList = "panel-block is-active"
            a.textContent = searches[i] + ": " + randBirth.wikipedia[0].title;
            pastSearches.append(a);
        }

    });
});