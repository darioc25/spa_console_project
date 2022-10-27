// Object
const ps5 = {
    // Properties
    status : false,

    // Functions
    start : function() {
        this.status = true;
    },

    shutdown : function() {
        this.status = false;
    }

}

// DOM
let turnOnBtn = document.querySelector("#turnOnBtn");
let turnOffBtn = document.querySelector("#turnOffBtn");

let menu = document.querySelector(".menu");

// Games List Buttons
let gamesListBtn = document.querySelector("#gamesListBtn");
let gamesListBackBtn = document.querySelector("#gamesListBackBtn");

// Main Wrapper Area
let startWrapper = document.querySelector(".startWrapper");
let menuWrapper = document.querySelector(".menuWrapper");
let gamesListWrapper = document.querySelector(".gamesListWrapper");


// ON/OFF Buttons
turnOnBtn.addEventListener("click", () => {
    ps5.start();
    startWrapper.classList.add("d-none");

    setTimeout(() => {
        menuWrapper.classList.remove("d-none");
    }, 1000);
});

turnOffBtn.addEventListener("click", () => {
    ps5.shutdown();
    menuWrapper.classList.add("d-none");

    setTimeout(() => {
        startWrapper.classList.remove("d-none");
    }, 1000);
});

// Games List Area
gamesListBtn.addEventListener("click", () => {
    menuWrapper.classList.add("d-none");
    gamesListWrapper.classList.remove("d-none");
});

gamesListBackBtn.addEventListener("click", () => {
    gamesListWrapper.classList.add("d-none");
    menuWrapper.classList.remove("d-none");
});






fetch("./json/products_list.json")
.then(response => response.json())
.then(data => {
    
    // Populating Wrapper
    let productsWrapper = document.querySelector(".products-wrapper");
    data.forEach(product => {
        let divCard = document.createElement("div");
        divCard.classList.add("col-12", "col-md-6", "col-lg-4", "my-4");
        divCard.innerHTML =
        `
            <div class="product-card">
                <div class="product-img">
                    <img class="img-fluid" src="../media/product_placeholder.jpg">
                    <span><p>${product.type}</p></span>
                    <button id="favorite-product-btn"><i class="fa-solid fa-thumbs-up"></i></button>
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p class="d-flex align-items-center mt-2"><i class="fa-solid fa-tag me-1"></i>${product.category}</p>
                    <p class="text-end product-price">${product.price} $</p>
                </div>
            </div>
        `;
        productsWrapper.appendChild(divCard);
    }