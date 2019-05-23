"use strict";
var apiURL = "https://pokeapi.co/api/v2/pokemon/";
var txtSearch = document.getElementById('txtSearch');
var btnSearch = document.getElementById('btnSearch');
var btnRandom = document.getElementById('btnRandom');
var pokeInfo = document.getElementById('pokeInfo');
var animations = ["floater", "wiggle", "pulse"];
txtSearch.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        btnSearch.click();
    }
});
btnSearch.addEventListener('click', function () {
    var pokemon = txtSearch.value;
    pokemon = pokemon.toLowerCase();
    console.log(pokemon);
    txtSearch.value = "";
    if (pokemon != "") {
        loadJSON(pokemon);
    }
});
btnRandom.addEventListener('click', function () {
    var pokemon = (getRandom(807, 1)).toString();
    loadJSON(pokemon);
});
function loadJSON(pokemon) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiURL + pokemon, true);
    xhr.responseType = 'text';
    xhr.onload = function () {
        if (xhr.status === 200) {
            var pInfo = JSON.parse(xhr.responseText);
            loadCard(pInfo);
        }
        else {
            alert("Sorry, that Pokémon does not exist.");
        }
    };
    xhr.send();
}
function getRandom(max, min) {
    /*Gets a random pokemon from the first ~800 on the list
    (There are more than 800 but their order is a bit strange, as in
    randomly placed in the thousands. deoxys-attack, for example, has
    an ID of 10,001*/
    return Math.floor(Math.random() * (max - min)) + min;
}
function loadCard(pInfo) {
    //Create new card for each pokemon
    var card = document.createElement('div');
    card.className = "card fadeIn mt-5 mx-auto";
    card.style.transform = "width: 22rem";
    pokeInfo.append(card);
    var pic = document.createElement('img');
    var cardAnim = getRandom(3, 0);
    //Add random animation to card 
    pic.className = "img-fluid card-img-top " + animations[cardAnim];
    if (pInfo.sprites.front_default == null) {
        pic.src = 'images/noImage.png';
    }
    else {
        pic.src = pInfo.sprites.front_default;
    }
    card.append(pic);
    var cardBody = document.createElement('div');
    cardBody.className = "card-body fadeIn";
    card.append(cardBody);
    var myName = document.createElement('h2');
    myName.className = "card-text font-weight-bold fadeIn";
    myName.textContent = pInfo.name;
    cardBody.append(myName);
    var typeTitle = document.createElement('h4');
    typeTitle.className = "card-text fadeIn";
    typeTitle.textContent = "Type(s): ";
    cardBody.append(typeTitle);
    for (var i = 0; i < pInfo.types.length; i++) {
        var myType = document.createElement('h4');
        myType.className = "card-text font-weight-bold";
        myType.textContent = pInfo.types[i].type.name;
        cardBody.append(myType);
    }
    var pokeId = document.createElement('h4');
    pokeId.className = "card-text my-1";
    pokeId.textContent = "PokéID: " + pInfo.id;
    cardBody.append(pokeId);
    var removeBtn = document.createElement('div');
    removeBtn.className = "btn mt-1 btn-primary";
    removeBtn.textContent = "Remove";
    cardBody.append(removeBtn);
    removeBtn.addEventListener('click', function () {
        card.className = "zoomerOut";
        //Timeout gives deletion animation time to play
        setTimeout(function () {
            card.remove();
        }, 600);
    });
}
//# sourceMappingURL=typescript.js.map