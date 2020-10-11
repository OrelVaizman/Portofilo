var gQuests = [
    { id: 0, opts: ['The weekend', 'Justin Bieber'], correctOptIndex: 0 },
    { id: 1, opts: ['Lil Uzi', 'Drake'], correctOptIndex: 1 },
    { id: 2, opts: ['Young MA', 'Bobby Shmurda'], correctOptIndex: 1 },
    { id: 3, opts: ['Travis Scott', 'Juice-WRLD'], correctOptIndex: 0 },
]


var isVictory = false;
var gCurrQuestIdx = 0;

function init() {
    renderBoard(gQuests)
}

function onAnswerClick(chosenAnswer,) {
    var elBtn = document.querySelector('.number' + (chosenAnswer));
    if (chosenAnswer !== gQuests[gCurrQuestIdx].correctOptIndex) {
        elBtn.style.backgroundColor = 'red';
    } else {
        elBtn.style.backgroundColor = 'green';
        gCurrQuestIdx++;
        renderBoard(gQuests);
    }
    // if (gCurrQuestIdx > 3) {
    //     console.log(gCurrQuestIdx)
    // }
}

function renderBoard(questions) {
    if (gCurrQuestIdx === 4) {
        return;
    }
    var htmlStr = '<img src="imgs/' + gCurrQuestIdx + '.jpg">';
    for (var i = 0; i < questions[0].opts.length; i++) {
        // console.log(questions[0].opts[i]) The question text
        htmlStr += '<div onclick="onAnswerClick(' + i + ')" class="question number' + i + '">' + questions[gCurrQuestIdx].opts[i] + '</div>'
    }
    var elContent = document.querySelector('.content');
    elContent.innerHTML = htmlStr;

}

// function isGameOver(isVictory) {
//     if (gCurrQuestIdx === 4) {
//         alert('You\'re the winner!');

//         gCurrQuestIdx = 0;
//     }


// }

dqss