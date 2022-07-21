const burger = document.querySelector('.intro_menu');
const burgeMenu = document.querySelector('.navigation')
const introInfo = document.querySelector('.intro_info');
const soacialLinks = document.querySelector('.social_links');
const circle = document.querySelector('.circle');
const listItem = document.querySelectorAll('.list_link');


// listItem.addEventListener('click', function() {

// })

for (let i = 0; i < listItem.length; i++) {
    listItem[i].addEventListener('click', () => {
        listItem[i].classList.toggle('active');
    });
}

burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    burgeMenu.classList.toggle('active');
    introInfo.classList.toggle('active');
    soacialLinks.classList.toggle('active');
    circle.classList.toggle('active');

})