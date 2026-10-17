/* =============================================================
   Gasthaus Reinthaler – script.js
   1. Menu data (edit categories, dishes and prices here)
   2. Menu: picture cards and detail view
   3. Hide photos that are missing
   4. Navbar shadow on scroll
   5. Mobile menu open / close
   6. Live "open / closed" status (Vienna time)
   7. Current year in the footer
   ============================================================= */


/* =============================================================
   1. MENU DATA
   -------------------------------------------------------------
   Each main category (one picture card) has:
     id      – short name for the category
     label   – German name on the card and heading
     en      – English subtitle
     blurb   – short line shown on the card
     image   – photo path (the card photos themselves are set in index.html)
     groups  – sub-sections, each with a label, en and items

   Two kinds of items:
     • A dish:  { name, en, price, badge }
     • A list:  { name, en, rows: [ [name, size, price], ... ] }
                (used for drinks, wines and sides with several prices)

   badge is optional: 'Hausklassiker', 'Empfehlung', 'Traditionell', 'Vegetarisch'
   ============================================================= */
const MENU = [
  /* ---------- WIENER SPEISEN ---------- */
  {
    id: 'wiener-speisen',
    label: 'Wiener Speisen',
    en: 'Viennese main dishes',
    blurb: 'Schnitzel, Rostbraten & Gebackenes – frisch auf Bestellung',
    image: 'images/schnitzel.jpg',
    groups: [
      {
        label: 'Hauptspeisen auf Bestellung',
        en: 'Made to order',
        items: [
          { name: 'Original Wiener Schnitzel vom Kalb mit gemischtem Salat', en: 'Viennese breaded veal cutlet with mixed salad', price: '26,40 €', badge: 'Hausklassiker' },
          { name: 'Wiener Schnitzel vom Schwein mit gemischtem Salat',       en: 'Viennese breaded pork cutlet with mixed salad', price: '17,40 €' },
          { name: 'Zwiebelrostbraten mit Bratkartoffeln',                    en: 'Roast beef with onions and fried potatoes',     price: '21,60 €', badge: 'Empfehlung' },
          { name: 'Rostbraten mit Paprika-, Tomaten- & Zwiebelsauce und Bratkartoffeln', en: 'Roast beef with pepper, tomato and onion sauce, fried potatoes', price: '21,60 €' },
          { name: 'Gegrilltes Schweinekotelett mit Natursaftl und Reis',     en: 'Grilled pork cutlet with gravy and rice',       price: '17,40 €' },
          { name: 'Gegrilltes Schweinekotelett mit Champignon-Cremesauce und Reis', en: 'Grilled pork cutlet with creamy mushroom sauce and rice', price: '17,80 €' },
          { name: 'Schweinekotelett in Hülle mit Ei & gemischtem Salat',     en: 'Egg-fried pork cutlet with mixed salad',        price: '17,40 €' },
          { name: 'Schweinekarree mit Paprika-Zwiebelsauce und Pommes frites', en: 'Pork loin with pepper-onion sauce and French fries', price: '17,20 €' },
          { name: 'Schweinekarree mit Knoblauchsauce und Bratkartoffeln',    en: 'Pork loin with garlic sauce and fried potatoes', price: '17,20 €' },
          { name: 'Gebackene Leber mit Erdäpfelsalat',                       en: 'Breaded fried liver with potato salad',         price: '13,60 €' },
          { name: 'Geröstete Leber mit Zwiebeln und Salzerdäpfeln',          en: 'Sliced fried liver with onions and boiled potatoes', price: '13,20 €' },
          { name: 'Hausgemachte Bratwürste mit Röstkartoffeln und Sauerkraut', en: 'Homemade sausages with roast potatoes and sauerkraut', price: '14,50 €' },
          { name: 'Gebackene Hühnerbrust mit gemischtem Salat',              en: 'Breaded fried chicken breast with mixed salad', price: '17,80 €' },
          { name: 'Gegrillte Hühnerbrust mit Natursaftl und Reis',           en: 'Grilled chicken breast with gravy and rice',    price: '17,80 €' },
          { name: 'Geröstete Serviettenknödel mit Ei und grünem Salat',      en: 'Fried bread dumpling slices with egg and green salad', price: '11,40 €', badge: 'Vegetarisch' },
          { name: 'Gebackene Champignons mit Sauce Tartare',                 en: 'Breaded fried mushrooms with tartar sauce',     price: '11,60 €', badge: 'Vegetarisch' },
          { name: 'Gebackener Emmentaler mit Sauce Tartare',                 en: 'Breaded fried Emmental cheese with tartar sauce', price: '12,20 €', badge: 'Vegetarisch' },
        ],
      },
      {
        label: 'Beilagen & Salate',
        en: 'Side dishes & salads',
        items: [
          { name: 'Semmelknödel, Reis, Röstkartoffeln, Pommes frites oder Salzerdäpfel', en: 'Bread dumpling, rice, roast potatoes, French fries or boiled potatoes', price: 'je 3,70 €' },
          { name: 'Gemischter Salat', en: 'Mixed salad', price: '5,40 €' },
          { name: 'Erdäpfelsalat', en: 'Potato salad', rows: [
            ['Erdäpfelsalat', '', '5,60 €'],
            ['mit Mayonnaise', '', '6,00 €'],
          ] },
          { name: 'Krautsalat, Grüner Salat, Tomatensalat oder Gurkensalat', en: 'Cabbage, green, tomato or cucumber salad', price: 'je 4,70 €' },
          { name: 'Schinken-Ei-Salatplatte', en: 'Salad platter with ham and egg', price: '9,80 €' },
          { name: 'Gebäck & Saucen', en: 'Bread rolls & condiments', rows: [
            ['Semmel', 'pro Stück', '1,80 €'],
            ['Ketchup, Mayonnaise oder Senf', '', '0,50 €'],
          ] },
        ],
      },
    ],
  },

  /* ---------- SUPPEN & HAUSMANNSKOST ---------- */
  {
    id: 'suppen-hausmannskost',
    label: 'Suppen & Hausmannskost',
    en: 'Soups & home-style dishes',
    blurb: 'Rindsuppe, Tafelspitz, Schweinsbraten & Gulasch',
    image: 'images/soup.jpg',
    groups: [
      {
        label: 'Suppen',
        en: 'Soups',
        items: [
          { name: 'Rindsuppe mit Frittaten',   en: 'Beef stock with sliced pancakes', price: '5,20 €' },
          { name: 'Rindsuppe mit Leberknödel', en: 'Beef stock with liver dumpling',  price: '5,20 €' },
          { name: 'Rindsuppe mit Ei',          en: 'Beef stock with egg',             price: '5,20 €' },
          { name: 'Gulaschsuppe',              en: 'Goulash soup',                    price: '6,80 €' },
        ],
      },
      {
        label: 'Hausmannskost',
        en: 'Home-style dishes · ready to serve',
        items: [
          { name: 'Kümmelbraten / Schweinsbraten mit Saft, Semmelknödel und gemischtem Salat', en: 'Roast pork with gravy, bread dumpling and mixed salad', price: '17,40 €', badge: 'Traditionell' },
          { name: 'Tafelspitz mit Gemüse und Rösterdäpfeln', en: 'Boiled beef with vegetables and roast potatoes', price: '18,60 €', badge: 'Traditionell' },
          { name: 'Wiener Rinds-Gulasch mit Salzerdäpfeln',  en: 'Viennese beef goulash with boiled potatoes',    price: '15,20 €' },
          { name: 'Wiener Rinds-Gulasch mit Semmelknödel',   en: 'Viennese beef goulash with bread dumpling',     price: '15,40 €' },
        ],
      },
    ],
  },

  /* ---------- WEINE ---------- */
  {
    id: 'weine',
    label: 'Österreichische Weine',
    en: 'Austrian wines & spritzer',
    blurb: 'Grüner Veltliner, Zweigelt, Gemischter Satz & Spritzer',
    image: 'images/wine.jpg',
    groups: [
      {
        label: 'Offene Weine',
        en: 'Wine by the glass',
        items: [
          { name: 'Offene Weißweine', en: 'White wine by the glass (1/8 l)', rows: [
            ['Grüner Veltliner', 'Weingut Brunthaler', '3,10 €'],
            ['Welschriesling', '', '3,40 €'],
            ['Gelber Muskateller', '', '4,00 €'],
            ['Gemischter Satz', 'Weingut Zahel', '4,60 €'],
            ['Spritzer Weiß', '1/4 l', '3,90 €'],
            ['Kaiserspritzer', '', '4,40 €'],
          ] },
          { name: 'Offene Rotweine', en: 'Red wine by the glass (1/8 l)', rows: [
            ['Blauer Portugieser', '', '3,10 €'],
            ['Zweigelt', '', '3,10 €'],
            ['Spritzer Rot', '1/4 l', '3,90 €'],
            ['Glühwein Weiß / Rot', '1/4 l', '6,40 €'],
          ] },
        ],
      },
      {
        label: 'Flaschenweine',
        en: 'Wine by the bottle (0,75 l)',
        items: [
          { name: 'Flaschenweine', en: 'Bottles · 0,75 l', rows: [
            ['Grüner Veltliner DAC', '', '19,20 €'],
            ['Riesling', '', '19,20 €'],
            ['Roter Veltliner', '', '22,60 €'],
            ['Gemischter Satz', 'Weingut Zahel', '23,40 €'],
            ['Blauer Zweigelt', '', '19,20 €'],
          ] },
        ],
      },
    ],
  },

  /* ---------- BIER & GETRÄNKE ---------- */
  {
    id: 'bier-getraenke',
    label: 'Gösser Bier & Getränke',
    en: 'Draught beer, drinks & coffee',
    blurb: 'Gösser vom Fass, Aperitifs, Kaffee & Schnaps',
    image: 'images/beer.jpg',
    groups: [
      {
        label: 'Bier',
        en: 'Beer',
        items: [
          { name: 'Gösser vom Fass', en: 'Draught beer', rows: [
            ['Gösser Spezial', '0,5 l', '5,20 €'],
            ['Gösser Spezial', '0,3 l', '4,30 €'],
            ['Gösser Zwickl (naturtrüb)', '0,5 l', '5,40 €'],
            ['Kräuter-Radler', '0,5 l', '5,20 €'],
          ] },
          { name: 'Flaschenbier', en: 'Bottled beer', rows: [
            ['Gösser Märzen', '0,5 l', '5,20 €'],
            ['Gösser Stiftsbräu Dunkel', '0,5 l', '5,20 €'],
            ['Gösser Alkoholfrei', '0,5 l', '5,20 €'],
            ['Weihenstephaner Weißbier', '0,5 l', '5,40 €'],
          ] },
        ],
      },
      {
        label: 'Aperitifs & Alkoholfreies',
        en: 'Aperitifs & soft drinks',
        items: [
          { name: 'Aperitifs', en: 'Aperitifs', rows: [
            ['Aperol Spritz', '1/4 l', '5,50 €'],
            ['Campari Soda', '', '4,80 €'],
            ['Campari Orange', '', '5,50 €'],
            ['Hochriegl Piccolo', '0,2 l', '8,20 €'],
          ] },
          { name: 'Alkoholfreie Getränke', en: 'Soft drinks', rows: [
            ['Apfelsaft', '1/4 l', '3,40 €'],
            ['Apfelsaft gespritzt', '', '2,50 €'],
            ['Almdudler', '', '3,40 €'],
            ['Coca-Cola / Orange', '1/4 l', '3,40 €'],
            ['Frucade', '', '3,80 €'],
            ['Römerquelle Mineralwasser', '0,3 l', '3,20 €'],
            ['Soda Zitron / Himbeer', '', '2,10 €'],
          ] },
        ],
      },
      {
        label: 'Kaffee, Tee & Schnaps',
        en: 'Coffee, tea & spirits',
        items: [
          { name: 'Kaffee & Tee', en: 'Coffee & tea', rows: [
            ['Wiener Melange', '', '4,20 €'],
            ['Verlängerter', 'Americano', '4,20 €'],
            ['Espresso', '', '3,00 €'],
            ['Espresso doppelt', '', '4,60 €'],
            ['Tee', 'Schwarz, Grün, Pfefferminze, Kamille', '3,00 €'],
            ['Tee mit Rum', '', '4,60 €'],
          ] },
          { name: 'Schnaps & Liköre', en: 'Spirits & liqueurs (2 cl)', rows: [
            ['Marillenbrand, Birnenbrand, Haselnuss, Schnaps, Jägermeister, Averna', '2 cl', '3,60 – 3,80 €'],
          ] },
        ],
      },
    ],
  },

  /* ---------- SÜSSSPEISEN ---------- */
  {
    id: 'suessspeisen',
    label: 'Süßspeisen',
    en: 'Desserts',
    blurb: 'Palatschinken & Schokosoufflé',
    image: 'images/dessert.jpg',
    groups: [
      {
        label: 'Süßspeisen',
        en: 'Desserts',
        items: [
          { name: 'Marillenpalatschinken', en: 'Pancakes with apricot jam', price: '6,80 €' },
          { name: 'Topfenpalatschinken',   en: 'Pancakes with sweet curd cheese', price: '7,20 €' },
          { name: 'Schokosoufflé mit Schokosauce und Schlagobers', en: 'Chocolate soufflé with chocolate sauce and whipped cream', price: '6,80 €' },
        ],
      },
    ],
  },
];


/* =============================================================
   2. MENU: PICTURE CARDS AND DETAIL VIEW
   ============================================================= */
const menuSection = document.getElementById('speisekarte');
const overviewEl  = document.getElementById('menu-overview');
const detailEl    = document.getElementById('menu-detail');

// Which CSS class each badge gets (colors are in style.css)
const BADGE_CLASS = {
  'Hausklassiker': 'badge-classic',
  'Empfehlung':    'badge-recommend',
  'Traditionell':  'badge-traditional',
  'Vegetarisch':   'badge-veggie',
};

// Small helper so text from the data is always shown as plain text
function esc(text) {
  return String(text).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
}

/* ---------- Picture cards (overview) ---------- */
// The 5 photo cards are written in index.html.
// Here we only make them clickable.
function renderOverview() {
  overviewEl.addEventListener('click', event => {
    const card = event.target.closest('.cat-card');
    if (card) openCategory(card.dataset.cat);
  });
}

/* ---------- Dish cards (detail view) ---------- */
function dishCard(item) {
  const badge = item.badge
    ? `<span class="badge ${BADGE_CLASS[item.badge] || ''}">${esc(item.badge)}</span>`
    : '';

  return `
    <article class="menu-card">
      <div class="menu-card-top">
        <h4 class="menu-name">${esc(item.name)}</h4>
        <span class="menu-leader" aria-hidden="true"></span>
        <span class="menu-price">${esc(item.price)}</span>
      </div>
      <p class="menu-en">${esc(item.en)}</p>
      ${badge}
    </article>`;
}

function listCard(item) {
  const rows = item.rows.map(([name, size, price]) => `
      <li class="menu-row">
        <span class="menu-row-name">${esc(name)}${size ? ` <span class="menu-row-size">${esc(size)}</span>` : ''}</span>
        <span class="menu-leader" aria-hidden="true"></span>
        <span class="menu-price">${esc(price)}</span>
      </li>`).join('');

  return `
    <article class="menu-card">
      <h4 class="menu-name">${esc(item.name)}</h4>
      <p class="menu-en">${esc(item.en)}</p>
      <ul class="menu-rows">${rows}</ul>
    </article>`;
}

function groupBlock(group) {
  const cards = group.items.map(item => (item.rows ? listCard(item) : dishCard(item))).join('');
  return `
    <div class="menu-group">
      <div class="menu-group-head">
        <h4 class="menu-group-title">${esc(group.label)}</h4>
        <p class="menu-group-en">${esc(group.en)}</p>
      </div>
      <div class="menu-grid">${cards}</div>
    </div>`;
}

function renderDetail(cat) {
  detailEl.innerHTML = `
    <div class="detail-head">
      <button type="button" class="back-btn" data-back>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        Zurück zur Übersicht
      </button>
      <div class="detail-title-wrap">
        <p class="detail-en">${esc(cat.en)}</p>
        <h3 class="detail-title">${esc(cat.label)}</h3>
      </div>
    </div>
    ${cat.groups.map(groupBlock).join('')}
    <div class="detail-foot">
      <button type="button" class="back-btn" data-back>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        Zurück zur Übersicht
      </button>
    </div>`;
}

/* ---------- Switching between overview and a category ---------- */
const FADE_OUT_MS = 200; // must match .is-leaving in style.css

// Replays the fade-in animation on an element
function playFade(el) {
  el.classList.remove('is-fading');
  void el.offsetWidth; // forces the browser to restart the animation
  el.classList.add('is-fading');
}

// Fades out the view that is showing, then shows the other one
let isSwitching = false; // ignores extra clicks while the fade is running

function switchView(from, to) {
  if (isSwitching) return false;
  isSwitching = true;
  from.classList.add('is-leaving');
  setTimeout(() => {
    from.hidden = true;
    from.classList.remove('is-leaving');
    to.hidden = false;
    playFade(to);
    scrollToMenuTop();
    isSwitching = false;
  }, FADE_OUT_MS);
  return true;
}

function scrollToMenuTop() {
  // Only scroll if the top of the menu is out of view
  const top = menuSection.getBoundingClientRect().top;
  if (top < 0) menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show one category's dishes
function openCategory(id) {
  const cat = MENU.find(c => c.id === id);
  if (!cat) return;
  if (isSwitching) return;
  renderDetail(cat);
  switchView(overviewEl, detailEl);
  // Move keyboard focus to the "back" button so it is easy to return
  setTimeout(() => detailEl.querySelector('[data-back]').focus({ preventScroll: true }), FADE_OUT_MS + 20);
}

// Back to the 5 picture cards
function showOverview() {
  switchView(detailEl, overviewEl);
}

// "Zurück zur Übersicht" buttons
detailEl.addEventListener('click', event => {
  if (event.target.closest('[data-back]')) showOverview();
});

// Start: make the photo cards clickable
renderOverview();


/* =============================================================
   3. HIDE PHOTOS THAT ARE MISSING
   Any <img> with the class "hide-if-missing" (e.g. the hero photo)
   is hidden if its file can't be found – the warm wood-tone
   background of its frame shows instead.
   ============================================================= */
document.querySelectorAll('img.hide-if-missing').forEach(img => {
  const hide = () => { img.hidden = true; };
  img.addEventListener('error', hide);
  // The image may already have failed before this script ran
  if (img.complete && img.naturalWidth === 0) hide();
});


/* =============================================================
   4. NAVBAR SHADOW ON SCROLL
   ============================================================= */
const header = document.getElementById('site-header');

function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* =============================================================
   5. MOBILE MENU OPEN / CLOSE
   ============================================================= */
const menu     = document.getElementById('mobile-menu');
const openBtn  = document.getElementById('menu-open');
const closeBtn = document.getElementById('menu-close');

function setMenu(open) {
  menu.classList.toggle('is-open', open);
  openBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : ''; // stop page scrolling behind the menu
  if (open) closeBtn.focus();
}

openBtn.addEventListener('click', () => setMenu(true));
closeBtn.addEventListener('click', () => setMenu(false));

// Close the menu when a link inside it is tapped
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

// Close with the Escape key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});


/* =============================================================
   6. LIVE "OPEN / CLOSED" STATUS (shown in the hero's "Heute" box)
   Opening hours: Monday–Friday 11:00–23:00 (kitchen 11:30–22:00).
   Saturday and Sunday closed. Public holidays are not handled here.
   ============================================================= */
const OPEN_TIME  = 11 * 60; // 11:00 in minutes
const CLOSE_TIME = 23 * 60; // 23:00 in minutes
const WEEKDAYS   = ['Mo', 'Di', 'Mi', 'Do', 'Fr']; // open days

function updateOpenStatus() {
  // Current time in Vienna, no matter where the visitor is
  const parts = new Intl.DateTimeFormat('de-AT', {
    timeZone: 'Europe/Vienna',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date());

  const get = type => parts.find(p => p.type === type).value;
  const weekday = get('weekday').slice(0, 2);   // e.g. "Mo"
  const minutes = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
  const isWorkday = WEEKDAYS.includes(weekday);

  let longText, shortText;
  let isOpen = false;

  if (!isWorkday) {
    longText  = 'Heute geschlossen · Montag ab 11:00 geöffnet';
    shortText = 'Heute geschlossen';
  } else if (minutes < OPEN_TIME) {
    longText  = 'Heute ab 11:00 geöffnet · bis 23:00';
    shortText = 'Öffnet um 11:00';
  } else if (minutes < CLOSE_TIME) {
    isOpen    = true;
    longText  = 'Jetzt geöffnet · bis 23:00 · Küche bis 22:00';
    shortText = 'Geöffnet bis 23:00';
  } else {
    // Friday evening → next opening is Monday
    longText  = weekday === 'Fr'
      ? 'Geschlossen · Montag ab 11:00'
      : 'Geschlossen · Morgen ab 11:00';
    shortText = 'Geschlossen';
  }

  document.querySelectorAll('.open-status').forEach(el => { el.textContent = longText; });
  document.querySelectorAll('.open-status-short').forEach(el => { el.textContent = shortText; });
  document.querySelectorAll('.open-dot').forEach(el => {
    el.classList.toggle('dot-open', isOpen);
    el.classList.toggle('dot-closed', !isOpen);
  });
}

updateOpenStatus();
setInterval(updateOpenStatus, 60 * 1000); // refresh every minute


/* =============================================================
   7. CURRENT YEAR IN THE FOOTER
   ============================================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();