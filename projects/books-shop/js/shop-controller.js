'use strict';
function onInit() {
    renderBooks()
}

function renderBooks() {
    var elShopTable = document.querySelector('.shoptable')
    var elBookName = document.querySelector('.add-book input[name=bookName]')
    var elBookPrice = document.querySelector('.add-book input[name=bookPrice]')
    elBookName.value = '';
    elBookPrice.value = '';
    elShopTable.innerHTML = '';
    gBooks.forEach(function (book) {
        elShopTable.innerHTML += `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td>
        <button onclick="onReadBook('${book.id}')">Read</button>
        <button onclick="onUpdateBook('${book.id}')">Update</button>
        <button onclick="onDeleteBook('${book.id}')">Delete</button>
        </td>
    </tr>`
    })

}
function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks();
}
function onUpdateBook(bookId) {
    var newPrice = +prompt('What is the new price for the book?')
    if (!newPrice) return alert('Please enter a price in numbers only!');
    updateBook(bookId, newPrice)
    renderBooks();
}

function onCreateBook() {
    var elBookName = document.querySelector('.add-book input[name=bookName]')
    var elBookPrice = document.querySelector('.add-book input[name=bookPrice]')
    var newBookName = elBookName.value;
    var newBookPrice = elBookPrice.value;
    if (!newBookName || !+newBookPrice) return alert('Please enter book name and price to be added.')
    createBook(newBookName, newBookPrice);
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    renderModal(book, elModal);
}

function renderRate(book) {
    var elModal = document.querySelector('.modal')
    elModal.querySelector('.rate').innerText = book.rate;
}

function renderModal(book, elModal) {
    elModal.innerHTML = `<h2>${book.name}</h2>
<h4>${book.price}</h6>
<img src="${book.imgUrl}" class="bookimg">
<p>${makeLorem()}</p>
<button class="add-rate-btn" onclick="onUpdateRate('${book.id}','Decrease')">-</button>
<h5 class="rate">${book.rate}</h5>
<button class="add-rate-btn" onclick="onUpdateRate('${book.id}','Increase')">+</button>
<button onclick="onCloseModal()">Close</button>
`
    elModal.hidden = false;
}

function onUpdateRate(bookId, action) {
    var book = getBookById(bookId);
    if (action === 'Decrease') {
        if (book.rate <= 0) return alert('The book\'s rate cannot be decreased under 0!')
    }
    if (action === 'Increase') {
        if (book.rate >= 10) return alert('The book\'s rate cannot be increased more than 10!')
    }
    updateRate(book, action);
    renderRate(book);
}