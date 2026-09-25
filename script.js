// Nexusville site scripts

// The uploaded assets are stored in the repository root. Older page markup
// references images/<filename>, so normalize those URLs before the browser
// tries to request them. This keeps the existing pages compatible with GitHub
// Pages and the nexusville.co.za custom domain.
(function () {
  var assetNames = {
    'nexusville-logo.png': 'Nexusville-logo.png',
    'Nexusville-logo.png': 'Nexusville-logo.png',
    'nexusville-group-companies.jpg': 'nexusville-group-companies.jpg',
    'nexusville-nyadf-partnership.jpg': 'nexusville-nyadf-partnership.jpg',
    'nexusville-business-solutions.png': 'nexusville-business-solutions.png',
    'nyadf-logo.png': 'nyadf-logo.png',
    'nomduva-logo.jpg': 'nomduva-logo.jpg',
    'thirsty-partner.jpg': 'thirsty-partner.jpg'
  };

  function normalizeAsset(element, attribute) {
    var value = element.getAttribute(attribute);
    if (!value || value.indexOf('images/') !== 0) return;

    var fileName = value.slice('images/'.length);
    var assetName = assetNames[fileName];
    if (assetName) element.setAttribute(attribute, '/' + assetName);
  }

  document.querySelectorAll('img[src]').forEach(function (image) {
    normalizeAsset(image, 'src');
    image.addEventListener('error', function () {
      var fileName = image.src.split('/').pop();
      var assetName = assetNames[fileName];
      if (assetName && image.src !== new URL('/' + assetName, window.location.origin).href) {
        image.src = '/' + assetName;
      }
    });
  });

  document.querySelectorAll('link[href]').forEach(function (link) {
    normalizeAsset(link, 'href');
  });
})();

// Mobile navigation toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeNav();
  });
})();

// Hero slider (home page)
(function () {
  var slider = document.querySelector('.hero-slider');
  if (!slider) return;

  var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
  var dotsWrap = slider.querySelector('.slider-dots');
  var prevBtn = slider.querySelector('.slider-btn.prev');
  var nextBtn = slider.querySelector('.slider-btn.next');
  if (!slides.length) return;

  var activeIndex = slides.findIndex(function (slide) {
    return slide.classList.contains('active');
  });
  var current = activeIndex >= 0 ? activeIndex : 0;
  var timer = null;
  var DURATION = 6000;
  var dots = [];

  if (dotsWrap) {
    dots = slides.map(function (_, i) {
      var button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      button.addEventListener('click', function () { show(i); restart(); });
      dotsWrap.appendChild(button);
      return button;
    });
  }

  function show(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function restart() {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(next, DURATION);
  }

  if (dots[current]) dots[current].classList.add('active');
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
  restart();
})();

// Contact / enquiry forms
(function () {
  var form = document.querySelector('form.enquiry');
  if (!form) return;

  form.addEventListener('submit', function () {
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.textContent = 'Opening your email client\u2026';
    btn.disabled = true;
    window.setTimeout(function () {
      btn.textContent = 'Send enquiry';
      btn.disabled = false;
    }, 4000);
  });
})();

// Footer year stays current automatically
(function () {
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
