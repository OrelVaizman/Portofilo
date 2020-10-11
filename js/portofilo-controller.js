'use strict';

function initPage() {
    gProjs = createProjects();
    renderPortofilo();
}

function renderPortofilo() {
    var elPortofilo = document.querySelector('.items')
    var strHTML = gProjs.map(function (currItem) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="onOpenModal('${currItem.id}')">
          <div class="portfolio-hover">
          <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${currItem.id}.jpg" onerror="this.src='img/portfolio/01-thumbnail.jpg'" alt="">
          </a>
          <div class="portfolio-caption">
          <h4>${currItem.name}</h4>
          <p class="text-muted">${currItem.title}</p>
          </div>
          </div>`

    })

    elPortofilo.innerHTML = strHTML.join('');
}

function onOpenModal(itemId) {
    var item = getItemById(itemId)
    renderModal(item)
    console.log('Wired up!')
    // console.log(item);
}

function renderModal(item) {
    var elModal = document.querySelector('.modal-info')
    var strHTML = `<h2>${item.name}</h2>
<p class="item-intro text-muted">${item.title}</p>
<img class="img-fluid d-block mx-auto" src="img/portfolio/${item.id}.jpg"  onerror="this.src='img/portfolio/01-full.jpg'"alt="">
<p>${item.desc}</p>
<ul class="list-inline">
  <li>${Date('${item.publishedAt}')}</li>
  <li>Categories: ${item.labels}</li>
  <a href="projects/${item.id}" target="_blank"><button class="btn btn-primary" style="border-color: green; background-color: green" type="button">Check it out!</button></a>
</ul>`
    elModal.innerHTML = strHTML;
}

function onSubmit(subject, text, name) {
    var Subject = $('#' + subject).val() + ' - ' + $('#' + name).val();
    var Message = $('#' + text).val()
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=oraelv@gmail.com&su=${Subject}&body=${Message}`, '_blank');
}