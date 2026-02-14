/* =============================================
   Baby Shop Demo — Main JavaScript
   Product data, rendering, WhatsApp links, nav
   ============================================= */

// ---- Config ----
const WHATSAPP_NUMBER = '254700000000';
const SHOP_NAME = 'Little Angels Baby Shop';

// ---- Product Data ----
const products = [
  {
    id: 1,
    name: 'Soft Cotton Romper',
    price: 850,
    image: 'images/romper.jpg',
    description: 'Comfortable cotton romper for babies aged 0–12 months. Soft, breathable fabric perfect for Nairobi weather. Available in blue, pink, and white.',
    category: 'Clothing'
  },
  {
    id: 2,
    name: 'Floral Baby Dress',
    price: 1200,
    image: 'images/dress.jpg',
    description: 'Beautiful floral print dress for baby girls. Lightweight and easy to wash. Sizes available for 3–24 months.',
    category: 'Clothing'
  },
  {
    id: 3,
    name: 'Premium Diapers Pack',
    price: 1450,
    image: 'images/diapers.jpg',
    description: 'Pack of 40 premium quality diapers. Super absorbent and gentle on baby skin. Available in newborn, small, medium, and large sizes.',
    category: 'Essentials'
  },
  {
    id: 4,
    name: 'Anti-Colic Feeding Bottle',
    price: 650,
    image: 'images/bottle.jpg',
    description: 'BPA-free feeding bottle with anti-colic valve. Easy to clean and assemble. 260ml capacity, suitable from birth.',
    category: 'Feeding'
  },
  {
    id: 5,
    name: 'Colorful Rattle Toy',
    price: 450,
    image: 'images/toy.jpg',
    description: 'Safe, non-toxic rattle toy for babies. Bright colors stimulate visual development. Lightweight and easy for small hands to hold.',
    category: 'Toys'
  },
  {
    id: 6,
    name: 'Soft Baby Blanket',
    price: 950,
    image: 'images/blanket.jpg',
    description: 'Ultra-soft fleece baby blanket. Perfect for swaddling, stroller, or crib use. Machine washable. 80×100cm.',
    category: 'Bedding'
  },
  {
    id: 7,
    name: 'Baby Walking Shoes',
    price: 780,
    image: 'images/shoes.jpg',
    description: 'Soft-sole walking shoes for first steps. Non-slip bottom, easy velcro closure. Available in sizes 0–18 months.',
    category: 'Clothing'
  },
  {
    id: 8,
    name: 'Knitted Baby Hat',
    price: 350,
    image: 'images/hat.jpg',
    description: 'Warm knitted hat for babies. Stretchy fit for 0–12 months. Available in multiple colors.',
    category: 'Clothing'
  },
  {
    id: 9,
    name: 'Baby Socks Set (3 Pairs)',
    price: 400,
    image: 'images/socks.jpg',
    description: 'Set of 3 pairs of cotton baby socks. Anti-slip dots on the sole. Soft elastic that won\'t pinch. Fits 0–24 months.',
    category: 'Clothing'
  },
  {
    id: 10,
    name: 'Baby Lotion (200ml)',
    price: 550,
    image: 'images/lotion.jpg',
    description: 'Gentle, hypoallergenic baby lotion. Moisturizes and protects delicate skin. Dermatologist tested, fragrance-free.',
    category: 'Care'
  },
  {
    id: 11,
    name: 'Baby Carrier Wrap',
    price: 2800,
    image: 'images/carrier.jpg',
    description: 'Ergonomic baby carrier wrap. Distributes weight evenly for comfortable carrying. Suitable from newborn to 15kg. Machine washable.',
    category: 'Gear'
  },
  {
    id: 12,
    name: 'Hooded Baby Towel',
    price: 750,
    image: 'images/towel.jpg',
    description: 'Soft hooded towel for bath time. 100% cotton, highly absorbent. Cute animal ear design. 70×70cm.',
    category: 'Bath'
  }
];

// ---- WhatsApp Link Generator ----
function getWhatsAppLink(productName) {
  const message = encodeURIComponent(
    `Hi ${SHOP_NAME}! I'm interested in ordering: *${productName}*. Please share availability and delivery details. Thank you!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

function getGeneralWhatsAppLink() {
  const message = encodeURIComponent(
    `Hi ${SHOP_NAME}! I'd like to place an order. Can you help me?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// ---- WhatsApp SVG Icon ----
function waIconSVG(size = 20) {
  return `<svg class="wa-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>`;
}

// ---- Product Card HTML ----
function renderProductCard(product) {
  return `
    <div class="product-card">
      <a href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy">
      </a>
      <div class="product-card-body">
        <a href="product.html?id=${product.id}">
          <div class="product-card-name">${product.name}</div>
        </a>
        <div class="product-card-price">KES ${product.price.toLocaleString()}</div>
        <a href="${getWhatsAppLink(product.name)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm btn-full">
          ${waIconSVG(16)} Order
        </a>
      </div>
    </div>
  `;
}

// ---- Render Product Grids ----
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products');
  if (!grid) return;
  grid.innerHTML = products.slice(0, 6).map(renderProductCard).join('');
}

function renderShopProducts() {
  const grid = document.getElementById('shop-products');
  if (!grid) return;
  grid.innerHTML = products.map(renderProductCard).join('');
}

// ---- Product Detail ----
function renderProductDetail() {
  const container = document.getElementById('product-detail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = `
      <div class="container" style="text-align:center; padding: 3rem 1rem;">
        <p>Product not found.</p>
        <a href="shop.html" class="product-detail-back">← Back to Shop</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} — ${SHOP_NAME}`;

  container.innerHTML = `
    <div class="container">
      <div class="product-detail-layout">
        <img src="${product.image}" alt="${product.name}" class="product-detail-img">
        <div class="product-detail-info">
          <h1 class="product-detail-name">${product.name}</h1>
          <div class="product-detail-price">KES ${product.price.toLocaleString()}</div>
          <p class="product-detail-desc">${product.description}</p>
          <a href="${getWhatsAppLink(product.name)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-full">
            ${waIconSVG()} Order on WhatsApp
          </a>
          <p class="product-detail-note">Payment via M-Pesa. Delivery discussed on WhatsApp.</p>
          <a href="shop.html" class="product-detail-back">← Back to Shop</a>
        </div>
      </div>
    </div>
  `;
}

// ---- Set WhatsApp Links ----
function setWhatsAppLinks() {
  // Hero CTA
  const heroCta = document.getElementById('hero-cta');
  if (heroCta) {
    heroCta.href = getGeneralWhatsAppLink();
  }

  // Sticky button
  const stickyWa = document.getElementById('sticky-whatsapp');
  if (stickyWa) {
    stickyWa.href = getGeneralWhatsAppLink();
  }

  // Any general WA links
  document.querySelectorAll('[data-wa-link]').forEach(el => {
    el.href = getGeneralWhatsAppLink();
  });
}

// ---- Mobile Nav Toggle ----
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    menu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  setWhatsAppLinks();
  renderFeaturedProducts();
  renderShopProducts();
  renderProductDetail();
});
