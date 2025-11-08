/* scripts.js - UI logic for shop + interactions */

// Utility
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* --- Lazy loader using IntersectionObserver --- */
function setupLazyLoad() {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const img = e.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    o.unobserve(img);
                }
            });
        }, { rootMargin: "200px 0px" });
        lazyImgs.forEach(img => obs.observe(img));
    } else {
        // fallback: load all
        lazyImgs.forEach(img => img.src = img.dataset.src);
    }
}

/* --- SHOP PAGE RENDERING --- */
function renderShop(cards) {
    const grid = $('#grid');
    if (!grid) return;
    grid.innerHTML = '';
    cards.forEach(card => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
      <div class="card-media" data-id="${card.id}">
        <img data-src="${imgUrl(card.seed, 420, 560)}" alt="${escapeHtml(card.name)}" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="card-title">${escapeHtml(card.name)}</div>
        <div class="card-meta">${escapeHtml(card.category)}</div>
        <div class="card-meta">${escapeHtml(truncate(card.desc, 70))}</div>
        <div class="price">
          <div class="badge">${card.price === "Free" ? "Collect" : "Special"}</div>
          <div class="amount">${card.price}</div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button class="btn view" data-id="${card.id}">View</button>
          ${card.price === "Free" ? `<button class="btn add" data-id="${card.id}">Add</button>` : `<button class="btn buy" data-id="${card.id}">Buy</button>`}
        </div>
      </div>
    `;
        grid.appendChild(el);
    });
    setupLazyLoad();
    attachCardEvents();
}

/* helper functions */
function truncate(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s }
function escapeHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") }

/* --- events for view / buy / add --- */
function attachCardEvents() {
    $$('.card .view').forEach(b => b.onclick = e => openDetail(e.target.dataset.id));
    $$('.card .buy').forEach(b => b.onclick = e => openCheckout([Number(e.target.dataset.id)]));
    $$('.card .add').forEach(b => b.onclick = e => {
        addToCart(Number(e.target.dataset.id));
    });
    // click on media also open
    $$('.card-media').forEach(cm => cm.onclick = e => openDetail(cm.dataset.id));
}

/* --- Search + filters + pagination --- */
let currentFilter = { q: '', category: 'All', price: 'All' };
let currentPage = 1;
const PAGE_SIZE = 12;

function applyFiltersAndRender() {
    const q = currentFilter.q.toLowerCase();
    let out = CARDS.filter(c => {
        if (currentFilter.category !== 'All' && c.category !== currentFilter.category) return false;
        if (currentFilter.price === 'Free' && c.price !== 'Free') return false;
        if (currentFilter.price === 'Paid' && c.price === 'Free') return false;
        if (q && !c.name.toLowerCase().includes(q)) return false;
        return true;
    });
    // pagination
    const total = out.length;
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (currentPage > pages) currentPage = pages;
    const start = (currentPage - 1) * PAGE_SIZE;
    const slice = out.slice(start, start + PAGE_SIZE);
    renderShop(slice);
    renderPagination(pages);
}

function renderPagination(pages) {
    const wrap = $('#pagination');
    if (!wrap) return;
    wrap.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
        const b = document.createElement('button');
        b.className = 'page-btn';
        b.textContent = i;
        if (i === currentPage) b.style.background = 'linear-gradient(90deg,var(--accent1),#4be0c4)', b.style.color = '#051217';
        b.onclick = () => { currentPage = i; applyFiltersAndRender(); };
        wrap.appendChild(b);
    }
}

/* --- Detail modal / card page --- */
function openDetail(id) {
    const card = CARDS.find(c => c.id == id);
    if (!card) return;
    // if on shop page show modal, otherwise go to card.html with ?id=
    if (location.pathname.endsWith('shop.html') || location.pathname.endsWith('/') || location.pathname.endsWith('index.html')) {
        const modal = $('#modal');
        if (!modal) return;
        modal.querySelector('.modal-media img').src = imgUrl(card.seed, 800, 1000);
        modal.querySelector('.modal-content h3').textContent = card.name;
        modal.querySelector('.modal-content .cat').textContent = card.category;
        modal.querySelector('.modal-content .desc').textContent = card.desc;
        modal.querySelector('.modal-content .price').textContent = card.price;
        modal.classList.add('active');
        $('#modal-close').onclick = () => modal.classList.remove('active');
        $('#modal-buy').onclick = () => {
            modal.classList.remove('active');
            if (card.price === "Free") addToCart(card.id); else openCheckout([card.id]);
        };
    } else {
        location.href = `card.html?id=${id}`;
    }
}

/* --- Cart --- */
let CART = JSON.parse(localStorage.getItem('cart_v1') || '[]');
function addToCart(id) {
    const card = CARDS.find(c => c.id === id);
    if (!card) return;
    CART.push(card);
    localStorage.setItem('cart_v1', JSON.stringify(CART));
    showCartToast(`${card.name} added`);
    updateCartCount();
}
function updateCartCount() { const el = $('#cart-count'); if (el) el.textContent = CART.length; }
function showCartToast(msg) {
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.position = 'fixed'; el.style.right = '20px'; el.style.bottom = '90px'; el.style.padding = '10px 14px'; el.style.borderRadius = '8px';
    el.style.background = 'linear-gradient(90deg,var(--accent1),#4be0c4)'; el.style.color = '#041217'; el.style.zIndex = 9999; el.style.boxShadow = '0 10px 30px rgba(2,6,23,0.6)';
    document.body.appendChild(el);
    setTimeout(() => el.style.opacity = '0', 1500);
    setTimeout(() => el.remove(), 2400);
}

/* --- Checkout flow --- */
function openCheckout(ids) {
    // store selected ids in session and go to checkout page
    sessionStorage.setItem('checkout_items', JSON.stringify(ids));
    location.href = 'checkout.html';
}

/* --- Card page render (card.html) --- */
function renderCardPage() {
    const el = $('#card-root'); if (!el) return;
    const params = new URLSearchParams(location.search);
    const id = Number(params.get('id'));
    const card = CARDS.find(c => c.id === id);
    if (!card) { el.innerHTML = '<p>Card not found.</p>'; return; }
    el.innerHTML = `
    <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
      <div style="flex:0 0 360px;border-radius:12px;overflow:hidden"><img src="${imgUrl(card.seed, 800, 1100)}" style="width:100%;display:block" alt="${card.name}"></div>
      <div style="flex:1;min-width:260px">
        <h2 style="font-family:'Cinzel',serif;color:var(--accent1)">${card.name}</h2>
        <div style="color:var(--muted);margin-top:6px">${card.category}</div>
        <p style="margin-top:14px;color:var(--muted);max-width:720px">${card.desc}</p>
        <div style="margin-top:22px;display:flex;gap:12px;align-items:center">
          <div style="font-weight:700;font-size:18px">${card.price}</div>
          ${card.price === "Free" ? `<button class="btn" id="addCart">Add to Collection</button>` : `<button class="btn" id="buyNow">Buy Now</button>`}
        </div>
      </div>
    </div>
  `;
    if ($('#addCart')) $('#addCart').onclick = () => { addToCart(card.id) };
    if ($('#buyNow')) $('#buyNow').onclick = () => openCheckout([card.id]);
}

/* --- Checkout page render --- */
function renderCheckout() {
    const el = $('#checkout-root'); if (!el) return;
    const items = JSON.parse(sessionStorage.getItem('checkout_items') || '[]');
    const list = items.map(id => CARDS.find(c => c.id === id)).filter(Boolean);
    let total = 0;
    list.forEach(i => total += (i.price === "Free" ? 0 : parseFloat(i.price.replace('$', ''))));
    el.innerHTML = `
    <h2 style="font-family:'Cinzel',serif;color:var(--accent1)">Checkout</h2>
    <div style="margin-top:12px">${list.map(i => `<div style="display:flex;gap:12px;align-items:center;margin:8px 0"><img src="${imgUrl(i.seed, 120, 160)}" style="width:80px;height:100px;object-fit:cover;border-radius:8px"><div><div style="font-weight:700">${i.name}</div><div style="color:var(--muted)">${i.price}</div></div></div>`).join('')}</div>
    <div style="margin-top:18px;font-weight:700">Total: $${total.toFixed(2)}</div>
    <form id="fake-pay" style="margin-top:14px;max-width:420px">
      <input class="input" placeholder="Full name" required/><br/><br/>
      <input class="input" placeholder="Card number (fake)" required/><br/><br/>
      <button class="btn" type="submit">Place Order</button>
    </form>
  `;
    $('#fake-pay').onsubmit = (ev) => {
        ev.preventDefault();
        sessionStorage.removeItem('checkout_items');
        showCartToast('Order placed — check your inbox (demo)');
        setTimeout(() => location.href = 'shop.html', 900);
    }
}

/* --- Utilities: populate category select --- */
function initFilters() {
    const cats = Array.from(new Set(CARDS.map(c => c.category)));
    const sel = $('#filter-category');
    if (!sel) return;
    sel.innerHTML = `<option>All</option>` + cats.map(c => `<option>${c}</option>`).join('');
    $('#filter-price').onchange = e => { currentFilter.price = e.target.value; currentPage = 1; applyFiltersAndRender(); };
    sel.onchange = e => { currentFilter.category = e.target.value; currentPage = 1; applyFiltersAndRender(); };
    $('#search').oninput = e => { currentFilter.q = e.target.value; currentPage = 1; applyFiltersAndRender(); };
    $('#clear-filters') && ($('#clear-filters').onclick = () => {
        $('#search').value = ''; $('#filter-category').value = 'All'; $('#filter-price').value = 'All';
        currentFilter = { q: '', category: 'All', price: 'All' }; currentPage = 1; applyFiltersAndRender();
    });
}

/* --- init on shop page --- */
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // determine which page features exist
    if ($('#grid')) { // shop page
        initFilters();
        applyFiltersAndRender();
    }
    if ($('#card-root')) renderCardPage();
    if ($('#checkout-root')) renderCheckout();
    // modal close by overlay
    const modal = $('#modal'); if (modal) modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active') }
});
