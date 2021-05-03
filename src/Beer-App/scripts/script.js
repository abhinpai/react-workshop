const baseUrl = 'https://api.punkapi.com/v2';

async function getBeers() {
  let result = await (await fetch(`${baseUrl}/beers`)).json();
  const contentContainer = document.getElementById('content');
  result.map((item) => {
    let div = document.createElement('div');
    div.innerHTML = contructBeerCard(
      item.name,
      item.description,
      item.food_pairing
    );
    contentContainer.appendChild(div);
  });
}

function contructBeerCard(name, description, food_pairing) {
  return `<article class="item-card">
        <div class="item-info">
          <h1>${name}</h1>
          <p>${description}</p>
        </div>
        <div class="item-sub-info">
          <h3>Great combination with</h3>
          <div class="pill-container">
          ${food_pairing.map((item) => constructPill(item))}
          </div>
        </div>
      </article>`;
}

function constructPill(name) {
  return `<span class="pill">${name}</span>`;
}

const debouceSearch = debounce(searchBeer, 300);

function searchBeer(e) {
  console.log(e.value);
}

function debounce(fn, timeout = 300) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, timeout);
  };
}

// const search = document.getElementById('search-beer');
// search.addEventListener('input', function (event) {
//     debouceSearch(searchBeer, 300);
// });
