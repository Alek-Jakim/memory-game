document.addEventListener('DOMContentLoaded', () => {

    const cardArr = [
        {
            name: 'fries',
            img: 'img/fries.png'
        },
        {
            name: 'fries',
            img: 'img/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'img/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'img/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'img/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'img/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'img/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'img/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'img/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'img/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'img/pizza.png'
        },
        {
            name: 'pizza',
            img: 'img/pizza.png'
        }
    ];

    cardArr.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid');
    const resultDisplay = document.getElementById('result');
    let cardsChosen = [];
    let cardsChosenID = [];
    let cardsWon = [];
    let cardsLost = [];
    let attemptsRemaining = parseInt(document.getElementById('attempts').textContent);
    const msgContainer = document.querySelector('.msg');
    let correctMatchMsg = 'Correct Match!';
    let wrongMatchMsg = 'Wrong! Try Again!';
    let winMsg = 'Congratulations! You Won';
    let lostMsg = 'You Lost! Better Memory Next Time!';

    const createBoard = () => {
        for (let i = 0; i < cardArr.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'img/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }


    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneID = cardsChosenID[0];
        const optionTwoID = cardsChosenID[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            // alert('Your cards match!')
            cards[optionOneID].setAttribute('src', 'img/white.png');
            cards[optionTwoID].setAttribute('src', 'img/white.png');
            cardsWon.push(cardsChosen)
            msgContainer.innerHTML = `<h3>${correctMatchMsg}</h3>`
        } else {
            cards[optionOneID].setAttribute('src', 'img/blank.png');
            cards[optionTwoID].setAttribute('src', 'img/blank.png');
            msgContainer.innerHTML = `<h3>${wrongMatchMsg}</h3>`
            cardsLost.push(cardsChosen);
            let lost = attemptsRemaining -= 1;
            document.getElementById('attempts').textContent = lost

            if (lost === 0) {
                location.reload();
            }
        }



        cardsChosen = [];
        cardsChosenID = [];
        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === (cardArr.length / 2)) {
            msgContainer.innerHTML = `<h2>${winMsg}</h2>`
            setTimeout(() => {
                location.reload()
            }, 3000)
        }
    }


    function flipCard() {
        let cardID = this.getAttribute('data-id');
        cardsChosen.push(cardArr[cardID].name);
        cardsChosenID.push(cardID);
        this.setAttribute('src', cardArr[cardID].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard();
})
