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

    const checkAllSettnigs = document.querySelector('.checkbox_header_settings')
    const checkAllMailing = document.querySelector('.checkbox_header_mailing')

    const settingsSettingsChecks = document.querySelectorAll('.profile-settings_general .checkbox_row')
    const settingMailingChecks = document.querySelectorAll('.profile-settings_mailing .checkbox_row')

    function checkAllItems(items) {
        let res = false
        for (let i = 0; i < items.length; i++) {
            if (items[i].checked) {
                res = true
            } else {
                return false
            }
        }
        return res
    }

    function checkItems(checker, items) {
        let res = checkAllItems(items)
        if (res) {
            items.forEach(item => item.checked = false)
            checker.checked = false
        } 
        else {
            items.forEach(item => item.checked = true)
            checker.checked = true
        }
    }

    checkAllSettnigs.addEventListener('click', () => {
        checkItems(checkAllSettnigs, settingsSettingsChecks)
    })

    checkAllMailing.addEventListener('click', () => {
        checkItems(checkAllMailing, settingMailingChecks)
    })
    
    const addPurchaseChecker = () => {
        const checkAllPurchase = document.querySelectorAll('.purchase .checkbox_header_purchase')
        const purchaseItems = document.querySelectorAll('.purchase .purchase__item')

        checkAllPurchase.forEach((item, index) => {
            const checkboxes = purchaseItems[index].querySelectorAll('.checkbox_table')
            item.addEventListener('click', () => {
                checkItems(item, checkboxes)
            })
        })
    }

    /* delete favorities */

    const addEventFavorites = () => {
        const items = document.querySelectorAll('.SelectItemDiv3')
        const hearts = document.querySelectorAll('.WishlistHeartSelected')
        hearts.forEach((item, index) => {
            item.addEventListener('click', () => {
                items[index].remove()
            })
        })
    }

    /* menu */

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
                menuSmallItems.forEach(item => {
                    item.classList.remove('profile__menu-item_small_active')
                })
                hideBlock(index)
            })
            item.classList.add('profile__menu-item_big_active')
            menuSmallItems[index].classList.add('profile__menu-item_small_active')
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
                menuItems.forEach(item => {
                    item.classList.remove('profile__menu-item_big_active')
                })
                menuItems[index].classList.add('profile__menu-item_big_active')
                showBlock(index)
                item.classList.add('profile__menu-item_small_active')
            }
        })
    })

    /* purchase pagination */
    
    const purchaseShowButton = document.querySelector('.profile__block-header_purchase .profile__block-header-show')
    const purchaseHideButton = document.querySelector('.profile__block-header_purchase .profile__block-header-hide')
    const purchaseCarousel = document.querySelector('.profile__block-header_purchase .profile__carousel')
    const purchaseItemsRaw = document.querySelector('.purchase_raw').children

    function layouting(data) {
        let dataHtml = ''
              $.each(data, function (index, item) {
                dataHtml += item.outerHTML
              })
        return dataHtml;
    }
    
    const showPurchaseItems = (perPage) => {
        $('.profile__carousel_purchase').pagination({
            dataSource: Array.from(purchaseItemsRaw),
            pageRange: 1,
            pageSize: perPage,
            showPageNumbers: true,
            showPrevious: true,
            showNext: true,
            showFirstOnEllipsisShow: true,
            showLastOnEllipsisShow: true,
            callback: function(data, pagination) {
                var html = layouting(data);
                $('.purchase').html(html);
            }
        })
        $('.profile__carousel_purchase').addHook('afterPaging', addPurchaseChecker)
        addPurchaseChecker()
    }

    purchaseHideButton.style.display = "none"

    purchaseShowButton.addEventListener('click', () => {
            purchaseHideButton.style.display = "block"
            purchaseCarousel.style.display = "none"
            purchaseShowButton.style.display = "none"
            showPurchaseItems(1000)
            $('.profile__carousel_purchase').pagination('destroy')
    })

    purchaseHideButton.addEventListener('click', () => {
            purchaseHideButton.style.display = "none"
            purchaseCarousel.style.display = "flex"
            purchaseShowButton.style.display = "block"
            checkWindowWidth()
    })

    /* favorite pagination */

    const favoriteItems = document.querySelector('.profile__favorites_raw').children

    const showFavoriteItems = (perPage) => {
        $('.profile__carousel_favorites').pagination({
            dataSource: Array.from(favoriteItems),
            pageRange: 1,
            pageSize: perPage,
            showPageNumbers: true,
            showPrevious: true,
            showNext: true,
            showFirstOnEllipsisShow: true,
            showLastOnEllipsisShow: true,
            callback: function(data, pagination) {
                var html = layouting(data);
                $('.profile__favorites').html(html);
            }
        })
        $('.profile__carousel_favorites').addHook('afterPaging', addEventFavorites)
        addEventFavorites()
    }

    const checkWindowWidth = () => {
        if (window.innerWidth > 768) {
            showFavoriteItems(3)
            showPurchaseItems(1)
        } else {
            showFavoriteItems(1)
            showPurchaseItems(1)
        }
    }

    checkWindowWidth()

    /* favorite pagination show/hide all */

    const favoriteShowButton = document.querySelector('.profile__block-header_favorites .profile__block-header-show')
    const favoriteHideButton = document.querySelector('.profile__block-header_favorites .profile__block-header-hide')
    const favoriteCarouse = document.querySelector('.profile__block-header_favorites .profile__carousel_favorites')
    const rightArrows = document.querySelectorAll('.arrowRight')
    const leftArrows = document.querySelectorAll('.arrowLeft')

    const hideFakePaginationButtons = () => {
        rightArrows.forEach(item => {
            item.style.display="none"
        })
        leftArrows.forEach(item => {
            item.style.display="none"
        })
    }

    const showFakePaginationButtons = () => {
        rightArrows.forEach(item => {
            item.style.display="block"
        })
        leftArrows.forEach(item => {
            item.style.display="block"
        })
    }

    favoriteHideButton.style.display = "none"

    favoriteShowButton.addEventListener('click', () => {
        favoriteHideButton.style.display = "block"
        favoriteCarouse.style.display = "none"
        favoriteShowButton.style.display = "none"
        hideFakePaginationButtons()
        showFavoriteItems(1000)
        $('.profile__carousel_favorites').pagination('destroy')
    })

    favoriteHideButton.addEventListener('click', () => {
        favoriteHideButton.style.display = "none"
        favoriteCarouse.style.display = "flex"
        favoriteShowButton.style.display = "block"
        showFakePaginationButtons()
        checkWindowWidth()
    })

    /* addresses delete */

    const addresses = document.querySelectorAll('.address__list-item')
    const arddressDeleteButton = document.querySelectorAll('.address__list-choise-delete')
    
    arddressDeleteButton.forEach((item, index) => {
        item.addEventListener('click', () => {
            addresses[index].remove()
        })
    })
    
    /* bind fake item arrows to pagination */

    $('.profile__favorites').on( "click", '.arrowRight', function(e){
        $('.paginationjs-next').trigger(e.type);
    });

    $('.profile__favorites').on( "click", '.arrowLeft', function(e){
        $('.paginationjs-prev').trigger(e.type);
    });

    /* register personal data */

    
    const registerLink = document.querySelector('.profile__text_link')
    registerLink.addEventListener('click', (e) => {
        e.preventDefault()
        $('body').on( "click", '.profile__text_link', function(e){
            $('.profile__menu-item_personal').trigger(e.type);
        });
    })
});