const baseUrl = 'https://api.punkapi.com/v2';

let OriginalBeerList = [];
let BeerNameList = [];
let BeerList = [];

async function getBeers() {
  OriginalBeerList = BeerList = await (await fetch(`${baseUrl}/beers`)).json();
  constructContentContainer(OriginalBeerList, true);
  console.log(OriginalBeerList);
}

const constructContentContainer = (list, updateName) => {
  const contentContainer = document.getElementById('content');
  contentContainer.innerHTML = '';
  list.map((item) => {
    updateName && BeerNameList.push(item.name);
    let div = document.createElement('div');
    div.innerHTML = contructBeerCard(
      item.name,
      item.description,
      item.ph,
      item.food_pairing
    );
    contentContainer.appendChild(div);
  });
};

function contructBeerCard(name, description, ph, food_pairing) {
  return `<article class="item-card">
        <div class="item-info">
            <div>
                <h1>${name}</h1>
                <span class="ph-pill">Ph: ${ph} </span>
            </div>
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

const constructPill = (name) => `<span class="pill">${name}</span>`;

const searchBeer = (e) => {
  let searchTerm = e.value.toLowerCase();
  if (searchTerm === '') {
    constructContentContainer(OriginalBeerList, false);
    return;
  }
  BeerList = OriginalBeerList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );
  constructContentContainer(BeerList, false);
};

const debounce = (fn, timeout = 300) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn.apply(this, args), timeout);
  };
};

const debouceSearch = debounce(searchBeer, 300);
