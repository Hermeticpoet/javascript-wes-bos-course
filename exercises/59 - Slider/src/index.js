function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in.');
  }
  // create some variables for working with slider
  let current;
  let prev;
  let next;
  // slecet the elemetns needed for the slider
  const slides = slider.querySelector('.slides');
  //   console.log(slides);
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    // console.log(current);
    prev = current.previousElementSibling || slides.lastElementChild;
    // console.log(prev);
    next = current.nextElementSibling || slides.firstElementChild;
    // console.log({ current, next, prev });
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    // first strip all the classes off the current slides
    const classesToRemove = ['prev', 'current', 'next'];
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);
    if (direction === 'back') {
      // make a new array fo the new values, and destructure
      // them over and into the prev, current and next variables
      [prev, current, next] = [
        // get the prev slide, if there is none, get the last slide from the entire slider fro wrapping
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        // get the next slide or if it's at hte end, loop around and grab the first slide again
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    // reapply the classes now
    applyClasses();
  }

  // When this slider is created, run the start slider function
  startSlider();
  applyClasses();

  // Event listeners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
