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
    sushi: false,
    sea_food: false,
    salade: false,
    soupes: false,
    dessert: false
}



let prodGrid = document.querySelector(".prod-grid")
let cartItems = document.querySelector(".cart-items")

let categories = document.querySelector(".categories")



for (const cat of categories.children) {
    cat.addEventListener("click", (e) => {
        let selected = " cat-chip-selected"
        if (cat.className.endsWith(selected)) {
            cat.className = cat.className.replace(selected, '')
        } else {
            cat.className += selected
        }

    })
}

let jsonData = {}



fetch('./scripts/data1.json')
    .then((response) => response.json())
    .then((json) => jsonData=json).then(() => {
        // console.log(jsonData)
        for(const category in jsonData){
            jsonData[category].forEach((item)=>{
                prodGrid.innerHTML += productTemplate(item)
            })
        }

    }

    )
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('rm-item')) {
        e.target.parentElement.parentElement.remove()
    }
    else if (e.target.classList.contains('add-prod')) {
        let selectedId = e.target.parentElement.parentElement.id

        for(const category in jsonData){
            jsonData[category].forEach((item)=>{
                if (item.id == selectedId) {
                    let existed = cartItems.querySelector(`#${selectedId}_cart`)
                    if (existed) {
                        console.log("already exists")
                        let qtty = existed.querySelector(".counter-count")
                        qtty.textContent = eval(qtty.textContent + "+1")
                    } else {
                        console.log("added")
                        cartItems.innerHTML += cartItemTemplate(item)
                    }
    
                }
            })
        }

    } else if (e.target.id == "btn-validate") {
        if (cartItems.childElementCount==0) {
            alert("empty")
        } else {
            let res = "0.00"
            console.log(cartItems.childNodes)
            cartItems.childNodes.forEach((item) => {
                let qtty = item.querySelector(".counter-count").textContent
                let price = parseFloat(item.querySelector(".item-price").textContent)
                res = eval( res + `+ ${qtty} * ${price}`)
                
            })
            alert(res)
            clearCart()
        }

    } else if (e.target.id == "btn-reset") {
        clearCart()
    }


})

function clearCart() {
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
}
