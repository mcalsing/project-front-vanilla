const API_URL = 'http://localhost:3000/products';

const card = document.getElementById('card');
const modal = document.getElementById('modal');
const cartIcon = document.getElementById('cart-icon');

var orders = [];
orders = JSON.parse(sessionStorage.getItem("cart")) || [];
cartIcon.innerHTML = orders.length;

// Produtos recebidos do backend
var products;

//Contador da quantidade de produtos na modal
var amount = 0;

// Número do pedido para salvar no session storage

//Função para pegar os dados da API
const getProduct = async () => {
  try {
    const response = await axios.get(API_URL);
    products = response.data;
  
    card.innerHTML = '';
  
    products.forEach(product => {
      card.innerHTML += `
        <div 
          onclick="openModal(${product.id}, '${product.image}', '${product.name}', ${product.price}, ${product.stock})" 
          class="w-60 h-85 border-1 border-[#d1d1ad] rounded-md cursor-pointer"
        >
          <div class="h-60 flex justify-center items-center bg-[#ededde] rounded-t-md">
            <img class="w-40 h-fit" src="${product.image}" alt="">
          </div>
          <div class="flex flex-col text-[#727240] py-4 px-2 gap-2">
            <span class="font-medium text-xl">${product.name}</span>
            <span>$ ${product.price}</span>
          </div>
        </div>
      `
    })
  } catch (error) {
    card.innerHTML = `<span class="text-xl">Nenhum produto encontrado<span>`;
  }
}
window.onload = getProduct;


//Função que quando for digitado algo na barra de pesquisa, filtra o producto que corresponde
const showFilteredProducts = (inputFilter) => {
  card.innerHTML = '';
  try {
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(inputFilter.toLowerCase()))

    if (filteredProducts.length == 0) card.innerHTML = `<span class="text-xl">Nenhum produto corresponde a pesquisa<span>`

    filteredProducts.forEach(product => {
      card.innerHTML += `
        <div 
          onclick="openModal(${product.id}, '${product.image}', '${product.name}', ${product.price}, ${product.stock})" 
          class="w-60 h-85 border-1 border-[#d1d1ad] rounded-md cursor-pointer"
        >
          <div class="h-60 flex justify-center items-center bg-[#ededde] rounded-t-md">
            <img class="w-40 h-fit" src="${product.image}" alt="">
          </div>
          <div class="flex flex-col text-[#727240] py-4 px-2 gap-2">
            <span class="font-medium text-xl">${product.name}</span>
            <span>$ ${product.price}</span>
          </div>
        </div>
      `
    })
  } catch (error) {
     card.innerHTML = `<span class="text-xl">Nenhum produto encontrado<span>`;
  }
}

const showCategory = (category) => {
  console.log(category)
  console.log("teste")

  card.innerHTML = '';

  filteredCategory = products.filter( item => item.category == category  )

  filteredCategory.forEach(product => {
    card.innerHTML += `
      <div 
        onclick="openModal(${product.id}, '${product.image}', '${product.name}', ${product.price}, ${product.stock})" 
        class="w-60 h-85 border-1 border-[#d1d1ad] rounded-md cursor-pointer"
      >
        <div class="h-60 flex justify-center items-center bg-[#ededde] rounded-t-md">
          <img class="w-40 h-fit" src="${product.image}" alt="">
        </div>
        <div class="flex flex-col text-[#727240] py-4 px-2 gap-2">
          <span class="font-medium text-xl">${product.name}</span>
          <span>$ ${product.price}</span>
        </div>
      </div>
    `
  })
}

const openModal = (id, image, name, price, stock) => {
  amount = 1;
  modal.showModal();
  modal.innerHTML = `
    <div class="w-200 h-120 flex rounded-md">
      <div class="flex items-center justify-center w-100 h-full p-10 bg-[#ededde] w-1/2">
        <img src="${image}" alt="">
      </div>

      <div class="flex flex-col px-10 gap-1 w-1/2">
        <span onclick="closeModal()" class="ml-auto pt-3 cursor-pointer">x</span>
        <h1 class="text-3xl font-bold">${name}</h1>
        <span class="px-3 p-1 rounded-2xl bg-[#ededde] w-fit text-xs">TOTAL IN STOCK: ${stock}</span>
        <span class="text-xs font-medium mt-10">PRICE</span>
        <span class="text-xl"> $ ${price}</span>

          <div class="mt-10">
            <h1 class="text-xs font-medium mb-2">QUANTITY</h1>
            <div class="flex border-1 border-[#d1d1ad] rounded h-11 justify-between w-41 items-center mb-12 px-4">
              <span class="cursor-pointer" onclick="decrementAmount(${stock})">
                <img src="/assets/minus.svg" alt="" />
              </span>
              <span id="amount-qtd">${amount}</span>
              <span class="cursor-pointer" onclick="increaseAmount(${stock})">
                <img src="/assets/add.svg" alt="" />
              </span>
            </div>

            <button 
              class="bg-lime-900 rounded-md w-full text-white cursor-pointer px-6 py-3"
              onclick="addProductToCart(${id}, '${image}', '${name}', ${price})"
            >
              Add to cart
            </button>
          </div>
      </div>
    </div>
  `
}

const closeModal = () => {
  modal.close();
}

const updateAmountDisplay = () => {
  const amountDisplay = document.getElementById("amount-qtd");
  if (amountDisplay) {
    amountDisplay.textContent = amount;
  }
}

const increaseAmount = (stock) => {
  if (amount < stock)
  amount += 1;
  updateAmountDisplay();
}

const decrementAmount = () => {
  if (amount > 1) {
    amount -= 1;
    updateAmountDisplay();
  }
}

const addProductToCart = (id, image, name, price) => {
  const amountInModel = document.getElementById("amount-qtd").textContent;
 
  orders = JSON.parse(sessionStorage.getItem("cart")) || [];

  const order = {
    id: id,
    image: image,
    name: name,
    price: price,
    quantity: amountInModel
  }
  orders.push(order)
 
  sessionStorage.setItem("cart", JSON.stringify(orders));

  cartIcon.innerHTML = orders.length
  closeModal();
}


// ---------------- checkout page ----------------


const currentURL = window.location.pathname

const renderCart = () => {
  const subtotalElem = document.getElementById('subtotal');
  const taxElem = document.getElementById('tax');
  const totalElem = document.getElementById('total');
  const checkoutProducts = document.getElementById('orders');

  orders = JSON.parse(sessionStorage.getItem("cart")) || [];
  cartIcon.innerHTML = orders.length;

  let totalPriceProducts = 0;
  checkoutProducts.innerHTML = '';

  orders.forEach(item => {
    totalPriceProducts += item.price * item.quantity;
    checkoutProducts.innerHTML += `
      <div class="flex items-center gap-10">
        <div class="flex h-25 bg-[#ededde] items-center">
          <img class="w-20 h-fit flex" src="${item.image}" alt="">
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-xl">${item.name}</span>
          <span class="text-sm text-[#939353]">quantity: ${item.quantity}</span>
        </div>
        <span class="text-xl ml-10 ml-auto">$ ${item.price}</span>
        <div onclick="deleteItemFromCart(${item.id})" class="w-8 h-8 bg-[#ededde] rounded-sm cursor-pointer">
          <img  class="px-2 py-2" src="/assets/close.svg" alt="" />
        </div>
      </div>
    `
  });

  if (subtotalElem) subtotalElem.textContent = totalPriceProducts.toFixed(1);
  if (taxElem) taxElem.textContent = (orders.length * 5).toFixed(1);
  if (totalElem && subtotalElem && taxElem) {
    totalElem.innerHTML = (Number(subtotalElem.textContent) + Number(taxElem.textContent)).toFixed(1);
  }
}

const showCheckoutProducts = () => {
  renderCart();
}

const deleteItemFromCart = (id) => {
  orders = JSON.parse(sessionStorage.getItem("cart")) || [];
  const newArray = orders.filter(item => item.id !== id);
  sessionStorage.setItem('cart', JSON.stringify(newArray));
  renderCart();
}

if (currentURL == "/checkout.html") showCheckoutProducts();


// ----------------------- Thanks page --------------------------


const thanks = () => {
  window.location.href = "thanks.html";
  sessionStorage.removeItem('cart');
}