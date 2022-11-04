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
    },

    installGame : function(game) {
        this.games.push(game);
    }
}

// DOM
let turnOnBtn = document.querySelector("#turnOnBtn");
let turnOffBtn = document.querySelector("#turnOffBtn");

// Installed Games Button
let installedGames = document.querySelector("#installedGames");

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
let gameShopDetailsWrapper = document.querySelector(".gameShopDetailsWrapper");
let gameShopDetails = document.querySelector(".gameShopDetails");
let gameShopDetailsBackBtn = document.querySelector("#gameShopDetailsBackBtn");
let gameInstallerBtn = document.querySelector("#gameInstallerBtn");

gameShopDetailsBackBtn.addEventListener("click", () => {
    gameShopDetailsWrapper.classList.add("d-none");
    shopCardsList.classList.remove("d-none");
});

// Capturing Shop Game Cards After DOM Loading
setTimeout(() => {
        let shopCard = document.querySelectorAll(".shopCard");
        let gameInstallerBtn = [];
        let installedFlag = [];
        shopCard.forEach((card, index) => {

            installedFlag[index] = false;

            card.addEventListener("click", () => {
                gameInstallerBtn[index] = `gameInstallerBtn${index}`;
                if(installedFlag[index] == false) {
                    gameShopDetails.innerHTML = 
                    `
                        ${card.innerHTML}
                        <button class="${gameInstallerBtn[index]} menuBtn mb-5">Install Game</button>
                        <span id="installedTag" class="bg-success text-white p-2 d-none">Installed</span>
                    `;
                    installedTag = document.querySelector("#installedTag");
                    gameInstallerBtn[index] = document.querySelector(`.gameInstallerBtn${index}`);
                    gameInstallerBtn[index].addEventListener("click", () => {
                        let game = {
                            name : card.firstElementChild.innerHTML,
                            space : parseInt(card.lastElementChild.innerHTML)
                        };
                        ps5.installGame(game);
                        ps5.memory -= game.space;
                        gameInstallerBtn[index].classList.add("d-none");
                        installedTag.classList.remove("d-none");
                        installedFlag[index] = true;
                    });
                } else {
                    gameShopDetails.innerHTML = 
                    `
                        ${card.innerHTML}
                        <span id="installedTag" class="bg-success text-white p-2">Installed</span>
                    `;
                }

                shopCardsList.classList.add("d-none");
                gameShopDetailsWrapper.classList.remove("d-none");
                console.log("Getting Info");
            });
        });
        console.log("### Nodelist Created ###");
}, 100);

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

// Installed Games
installedGames.addEventListener("click", () => {
    console.table(ps5.games);
    console.log(`Memory left ${ps5.memory}`);
});