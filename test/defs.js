module.exports = {
    menu: (title, url) => `<li class="nav-item">
	<a class="nav-link" href="${url}">${title}</a></li>`,
	dropdown_item: (title, url) => `
                <a class="dropdown-item" href="${url}">${title}</a>
              `,
    dropdown_menu: (title, items) => `<li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown${title}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${title}
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown${title}">
              ${items}
              </div></li>`,
    card: (title, text, href) => `<div class="col-lg-4 mb-4">
          <div class="card h-100">
            <h4 class="card-header">${title}</h4>
            <div class="card-body">
              <p class="card-text">${text}</p>
            </div>
            <div class="card-footer">
              <a href="${href}" class="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>`,
    heading: (imgsrc, title, url, text) => `<div class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img class="card-img-top" src="${imgsrc}" alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="${url}">${title}</a>
              </h4>
              <p class="card-text">${text}</p>
            </div>
          </div>
        </div>`,
    carousel_item: (title, desc, imgurl, active) => `<div class="carousel-item ${active ? 'active' : ''}" style="background-image: url(${imgurl})">
            <div class="carousel-caption d-none d-md-block">
              <h3>${title}</h3>
              <p>${desc}</p>
            </div>
          </div>`
};
