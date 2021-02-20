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

    /* product counter */

    const minus = document.querySelectorAll('.purchase__table-count-minus')
    const itemCount = document.querySelectorAll('.purchase__table-count-figure')
    const plus = document.querySelectorAll('.purchase__table-count-plus')

    function figureChecker(index) {
        if (Number(itemCount[index].textContent) > 0) {
            return true
        } else {
            return false
        }
    }

    minus.forEach((item, index) => {
        item.addEventListener('click', () => {
            const check = figureChecker(index)
            if (check) {
                itemCount[index].textContent = Number(itemCount[index].textContent) - 1
                formSum()
            }
        })
    })

    plus.forEach((item, index) => {
        item.addEventListener('click', () => {
            itemCount[index].textContent = Number(itemCount[index].textContent) + 1
            formSum()
        })
    })

    /* item sum and delivery cost */

    const itemPrice = document.querySelectorAll('.purchase__table-price_actual')
    const itemElemSum = document.querySelectorAll('.purchase__table-sum-figure')
    const purchaseSum = document.querySelector('.purchase__table-sum-figure_checkout')

    const pickPrice = document.querySelector('.delivery__item-price_pickpoint')
    const courierPrice = document.querySelector('.delivery__item-price_courier')
    const postPrice = document.querySelector('.delivery__item-price_post')
    

    function formSum() {
        /* item sum */

        const itemsSum = document.querySelectorAll('.purchase__table-sum-figure')
        let itemSum = []
        itemPrice.forEach((item, index) => {
            itemSum[index] = Number(item.textContent.match(/\d/g).join('') * Number(itemCount[index].textContent))
        })
        itemSum.forEach((item, index) => {
            if (String(item).length > 3) {
                item = String(item).split('')
                let finalItemSum = []
                let itemCount = 0
                for (let i = item.length - 1; i >= 0; i--) {
                    itemCount++
                    if (itemCount % 4 === 0 && itemCount !== 1) {
                        finalItemSum.unshift(' ')
                    }
                    finalItemSum.unshift(item[i])
                }
                itemElemSum[index].textContent = `${finalItemSum.join('')} ₽`
            } else {
                itemElemSum[index].textContent = `${item} ₽`
            }    
        })

        /* final sum */
        
        let sum = 0
        itemsSum.forEach(item => {
            sum = sum + Number(item.textContent.match(/\d/g).join(''))
        })
        if (String(sum).length > 3) {
            sum = String(sum).split('')
            let finalSum = []
            let count = 0
            for (let i = sum.length - 1; i >= 0; i--) {
                count++
                if (count % 4 === 0 && count !== 1) {
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

    formSum()

    /* address input */

    const addressForm = document.querySelector('.address')
    const addressFormClose = document.querySelector('.address__close')
    const pickpoint = document.querySelector('.delivery__item_pickpoint')
    const courier = document.querySelector('.delivery__item_courier')
    const post = document.querySelector('.delivery__item_post')

    function showAdress(result) {
        alert(`Название: ${result.name}, Адрес: ${result.address} Тарифная зона: ${result.zone} Коэффициент: ${result.coeff}`)
    }

    pickpoint.addEventListener('click', () => {
        PickPoint.open(showAdress, {fromcity:'Москва'});
        return false
    })

    courier.addEventListener('click', () => {
        addressForm.style.display="block"
    })

    post.addEventListener('click', () => {
        addressForm.style.display="block"
    })

    addressFormClose.addEventListener('click', () => {
        addressForm.style.display="none"
    })

    /* check all items*/

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

    /* delete items */

    const items = document.querySelectorAll('.purchase__table-row')
    const deleteButton = document.querySelector('.purchase__header-delete')

    deleteButton.addEventListener('click', () => {
        itemChecker.forEach((item, index) => {
            if (item.checked) {
                items[index].remove()
            }
        })
        checkAll.checked = false
        formSum()
    })
});