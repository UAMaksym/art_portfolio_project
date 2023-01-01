const body = document.body;
const burger = document.querySelector('.intro_menu');
const burgeMenu = document.querySelector('.nav_wrap')
const introInfo = document.querySelector('.intro_info');
const circle = document.querySelector('.circle');
const listItems = document.querySelectorAll('.list_item');
const listProjectItem = document.querySelectorAll('.project_topics_list_item');

for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', () => {
        listItems.forEach(item => item.classList.remove('active'));
        listItems[i].classList.add('active');
    });
}

for (let i = 0; i < listProjectItem.length; i++) {
    listProjectItem[i].addEventListener('click', () => {
        listProjectItem.forEach(item => item.classList.remove('active'));
        listProjectItem[i].classList.add('active');
    })
}

burger.addEventListener('click', function () {
    body.classList.toggle('active');
    burger.classList.toggle('active');
    burgeMenu.classList.toggle('active');
    introInfo.classList.toggle('active');
    circle.classList.toggle('active');
})

