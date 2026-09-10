import { useMemo, useState } from 'react';
import { Heart, Search, ShoppingBag, X } from 'lucide-react';

const products = [
  { id: 1, name: 'Camisa I Flamengo 26/27', category: 'current', label: 'Lançamento', price: 349.90, image: '/imagens/Camisa01.jpg' },
  { id: 2, name: 'Camisa II Flamengo 26/27', category: 'current', label: 'Nova', price: 329.90, image: '/imagens/Camisa02.jpg' },
  { id: 3, name: 'Camisa Flamengo 1981', category: 'retro', label: 'Mais vendida', price: 289.90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRceLCmjET8HZMyRSUpRjYd-MieT-c5P190O7SeiJTaIg&s=10' },
  { id: 4, name: 'Camisa Flamengo 1992', category: 'retro', label: 'Clássica', price: 279.90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9eB6lJbry8_OqYnFnpmVlW0nIYuKlYgmIyVOhpX9uw&s=10' },
  { id: 5, name: 'Camisa III Flamengo 26/27', category: 'current', label: 'Edição limitada', price: 319.90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqOpEduz1_n3dYkRu2mcoufPzW2DjnPCmYUMkqzRKTdw&s' },
  { id: 6, name: 'Camisa Flamengo 1987', category: 'retro', label: 'Retrô', price: 269.90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ygpzt4bExXy9tf20xe7FY9bJlVPQppyNLsGlpKfvYg&s=10' }
];

const formatMoney = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function Header({ cartCount, onOpenCart }) {
  return <>
    <div className="announcement">Frete grátis nas compras acima de R$ 299 · Envio para todo o Brasil</div>
    <header>
      <a className="brand" href="#inicio"><span className="crest"><img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Clube_de_Regatas_do_Flamengo_logo.svg" alt="Logo oficial do Flamengo" /></span><span className="brand-name">NAÇÃO 1895<span>FUTEBOL CLUBE</span></span></a>
      <nav><a href="#colecao">Coleção 26/27</a><a href="#colecao">Retrôs</a><a href="#manifesto">Manifesto</a></nav>
      <div className="header-actions"><button className="icon-btn" aria-label="Buscar"><Search size={20} /></button><button className="icon-btn" onClick={onOpenCart} aria-label="Abrir carrinho"><ShoppingBag size={20} /><span className="cart-count">{cartCount}</span></button></div>
    </header>
  </>;
}

function ProductCard({ product, onAdd }) {
  return <article className="product-card">
    <div className="product-visual"><span className="tag">{product.label}</span><button className="heart" aria-label={`Favoritar ${product.name}`}><Heart size={21} /></button><img className="product-photo" src={product.image} alt={product.name} /><button className="btn hover-buy" onClick={() => onAdd(product)}>Comprar agora</button></div>
    <div className="product-info"><div className="product-category">{product.category === 'retro' ? 'Coleção retrô' : 'Coleção atual'}</div><div className="product-name">{product.name}</div><span className="product-price">{formatMoney(product.price)}</span><button className="add-btn" onClick={() => onAdd(product)}>Adicionar</button></div>
  </article>;
}

function Cart({ items, open, onClose }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <aside className={`drawer ${open ? 'open' : ''}`} aria-label="Carrinho de compras"><div className="drawer-head"><h3>Seu carrinho</h3><button className="close" onClick={onClose} aria-label="Fechar carrinho"><X size={22} /></button></div><div className="cart-items">{items.length ? items.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>{formatMoney(item.price)}</span></div></div>) : <p className="empty">Seu carrinho está vazio.<br />Escolha um manto para começar.</p>}</div><div className="cart-footer"><div className="total"><span>Total</span><span>{formatMoney(total)}</span></div><button className="primary-btn checkout" onClick={() => alert(items.length ? 'Pedido iniciado! Em breve você poderá finalizar sua compra.' : 'Adicione uma camisa ao carrinho primeiro.')}>Finalizar pedido</button></div></aside>;
}

export default function App() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const visibleProducts = useMemo(() => products.filter(product => (filter === 'all' || product.category === filter) && product.name.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  const addToCart = product => { setCart(current => [...current, product]); setCartOpen(true); };

  return <div id="inicio"><Header cartCount={cart.length} onOpenCart={() => setCartOpen(true)} /><main><section className="hero"><div className="hero-content"><div className="eyebrow">Nova coleção · 2026 / 27</div><h1>O manto.<br /><em>A nossa pele.</em></h1><p>Linhas que carregam história. A nova camisa do Mengão chega para vestir a próxima geração de rubro-negros.</p><a className="primary-btn" href="#colecao">Ver coleção 26/27</a></div></section><div className="ticker"><span><b>✦</b> Clube de Regatas do Flamengo</span><span><b>✦</b> Desde 1895</span><span><b>✦</b> Uma vez Flamengo, sempre Flamengo</span></div><section className="shop" id="colecao"><div className="section-head"><div><div className="section-kicker">Para vestir o presente</div><h2>Temporada 26/27</h2></div><div className="filters"><label className="search-wrap"><Search size={15} /><input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Buscar camisa..." aria-label="Buscar camisa" /></label>{[['all', 'Todas'], ['current', 'Atual'], ['retro', 'Retrôs']].map(([value, label]) => <button className={`filter ${filter === value ? 'active' : ''}`} key={value} onClick={() => setFilter(value)}>{label}</button>)}</div></div><div className="product-grid">{visibleProducts.length ? visibleProducts.map(product => <ProductCard key={product.id} product={product} onAdd={addToCart} />) : <p className="empty">Nenhuma camisa encontrada.</p>}</div></section><section className="story" id="manifesto"><h2>Mais que um<br />uniforme.</h2><p>É o abraço no gol, a camisa no varal, o vermelho e preto que atravessa gerações. Na Nação 1895, cada peça é escolhida para honrar o passado e jogar junto com o futuro.</p></section></main><footer><span className="brand-name">NAÇÃO 1895<span>FUTEBOL CLUBE</span></span><small>© 2026 Nação 1895. Produto inspirado na paixão rubro-negra.</small></footer><Cart items={cart} open={cartOpen} onClose={() => setCartOpen(false)} /></div>;
}
