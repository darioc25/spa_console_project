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
    }, 1000);

    console.log("Success ON");
});

turnOffBtn.addEventListener("click", () => {
    ps5.off();
    menuWrapper.classList.add("d-none");

    setTimeout(() => {
        startWrapper.classList.remove("d-none");
    }, 1000);

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

// Shop Games List From Json File
fetch("./games.json")
.then(response => response.json())
.then(data => {
    // Populating Games List
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
})