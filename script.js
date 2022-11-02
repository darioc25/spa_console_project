// Object
const ps5 = {
    // Properties
    status : false,

    memory : 825,

    games: [],

    // Functions
    on : function() {
        this.status = true;
    },

    off : function() {
        this.status = false;
    }
}

// DOM
let turnOnBtn = document.querySelector("#turnOnBtn");
let turnOffBtn = document.querySelector("#turnOffBtn");

// Shop Buttons
let shopBtn = document.querySelector("#shopBtn");
let shopBackBtn = document.querySelector("#shopBackBtn");

// Main Wrapper Area
let startWrapper = document.querySelector(".startWrapper");
let menuWrapper = document.querySelector(".menuWrapper");
let shopWrapper = document.querySelector(".shopWrapper");

// Shop Cards List
let shopCardsList = document.querySelector(".shopCardsList");

// ON/OFF Buttons
turnOnBtn.addEventListener("click", () => {
    ps5.on();
    startWrapper.classList.add("d-none");
    setTimeout(() => {
        menuWrapper.classList.remove("d-none");
    }, 1);
    console.log("Success ON");
});

turnOffBtn.addEventListener("click", () => {
    ps5.off();
    menuWrapper.classList.add("d-none");
    setTimeout(() => {
        startWrapper.classList.remove("d-none");
    }, 1);
    console.log("Success OFF");
});

// Shop Area
shopBtn.addEventListener("click", () => {
    menuWrapper.classList.add("d-none");
    shopWrapper.classList.remove("d-none");
    console.log("Enter Shop");
});

shopBackBtn.addEventListener("click", () => {
    shopWrapper.classList.add("d-none");
    menuWrapper.classList.remove("d-none");
    console.log("Left Shop");
});

// Game Shop Details
let gameShopDetails = document.querySelector(".gameShopDetails");
let gameShopDetailsBackBtn = document.querySelector("#gameShopDetailsBackBtn");

gameShopDetailsBackBtn.addEventListener("click", () => {
    gameShopDetails.classList.add("d-none");
    gameShopDetailsBackBtn.classList.add("d-none");
    shopCardsList.classList.remove("d-none");
});

// Shop Games List From Json File
fetch("./shop.json")
.then(response => response.json())
.then(data => {
    // Populating Shop List
    data.forEach(game => {
        let gameObj = document.createElement("div");
        gameObj.classList.add("col-12", "col-lg-6", "col-xl-4", "mb-4");
        gameObj.innerHTML =
            `
                <div class="shopCard">
                    <h1 class="text-white">${game.name}</h1>
                    <h3 class="text-white">${game.space} GB</h3>
                </div>
            `;
        shopCardsList.appendChild(gameObj);
    })
});

// Capturing Shop Game Cards After DOM Loading
setTimeout(() => {
        let shopCard = document.querySelectorAll(".shopCard");
        shopCard.forEach((card) => {
            card.addEventListener("click", () => {
                gameShopDetails.innerHTML = 
                `
                    ${card.innerHTML}
                `;
                shopCardsList.classList.add("d-none");
                gameShopDetails.classList.remove("d-none");
                gameShopDetailsBackBtn.classList.remove("d-none");
                console.dir("Getting Info");
            });
        });
        console.log("### Nodelist Created ###");
}, 100);