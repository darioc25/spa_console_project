// PS5 Object Model
    const ps5 = {
        // Properties
        status : false,

        memory : 825,

        friends : [],

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
    let gamesLibraryBackBtn = document.querySelector("#gamesLibraryBackBtn");

// Shop Buttons
    let shopBtn = document.querySelector("#shopBtn");
    let shopBackBtn = document.querySelector("#shopBackBtn");

// Friends Buttons
    let friendsListBtn = document.querySelector("#friendsListBtn");
    let friendsListBackBtn = document.querySelector("#friendsListBackBtn");
    let addFriendBtn = document.querySelector(".addFriendBtn");

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
        console.log("### Nodelist Created ###");
        let installedFlag = [];
        shopCard.forEach((card, index) => {
            installedFlag[index] = false;
            card.addEventListener("click", () => {
                if(installedFlag[index] == false) {
                    gameShopDetails.innerHTML =
                    `
                        <h1 class="text-white">${card.lastElementChild.firstElementChild.innerHTML}<h1/>
                        <h3 class="text-white">${card.lastElementChild.lastElementChild.innerHTML}<h3/>
                        <button id="installBtn" class="menuBtn">Install Game</button>
                        <button id="deleteBtn" class="menuBtn text-white bg-danger d-none">Delete</button>
                        <span id="installedTag" class="d-none">Installed</span>
                    `;
                } else {
                    gameShopDetails.innerHTML = 
                    `
                        <h1 class="text-white">${card.lastElementChild.firstElementChild.innerHTML}<h1/>
                        <h3 class="text-white">${card.lastElementChild.lastElementChild.innerHTML}<h3/>
                        <button id="installBtn" class="menuBtn d-none">Install Game</button>
                        <button id="deleteBtn" class="menuBtn text-white bg-danger">Delete</button>
                        <span id="installedTag">Installed</span>
                    `;
                }
                // Install Tag
                    installedTag = document.querySelector("#installedTag");
                // Install Button
                    installBtn = document.querySelector("#installBtn");
                    installBtn.addEventListener("click", () => {
                        let game = {
                            name : card.lastElementChild.firstElementChild.innerHTML,
                            space : parseInt(card.lastElementChild.lastElementChild.innerHTML)
                        };
                        ps5.installGame(game);
                        ps5.memory -= game.space;
                        installBtn.classList.add("d-none");
                        deleteBtn.classList.remove("d-none");
                        installedTag.classList.remove("d-none");
                        installedFlag[index] = true;
                    });
                // Delete Button
                    deleteBtn = document.querySelector("#deleteBtn");
                    deleteBtn.addEventListener("click", () => {
                        ps5.games.forEach(game => {
                            if(game.name == card.lastElementChild.firstElementChild.innerHTML) {
                                ps5.games.splice(ps5.games.indexOf(game), 1);
                                ps5.memory += game.space;
                            }
                        });
                        deleteBtn.classList.add("d-none");
                        installedTag.classList.add("d-none");
                        installBtn.classList.remove("d-none");
                        installedFlag[index] = false;
                    });
                    shopCardsList.classList.add("d-none");
                    gameShopDetailsWrapper.classList.remove("d-none");
                    console.log("Getting Info");
            });
        });
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
                    <img src="https://cdn.dribbble.com/users/4224295/screenshots/14701782/ps5-02.png" class="imgCard w-100">
                    <div class="my-3 d-flex flex-column align-items-start w-100 ps-1">
                        <h1>${game.name}</h1>
                        <h3>${game.space} GB</h3>
                    </div>
                </div>
            `;
            shopCardsList.appendChild(gameObj);
        })
    });

// Games Library Section
    let gamesLibraryWrapper = document.querySelector(".gamesLibraryWrapper");
    let gamesLibraryList = document.querySelector(".gamesLibraryList");

    installedGames.addEventListener("click", () => {
        menuWrapper.classList.add("d-none");
        gamesLibraryWrapper.classList.remove("d-none");
        if(ps5.games.length == 0) {
            gamesLibraryList.innerHTML = 
            `
                <h1 class="text-white text-center">Empty library</h1>
            `;
        } else {
            gamesLibraryList.innerHTML = "";
            ps5.games.forEach(game => {
                gamesLibraryCard = document.createElement("div");
                gamesLibraryCard.classList.add("col-12", "gamesLibraryCard");
                gamesLibraryCard.innerHTML =
                `
                    <h1 class="text-center">${game.name}</h1>
                `;
                gamesLibraryList.appendChild(gamesLibraryCard);
            });
        }
        console.log("Enter library");
    });

    gamesLibraryBackBtn.addEventListener("click", () => {
        menuWrapper.classList.remove("d-none");
        gamesLibraryWrapper.classList.add("d-none");
    });

// Friends list
    let friendsListWrapper = document.querySelector(".friendsListWrapper");
    let friendsList = document.querySelector(".friendsList");
    let inputAddFriend = document.querySelector(".inputAddFriend");
    let inputAllert = document.querySelector(".inputAllert");

    friendsListBtn.addEventListener("click", () => {
            menuWrapper.classList.add("d-none");
            friendsListWrapper.classList.remove("d-none");
        });

    friendsListBackBtn.addEventListener("click", () => {
        inputAllert.classList.add("d-none");
        friendsListWrapper.classList.add("d-none");
        menuWrapper.classList.remove("d-none");
    });

    addFriendBtn.addEventListener("click", () => {
        if(inputAddFriend.value != "") {
            inputAllert.classList.add("d-none");
            ps5.friends.push(inputAddFriend.value);
            inputAddFriend.value = "";
            console.log(ps5.friends);
            friendsList.innerHTML = "";
            ps5.friends.forEach((friend, index) => {
                let newFriend = document.createElement("div");
                newFriend.classList.add("col-12", "col-md-6", "col-lg-4", "col-xxl-3", "py-3", "d-flex", "justify-content-center");
                newFriend.innerHTML =
                `
                    <div class="friendCard">
                        <img src="https://picsum.photos/30${index}">
                        <h2 class="position-absolute friendCardTitle">${friend} <span><i class="bi bi-people-fill"></i></span></h2>
                    </div>
                `;
                friendsList.appendChild(newFriend);
            });
        } else {
            inputAllert.classList.remove("d-none");
        }
    });