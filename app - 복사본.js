let cards = [];
let filteredCards = [];
let current = 0;

async function loadCards(){

    const response =
    await fetch("cards.json");

    cards =
    await response.json();

    filteredCards = cards;

    render();
}

function render(){

    if(filteredCards.length===0){

        document.getElementById("question")
        .innerText =
        "검색 결과 없음";

        return;
    }

    const card =
    filteredCards[current];

    document.getElementById("question")
    .innerText =
    card.question;

    document.getElementById("answer")
    .innerText =
    card.answer;

    document.getElementById("source")
    .innerText =
    "출처 : " + card.source;

    document
    .getElementById("flashcard")
    .classList
    .remove("flipped");
}

function flipCard(){

    document
    .getElementById("flashcard")
    .classList
    .toggle("flipped");
}

function nextCard(){

    if(filteredCards.length===0)
    return;

    current =
    (current + 1)
    %
    filteredCards.length;

    render();
}

document
.getElementById("question")
.addEventListener(
"input",
function(){

    document
    .getElementById("previewQuestion")
    .innerText =
    this.value || "질문 입력";

});

document
.getElementById("answer")
.addEventListener(
"input",
function(){

    document
    .getElementById("previewAnswer")
    .innerText =
    this.value || "정답 입력";

});

document
.getElementById("source")
.addEventListener(
"input",
function(){

    document
    .getElementById("previewSource")
    .innerText =
    this.value || "출처 입력";

});

function prevCard(){

    if(filteredCards.length===0)
    return;

    current =
    (
    current - 1 +
    filteredCards.length
    )
    %
    filteredCards.length;

    render();
}

function randomCard(){

    if(filteredCards.length===0)
    return;

    current =
    Math.floor(
        Math.random()
        *
        filteredCards.length
    );

    render();
}

document
.getElementById("search")
.addEventListener(
"input",
function(){

    const keyword =
    this.value
    .toLowerCase();

    filteredCards =
    cards.filter(card=>

        card.question
        .toLowerCase()
        .includes(keyword)

        ||

        card.answer
        .toLowerCase()
        .includes(keyword)

        ||

        card.source
        .toLowerCase()
        .includes(keyword)

    );

    current = 0;

    render();

});

loadCards();