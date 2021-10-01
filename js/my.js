

//==============Variables=========================
let titleLiter = ["Bolalar adabiyoti", "Kattalat adabiyoti", "Jahon adabiyoti"];
let bookCollection = [
  ["Sariq devni minib", "Zumrad va qimmat", "Ertaklar yaxshilikka yetaklar", "Yosh dasturchi", "Hello World", "Bola"],
  ["Taqdir", "Nikoh", "Baxtli oila", "Algoritm"],
  ["Joniyat va jazo", "Telba", "Choliqushi"]
]; //Declare array of books with initial values
let isDeletedItem = false; // This variable indicates is there checked items for deleting
let isNotFoundBook = false;


//================Elements=====================

let elFormAdd = $('.form-add'); // Form for adding new books
let elBookName = $('.input-name-js'); // Input for new book name
let elCheck = $('.check-js'); // Checkbox for adding books to top or to bottom of list
let messageBox = $('.message-js'); // Element for caution when new book is already exists
let elBookList = $('.book-list'); // ul element for showing books list
let elDeleteBtn = $('.delete-btn'); // Delete button
let elSortBtn = $('.sort-btn'); // Sort button
let elFormSearch = $('.form-search'); // form for search book
let elSearchInput = $('.input-search-js'); // input for search book
let elSearchOutput = $('.output-js'); // p element for search result
let elSelectAdabiyot = $('.select-adabiyot-js'); // Select type of literature

// <p> </p> tags for results: longest titles, shortest titles ...
let elLongTitleP = $('.js-long-title');
let elShortTitleP = $('.js-short-title');


refreshBookList(bookCollection); // Initial refresh ul tag


// Add a new book to bookCollection array and to ul tag
elFormAdd.addEventListener('submit', function (e) {
  e.preventDefault();
  let matchNameBook = true; // A name of new book doesn't match to names of existing books
  let newBookName = elBookName.value.trim(); // Variable for name of new book
  newBookName = `${newBookName[0].toUpperCase()}${newBookName.split('').slice(1).join('')}`; // Capitalize new book name
  let typeLiterature = elSelectAdabiyot.value;

  if (bookCollection[typeLiterature].indexOf(newBookName) > -1) {
    matchNameBook = false; // A name of new book match to one of existing books name
  }

  if (matchNameBook) { // If name of new book doesn't match to names of existing books
    if (elCheck.checked) {
      bookCollection[typeLiterature].unshift(newBookName);
    } else {
      bookCollection[typeLiterature].push(newBookName); // add new book to array bookCollection
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


