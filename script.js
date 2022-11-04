// PS5 Object Model
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

// On-Off Buttons
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

// ON/OFF Logic
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

// Installed Games Section
    installedGames.addEventListener("click", () => {
        if(ps5.games.length != 0) {
            console.table(ps5.games);
            console.log(`${ps5.games.length} games installed`);
        } else {
            console.log("Empty Library");
        }
        let totalMemory = 0;
        ps5.games.forEach(game => {
            totalMemory += game.space;
        });
        console.log(`Used memory: ${totalMemory} GB`);
        console.log(`Memory left: ${ps5.memory} GB`);
    });

// Shop Area Logic
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

// Game Details Section
    let gameShopDetailsWrapper = document.querySelector(".gameShopDetailsWrapper");
    let gameShopDetails = document.querySelector(".gameShopDetails");
    let gameShopDetailsBackBtn = document.querySelector("#gameShopDetailsBackBtn");

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
                            <h1 class="text-white">${card.lastElementChild.firstElementChild.innerHTML}<h1/>
                            <h3 class="text-white">${card.lastElementChild.lastElementChild.innerHTML}<h3/>
                            <button class="${gameInstallerBtn[index]} menuBtn">Install Game</button>
                            <span id="installedTag" class="d-none">Installed</span>
                        `;
                        installedTag = document.querySelector("#installedTag");
                        gameInstallerBtn[index] = document.querySelector(`.gameInstallerBtn${index}`);
                        gameInstallerBtn[index].addEventListener("click", () => {
                            let game = {
                                name : card.lastElementChild.firstElementChild.innerHTML,
                                space : parseInt(card.lastElementChild.lastElementChild.innerHTML)
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
                            ${card.lastElementChild.innerHTML}
                            <span id="installedTag">Installed</span>
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
            gameObj.classList.add("col-12", "col-lg-6", "col-xl-4", "mb-5", "d-flex", "justify-content-center");
            gameObj.innerHTML =
                `
                    <div class="shopCard">
                        <img src="https://picsum.photos/300" class="imgCard w-100">
                        <div class="my-3 d-flex flex-column align-items-start w-100 ps-1">
                            <h1>${game.name}</h1>
                            <h3>${game.space} GB</h3>
                        </div>
                    </div>
                `;
            shopCardsList.appendChild(gameObj);
        })
    });