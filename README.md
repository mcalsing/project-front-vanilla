# Loja Virtual - Projeto E-commerce

## Descrição

Este projeto é uma loja virtual simples desenvolvida em JavaScript, HTML e CSS, com integração a uma API REST para gerenciamento de produtos e estoque. O objetivo é simular um fluxo de compra online, permitindo ao usuário navegar por categorias, pesquisar produtos, adicionar itens ao carrinho e finalizar a compra.

---

## Funcionalidades

- Listagem de produtos vindos do backend (API)
- Filtro de produtos por categoria
- Busca de produtos por nome
- Visualização de detalhes do produto em modal
- Controle de quantidade e estoque no modal
- Adição de produtos ao carrinho com persistência em sessionStorage
- Icone no header que mostra a quantidade de produtos diferentes no carrinho
- Visualização e remoção de itens do carrinho
- Cálculo de subtotal, taxa e total no checkout
- Finalização da compra com atualização do estoque via API
- Responsividade com Tailwind CSS

---

## Tecnologias Utilizadas

- **Frontend:**  
  - HTML5  
  - CSS3 (Tailwind CSS via CDN)  
  - JavaScript (ES6+)
  - [Axios](https://axios-http.com/) para requisições HTTP (via CDN)

- **Backend:**  
  - [JSON Server](https://github.com/typicode/json-server)

---

## Como Executar o Projeto

1. **Clone o repositório:**
  ```bash
  git clone https://github.com/mcalsing/project-front-vanilla
  cd projeto-front-vanilla
  ```

2. **Instale o JSON Server:**
  ```bash
  npm i json-server
  ```

3. **Inicie o Backend**
  ```bash
  npm run api
  ```

4. **Abra o arquivo index.html no navegador.**
---

### Observações
  - Certifique-se de que a API está rodando em http://localhost:3000/products.
  - O carrinho é salvo em sessionStorage, ou seja, é limpo ao fechar o navegador.