const products = [
	{ id: 1, name: 'Camisa I Flamengo 26/27', category: 'current', label: 'Lançamento', price: 349.90, style: 'shirt-home', image: 'imagens/Camisa01.jpg' },
	{ id: 2, name: 'Camisa II Flamengo 26/27', category: 'current', label: 'Nova', price: 329.90, style: 'shirt-away', image: 'imagens/Camisa02.jpg' },
	{ id: 3, name: 'Camisa Flamengo 1981', category: 'retro', label: 'Mais vendida', price: 289.90, style: 'shirt-retro', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRceLCmjET8HZMyRSUpRjYd-MieT-c5P190O7SeiJTaIg&s=10' },
	{ id: 4, name: 'Camisa Flamengo 1992', category: 'retro', label: 'Clássica', price: 279.90, style: 'shirt-black', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9eB6lJbry8_OqYnFnpmVlW0nIYuKlYgmIyVOhpX9uw&s=10' },
	{ id: 5, name: 'Camisa III Flamengo 26/27', category: 'current', label: 'Edição limitada', price: 319.90, style: 'shirt-away', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqOpEduz1_n3dYkRu2mcoufPzW2DjnPCmYUMkqzRKTdw&s' },
	{ id: 6, name: 'Camisa Flamengo 1987', category: 'retro', label: 'Retrô', price: 269.90, style: 'shirt-home', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ygpzt4bExXy9tf20xe7FY9bJlVPQppyNLsGlpKfvYg&s=10' }
];
let cart = [];
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const grid = document.querySelector('#product-grid');
function renderProducts(list = products) {
	grid.innerHTML = list.length ? list.map(product => `<article class="product-card"><div class="product-visual"><span class="tag">${product.label}</span><button class="heart" aria-label="Favoritar ${product.name}">♡</button><img class="product-photo" src="${product.image}" alt="${product.name}" onerror="this.classList.add('is-fallback'); this.nextElementSibling.classList.remove('is-fallback')"><div class="shirt ${product.style} is-fallback"></div></div><div class="product-info"><div class="product-category">${product.category === 'retro' ? 'Coleção retrô' : 'Coleção atual'}</div><div class="product-name">${product.name}</div><span class="product-price">${money(product.price)}</span><button class="add-btn" data-id="${product.id}">Adicionar</button></div></article>`).join('') : '<p class="empty">Nenhuma camisa encontrada.</p>';
}
function renderCart() {
	const items = document.querySelector('#cart-items');
	const total = cart.reduce((sum, item) => sum + item.price, 0);
	document.querySelector('.cart-count').textContent = cart.length;
	document.querySelector('#cart-total').textContent = money(total);
	items.innerHTML = cart.length ? cart.map(item => `<div class="cart-item"><div class="mini-shirt"></div><div><strong>${item.name}</strong><span>${money(item.price)}</span></div></div>`).join('') : '<p class="empty">Seu carrinho está vazio.<br>Escolha um manto para começar.</p>';
}
grid.addEventListener('click', event => { const button = event.target.closest('.add-btn'); if (!button) return; cart.push(products.find(product => product.id === Number(button.dataset.id))); renderCart(); document.querySelector('#drawer').classList.add('open'); });
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.filter').forEach(item => item.classList.remove('active')); button.classList.add('active'); const filter = button.dataset.filter; renderProducts(filter === 'all' ? products : products.filter(product => product.category === filter)); }));
document.querySelector('#search').addEventListener('input', event => { const query = event.target.value.toLowerCase(); renderProducts(products.filter(product => product.name.toLowerCase().includes(query))); });
document.querySelector('#cart-button').addEventListener('click', () => document.querySelector('#drawer').classList.add('open'));
document.querySelector('#close-cart').addEventListener('click', () => document.querySelector('#drawer').classList.remove('open'));
document.querySelector('.checkout').addEventListener('click', () => alert(cart.length ? 'Pedido iniciado! Em breve você poderá finalizar sua compra.' : 'Adicione uma camisa ao carrinho primeiro.'));
renderProducts();
renderCart();
