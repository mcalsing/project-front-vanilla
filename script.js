const API_URL = 'http://localhost:3000/products';

const card = document.getElementById('card');


const getProduct = async () => {
  const {data} = await axios.get(API_URL);
  
  card.innerHTML = '';

  data.forEach(product => {
    card.innerHTML += `
      <div class="w-60 h-85 border-2 border-[#d1d1ad] rounded-md">
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