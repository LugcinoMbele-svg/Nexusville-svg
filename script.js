// Nexusville site scripts

// Mobile navigation toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
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

  var current = Math.max(0, slides.findIndex(function (s) { return s.classList.contains('active'); }));
  if (current < 0) current = 0;
  var timer = null;
  var DURATION = 6000;

  // Build dots
  var dots = slides.map(function (_, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    if (i === current) b.classList.add('active');
    b.addEventListener('click', function () { goTo(i); restart(); });
    dotsWrap.appendChild(b);
    return b;
  });

  function show(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function goTo(i) { show(i); }
  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, DURATION);
  }

  if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });

  restart();
})();

// Contact / enquiry forms: let the visitor know their email client is opening
(function () {
  var form = document.querySelector('form.enquiry');
  if (!form) return;

  form.addEventListener('submit', function () {
    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Opening your email client\u2026';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = 'Send enquiry';
        btn.disabled = false;
      }, 4000);
    }
  });
})();

// Footer year stays current automatically
(function () {
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
  
