(function () {
  var application = document.querySelector('.application-area');
  if (!application) return;

  var body = document.body;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var frame = 0;
  var previous = -1;
  var colors = {
    '--page-background': [[11, 17, 24], [242, 246, 244]],
    '--page-line': [[42, 57, 72], [184, 203, 203]],
  };

  function luminance(rgb) {
    return rgb.map(function (channel) {
      var value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    }).reduce(function (sum, value, index) {
      return sum + value * [0.2126, 0.7152, 0.0722][index];
    }, 0);
  }

  function render() {
    frame = 0;
    var viewport = window.innerHeight;
    var scroll = window.scrollY;
    var boundary = application.getBoundingClientRect().top + scroll;
    // Fade while the application enters the viewport; reverse when scrolling up.
    var start = Math.max(0, boundary - viewport);
    var end = Math.max(start + 1, boundary - viewport * 0.55);
    var progress = Math.max(0, Math.min(1, (scroll - start) / (end - start)));
    progress = reducedMotion.matches ? (progress >= 0.5 ? 1 : 0) : progress * progress * (3 - 2 * progress);
    if (progress === previous) return;
    previous = progress;
    Object.keys(colors).forEach(function (property) {
      var pair = colors[property];
      var rgb = pair[0].map(function (value, index) {
        return Math.round(value + (pair[1][index] - value) * progress);
      });
      body.style.setProperty(property, 'rgb(' + rgb.join(',') + ')');
    });
    // Do not cross-fade text through the same gray as the background.
    var background = colors['--page-background'][0].map(function (value, index) {
      return value + (colors['--page-background'][1][index] - value) * progress;
    });
    var light = luminance(background);
    var fallback = light > 0.179 ? '#000000' : '#FFFFFF';
    var foreground = progress < 0.08 ? ['#EDF5FA', '#C0CCD7', '#59E3EE'] :
      progress > 0.92 ? ['#17313B', '#354F59', '#087681'] : [fallback, fallback, fallback];
    ['--page-ink', '--page-muted', '--page-accent'].forEach(function (property, index) {
      body.style.setProperty(property, foreground[index]);
    });
    body.style.setProperty('--scroll-progress', String(progress));
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  render();
  body.classList.add('scroll-theme');
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('load', schedule);
  reducedMotion.addEventListener('change', schedule);
  if (document.fonts) document.fonts.ready.then(schedule);
  if (window.ResizeObserver) {
    new ResizeObserver(schedule).observe(document.querySelector('.hero'));
  }
})();
