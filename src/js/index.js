// http://localhost:3000/items
//
const searchInput = document.querySelector('#search-input');
const productsDOM = document.querySelector('.products-center');
let allProductsData = [];
let filters = {
  searchItem: '',
};

document.addEventListener('DOMContentLoaded', () => {
  axios
    .get('http://localhost:3000/items')
    .then((response) => {
      allProductsData = response.data;
      // render products on DOM
      renderProducts(response.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(prod, fil) {
  const filteredProducts = prod.filter((item) => {
    return item.title.toLowerCase().includes(fil.searchItem.toLowerCase());
  });
  productsDOM.innerHTML = '';
  console.log(filteredProducts);
  // render to DOM
  filteredProducts.forEach((item, index) => {
    //  Create
    const productsDiv = document.createElement('div');
    productsDiv.classList.add('product');
    //  Content
    productsDiv.innerHTML = ` <div class="bg-white flex flex-col items-center rounded-lg px-2 pt-4 shadow-md max-w-sm">
    <!-- Image -->
    <div class="img-container mb-3 bg-gray-100 rounded-xl p-2 h-auto w-64">
      <img class="w-full h-auto rounded-lg" src= ${item.image} alt="p-${index}" />
    </div>
    <!-- Title and Price -->
    <div class="product-desc flex items-center justify-around mb-3 text-base w-full">
      <div class="product-title text-slate-800 font-medium">${item.title}</div>
      <div class="product-price text-violet-700 font-medium">${item.price} $</div>
    </div>
  </div> `;

    // append to products
    productsDOM.appendChild(productsDiv);
  });
}

searchInput.addEventListener('input', (event) => {
  //
  filters.searchItem = event.target.value;
  console.log(filters.searchItem);
  renderProducts(allProductsData, filters);
});
