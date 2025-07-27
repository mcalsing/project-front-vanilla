const API_URL = 'http://localhost:3000/products';

const card = document.getElementById('card');
const modal = document.getElementById('modal');

var products;

//Função para pegar os dados da API
const getProduct = async () => {
  const response = await axios.get(API_URL);
  products = response.data;

  card.innerHTML = '';

  products.forEach(product => {
    card.innerHTML += `
      <div 
        onclick="openModal('${product.image}', '${product.name}', ${product.price}, ${product.stock})" 
        class="w-60 h-85 border-1 border-[#d1d1ad] rounded-md cursor-pointer"
      >
        <div class="h-60 flex justify-center items-center bg-[#ededde] rounded-t-md">
          <img class="w-40 h-fit" src="${product.image}" alt="">
        </div>
        <div class="flex flex-col text-[#727240] py-4 px-1 gap-2">
          <span class="font-medium text-xl">${product.name}</span>
          <span>R$ ${product.price}</span>
        </div>
      </div>
    `
  })
}
window.onload = getProduct;


//Função que quando for digitado algo na barra de pesquisa, filtra o producto que corresponde
const showFilteredProducts = (inputFilter) => {
  card.innerHTML = '';

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(inputFilter.toLowerCase()))

  filteredProducts.forEach(product => {
    card.innerHTML += `
      <div class="w-60 h-85 border-1 border-[#d1d1ad] rounded-md cursor-pointer">
        <div class="h-60 flex justify-center items-center bg-[#ededde] rounded-t-md">
          <img class="w-40 h-fit" src="${product.image}" alt="">
        </div>
        <div class="flex flex-col text-[#727240] py-4 px-1 gap-2">
          <span class="font-medium text-xl">${product.name}</span>
          <span>R$ ${product.price}</span>
        </div>
      </div>
    `
  })

}

function openModal(image, name, price, stock) {
  modal.showModal();
  modal.innerHTML = `
    <div>
      <img class="w-40" src="${image}" alt="product">
      <p>${name}<p>
      <p>${price}<p>
      <p>${stock}<p>
    <div>
  `;
}