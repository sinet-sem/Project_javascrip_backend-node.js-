
//......................display user on broswer.................................//
function displayUser(response) {
    let users = response.data;
    const getuser =  localStorage.getItem("username");
    const getpassword = localStorage.getItem("password");
    let content = document.querySelector(".content");
    const user_list = document.querySelector(".user-list");
    
    if (user_list !== null) {
        user_list.remove();
    }
    const new_user_list = document.createElement("div");
    new_user_list.classList.add("user-list");
    for (let user of users) {
        //............... create div element for contain fieldset and time................//
        const div = document.createElement("div");
        div.className = "list";
        
        //...............create element fieldset for store all spans..................//
        const fieldset = document.createElement("fieldset");

        //...............create span for contain time.................//
        const span_time = document.createElement("span");
        span_time.className = "time";

        //..............create element span for contain name and text message..........//
        const span_text = document.createElement("span");
        span_text.className="textMessage";

        const span_img = document.createElement("span");
        const img = document.createElement("img");

        if (user.sex === "Female"){
            img.src = "../image/female.jpg";
         
        }
        else{
            img.src = "../image/male.jpg";
        }

        if (user.bold === "B" && user.italic === "I") {
            span_text.textContent = user.username + ": " + user.text;
            span_text.style.fontWeight = "bold";
            span_text.style.fontStyle = "italic";
            span_time.textContent = user.time;

        }
        else if (user.bold === "B") {
            span_text.textContent = user.username + ": " + user.text;
            span_text.style.fontWeight = "bold";
            span_time.textContent = user.time;

        }
        else if (user.italic === "I") {
            span_text.textContent = user.username + ": " + user.text;
            span_text.style.fontStyle = "italic";
            span_time.textContent = user.time;

        }
        else {
            span_text.textContent = user.username + ": " + user.text;
            span_time.textContent = user.time;
        }
       
        //.............create element span for contain icon eidt...................//
        const span_edit = document.createElement("span");
        span_edit.className = "fa fa-pencil-square-o ";
        span_edit.addEventListener("click", function(){
            // user admin
            if( getuser === "sinet" && getpassword ==="123" || getuser === "chanry" && getpassword === "456"){
                id = user.id;
                let text = user.text;
                getText(text);
            }
            // user normal
            else if(user.username === getuser && user.password === getpassword ){
                id = user.id;
                let text = user.text;
                getText(text);
            }
            else{
                confirm ("cannot edit message! You can only eidt your message")
            }
            
        });

        //..............create element span for contain icon delete................//
        const span_delete = document.createElement('span');
        span_delete.className = "fa fa-trash ";
        span_delete.addEventListener("click", function(){
            // user admin
            if( getuser === "sinet" && getpassword ==="123" || getuser === "chanry" && getpassword === "456"){
                let idDelete = user.id;
                deleteMessage(idDelete);
            }
            // user normal
            else if( user.username === getuser && user.password === getpassword ){
                let idDelete = user.id;
                deleteMessage(idDelete);
            }
            else{
                confirm ("cannot delete message! You can only delete your message");
            }
            
        });
        
        img.appendChild(span_img);
        fieldset.appendChild(img);
        fieldset.appendChild(span_text);
        fieldset.appendChild(span_edit);
        fieldset.appendChild(span_delete);
        fieldset.style.backgroundColor = user.color;
        div.appendChild(span_time);
        div.appendChild(fieldset);
        new_user_list.appendChild(div);
        content.appendChild(new_user_list);

    }

    //.................clear value .....................//
    bold = "";
    italic = "";
}

//.............get text when click on button update ....................//
function getText(message){
    showElement(btnupdate,true);
    showElement(btnsend,false)
    const text = document.querySelector("#textId");
    text.value= message;
    
}

//...............update message......................//
function updateMessage(){
    let text = document.querySelector("#textId").value;
    
    const url = "http://localhost:5000/users/"+id;
    //const url = "https://free-9chat.herokuapp.com/users/"+id;
   
    axios.put(url,{text: text}).then(displayUser);
  
    showElement(btnupdate, false);
    showElement(btnsend, true);
    
    
}

//...................button update.....................//
const btnupdate = document.querySelector("#update_message");
btnupdate.addEventListener("click", updateMessage);

//................delete message...................//
function deleteMessage(id) {
    //const url = "https://free-9chat.herokuapp.com/users/" + id;
    const url = "http://localhost:5000/users/"+ id;
    axios.delete(url).then(displayUser);
}

// .....................show and hide element .........................//
const sex = document.querySelector("#sex");
const containerDiv = document.querySelector(".container");
const userLoginDiv = document.querySelector(".userLogin");
const colorId = document.querySelector("#color");
const register = document.querySelector(".register");
const user_login = document.querySelector(".user_login");
const loginBtn = document.querySelector(".login");

function showElement(element, isShow) {
    if (isShow) {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}

function buttonSignUp(event) {
    event.preventDefault();
    showElement(sex,true);
    showElement(btnupdate, false);
    showElement(register, true);
    showElement(saveBtn, false);
    showElement(btnsubmit, true);
    showElement(colorId, true);
    showElement(containerDiv, false);
    showElement(user_login, false);
    showElement(loginBtn, false);
};

function buttonLogout(event){
    showElement(sex, false);
    showElement(containerDiv, false);
    showElement(logOutBtn, false);
    showElement(signUpBtn, false);
    showElement(loginBtn, true);
    showElement(userLoginDiv, true);
    showElement(user_login, true);
    showElement(register, false);
    showElement(colorId, false);
    showElement(btnsubmit, false);
    showElement(saveBtn, true);
}

//...............button show and hide element ..................//
const logOutBtn = document.querySelector(".logOut");
logOutBtn.addEventListener("click",buttonLogout);

//...............button show and hide element..................//
const signUpBtn = document.querySelector(".sign_up");
signUpBtn.addEventListener("click", buttonSignUp);

//.........create empty object for store all value.................//
let User = {};
let italic = "";
let bold = "";
let id = 0;

//................function ask user can login or not...................//
function Userlogin(response) {
    let users = response.data;
 
    //...............get value from input....................//
    const input_username = document.querySelector("#username").value;
    const input_password = document.querySelector("#password").value;

    let iscorrect = false;

    for (let user of users) {
        if (user.username === input_username && user.password === input_password) {

            //..........show and hide element................//
            showElement(containerDiv, true);
            showElement(userLoginDiv, false);
            showElement(signUpBtn, false);
            showElement(loginBtn, false);
            showElement(logOutBtn, true);
            showElement(btnupdate, false)

            iscorrect = true;
            //................add value into object............//
            localStorage.setItem("username", input_username);
            localStorage.setItem("password",input_password);
            User.color = user.color;
            User.sex = user.sex;

        }
    }
    if (iscorrect===false) {
        confirm("wrong password or username!!")
    }
}

//.............function save user login...............//
function buttonSave(e) {
    e.preventDefault();
    const url = "http://localhost:5000/users";
    //const url = "https://free-9chat.herokuapp.com/users";
    axios.get(url)
    .then(Userlogin)
    .catch(function(error) {
        console.log(error)
    });

    
};

//...............button save user login......................//
const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", buttonSave);

//...........function submit form register................//
function UserRigister(e) {
    e.preventDefault();

    const input_username = document.querySelector("#username").value;
    const input_password = document.querySelector("#password").value;
    const input_color = document.querySelector("#color").value;

    //............alert message when input empty...................//
    if (input_username === "") return confirm("input username cannot empty!!")
    if (input_password === "") return confirm("input password cannot empty!!")

    let inputRadio = document.querySelectorAll("input[name=genderSelect]");
    for (let radio of inputRadio){
        if (radio.checked){
            User.sex = radio.value
        }
    }
    //...........set username and password into localstorage................//
    localStorage.setItem("username", input_username);
    localStorage.setItem("password",input_password);
    User.color = input_color;
    
    //..........show and hide element................//
    showElement(containerDiv, true);
    showElement(userLoginDiv, false);
    showElement(signUpBtn, false);
    showElement(loginBtn, false);
    showElement(logOutBtn, true);

}

//...............button submit form register.................//
const btnsubmit = document.querySelector("#submit");
btnsubmit.addEventListener("click", UserRigister);


//.......................send message........................//
function sendMessage(e) {
    const getuser =  localStorage.getItem("username");
    const getpassword = localStorage.getItem("password");
    const text = document.querySelector("#textId").value;
    //.................audio...................//
    const x = document.getElementById("myAudio");
    x.play();
    //.................data and time....................//
    let d = new Date();
    let ampm = "";
    let time = "";
    if (d.getHours() >=12 ){
        ampm = "PM";

    }else{
        ampm = "AM";
    };

    time = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear() + "-" + d.getHours() + ":" + d.getMinutes()+ ampm;
    User.username = getuser;
    User.password = getpassword;
    User.text = text;
    User.time = time;
    User.bold = bold;
    User.italic = italic;
  
    const url = "http://localhost:5000/users";
    //const url = "https://free-9chat.herokuapp.com/users";
    axios.post(url, User).then(displayUser);

    document.querySelector("#textId"). value = "";
    disablebutton();
}

let enablebutton = () =>{
    btnsend.removeAttribute("disabled");
}


let disablebutton = () => {
    btnsend.setAttribute("disabled" , "");
};

document.addEventListener("keyup",() =>{
    const text_message = document.querySelector("#textId").value;
    if (text_message !== ""){
 
        enablebutton();

    }else{
        disablebutton();
    }
})

//...............button send message.........................//
const btnsend = document.querySelector("#send_message");
btnsend.addEventListener('click', sendMessage);

//.......................load data.............................//
function loadData() {
    const url = "http://localhost:5000/users";
    // const url = "https://free-9chat.herokuapp.com/users";
    axios.get(url).then(displayUser);
}

//........... text bold..............//
function covertToBold() {
    bold = "B";
    
}
 
const textBold = document.querySelector("#bold");
textBold.addEventListener("click", covertToBold);


//...............text italic....................//
function covertToItalic() {
    italic = "I";
    
}

const textItalic = document.querySelector("#italic");
textItalic.addEventListener("click", covertToItalic);

setInterval(loadData,3000);

