const API_URL = 'http://localhost:3000/products';

const card = document.getElementById('card');


const getProduct = async () => {
  const {data} = await axios.get(API_URL);
  
  card.innerHTML = '';



  console.log(data)
}
window.onload = getProduct;