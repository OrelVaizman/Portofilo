'use strict';

var gProjs = [];

function createProjects() {
    var projects = [];
    projects.push(createProject('minesweeper', 'Mine-Sweeper', 'Our improved Mine-Sweeper!', 'The Mine-Sweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field. In our Porject we\'ve made many functions that does not exist in the original game, and are an actualy improvement to the original one'))
    projects.push(createProject('books-shop', 'Book Shop', 'The Book Shop Project!', 'Our Book-Shop Project was made as apart of our course at Coding-Academy to practice CRUDL functions along with data-stracture.'))
    projects.push(createProject('in-the-picture', 'Pictures Game', 'The Pictures\' Game Project!', 'Our Trivia game-quiz that requires which rapper is in the picture displayed.'))
    projects.push(createProject('todo-app', 'Todo Application', 'The Todo Application!', 'Our basic system for operating todo-lists.'))
    projects.push(createProject('flexbox', 'Flex-Box Layouts', 'The FlexBox Layouts!', 'Our very simple reponsive layout-project that uses one of the most powerful tools @ CSS3 - Flex-Box.'))
    projects.push(createProject('ball-board', 'Ball Board Game', 'The Ball-Board Game!', 'Our Ball-Board Game is a game that creates randomly balls on the board, and the user\'s target is to collect all the balls before new ones are randomized and score the highest!'))
    return projects;
}
function createProject(id, name, title, desc) {
    return {
        id,
        name,
        title,
        desc,
        publishedAt: Date.now(),
        labels: ['HTML5', 'JS', 'CSS3']
    }
}

function getItemById(id) {
    var item = gProjs.find(function (currItem) {
        return currItem.id === id
    })
    return item;
}