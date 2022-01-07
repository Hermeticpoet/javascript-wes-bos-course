console.log('it works!');

const item = document.querySelector('.item');

const width = 400;
const src = `https://picsum.photos/${width}`;
const desc = `Cute Pup`;
const myHTML = `
    <div class="wrapper>
        <h2>${desc}</h2>
        <img src="${src}" alt="${desc}" />
    </div>
`;

item.innerHTML = myHTML;

console.log(item.innerHTML);
