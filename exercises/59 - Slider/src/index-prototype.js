function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in.');
  }

  // create some variables for working with slider -
  // NO LONGER NEEDED TO MAKE VARIABLE PROPERTIES AS CAN BE ADDED ANY TIME
  // this.current;
  // this.prev;
  // this.next;

  // slecet the elements needed for the slider
  this.slider = slider;
  this.slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  // When this slider is created, run the start slider function
  this.startSlider();
  this.applyClasses();

  // Event listeners
  prevButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function () {
  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  // console.log(current);
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  // console.log(prev);
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
  // console.log({ current, next, prev });
};

Slider.prototype.applyClasses = function () {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

Slider.prototype.move = function (direction) {
  // first strip all the classes off the current slides
  const classesToRemove = ['prev', 'current', 'next'];
  this.prev.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);
  if (direction === 'back') {
    // make a new array fo the new values, and destructure
    // them over and into the prev, current and next variables
    [this.prev, this.current, this.next] = [
      // get the prev slide, if there is none, get the last slide from the entire slider fro wrapping
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      // get the next slide or if it's at hte end, loop around and grab the first slide again
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  // reapply the classes now
  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') {
    mySlider.move();
    dogSlider.move();
  }
  if (e.key === 'ArrowLeft') {
    mySlider.move('back');
    dogSlider.move('back');
  }
});
