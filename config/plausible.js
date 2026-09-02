/**
 * Privacy-light Plausible loader for peregrin3.com (all public Pages HTML).
 * Single source of truth — pages include: <script defer src="/config/plausible.js"></script>
 */
(function () {
  if (window.__ivanPlausibleLoaded) return;
  window.__ivanPlausibleLoaded = true;
  if (document.querySelector('script[data-domain="peregrin3.com"][src*="plausible.io"]')) return;

  var s = document.createElement('script');
  s.defer = true;
  s.setAttribute('data-domain', 'peregrin3.com');
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
})();
