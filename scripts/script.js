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

let jsonData = []



fetch('./scripts/data.json')
    .then((response) => response.json())
    .then((json) => json.forEach((item) => {
        jsonData.push(item)
    })).then(() => {

        jsonData.forEach((item) => {

            // cartItems.innerHTML += cartItemTemplate(item)
            prodGrid.innerHTML += productTemplate(item)
        })
    }

    )

// function ContainsId(id,parent) {
//     for (const child of parent.children) {
//         if (child.id == id) {
//                 return true
//         }
//     }    
//     return false
// }


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('rm-item')) {
        e.target.parentElement.parentElement.remove()
    }
    else if (e.target.classList.contains('add-prod')) {
        let selectedId = e.target.parentElement.parentElement.id
        jsonData.forEach((item)=> {
            if(item.id==selectedId){
                let existed = cartItems.querySelector(`#${selectedId}_cart`)
                if (existed) {
                    console.log("already exists")
                    let qtty = existed.querySelector(".counter-count")
                    qtty.textContent = eval(qtty.textContent+"+1")
                }else{
                    console.log("added")
                    cartItems.innerHTML += cartItemTemplate(item)
                }

            }
        })
        console.log(selectedId);

    }

})