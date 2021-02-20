document.addEventListener('DOMContentLoaded', () => {
    /* placeholder with red star */
    
    const contactInputs = document.querySelectorAll('.contacts-item__input')
    const contactPlaceholders = document.querySelectorAll('.contacts-item__input-placeholder')
    
    contactInputs.forEach((item, index) => {
        item.addEventListener('input', () => {
            if (item.value.length === 0) {
                contactPlaceholders[index].style.display="block"
            } else {
                contactPlaceholders[index].style.display="none"
            }
        })
    })

    /* check all items*/

    const checkAll = document.querySelectorAll('.checkbox_header')
    const purchaseItems = document.querySelectorAll('.purchase__item')

    function checkAllItems(itemChecker) {
        let res = false
        for (let i = 0; i < itemChecker.length; i++) {
            if (itemChecker[i].checked) {
                res = true
            } else {
                return false
            }
        }
        return res
    }

    function checkItems(index) {
        let itemChecker = ''
        if (index >= purchaseItems.length) {
            itemChecker = index > purchaseItems.length ? document.querySelectorAll('.profile-settings_general .checkbox_row') : document.querySelectorAll('.profile-settings_mailing .checkbox_row')
        } else {
            itemChecker = purchaseItems[index].querySelectorAll('.checkbox_table')
        }
        console.log(itemChecker)

        let res = checkAllItems(itemChecker)
        if (res) {
            itemChecker.forEach(item => item.checked = false)
            checkAll.checked = false
        } 
        else {
            itemChecker.forEach(item => item.checked = true)
            checkAll.checked = true
        }
    }

    checkAll.forEach((item, index) => {
        item.addEventListener('click', () => {
            checkItems(index)
        })
    })

    /* small menu */

    const profileBlocks = document.querySelectorAll('.profile__block')
    const menuItems = document.querySelectorAll('.profile__menu-list .profile__menu-item_big')
    const menuSmallItems = document.querySelectorAll('.profile__blocks .profile__menu-item_small')

    const showBlock = (index) => {
        profileBlocks.forEach(item => {
            item.classList.remove('profile__block_active')
            profileBlocks[index].classList.add('profile__block_active')
        })
    }

    const hideBlock = (index) => {
        profileBlocks[index].classList.remove('profile__block_active')
    }

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            menuItems.forEach(item => {
                item.classList.remove('profile__menu-item_big_active')
                menuSmallItems[index].classList.remove('profile__menu-item_small_active')
            })
            menuSmallItems[index].classList.add('profile__menu-item_small_active')
            item.classList.add('profile__menu-item_big_active')
            showBlock(index)
        })
    })

    menuSmallItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (item.classList.contains('profile__menu-item_small_active')) {
                hideBlock(index)
                item.classList.remove('profile__menu-item_small_active')
                menuItems[index].classList.remove('profile__menu-item_big_active')
            } else {
                menuSmallItems.forEach(item => {
                    item.classList.remove('profile__menu-item_small_active')
                })
                showBlock(index)
                item.classList.add('profile__menu-item_small_active')
            }
        })
    })

    /* show/hide all */

    const showButtons = document.querySelectorAll('.profile__block-header-show')
    const hideButtons = document.querySelectorAll('.profile__block-header-hide')
    const carousels = document.querySelectorAll('.profile__carousel')

    hideButtons.forEach(item => item.style.display = "none")

    showButtons.forEach((item, index) => {
        item.addEventListener('click', () => {
            hideButtons[index].style.display = "block"
            carousels[index].style.display = "none"
            item.style.display = "none"
        })
    })

    hideButtons.forEach((item, index) => {
        item.addEventListener('click', () => {
            item.style.display = "none"
            carousels[index].style.display = "flex"
            showButtons[index].style.display = "block"
        })
    })
});