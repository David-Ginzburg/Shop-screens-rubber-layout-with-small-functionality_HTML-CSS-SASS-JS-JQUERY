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
                hideBlock(index)
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

    /* delete favorities */

    const items = document.querySelectorAll('.SelectItemDiv3')
    const hearts = document.querySelectorAll('.WishlistHeartSelected')

    hearts.forEach((item, index) => {
        item.addEventListener('click', () => {
            items[index].remove()
        })
    })

    /* purchase carousel */

    const purchaseShowButton = document.querySelector('.profile__block-header_purchase .profile__block-header-show')
    const purchaseHideButton = document.querySelector('.profile__block-header_purchase .profile__block-header-hide')
    const purchaseCarousel = document.querySelector('.profile__block-header_purchase .profile__carousel')

    purchaseHideButton.style.display = "none"

    purchaseShowButton.addEventListener('click', () => {
            purchaseHideButton.style.display = "block"
            purchaseCarousel.style.display = "none"
            purchaseShowButton.style.display = "none"
            purchaseItems.forEach(item => item.style.display="block")
    })

    purchaseHideButton.addEventListener('click', () => {
            purchaseHideButton.style.display = "none"
            purchaseCarousel.style.display = "flex"
            purchaseShowButton.style.display = "block"
            hideAllBlocks()
            purchaseItems[purchaseBlocksIndex].style.display="block"
    })

    /* switch blocks */

    const purchaseRightArrow = document.querySelector('.profile__carousel_purchase .profile__carousel-right-arrow')
    const purchaseLeftArrow = document.querySelector('.profile__carousel_purchase .profile__carousel-left-arrow')
    const purchaseCarouseelFiguries = document.querySelectorAll('.profile__carousel_purchase .profile__carousel-figure')
    
    let purchaseBlocksIndex = 0

        /* show first block */

    purchaseItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.display="none"
        }
        purchaseCarouseelFiguries[0].classList.add('profile__carousel-figure_active')
    })

        /* hide all blocks */

    const hideAllBlocks = () => {purchaseItems.forEach(item => item.style.display="none")}
    const removeAllActiveFigures = () => {purchaseCarouseelFiguries.forEach(item => item.classList.remove('profile__carousel-figure_active'))}

    purchaseRightArrow.addEventListener('click', () => {
        if (purchaseBlocksIndex < purchaseItems.length - 1) {
            purchaseBlocksIndex++
            hideAllBlocks()
            removeAllActiveFigures()
            purchaseCarouseelFiguries[purchaseBlocksIndex].classList.add('profile__carousel-figure_active')
            purchaseItems[purchaseBlocksIndex].style.display="block"
        }
    })

    purchaseLeftArrow.addEventListener('click', () => {
        if (purchaseBlocksIndex > 0) {
            purchaseBlocksIndex--
            hideAllBlocks()
            removeAllActiveFigures()
            purchaseCarouseelFiguries[purchaseBlocksIndex].classList.add('profile__carousel-figure_active')
            purchaseItems[purchaseBlocksIndex].style.display="block"
        }
    })

    purchaseCarouseelFiguries.forEach((item, index) => {
        item.addEventListener('click', () => {
            hideAllBlocks()
            removeAllActiveFigures()
            purchaseBlocksIndex = index
            purchaseCarouseelFiguries[purchaseBlocksIndex].classList.add('profile__carousel-figure_active')
            purchaseItems[purchaseBlocksIndex].style.display="block"
        })
    })


    /* favorite carousel */

    const favoriteShowButton = document.querySelector('.profile__block-header_favorites .profile__block-header-show')
    const favoriteHideButton = document.querySelector('.profile__block-header_favorites .profile__block-header-hide')
    const favoriteCarousel = document.querySelector('.profile__block-header_favorites .profile__carousel')

    favoriteHideButton.style.display = "none"

    favoriteShowButton.addEventListener('click', () => {
        favoriteHideButton.style.display = "block"
        favoriteCarousel.style.display = "none"
        favoriteShowButton.style.display = "none"
        // purchaseItems.forEach(item => item.style.display="block")
    })

    favoriteHideButton.addEventListener('click', () => {
        favoriteHideButton.style.display = "none"
        favoriteCarousel.style.display = "flex"
        favoriteShowButton.style.display = "block"
        // hideAllBlocks()
        // purchaseItems[purchaseBlocksIndex].style.display="block"
    })

    /* switch blocks */

    const favoriteRightArrow = document.querySelector('.profile__carousel_favorite .profile__carousel-right-arrow')
    const favoriteLeftArrow = document.querySelector('.profile__carousel_favorite .profile__carousel-left-arrow')
    const favoriteCarouseelFiguries = document.querySelectorAll('.profile__carousel_favorite .profile__carousel-figure')
    const favoriteItems = document.querySelector('.profile__favorites').childNodes

    let favoriteBlocksIndex = 0

        /* show first block */

    // purchaseItems.forEach((item, index) => {
    //     if (index !== 0) {
    //         item.style.display="none"
    //     }
    //     purchaseCarouseelFiguries[0].classList.add('profile__carousel-figure_active')
    // })

    //     /* hide all blocks */

    // const hideAllBlocks = () => {purchaseItems.forEach(item => item.style.display="none")}
    // const removeAllActiveFigures = () => {purchaseCarouseelFiguries.forEach(item => item.classList.remove('profile__carousel-figure_active'))}

    // purchaseRightArrow.addEventListener('click', () => {
    //     if (purchaseBlocksIndex < purchaseItems.length - 1) {
    //         purchaseBlocksIndex++
    //         hideAllBlocks()
    //         removeAllActiveFigures()
    //         purchaseCarouseelFiguries[purchaseBlocksIndex].classList.add('profile__carousel-figure_active')
    //         purchaseItems[purchaseBlocksIndex].style.display="block"
    //     }
    // })

    // purchaseLeftArrow.addEventListener('click', () => {
    //     if (purchaseBlocksIndex > 0) {
    //         purchaseBlocksIndex--
    //         hideAllBlocks()
    //         removeAllActiveFigures()
    //         purchaseCarouseelFiguries[purchaseBlocksIndex].classList.add('profile__carousel-figure_active')
    //         purchaseItems[purchaseBlocksIndex].style.display="block"
    //     }
    // })

    // purchaseCarouseelFiguries.forEach((item, index) => {
    //     item.addEventListener('click', () => {
    //         hideAllBlocks()
    //         removeAllActiveFigures()
    //         purchaseBlocksIndex = index
    //         purchaseCarouseelFiguries[purchaseBlocksIndex].classList.add('profile__carousel-figure_active')
    //         purchaseItems[purchaseBlocksIndex].style.display="block"
    //     })
    // })
});