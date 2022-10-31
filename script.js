// Object
const ps5 = {
    // Properties
    status : false,

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

// Games List Buttons
let gamesListBtn = document.querySelector("#gamesListBtn");
let gamesListBackBtn = document.querySelector("#gamesListBackBtn");

// Main Wrapper Area
let startWrapper = document.querySelector(".startWrapper");
let menuWrapper = document.querySelector(".menuWrapper");
let gamesListWrapper = document.querySelector(".gamesListWrapper");

// ON/OFF Buttons
turnOnBtn.addEventListener("click", () => {
    ps5.on();
    startWrapper.classList.add("d-none");

    setTimeout(() => {
        menuWrapper.classList.remove("d-none");
    }, 1000);
});

turnOffBtn.addEventListener("click", () => {
    ps5.off();
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

// Games Input From Json File
fetch("./games.json")
.then(response => response.json())
.then(data => {
    // Populating Games List
    data.forEach(game => {
        let gameObj = document.createElement("div");
        gameObj.classList.add("col-12", "col-md-6", "col-lg-4", "my-2");
        gameObj.innerHTML =
        `
            <h1 class="text-white">${game.name}</h1>
            <h3 class="text-white">${game.space} GB</h3>
        `;
        gamesListWrapper.appendChild(gameObj);
    })
})