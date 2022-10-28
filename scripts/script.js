function productTemplate({ id,name, price, desc, img }) {
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
function cartItemTemplate({id, name, price, img }) {
    return `<div class="cart-item id="${id}_cart">
    <img src="${img}"></img>
    <div>
        <strong>${name}</strong>
        <div><span>Price:</span><strong>${price}$</strong></div>
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




fetch('./scripts/data.json')
    .then((response) => response.json())
    .then((json) => json.forEach(element => {
        cartItems.innerHTML += cartItemTemplate(element)
        prodGrid.innerHTML += productTemplate(element)
    }))

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('rm-item')) {
        e.target.parentElement.parentElement.remove()
    }
    else if (e.target.classList.contains('add-prod')) {
        
    }

})