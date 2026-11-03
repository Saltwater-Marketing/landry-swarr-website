(function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav__sub-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.parentElement, open = !li.classList.contains('is-open');
      document.querySelectorAll('.has-sub.is-open').forEach(function (x) { if (x !== li) { x.classList.remove('is-open'); x.querySelector('.nav__sub-toggle').setAttribute('aria-expanded', 'false'); } });
      li.classList.toggle('is-open', open);
      b.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) document.querySelectorAll('.has-sub.is-open').forEach(function (x) { x.classList.remove('is-open'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.has-sub.is-open').forEach(function (x) { x.classList.remove('is-open'); });
  });
  // highlight current section in "On this page"
  var links = document.querySelectorAll('.toc a');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { links.forEach(function (a) { a.classList.remove('is-current'); }); var a = map[en.target.id]; if (a) a.classList.add('is-current'); }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) io.observe(h); });
  }
})();
