const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');
const navLogo = document.querySelector('#navbar_logo');

const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}

menu.addEventListener('click', mobileMenu);

//Text animation
const text = document.querySelector('.hero_heading');
const strText = text.textContent;
const splitText = strText.split("");
text.textContent= "";
for(let i = 0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>";
}
let char = 0;
let timer = setInterval(onTick, 50);

function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if(char === splitText.length){
        complete();
    }
}

function complete(){
    clearInterval(timer);
    timer = null;
}

//Highlighting active page on navigation bar
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const portfolioMenu = document.querySelector('#portfolio-page');
    const contactMenu = document.querySelector('#contact-page');
    let scrollPos = window.scrollY;

    if(window.innerWidth > 960 && scrollPos < 600){
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 1400){
        aboutMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        portfolioMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 2345){
        portfolioMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 3000){
        contactMenu.classList.add('highlight');
        portfolioMenu.classList.remove('highlight');
        return;
    }

    if((elem && window.innerWidth < 960 && scrollPos < 600) || elem){
        elem.classList.remove('highlight');
    }
}

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//Close nav menu when clicking menu item
const hideMobildeMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if(window.innerWidth <= 768 && menuBars){
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
}

menuLinks.addEventListener('click', hideMobildeMenu);
navLogo.addEventListener('click', hideMobildeMenu);

//Contact send email
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//contactInfo collections
let contactInfo = firebase.database().ref("infos");

document.querySelector('.contact_form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    //Get Input Values
    let name = document.querySelector('.name').value;
    let email = document.querySelector('.email').value;
    let message = document.querySelector('.message').value;

    saveContactInfo(name, email, message);

    document.querySelector('.contact-form').reset();

    sendEmail(name, email, message);
}

function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        message: message,
    });
}

function sendEmail(name, email, message){
    Email.send({
        Host: 'smtp.gmail.com',
        Username: 'test@gmail.com',
        Password: 'test',
        To: 'test@gmail.com',
        From: 'test@gmail.com',
        Subject: `${name} sent you a message`,
        Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`
    }).then((message) => alert("mail sent successfully"));
}