
        var name = document.getElementById("name");
        var subject = document.getElementById("subject");
        var message = document.getElementById("message");
        var email = document.getElementById("email");
        var nameerror = document.getElementById("nameerror");
        var messageerror = document.getElementById("messageerror");
        var subjecterror = document.getElementById("subjecterror");
        var success = document.getElementById("success");
        var emailerror = document.getElementById("emailerror");
        nameerror.innerHTML = "";
        subjecterror.innerHTML = "";
        messageerror.innerHTML = "";
        emailerror.innerHTML = "";
        nameerror.classList = "";
        subjecterror.classList = "";
        messageerror.classList = "";
        emailerror.classList = "";
        success.classList ="";
        if(localStorage.name == "false"||localStorage.subject == "false"||localStorage.message == "false"||localStorage.email == "format"){
            if(localStorage.name == "false"){
                nameerror.innerHTML = "You should enter your name."
                nameerror.setAttribute("class", "showerror");
            }
            if(localStorage.message == "false"){
                messageerror.innerHTML = "You should enter your message.";
                messageerror.setAttribute("class", "showerror");
            }
            if(localStorage.subject == "false"){
                subjecterror.innerHTML = "You should enter your subject.";
                subjecterror.setAttribute("class", "showerror");
            }
            if(localStorage.email == "format"){
                emailerror.innerHTML = "You should check your email format."
                emailerror.setAttribute("class", "showerror");
            }
        }
        else if(localStorage.name == "true" && localStorage.subject == "true" && localStorage.message == "true" && localStorage.email == "true"){
            success.setAttribute("class", "showsuccess");
        }
        localStorage.name = "";
        localStorage.subject = "";
        localStorage.message = "";
        localStorage.email = "";
function setLocalStorage(){
            if(name.value!=""){
                localStorage.name = "true";
            }
            else{
                localStorage.name = "false";
            }
            if(subject.value!=""){              
                localStorage.subject = "true";
            }
            else{
                localStorage.subject = "false";
            }
            if(message.value!=""){
                localStorage.message = "true";
            }
            else{
                localStorage.message = "false";
            }
            success.innerHTML ="";
        }
}
// Comment
function setMessage(){
    var message = document.getElementById("message").value;
    var name = document.getElementById("name").value;
    if(name==""||message==""){
        if(name==""){
            alert("You should enter your name.");
        }
        if(message==""){
            alert("You should enter your message.");
        }
    }
    else{
        storedNames[getnumber][count[getnumber]] = name;
        localStorage.names= JSON.stringify(storedNames);
        storedMessages[getnumber][count[getnumber]] = message;
        localStorage.messages= JSON.stringify(storedMessages);
        count[getnumber]+=1;
        localStorage.count = JSON.stringify(count);
    }
}

// Get weather information
var weather = document.getElementById("weather_div");
function WeatherInfo(){
  var Request = new XMLHttpRequest();
  Request.open('GET','http://api.openweathermap.org/data/2.5/weather?id=5327684&APPID=bc9af5272ea0f9b4df3aabb8eaeddf10&units=metric');
  Request.onload = function(){
    var Data = JSON.parse(Request.responseText);
    var weather=data.weather[0].main;
    var temp=data.main.temp;
    var wind=data.wind.speed;
    var weatherText = document.getElementById("weather")
    weatherText.innerHTML=weather;
    var tempText = document.getElementById("temp")
    tempText.innerHTML=temp+' F°';
    var windText = document.getElementById("wind")
    windText.innerHTML=wind+' m/h';     
  }

    Request.send();
};

WeatherInfo();
