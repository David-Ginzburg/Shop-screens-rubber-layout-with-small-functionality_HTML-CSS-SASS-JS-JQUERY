document.addEventListener('DOMContentLoaded', () => {
    /* menu functionality */
    const menuButtons = document.querySelectorAll('.information__menu-item')
    const paragraphs = document.querySelectorAll('.information__paragraph-item')
   
    menuButtons.forEach((item, index) => {
        item.addEventListener('click', () => {
            menuButtons.forEach(item => item.classList.remove('information__menu-item_active'))
            item.classList.add('information__menu-item_active')
            paragraphs.forEach(item => item.classList.remove('information__paragraph-item_active'))
            paragraphs[index].classList.add('information__paragraph-item_active')
        })
    })
});