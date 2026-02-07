let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    header.classList.remove('active');
};

var typed = new Typed('.typing-text', {
    strings: ['Developer', 'A problem solver', 'A python developer', 'Bit of a web developer', 'AI developer', 'currently a cse undergrad', 'Student of Indian Classical Music', 'I play the Bansuri', 'I am also a Painter'],
    loop: true,
    typeSpeed: 200
});

VanillaTilt.init(document.querySelectorAll('.tilt'), {
    max: 25
});
