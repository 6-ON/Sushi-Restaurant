function productTemplate({ id, name, price, desc, img }) {
    return `<div class="product-card" id="${id}" >
    <div class="img-mask">
        <img src="${img}" alt="" srcset="">
    </div>
    <div class="prod-desc">
        <h4>${name}</h4>
        <p>${desc}</p>
    </div>
    <div class="prod-price">
        <strong>${price}$</strong>
        <i class="fa-regular fa-plus add-prod"></i>
    </div>
    </div>`
}
function cartItemTemplate({ id, name, price, img }) {
    return `<div class="cart-item " id="${id}_cart">
    <img src="${img}"></img>
    <div>
        <strong>${name}</strong>
        <div><span>Price:</span><strong class="item-price">${price}$</strong></div>
    </div>
    <div class="op-item">
        <div class="counter counter-small">
            <i class="fa-solid fa-minus counter-minus"></i>
            <span class="counter-count">1</span>
            <i class="fa-solid fa-plus counter-plus"></i>
        </div>
        <div class="rm-item" >
            <i class="fa-solid fa-x text-danger"></i><span> Remove</span>
        </div>
    </div>
    </div>`
}

let cats = {
    "cat-0": false,
    "cat-1": false,
    "cat-2": false,
    "cat-3": false,
    "cat-4": false
}



let prodGrid = document.querySelector(".prod-grid")
let cartItems = document.querySelector(".cart-items")

let categories = document.querySelector(".categories")


function reloadProducts() {
    if (new Set(Object.values(cats)).size == 1 ) {
        loadAllProducts()
    } else {
        for (const category of Object.keys(cats).filter((cat)=>{return cats[cat]===true})) {
            loadProductsCategory(category)
        }
    }
}



let jsonData = {}

function loadProductsCategory(category) {
    jsonData[category].forEach((item) => {
        prodGrid.innerHTML += productTemplate(item)
    })
}
function loadAllProducts() {
    for (const category in jsonData) {
        loadProductsCategory(category)
    }
}

fetch('./scripts/data1.json')
    .then((response) => response.json())
    .then((json) => jsonData = json).then(() => {
        loadAllProducts()

    }).then(() => {
        for (const cat of categories.children) {
            cat.addEventListener("click", (e) => {
                let selected = " cat-chip-selected"
                clearChilds(prodGrid)
                if (cat.className.endsWith(selected)) {

                    cat.className = cat.className.replace(selected, '')
                    cats[cat.id] = false
                } else {
                    cats[cat.id] = true
                    cat.className += selected
                }
                reloadProducts()

            })
        }
    })


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('rm-item')) {
        e.target.parentElement.parentElement.remove()
    }
    else if (e.target.classList.contains('add-prod')) {
        let selectedId = e.target.parentElement.parentElement.id

        for (const category in jsonData) {
            jsonData[category].forEach((item) => {
                if (item.id == selectedId) {
                    let existed = cartItems.querySelector(`#${selectedId}_cart`)
                    if (existed) {
                        let qtty = existed.querySelector(".counter-count")
                        qtty.textContent = eval(qtty.textContent + "+1")
                    } else {
                        cartItems.innerHTML += cartItemTemplate(item)
                    }

                }
            })
        }

    } else if (e.target.id == "btn-validate") {
        if (cartItems.childElementCount == 0) {
            alert("empty")
        } else {
            let res = "0.00"
            cartItems.childNodes.forEach((item) => {
                let qtty = item.querySelector(".counter-count").textContent
                let price = parseFloat(item.querySelector(".item-price").textContent)
                res = eval(res + `+ ${qtty} * ${price}`)

            })
            alert(res)
            clearChilds(cartItems)
        }

    } else if (e.target.id == "btn-reset") {
        clearChilds(cartItems)
    }

})

function clearChilds(parent) {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild)
    }
}
