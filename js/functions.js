
//=================Functions======================

// Function for calling HTML elements

const $ = (selector, node = document) => {
  return node.querySelector(selector);
}

const $$ = (selector, node = document) => {
  return node.querySelectorAll(selector);
}


// Function for delete button
const deleteItem = () => {
  let checkedItems = getCheckedItems(); // This function return array of checked checkboxes values 
  for (item of checkedItems) {
    var type = parseInt((item.split('-'))[0]);
    var book = parseInt((item.split('-'))[1]);
    bookCollection[type][book] = null; // Assign null to checked books
  }
  isDeletedItem = true; // All checked items are deleted. There is no checked items
  for (let i = 0; i < bookCollection.length; i++) {
    for (let j = bookCollection[i].length - 1; j >= 0; j--) {
      if (bookCollection[i][j] === null) {
        bookCollection[i].splice(j, 1); // Delete null items from books Array
      }
    }
  }
  refreshBookList(bookCollection); // Refresh book list (ul tag) according to array of all books
}

// Function for sort button
const sortItem = () => {
  for (let i = 0; i < bookCollection.length; i++) {
    bookCollection[i].sort(); // Sort array of all books
  }
  isDeletedItem = true;
  refreshBookList(bookCollection); // Refresh book list (ul tag) according to array of all books
}

const search = () => {
  let searchTextOrig = elSearchInput.value.trim(); // Read text from input in the search form
  if (searchTextOrig === '') {
    elSearchOutput.textContent = "Yuqoridagi maydonga so`z kiriting";
    return;
  }
  let searchText = searchTextOrig.toLowerCase();
  let resultTextArr = []; // Empty array for including nesessary books titles
  for (typeBook of bookCollection) {
    for (book of typeBook) {
      if (book !== null) {
        if (book.toLowerCase().includes(searchText)) {
          resultTextArr.push(book);
        }
      }
    }
  }

  let resultText = resultTextArr.join(', ') // Join array items for result text
  if (resultText === '') {
    elSearchOutput.textContent = `"${searchTextOrig}" nomli kitob topilmadi. Kitobni qo'shish bo'limiga o'tish uchun Enter tugmasini bosing`;
    isNotFoundBook = true; // Copy title of not founding book to add input by clicking enter key
  }
  else {
    elSearchOutput.textContent = resultText;
    isNotFoundBook = false; // don't allow to add input by clicking enter key
  }
}

// The function indicates "Is this item checked?". If checked return true. Else return false.
// valArr - array of checked checkboxes values. Every value matches corresponding index of books
// index - current index of book which places to <li></li> tag
const isDel = (valArr, type, index) => {
  for (value of valArr) {
    if (value === `${type}-${index}`) {
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
  // console.log(values);
  elBookList.innerHTML = ''; // clear <ul>Books list</ul> innerHTML
  let typeLiterature = 0; // Variable for generating value of checkboxes.
  let bookIndex; // The variable need to generate value of checkboxes. This values match to indexes of bookCollection array
  let maxLength = 0;
  let minLength = Infinity;

  for (bookType of bookArr) {

    // Create li item for title of books literature type
    let listItem = document.createElement('li');
    listItem.classList.add('fw-bold');
    listItem.textContent = titleLiter[typeLiterature];
    elBookList.append(listItem);

    // create li items for books names
    bookIndex = 0;
    for (book of bookType) {
      maxLength = (book.length > maxLength) ? book.length : maxLength;
      minLength = (book.length < minLength) ? book.length : minLength;
      listItem = document.createElement('li');

      if (isDel(values, typeLiterature, bookIndex)) { // Is this book checked for deleting. Adds <del></del> tag to <label></label>: <label><del>Book name</del></label>
        listItem.innerHTML = `<input class="form-check-input" type="checkbox" name="books" id="checkBook${typeLiterature}-${bookIndex}" value="${typeLiterature}-${bookIndex}" onchange="refreshBookList()" checked>
              <label class="form-check-label" for="checkBook${typeLiterature}-${bookIndex}"><del>${book}</del></label>`;
        isThereCheckedItems = true;
      }
      else { //This book is not checked for deleting
        listItem.innerHTML = `<input class="form-check-input" type="checkbox" name="books" id="checkBook${typeLiterature}-${bookIndex}" value="${typeLiterature}-${bookIndex}" onchange="refreshBookList()">
              <label class="form-check-label" for="checkBook${typeLiterature}-${bookIndex}">${book}</label>`;
      }

      bookIndex++;
      elBookList.append(listItem); // Add li tag to ul tag: <ul><li></li></ul>
      elDeleteBtn.disabled = isThereCheckedItems ? false : true; // Disable or enable delete button
    }

    typeLiterature++;
  }

  // Finding longest and shortest titles.
  // two arrays (long titles and short titles) for result text.
  let longTitleArr = [];
  let shortTitleArr = [];
  for (bookType of bookArr) {
    for (book of bookType) {
      if (book.length === maxLength) {
        longTitleArr.push(book);
      }
      if (book.length === minLength) {
        shortTitleArr.push(book);
      }
    }
  }
  elLongTitleP.innerHTML = "<b>Eng uzun sarlavhali kitoblar:</b> " + longTitleArr.join(', ');
  elShortTitleP.innerHTML = "<b>Eng qisqa sarlavhali kitoblar:</b> " + shortTitleArr.join(', ');
}