document.addEventListener('click', function (e) {

    if (e.target.classList.contains('counter-plus')) {
        const qtty = e.target.previousElementSibling
        qtty.innerText = eval(qtty.innerText+"+1")

    }
    else if (e.target.classList.contains('counter-minus')) {
        const qtty = e.target.nextElementSibling
        if (qtty.innerText > "0") {
            qtty.innerText = eval(qtty.innerText+"-1")
        }
    }
})



