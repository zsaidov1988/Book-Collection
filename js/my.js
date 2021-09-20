
//==============Variables=========================
let bookCollection = ["Sarob", "Qismat", "Taqdir", "JS dasturchi", "Hello World", "Qoya"]; //Declare array of books with initial values
let isDeletedItem = false; // This variable indicates is there checked items for deleting
let isNotFoundBook = false;


//================Elements=====================

let elFormAdd = document.querySelector('.form-add'); // Form for adding new books
let elBookName = elFormAdd.querySelector('.input-name-js'); // Input for new book name
let elCheck = elFormAdd.querySelector('.check-js');
let messageBox = elFormAdd.querySelector('.message-js'); // Element for caution when new book is already exists
let elBookList = document.querySelector('.book-list'); // ul element for showing books list
let elDeleteBtn = document.querySelector('.delete-btn'); // Delete button
let elSortBtn = document.querySelector('.sort-btn'); // Sort button
let elFormSearch = document.querySelector('.form-search');
let elSearchInput = elFormSearch.querySelector('.input-search-js');
let elSearchOutput = elFormSearch.querySelector('.output-js');

//============Functions======================

// Function for delete button
const deleteItem = () => {
  let checkedItems = getCheckedItems(); // This function return array of checked checkboxes values 
  for (item of checkedItems) {
    bookCollection[item] = null;
  }
  isDeletedItem = true; // All checked items are deleted. There is no checked items
  refreshBookList(bookCollection); // Refresh book list (ul tag) according to array of all books
}

// Function for sort button
const sortItem = () => {
  bookCollection.sort(); // Sort array of all books
  isDeletedItem = true;
  refreshBookList(bookCollection); // Refresh book list (ul tag) according to array of all books
}

const search = () => {
  let searchTextOrig = elSearchInput.value.trim();
  let searchText = searchTextOrig.toLowerCase();
  let resultTextArr = [];
  for (book of bookCollection) {
    if (book.toLowerCase().includes(searchText)) {
      resultTextArr.push(book);
    }
  }
  let resultText = resultTextArr.join(', ')
  if (resultText === '') {
    elSearchOutput.textContent = `"${searchTextOrig}" nomli kitob topilmadi. Kitobni qo'shish bo'limiga o'tish uchun Enter tugmasini bosing`;
    isNotFoundBook = true;
  }
  else {
    elSearchOutput.textContent = resultTextArr.join(', ');
    isNotFoundBook = false;
  }
}

// The function indicates "Is this item checked?". If checked return true. Else return false.
// valArr - array of checked checkboxes values. Every value matches corresponding index of books
// index - current index of book which places to <li></li> tag
const isDel = (valArr, index) => {
  for (value of valArr) {
    if (value == index) {
      return true;
    }
  }
  return false;
}

// The function determines checked checkboxes and return array of checked checkboxes values
const getCheckedItems = () => {
  let values = []; // Define empty array
  if (isDeletedItem) {
    isDeletedItem = false;
    return values; // This case is done when delete button is clicked. Return empty array to make unchecked all checkboxes
  }
  let checkboxes = document.querySelectorAll(`input[name="books"]:checked`); // Array of checked checkboxes
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  return values; // Return array of checked checkboxes values
}


// Function for creating <li></li> elements and generate innerHTML for <li></li> elements according to bookCollection array
const refreshBookList = (bookArr = bookCollection) => {
  let isThereCheckedItems = false; // This variable need for enable/disable delete button
  let values = getCheckedItems(); // Array consists of values of checked chexboxes
  elBookList.innerHTML = ''; // clear <ul>Books list</ul> innerHTML
  let count = 0; // The variable need to generate value of checkboxes. This values match to indexes of bookCollection array
  for (book of bookArr) {
    if (book === null) {
      count++;
      continue;
    }
    let listItem = document.createElement('li');
    if (isDel(values, count)) { // Is this book checked for deleting. Adds <del></del> tag to <label></label>: <label><del>Book name</del></label>
      listItem.innerHTML = `<input class="form-check-input" type="checkbox" name="books" id="checkBook${count}" value="${count}" onchange="refreshBookList()" checked>
            <label class="form-check-label" for="checkBook${count}"><del>${book}</del></label>`;
      isThereCheckedItems = true;
    }
    else { //This book is not checked foe deleting
      listItem.innerHTML = `<input class="form-check-input" type="checkbox" name="books" id="checkBook${count}" value="${count}" onchange="refreshBookList()">
            <label class="form-check-label" for="checkBook${count}">${book}</label>`;
    }
    count++;
    elBookList.append(listItem); // Add li tag to ul tag: <ul><li></li></ul>
    elDeleteBtn.disabled = isThereCheckedItems ? false : true; // Disable or enable delete button
  }
}


refreshBookList(bookCollection); // Initial refresh ul tag


// Add a new book to bookCollection array and to ul tag
elFormAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  let matchNameBook = true; // A name of new book doesn't match to names of existing books
  let newBookName = elBookName.value.trim(); // Variable for name of new book
  newBookName = `${newBookName[0].toUpperCase()}${newBookName.split('').slice(1).join('')}`; // Capitalize new book name
  if (bookCollection.indexOf(newBookName) > -1) {
    matchNameBook = false; // A name of new book match to one of existing books name
  }
  if (matchNameBook) { // If name of new book doesn't match to names of existing books
    if (elCheck.checked) {
      bookCollection.unshift(newBookName);
    } else {
      bookCollection.push(newBookName); // add new book to array bookCollection
    }
    refreshBookList(bookCollection); // Update list of books (ul tag)
    elBookName.value = ''; // Clear input for book name
    messageBox.textContent = "Kitob nomini lotin yozuvida kiriting";
  }
  else { // if name of new book match to one of existing books name
    messageBox.textContent = "Bunday kitob mavjud";
  }
  elBookName.focus();
});

elFormSearch.addEventListener('submit', function (e) {
  e.preventDefault();
  if (isNotFoundBook) {
    elBookName.value = elSearchInput.value.trim();
    elSearchInput.value = '';
    elBookName.focus();
    elSearchOutput.textContent = 'Yuqoridagi maydonga so`z kiriting';
  }
});


