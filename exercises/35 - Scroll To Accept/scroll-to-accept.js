const terms = document.querySelector('.terms-and-conditions');
const watch = document.querySelector('.watch');
const button = document.querySelector('.accept');

function obCallback(payload) {
  if (payload[0].intersectionRatio === 1) {
    button.disabled = false;
    // stop observing the button
    ob.unobserve(terms.lastElementChild);
  }
}

const ob = new IntersectionObserver(obCallback, {
  root: terms,
  threshold: 1,
});

// This will wait & observe for last paragraph element on the page
ob.observe(terms.lastElementChild);

// terms.addEventListener('scroll', (e) => {
//   //   console.log(e);
// });

// // If there are NO T's & C's on the page you can set up all your code within a Function
// // to deal with this scenario - best practice::::

// function scrollToEvent() {
//   // All of above code would go in here...

//   if (!terms) {
//     // quit this function as not needed...
//   }
// }
