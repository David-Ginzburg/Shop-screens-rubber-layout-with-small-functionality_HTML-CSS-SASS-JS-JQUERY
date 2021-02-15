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

    /* prodduct counter */

    const minus = document.querySelectorAll('.purchase__table-count-minus')
    const figure = document.querySelectorAll('.purchase__table-count-figure')
    const plus = document.querySelectorAll('.purchase__table-count-plus')

    function figureChecker(index) {
        if (Number(figure[index].textContent) > 0) {
            return true
        } else {
            return false
        }
    }

    minus.forEach((item, index) => {
        item.addEventListener('click', () => {
            const check = figureChecker(index)
            if (check) {
                figure[index].textContent = Number(figure[index].textContent) - 1
            }
        })
    })

    plus.forEach((item, index) => {
        item.addEventListener('click', () => {
            figure[index].textContent = Number(figure[index].textContent) + 1
        })
    })

    /* delivery cost */

    const purchaseTable = document.querySelector('.purchase__table')
    const purchaseSum = document.querySelector('.purchase__table-sum_checkout')
    const pickPrice = document.querySelector('.delivery__item-price_pickpoint')
    const courierPrice = document.querySelector('.delivery__item-price_courier')
    const postPrice = document.querySelector('.delivery__item-price_post')

    function formSum() {
        const itemsSum = document.querySelectorAll('.purchase__table-sum')
        let sum = 0
        itemsSum.forEach(item => {
            sum = sum + Number(item.textContent.match(/\d/g).join('')
        )})
        if (String(sum).length > 3) {
            sum = String(sum).split('')
            let finalSum = []
            let count = 0
            for (let i = sum.length - 1; i >= 0; i--) {
                console.log(i, sum.length - 1, sum[i], count)
                count++
                if (count % 4 === 0 && count !== 1) {
                    console.log(count)
                    finalSum.unshift(' ')
                }
                finalSum.unshift(sum[i])
            }
            purchaseSum.textContent = `${finalSum.join('')} ₽`
        } else {
            purchaseSum.textContent = `${sum} ₽`
        }
        checkSum()
    }

    function checkSum() {
        let res = Number(purchaseSum.textContent.match(/\d/g).join(''))
        if (res > 5000) {
            pickPrice.innerHTML="бесплатно"
            courierPrice.innerHTML="бесплатно"
            postPrice.innerHTML="бесплатно"
        } else {
            pickPrice.innerHTML="199 ₽"
            courierPrice.innerHTML="399 ₽"
            postPrice.innerHTML="449 ₽"
        }
    }

    if(window.addEventListener) {
        // Normal browsers
        purchaseTable.addEventListener('DOMSubtreeModified', contentChanged, false)
    } else
    if (window.attachEvent) {
        // IE
        purchaseTable.attachEvent('DOMSubtreeModified', contentChanged)
    }

    function contentChanged() {
        formSum()
    }
    formSum()

    /* address input */

    const addressForms = document.querySelectorAll('.address')
    const addressFormClose = document.querySelectorAll('.address__close')
    const pickpoint = document.querySelector('.delivery__item_pickpoint')
    const courier = document.querySelector('.delivery__item_courier')
    const post = document.querySelector('.delivery__item_post')

    pickpoint.addEventListener('click', () => {
        addressForms[0].style.display="block"
    })

    courier.addEventListener('click', () => {
        addressForms[1].style.display="block"
    })

    post.addEventListener('click', () => {
        addressForms[1].style.display="block"
    })

    addressFormClose.forEach((item, index) => {
        item.addEventListener('click', () => {
            addressForms[index].style.display="none"
        })
    })

    /* Check all items*/

    const checkAll = document.querySelector('.checkbox_header')
    const checkAllButton = document.querySelector('.purchase__header-select')
    const itemChecker = document.querySelectorAll('.checkbox_table')

    function checkAllItems() {
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

    function checkItems() {
        let res = checkAllItems()
        console.log(res)
        if (res) {
            itemChecker.forEach(item => item.checked = false)
            checkAll.checked = false
        } 
        else {
            itemChecker.forEach(item => item.checked = true)
            checkAll.checked = true
        }
    }

    checkAll.addEventListener('click', checkItems)
    checkAllButton.addEventListener('click', checkItems)

    /* Delete items */

    const items = document.querySelectorAll('.purchase__table-row')
    const deleteButton = document.querySelector('.purchase__header-delete')

    deleteButton.addEventListener('click', () => {
        itemChecker.forEach((item, index) => {
            if (item.checked) {
                items[index].remove()
            }
        })
        checkAll.checked = false
    })
});