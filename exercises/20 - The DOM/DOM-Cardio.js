// Make a div
const div = document.createElement('div');

// add a class of wrapper to it
div.classList.add('wrapper');

// put it into the body
document.body.appendChild(div);

// make an unordered list
// add three list items with the words "one, two, three" in them
const ul = `
    <ul>
        <li>one</li>
        <li>two</li>
        <li>three</>
    </ul>
`;
// put that list into the above wrapper
div.innerHTML = ul;

// create an image
const myImg = document.createElement('img');
// set the source to an image
myImg.src = 'https://picsum.photos/500';
// set the width to 250
myImg.width = 250;
myImg.height = 250;
// add a class of cute
myImg.classList.add('cute');
// add an alt of Cute Puppy
myImg.alt = 'Cute Puppy';
// Append that image to the wrapper
div.appendChild(myImg);

// with HTML string, make a div, with two paragraphs inside of it
const myHTML = `
    <div class="myDiv">
        <p>Para one</p>
        <p>Para two</p>
    </div>
`;
const ulElement = div.querySelector('ul');
// console.log(ulElement);
// put this div before the unordered list from above
ulElement.insertAdjacentHTML('beforebegin', myHTML);

// Optional version for the above example:::::
// const myFragment = document.createRange().createContextualFragment(myHTML);

// add a class to the second paragraph called warning
const myDiv = div.querySelector('.myDiv');
// console.log(myDiv.children);
myDiv.children[1].classList.add('warning');

// remove the first paragraph
myDiv.firstElementChild.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height
function generatePlayerCard(name, age, height) {
  const html = `
        <div class="playerCard">
            <h2>${name} - ${age}</h2>
            <p>They are ${height} cm's and ${age} years old. In Dog years this person would be ${
    age * 7
  }. That would be a tall dog!</p>
  <button class="delete" type="button">&times; delete</button>
        </div>
  `;
  return html;
}

// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be an old dog!</p>
// </div>

// make a new div with a class of cards
const cards = document.createElement('div');
cards.classList.add('cards');

// make 4 player cards using generatePlayerCard
let cardsHTML = generatePlayerCard('kevin', 43, 189);
cardsHTML += generatePlayerCard('aoife', 41, 139);
cardsHTML += generatePlayerCard('tony', 52, 158);
cardsHTML += generatePlayerCard('sue', 33, 166);

// append those cards to the div
cards.innerHTML = cardsHTML;

// put the div into the DOM just before the wrapper element
div.insertAdjacentElement('beforebegin', cards);

// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
const buttons = document.querySelectorAll('.delete');

// make our delete function
function deleteCard(event) {
  //   console.log('Delete Card! Todo!');
  //   console.log(event.currentTarget);
  const btnThatGotClicked = event.currentTarget;
  btnThatGotClicked.parentElement.remove();
  // Variation below....
  //   this.parentElement.remove();
}

// loop over them and attach a listener
buttons.forEach((btn) => btn.addEventListener('click', deleteCard));
