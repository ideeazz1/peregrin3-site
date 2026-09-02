(function () {
  var form = document.getElementById('recruit-form');
  var statusEl = document.getElementById('status');
  var submitBtn = document.getElementById('submit-btn');
  var trackInput = document.getElementById('track');
  var MAX_BYTES = 1.5 * 1024 * 1024;

  var COPY = {
    fulltime: {
      nav: 'Headhunter intake',
      title: 'Recruit intake',
      deck: 'Upload your résumé and the facts we need to find live roles and prepare apply packets. You click Apply — we never submit for you.',
      step1: 'Who you are',
      step1Deck: 'Identity and contact for packets — not published.',
      step2: 'What to hunt',
      step2Deck: 'Titles, location, and hard filters so packets stay honest.',
      summaryLabel: 'Professional summary',
      summaryPlaceholder:
        '4–8 sentences: who you are, what you’ve built, what roles you’re hunting, proof you already own.',
      summaryMin: 80,
      resumeHint: 'PDF preferred. Max 1.5 MB.',
      titlesLabel: 'Target job titles (3–5)',
      titlesPlaceholder:
        'e.g. Revenue Operations Analyst\nBusiness Systems Analyst\nAI Operations Specialist',
      toolsLabel: 'Tools you can claim at used / daily / expert',
      toolsPlaceholder:
        'Salesforce — used\nExcel — daily\nClaude/ChatGPT workflows — used\nTableau — exposure (do not overclaim)',
      toolsHint: 'We match hard JD requirements to this list. Overclaiming wastes a packet.',
      mustPlaceholder: 'Remote, no unpaid trials, …',
      dealPlaceholder: 'Mortgage LO titles, >20% travel, …',
      checkMinimums:
        'I meet the minimum expectations above. My résumé and tool claims are accurate.',
      sponsorLabel: 'Sponsorship needed?',
    },
    intern: {
      nav: 'Intern intake',
      title: 'Intern intake',
      deck: 'Résumé, school facts, and the internship types you want. You click Apply — we never submit for you.',
      step1: 'Who you are',
      step1Deck: 'School and contact so packets match your calendar — not published.',
      step2: 'What to hunt',
      step2Deck: 'Functions, availability, and pay rules so we do not waste a cycle.',
      summaryLabel: 'Why this internship + what you can do now',
      summaryPlaceholder:
        '3–5 sentences: what you want to learn, what you can already do, and any real project or coursework proof.',
      summaryMin: 40,
      resumeHint: 'PDF preferred. Max 1.5 MB. A project/portfolio link above helps if work history is thin.',
      titlesLabel: 'Target functions + level (3–5)',
      titlesPlaceholder:
        'e.g. Operations intern\nRevOps / systems intern\nData / analytics intern\nNew-grad Business Analyst',
      toolsLabel: 'Skills — coursework / used / daily',
      toolsPlaceholder:
        'Excel — coursework\nPython — used\nSQL — coursework\nCanva — daily\n(Do not claim expert from one class)',
      toolsHint: 'Say coursework when that is all you have. Overclaiming wastes a packet.',
      mustPlaceholder: 'Remote, credit-bearing OK, no unpaid trials, …',
      dealPlaceholder: 'Unpaid only, >25% travel, no CPT support, …',
      checkMinimums:
        'I meet the intern minimums above. My résumé, school facts, and skill claims are accurate.',
      sponsorLabel: 'Sponsorship / work authorization needs?',
    },
  };

  function showStatus(kind, message) {
    statusEl.className = 'status show ' + kind;
    statusEl.textContent = message;
  }

  function currentTrack() {
    var t = (trackInput.value || 'fulltime').toLowerCase();
    return t === 'intern' ? 'intern' : 'fulltime';
  }

  function setRequired(el, on) {
    if (!el) return;
    if (on) el.setAttribute('required', 'required');
    else el.removeAttribute('required');
  }

  function applyTrack(track) {
    var t = track === 'intern' ? 'intern' : 'fulltime';
    trackInput.value = t;
    document.body.setAttribute('data-track', t);

    document.querySelectorAll('.track-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-track') === t ? 'true' : 'false');
    });

    document.querySelectorAll('.track-panel').forEach(function (panel) {
      var panelTrack = panel.getAttribute('data-track');
      var show = panelTrack === t;
      if (show) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });

    var copy = COPY[t];
    document.getElementById('nav-meta').textContent = copy.nav;
    document.getElementById('hero-title').textContent = copy.title;
    document.getElementById('hero-deck').textContent = copy.deck;
    document.getElementById('step1-title').textContent = copy.step1;
    document.getElementById('step1-deck').textContent = copy.step1Deck;
    document.getElementById('step2-title').textContent = copy.step2;
    document.getElementById('step2-deck').textContent = copy.step2Deck;

    var summary = document.getElementById('summary');
    document.getElementById('summary-label').innerHTML =
      copy.summaryLabel + ' <span class="req">*</span>';
    summary.placeholder = copy.summaryPlaceholder;
    summary.minLength = copy.summaryMin;
    summary.setAttribute('minlength', String(copy.summaryMin));

    document.getElementById('resume-hint').textContent = copy.resumeHint;
    document.getElementById('titles-label').innerHTML =
      copy.titlesLabel + ' <span class="req">*</span>';
    document.getElementById('targetTitles').placeholder = copy.titlesPlaceholder;
    document.getElementById('tools-label').textContent = copy.toolsLabel;
    document.getElementById('toolsClaimed').placeholder = copy.toolsPlaceholder;
    document.getElementById('tools-hint').textContent = copy.toolsHint;
    document.getElementById('mustHaves').placeholder = copy.mustPlaceholder;
    document.getElementById('dealBreakers').placeholder = copy.dealPlaceholder;
    document.getElementById('check-minimums').textContent = copy.checkMinimums;
    document.getElementById('sponsor-label').innerHTML =
      copy.sponsorLabel + ' <span class="req">*</span>';

    var internOn = t === 'intern';
    setRequired(document.getElementById('school'), internOn);
    setRequired(document.getElementById('program'), internOn);
    setRequired(document.getElementById('gradDate'), internOn);
    setRequired(document.getElementById('availability'), internOn);
    setRequired(document.getElementById('payRules'), internOn);

    try {
      var url = new URL(window.location.href);
      if (t === 'intern') url.searchParams.set('track', 'intern');
      else url.searchParams.delete('track');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    } catch (_) {}
  }

  document.querySelectorAll('.track-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTrack(btn.getAttribute('data-track'));
    });
  });

  (function initTrack() {
    var params = new URLSearchParams(window.location.search);
    var q = String(params.get('track') || '').toLowerCase();
    applyTrack(q === 'intern' || q === 'internship' ? 'intern' : 'fulltime');
  })();

  function readFileAsBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var result = String(reader.result || '');
        var comma = result.indexOf(',');
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = function () {
        reject(new Error('Could not read résumé file'));
      };
      reader.readAsDataURL(file);
    });
  }

  function apiBaseFromConfig(cfg) {
    if (cfg && cfg.cloudRunUrl) {
      return String(cfg.cloudRunUrl).replace(/\/$/, '') + '/api/database2';
    }
    if (cfg && cfg.apiBase) {
      return String(cfg.apiBase).replace(/\/$/, '');
    }
    return '';
  }

  async function resolveEndpoint() {
    try {
      var res = await fetch('/config/proposal-api-base.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('config ' + res.status);
      var cfg = await res.json();
      var base = apiBaseFromConfig(cfg);
      if (!base) throw new Error('missing api base');
      return base + '/peregrine-recruit';
    } catch (_) {
      return 'https://database2-api-xpxhayoxhq-vp.a.run.app/api/database2/peregrine-recruit';
    }
  }

  function hasLeadingZeroBits(bytes, bits) {
    var wholeBytes = Math.floor(bits / 8);
    var remainingBits = bits % 8;
    for (var i = 0; i < wholeBytes; i += 1) {
      if (bytes[i] !== 0) return false;
    }
    if (!remainingBits) return true;
    return (bytes[wholeBytes] >> (8 - remainingBits)) === 0;
  }

  async function solveVerification(endpoint) {
    var challengeRes = await fetch(endpoint + '/challenge', {
      method: 'GET',
      cache: 'no-store',
    });
    var challengeData = await challengeRes.json();
    var challenge = challengeData && challengeData.verification;
    if (
      !challengeRes.ok ||
      !challenge ||
      !challenge.token ||
      !Number.isInteger(challenge.difficulty)
    ) {
      throw new Error(
        (challengeData && challengeData.message) || 'Could not start secure verification'
      );
    }

    var encoder = new TextEncoder();
    var batchSize = 128;
    var maxCounter = Math.pow(2, 24);
    for (var start = 0; start <= maxCounter; start += batchSize) {
      var attempts = [];
      for (var offset = 0; offset < batchSize && start + offset <= maxCounter; offset += 1) {
        (function (counter) {
          attempts.push(
            crypto.subtle
              .digest('SHA-256', encoder.encode(challenge.token + ':' + counter))
              .then(function (digest) {
                return { counter: counter, bytes: new Uint8Array(digest) };
              })
          );
        })(start + offset);
      }
      var results = await Promise.all(attempts);
      for (var i = 0; i < results.length; i += 1) {
        if (hasLeadingZeroBits(results[i].bytes, challenge.difficulty)) {
          return { token: challenge.token, solution: results[i].counter };
        }
      }
    }
    throw new Error('Secure verification could not be completed');
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    showStatus('err', '');
    statusEl.classList.remove('show');

    if (!form.reportValidity()) return;

    var file = document.getElementById('resume').files[0];
    if (!file) {
      showStatus('err', 'Résumé file is required.');
      return;
    }
    if (file.size > MAX_BYTES) {
      showStatus('err', 'Résumé must be under 1.5 MB.');
      return;
    }

    submitBtn.disabled = true;
    showStatus('ok', 'Submitting…');

    try {
      var resumeBase64 = await readFileAsBase64(file);
      var endpoint = await resolveEndpoint();
      showStatus('ok', 'Securely verifying…');
      var verification = await solveVerification(endpoint);
      var track = currentTrack();
      var payload = {
        track: track,
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        summary: document.getElementById('summary').value.trim(),
        targetTitles: document.getElementById('targetTitles').value.trim(),
        locationRules: document.getElementById('locationRules').value.trim(),
        sponsorshipNeeded: document.getElementById('sponsorshipNeeded').value,
        compFloor: document.getElementById('compFloor').value.trim(),
        toolsClaimed: document.getElementById('toolsClaimed').value.trim(),
        mustHaves: document.getElementById('mustHaves').value.trim(),
        dealBreakers: document.getElementById('dealBreakers').value.trim(),
        school: document.getElementById('school').value.trim(),
        program: document.getElementById('program').value.trim(),
        gradDate: document.getElementById('gradDate').value.trim(),
        portfolioUrl: document.getElementById('portfolioUrl').value.trim(),
        availability: document.getElementById('availability').value.trim(),
        payRules: document.getElementById('payRules').value,
        courseworkProof: document.getElementById('courseworkProof').value.trim(),
        acceptMinimums: document.getElementById('acceptMinimums').checked,
        acceptApplyCommitment: document.getElementById('acceptApplyCommitment').checked,
        company_website: document.getElementById('company_website').value,
        resumeFilename: file.name,
        resumeMime: file.type || 'application/pdf',
        resumeBase64: resumeBase64,
        verification: verification,
      };

      var res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      var data = {};
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok || data.status === 'failed') {
        throw new Error(data.message || 'Submit failed (' + res.status + ')');
      }

      var firstName = (payload.fullName || '').trim().split(/\s+/)[0] || '';
      // Resolve relative to this page's own directory (no leading slash) so this
      // works under whatever path/domain serves it. The server's
      // `data.confirmationPage` is an absolute path tied to the old
      // ivanadiaz.com/peregrine-recruit location and is intentionally ignored here.
      var thanks = 'thanks.html';
      var dest = thanks;
      var sep = thanks.indexOf('?') >= 0 ? '&' : '?';
      if (firstName) {
        dest += sep + 'name=' + encodeURIComponent(firstName);
        sep = '&';
      }
      if (track === 'intern') {
        dest += sep + 'track=intern';
      }
      window.location.assign(dest);
      return;
    } catch (err) {
      showStatus(
        'err',
        (err && err.message) ||
          'Submit failed. If this keeps happening, email your résumé and summary to the person who sent this link.'
      );
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
