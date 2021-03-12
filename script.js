var charEl = document.querySelector("#character");
// var yearEl = document.querySelector("#birthyear");
var horoEl = document.querySelector("#horo")
var figYearEl;
var submitBtn = document.querySelector("#submitBtn");
var pastSearches = document.querySelector("#pastSearches")
var signEl = document.querySelector("#sunSign")
var symbolEl = document.querySelector("#horo-img")
var birthmonth = document.querySelector(".birthmonth")
var birthday = document.querySelector(".birthday")
var descEl = document.querySelector("#description")
var pastBtns = document.querySelectorAll(".past")


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

$("#pastSearches").find("a").remove()
var searches = JSON.parse(localStorage.getItem("storedSearches")) || [];


    for (i=0; i < searches.length; i++) {
        var a = document.createElement("a");
        a.classList = "past button is-hovered is-fullwidth mb-4 is-warning orange"
        a.setAttribute("data-index", i)
        a.textContent = searches[i].month + "/" + searches[i].day + ": " + searches[i].figure;
        pastSearches.append(a);
}

submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log("clicked!")

    month = birthmonth.value;
    day = birthday.value;

    sign = sunSign(month, day);
    signEl.textContent = sign;
    signImg = sign + ".png"
    symbolEl.setAttribute("src", "../assets/" + signImg);
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
        var rand = Math.floor(Math.random()*births.length)
        var randBirth = births[rand];
        charEl.innerHTML = "<a href='" + randBirth.wikipedia[0].wikipedia + "'>" + randBirth.wikipedia[0].title + "</a>";
        descEl.textContent = randBirth.description;
        var figure = randBirth.wikipedia[0].title
        var search = {rand, month, day, figure};

        $("#pastSearches").find("a").remove()
        console.log(search);
        searches.push(search);
        localStorage.setItem("storedSearches", JSON.stringify(searches));
        for (i=0; i < searches.length; i++) {
            var a = document.createElement("a");
            a.classList = "past button is-hovered is-fullwidth mb-4 is-warning orange"
            a.setAttribute("data-index", i)
            console.log(a.getAttribute("data-index"));
            a.textContent = searches[i].month + "/" + searches[i].day + ": " + searches[i].figure;
            pastSearches.append(a);
        }

    });
});


$( "#pastSearches").on("click", ".past", function(event) {
        event.preventDefault();
        console.log("clicked a past search!")
        var thisButton = event.target;
        console.log(thisButton);       
        console.log(thisButton.getAttribute("data-index"))

        text = thisButton.textContent;
        splitText = text.split(":");
        console.log(splitText);
        splitDate = splitText[0].split("/") ;
        month = splitDate[0];
        day = splitDate[1];
        thisFigure = searches[thisButton.getAttribute("data-index")]

        sign = sunSign(month, day);
        signEl.textContent = sign;
        signImg = sign + ".png"
        symbolEl.setAttribute("src", "../assets/" + signImg);
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
            
            var randBirth = births[thisFigure.rand];
            charEl.innerHTML = "<a href='" + randBirth.wikipedia[0].wikipedia + "'>" + randBirth.wikipedia[0].title + "</a>";
            descEl.textContent = randBirth.description;
            })
    });
