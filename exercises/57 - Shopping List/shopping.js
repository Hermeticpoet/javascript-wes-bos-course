const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need an array to hold our state!
let items = [];

// listen for submit event on the form
function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  // If its empty then don't submit it
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  // Push the items into our state
  items.push(item);
  // Clear the form
  e.target.reset();
  // fire off a custom event that will tell anyone who cares
  // that the items have been updated!
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  console.log(items);
  const html = items
    .map(
      (item) => `<li class="shopping-item">
      <input value="${item.id}" 
      type="checkbox"
      ${item.complete ? 'checked' : ''}>
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}"
      value="${item.id}">&times;</button>
  </li>`
    )
    .join('');
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  //   console.info('Saving items t0 localStorage');
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  // console.info('items restored from local storage');
  // Pull the items from Local Storage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // lsItems.forEach(item => items.push(item)); Alternative way to loop over and push each item into the array
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  // console.log('Deleting Item: ', id);
  // update our items array without this one
  items = items.filter((item) => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  // console.log('Marking as complete');
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event Delegation: We listen for the click on the list <ul>
// but then delegate the click voer to the button if that is what was clicked
list.addEventListener('click', (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
