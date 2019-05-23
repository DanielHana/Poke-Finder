interface PokeInfo {
    types: Type[];
    id: number;
    sprites: Sprite;
    name: string;
}

interface Type {
    type: TypeName;
}

interface TypeName {
    name: string;
}

interface Sprite {
    front_default: string;
}

const apiURL:string = "https://pokeapi.co/api/v2/pokemon/";
let txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
let btnSearch = document.getElementById('btnSearch') as HTMLElement;
let btnRandom = document.getElementById('btnRandom') as HTMLElement;
let pokeInfo = document.getElementById('pokeInfo') as HTMLElement;
let animations:string[] = ["floater", "wiggle", "pulse"];

txtSearch.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        btnSearch.click();
    }
});

btnSearch.addEventListener('click', function () {
    let pokemon:string = txtSearch.value;
    pokemon = pokemon.toLowerCase();
    console.log(pokemon);
    txtSearch.value = "";
    if (pokemon != "") {
        loadJSON(pokemon);
    }
})

btnRandom.addEventListener('click', function () {
    let pokemon:string = (getRandom(807, 1)).toString();
    loadJSON(pokemon);
})

function loadJSON(pokemon:string) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiURL + pokemon, true);
    xhr.responseType = 'text';
    xhr.onload = function () {
        if (xhr.status === 200) {
            let pInfo:PokeInfo = JSON.parse(xhr.responseText);
            loadCard(pInfo);
        }
        else {
            alert("Sorry, that Pokémon does not exist.");
        }
    }
    xhr.send();
}

function getRandom(max:number, min:number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loadCard(pInfo:PokeInfo) {
    //Create new card for each pokemon
    let card:HTMLElement = document.createElement('div');
    card.className = "card fadeIn mt-5 mx-auto";
    card.style.transform = "width: 22rem";
    pokeInfo.append(card);

    let pic:HTMLImageElement = document.createElement('img');
    let cardAnim = getRandom(3, 0);

    pic.className = "img-fluid card-img-top " + animations[cardAnim];

    if (pInfo.sprites.front_default == null) {
        pic.src = 'images/noImage.png';
    } else {
        pic.src = pInfo.sprites.front_default;
    }
    card.append(pic);

    let cardBody:HTMLElement = document.createElement('div');
    cardBody.className = "card-body fadeIn";
    card.append(cardBody);

    let myName:HTMLElement = document.createElement('h2');
    myName.className = "card-text font-weight-bold fadeIn"
    myName.textContent = pInfo.name;
    cardBody.append(myName);

    let typeTitle:HTMLElement = document.createElement('h4');
    typeTitle.className = "card-text fadeIn"
    typeTitle.textContent = "Type(s): ";
    cardBody.append(typeTitle);

    for (let i:number = 0; i < pInfo.types.length; i++) {
        let myType:HTMLElement = document.createElement('h4');
        myType.className = "card-text font-weight-bold"
        myType.textContent = pInfo.types[i].type.name;
        cardBody.append(myType);
    }

    let pokeId:HTMLElement = document.createElement('h4');
    pokeId.className = "card-text my-1"
    pokeId.textContent = "PokéID: " + pInfo.id;
    cardBody.append(pokeId);

    let removeBtn:HTMLElement = document.createElement('div');
    removeBtn.className = "btn mt-1 btn-primary";
    removeBtn.textContent = "Remove";
    cardBody.append(removeBtn);
    removeBtn.addEventListener('click', function () {
        card.className = "zoomerOut"
        setTimeout(function () {
            card.remove();
         }, 600);
    })
}