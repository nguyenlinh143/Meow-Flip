

//grab a coubple of things
const section = document.querySelector('section')
const playLivesCount = document.querySelector('span')
let playerLives = 8;

//Linked text
playLivesCount.textContent = playerLives

//generate data
const getData = () => [

    { imgSrc: "./images/1.png", name: '1' },
    { imgSrc: "./images/2.png", name: '2' },
    { imgSrc: "./images/3.png", name: '3' },
    { imgSrc: "./images/4.png", name: '4' },
    { imgSrc: "./images/5.png", name: '5' },
    { imgSrc: "./images/6.png", name: '6' },
    { imgSrc: "./images/7.png", name: '7' },
    { imgSrc: "./images/8.png", name: '8' },
    { imgSrc: "./images/1.png", name: '1' },
    { imgSrc: "./images/2.png", name: '2' },
    { imgSrc: "./images/3.png", name: '3' },
    { imgSrc: "./images/4.png", name: '4' },
    { imgSrc: "./images/5.png", name: '5' },
    { imgSrc: "./images/6.png", name: '6' },
    { imgSrc: "./images/7.png", name: '7' },
    { imgSrc: "./images/8.png", name: '8' },

]

//randomize data
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    // console.log(cardData);
    return cardData
};
//randomize()

//card generator function
const cardGenerator = () => {
    const cardData = randomize();
    //console.log(cardData);
    //generate the html

    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //attach the info to the card
        face.src = item.imgSrc;
        card.setAttribute('name', item.name) //add name vao cards
        //attach the cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        })
    })
};

//check card
const checkCards = (e) => {
    console.log(e)
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll('.toggleCard')
    console.log(flippedCards);
    //logic
    if (flippedCards.length === 2) {
        if (
            flippedCards[0].getAttribute('name') ===
            flippedCards[1].getAttribute('name')
        ) {
            console.log('match');
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        } else {
            console.log('wrong');
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1000)
            });
            playerLives--;
            playLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("So close! Your claws missed the edge. Maybe Linh knows the trick. ");
            }
        }
        //run a check when won
        if (toggleCard.length === 16) {
            restart('Congrats! The cat approves !')
        }
    }
};

//restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none'
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        //randomize + delay?
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all'
        }, 1000)

    })
    playerLives = 8;
    playLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
}

cardGenerator();
var x = document.getElementById("myAudio");
x.play();

