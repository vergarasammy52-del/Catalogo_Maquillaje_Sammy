/**
 * LUMIÈRE BEAUTY — app.js
 * Funcionalidades: catálogo, filtros, carrito, modal, countdown, animaciones
 */

/* ================================================================
   DATOS DE PRODUCTOS
   ================================================================ */
const PRODUCTS = [
  {
    id: 1,
    name: "Ruby Rose Velvet",
    cat: "labiales",
    catLabel: "Labial",
    price: 000,
    oldPrice: 68000,
    desc: "Fórmula ultra-pigmentada que dura hasta 18 horas sin resecar. Efecto terciopelo irresistible.",
    img: "https://images.unsplash.com/photo-1586495777744-4e6232bf2ea7?w=500&q=80",
    badge: "40% OFF",
    badgeType: "offer",
    scarcity: "⚡ Solo quedan 4 unidades",
    stars: 4.9,
    reviews: "1.2k reseñas",
    soldOut: true
  },
  {
    id: 2,
    name: "Satin Glow Foundation",
    cat: "bases",
    catLabel: "Base",
    price: 000,
    oldPrice: null,
    desc: "Cobertura media-total con acabado satinado. SPF 30. Duración de 24 horas. 40 tonos disponibles.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    badge: "Nuevo",
    badgeType: "new",
    scarcity: "🔥 Más vendido esta semana",
    stars: 4.8,
    reviews: "987 reseñas",
    soldOut: true
  },
  {
    id: 3,
    name: "Smoky Eyes Palette",
    cat: "sombras",
    catLabel: "Paleta",
    price: 000,
    oldPrice: 149000,
    desc: "12 tonos altamente pigmentados. Acabados matte, shimmer y glitter. Perfecta para looks día y noche.",
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80",
    badge: "Top Ventas",
    badgeType: "offer",
    scarcity: "⚡ Últimas 7 unidades",
    stars: 5.0,
    reviews: "2.1k reseñas",
    soldOut: true
  },
  {
    id: 4,
    name: "Rice Raw Pulp Rejuvenating Set",
    cat: "cuidado",
    catLabel: "Cuidado Facial",
    price: 54990,
    oldPrice: null,
    desc: "Kit facial rejuvenecedor con extracto de arroz. Hidrata profundamente, nutre la piel, reduce los poros y brinda un cuidado suave y duradero.",
    img: "Img-Productos/Cuidado Facial/Rice Raw Pulp Rejuvenating Set.png",
    badge: "Nuevo",
    badgeType: "new",
    scarcity: null,
    stars: 4.7,
    reviews: "543 reseñas",
    soldOut: false
  },
  {
    id: 5,
    name: "Rice Raw Pulp Whitening Travel Set",
    cat: "cuidado",
    catLabel: "Cuidado Facial",
    price: 27990,
    oldPrice: null,
    desc: "Kit facial de viaje con extracto de arroz. Incluye limpiador, tónico, loción, sérum y crema facial. Ilumina la piel, hidrata y mejora la textura en cualquier lugar.",
    img: "Img-Productos/Cuidado Facial/Rice Raw Pulp Whitening Travel Set.png",
    badge: "Nuevo",
    badgeType: "new",
    scarcity: "Edición viaje",
    stars: 4.5,
    reviews: "198 reseñas",
    soldOut: false
  },
  {
    id: 6,
    name: "Golden Hour Highlighter",
    cat: "sombras",
    catLabel: "Iluminador",
    price: 000,
    oldPrice: null,
    desc: "Iluminador en polvo con partículas de oro. Brillo de larga duración para un look radiante.",
    img: "https://images.unsplash.com/photo-1583241800698-e8ab01d2a0bf?w=500&q=80",
    badge: "Top Ventas",
    badgeType: "offer",
    scarcity: "🔥 En tendencia ahora",
    stars: 4.9,
    reviews: "1.4k reseñas",
    soldOut: true
  },
  {
    id: 7,
    name: "Velvet Matte Foundation",
    cat: "bases",
    catLabel: "Base",
    price: 000,
    oldPrice: 120000,
    desc: "Control total del brillo con acabado matte de larga duración. Fórmula sin aceites. 30 tonos.",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
    badge: "21% OFF",
    badgeType: "offer",
    scarcity: "⚡ Solo 5 unidades",
    stars: 4.8,
    reviews: "892 reseñas",
    soldOut: true
  },
  {
    id: 8,
    name: "Rose Hyaluronic Acid Moisturizing Set",
    cat: "cuidado",
    catLabel: "Cuidado Facial",
    price: 54990,
    oldPrice: null,
    desc: "Kit facial con ácido hialurónico y extracto de rosa. Proporciona hidratación profunda, efecto antioxidante, ayuda a reducir signos de la edad y minimiza los poros.",
    img: "Img-Productos/Cuidado Facial/Rose Hyaluronic Acid Moisturizing Set.png",
    badge: "98% Natural",
    badgeType: "hot",
    scarcity: null,
    stars: 4.8,
    reviews: "421 reseñas",
    soldOut: false
  }
];

/* ================================================================
   ESTADO GLOBAL
   ================================================================ */
let cart = [];         // { product, qty }
let activeModal = null; // producto en modal

/* ================================================================
   FORMATEAR PRECIO (COP)
   ================================================================ */
const fmt = n => '$' + n.toLocaleString('es-CO');

/* ================================================================
   RENDERIZAR TARJETAS DE PRODUCTO
   ================================================================ */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === filter);

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.style.transitionDelay = `${i * 0.08}s`;
    card.dataset.cat = p.cat;
    card.innerHTML = `
      <div class="product-card__img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.soldOut
          ? `<span class="product-card__badge product-card__badge--soldout">Agotado</span>`
          : ''}
        ${p.badge
          ? `<span class="product-card__badge product-card__badge--${p.badgeType}">${p.badge}</span>`
          : ''}
        <button class="product-card__quick" data-id="${p.id}">Vista rápida 👁</button>
      </div>
      <div class="product-card__body">
        <p class="product-card__cat">${p.catLabel}</p>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__stars">${'★'.repeat(Math.round(p.stars))}${'☆'.repeat(5 - Math.round(p.stars))} <span style="color:var(--gray);font-size:.75rem">(${p.reviews})</span></div>
        <div class="product-card__footer">
          <div class="product-card__prices">
            <span class="product-card__price">${fmt(p.price)}</span>
            ${p.oldPrice ? `<span class="product-card__old-price">${fmt(p.oldPrice)}</span>` : ''}
            ${p.scarcity ? `<span class="product-card__scarcity">${p.scarcity}</span>` : ''}
          </div>
          <button class="product-card__btn" data-id="${p.id}" title="Agregar al carrito">
            <i class="ri-shopping-bag-line"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
    // trigger reveal animation
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('visible')));
  });

  // Eventos en tarjetas
  grid.querySelectorAll('.product-card__btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const p = PRODUCTS.find(x => x.id === +btn.dataset.id);
      addToCart(p);
    });
  });

  grid.querySelectorAll('.product-card__quick').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const p = PRODUCTS.find(x => x.id === +btn.dataset.id);
      openModal(p);
    });
  });

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.querySelector('.product-card__btn').dataset.id;
      const p = PRODUCTS.find(x => x.id === +id);
      openModal(p);
    });
  });
}

/* ================================================================
   FILTRO DE CATEGORÍAS
   ================================================================ */
document.querySelectorAll('.cat-card').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-card').forEach(b => b.classList.remove('cat-card--active'));
    btn.classList.add('cat-card--active');
    renderProducts(btn.dataset.cat);
    // scroll suave a productos
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ================================================================
   CARRITO
   ================================================================ */
function addToCart(product) {
  const existing = cart.find(c => c.product.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ product, qty: 1 });
  }
  updateCartUI();
  openCart();
  animateBadge();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.product.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  const count = cart.reduce((sum, c) => sum + c.qty, 0);

  // badge
  const badge = document.getElementById('cartBadge');
  badge.textContent = count;

  // body
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">Tu bolsa está vacía 🛍️</p>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  document.getElementById('cartTotal').textContent = fmt(total);

  body.innerHTML = cart.map(c => `
    <div class="cart-item">
      <img src="${c.product.img}" alt="${c.product.name}" />
      <div class="cart-item__info">
        <p class="cart-item__name">${c.product.name} ${c.qty > 1 ? `x${c.qty}` : ''}</p>
        <p class="cart-item__price">${fmt(c.product.price * c.qty)}</p>
      </div>
      <button class="cart-item__remove" data-id="${c.product.id}">
        <i class="ri-delete-bin-line"></i>
      </button>
    </div>
  `).join('');

  body.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(+btn.dataset.id));
  });
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function animateBadge() {
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('pop');
  void badge.offsetWidth;
  badge.classList.add('pop');
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// Pedir por WhatsApp desde carrito
document.getElementById('whatsappOrder').addEventListener('click', () => {
  const list = cart.map(c => `• ${c.product.name} x${c.qty} (${fmt(c.product.price * c.qty)})`).join('\n');
  const total = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  const msg = encodeURIComponent(
    `Hola! Quiero hacer el siguiente pedido de LUMIÈRE Beauty 🛍️\n\n${list}\n\nTotal: ${fmt(total)}\n\n¿Cómo procedo?`
  );
  window.open(`https://wa.me/573001234567?text=${msg}`, '_blank');
});

/* ================================================================
   MODAL DE PRODUCTO
   ================================================================ */
function openModal(p) {
  activeModal = p;
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalImg').alt = p.name;
  document.getElementById('modalBadge').textContent = p.badge || '';
  document.getElementById('modalBadge').style.display = p.badge ? 'block' : 'none';
  document.getElementById('modalCat').textContent = p.catLabel;
  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalReviews').textContent = `(${p.reviews})`;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalPrice').textContent = fmt(p.price);
  const old = document.getElementById('modalOldPrice');
  old.textContent = p.oldPrice ? fmt(p.oldPrice) : '';
  const scar = document.getElementById('modalScarcity');
  scar.textContent = p.scarcity || '';
  scar.style.display = p.scarcity ? 'block' : 'none';

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  activeModal = null;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

document.getElementById('modalAddCart').addEventListener('click', () => {
  if (activeModal) {
    addToCart(activeModal);
    closeModal();
  }
});

document.getElementById('modalWhatsapp').addEventListener('click', () => {
  if (!activeModal) return;
  const msg = encodeURIComponent(
    `Hola! Me interesa el producto *${activeModal.name}* (${fmt(activeModal.price)}) de LUMIÈRE Beauty. ¿Cómo lo adquiero? 💄`
  );
  window.open(`https://wa.me/573001234567?text=${msg}`, '_blank');
});

/* ================================================================
   COUNTDOWN TIMER
   ================================================================ */
(function initCountdown() {
  // Tiempo destino: 5h 42m desde carga
  const end = new Date(Date.now() + (5 * 3600 + 42 * 60) * 1000);

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = Math.max(0, end - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-h').textContent = pad(h);
    document.getElementById('cd-m').textContent = pad(m);
    document.getElementById('cd-s').textContent = pad(s);
    if (diff > 0) setTimeout(tick, 1000);
  }
  tick();
})();

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function observeRevealElements() {
  document.querySelectorAll('.reveal, .reveal-right').forEach(el => revealObserver.observe(el));
}
observeRevealElements();

// Re-observar tras filtrar productos
const originalRender = renderProducts;

/* ================================================================
   HEADER SCROLL
   ================================================================ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ================================================================
   MENÚ MÓVIL
   ================================================================ */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
// Cerrar nav al hacer clic en enlace
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mainNav.classList.remove('open'));
});

/* ================================================================
   INIT
   ================================================================ */
renderProducts();
