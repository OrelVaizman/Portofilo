'use strict';
const STORAGE_KEY = 'shopDB';
var gBooks;

_createbooks();

function _createbooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [{
            id: makeId(),
            name: 'Learning laravel',
            price: '18.90',
            imgUrl: `imgs/img1.png`,
            rate: 0,
        }, {
            id: makeId(),
            name: 'Beginning with laravel',
            price: '6.65',
            imgUrl: `imgs/img2.png`,
            rate: 0,
        }, {
            id: makeId(),
            name: 'Java for developers',
            price: '7.20',
            imgUrl: `imgs/img3.png`,
            rate: 0,
        }]
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getBookIdxById(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    return bookIdx;
}
function getBookById(bookId) {
    var bookIdx = getBookIdxById(bookId);
    return gBooks[bookIdx];
}
function deleteBook(bookId) {
    var bookIdx = getBookIdxById(bookId)
    if (bookIdx < 0) return console.log('Error book idx')
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}
function updateBook(bookId, newPrice) {
    var book = getBookById(bookId);
    book.price = newPrice;
    _saveBooksToStorage();
}

function createBook(newBookName, newBookPrice) {
    var newBookItem = {
        id: makeId(),
        name: newBookName,
        price: newBookPrice,
        imgUrl: `imgs/img-${newBookName}.png`,
        rate: 0,
    }
    gBooks.push(newBookItem);
    _saveBooksToStorage();
}

function updateRate(book, action) {
    if (action === 'Increase') {
        book.rate++
    } else if (action === 'Decrease') {
        book.rate--
    }
    _saveBooksToStorage();
}
