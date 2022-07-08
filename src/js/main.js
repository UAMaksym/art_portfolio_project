let burger = document.querySelector('.intro_menu');
let burger_menu = document.querySelector('.navigation')
let intro_info = document.querySelector('.intro_info');
let soacial_links = document.querySelector('.social_links');
let circle = document.querySelector('.circle');


burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    burger_menu.classList.toggle('active');
    intro_info.classList.toggle('active');
    soacial_links.classList.toggle('active');
    circle.classList.toggle('active');

})