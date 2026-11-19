// Nexusville site scripts

(function () {
  var assetNames = {
    'nexusville-group-companies.jpg': 'nexusville-group-companies.jpg',
    'nexusville-nyadf-partnership.jpg': 'nexusville-nyadf-partnership.jpg',
    'nexusville-business-solutions.png': 'nexusville-business-solutions.png',
    'nyadf-logo.png': 'nyadf-logo.png',
    'nomduva-logo.jpg': 'nomduva-logo.jpg',
    'thirsty-partner.jpg': 'thirsty-partner.jpg'
  };

  document.querySelectorAll('img[src]').forEach(function (image) {
    image.addEventListener('error', function handleImageError() {
      var fileName = image.src.split('/').pop();
      var assetName = assetNames[fileName];
      if (assetName && !image.dataset.fallbackTried) {
        image.dataset.fallbackTried = 'true';
        image.src = '/' + assetName;
      }
    }, { once: true });
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
  if (slides.length < 2) return;

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

// Enquiry forms: submit securely through FormSubmit and report the actual result.
(function () {
  var forms = document.querySelectorAll('form[data-formsubmit]');
  forms.forEach(function (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var status = form.querySelector('[role="status"]');
      var button = form.querySelector('button[type="submit"]');
      var originalText = button ? button.textContent : '';
      if (form.querySelector('[name="_honey"]').value) return;
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      if (status) status.textContent = 'Sending your enquiry securely…';
      try {
        var payload = {};
        new FormData(form).forEach(function (value, key) { payload[key] = value; });
        var response = await fetch('https://formsubmit.co/ajax/info@nexusville.co.za', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        var result = await response.json();
        if (!response.ok || result.success === false) throw new Error(result.message || 'Submission failed');
        if (status) status.textContent = 'Thank you. Your enquiry has been accepted by the form service for delivery to Nexusville. We will respond using the contact details you provided.';
        form.reset();
      } catch (error) {
        if (status) status.textContent = 'We could not submit your enquiry. Please try again or email info@nexusville.co.za directly.';
      } finally {
        if (button) { button.disabled = false; button.textContent = originalText; }
      }
    });
  });
})();

// Footer year stays current automatically
(function () {
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
                      
