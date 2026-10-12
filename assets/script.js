(function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { navLinks.classList.remove("open"); });
    });
  }

  // Per-character reveal for the hero name
  function buildChars(elId, text, delayStep) {
    var el = document.getElementById(elId);
    if (!el) return;
    var html = "";
    for (var i = 0; i < text.length; i++) {
      var ch = text[i] === " " ? "&nbsp;" : text[i];
      html += '<span class="char-mask"><span class="char-unit" style="animation-delay:' + (i * delayStep) + 'ms">' + ch + "</span></span>";
    }
    el.innerHTML = html;
  }
  buildChars("line1", "Salah", 30);
  buildChars("line2", "Asfan", 30);

  // Word-by-word reveal for the lede
  function buildWords(elId, text, delayStep, accentWords) {
    var el = document.getElementById(elId);
    if (!el) return;
    var words = text.split(" ");
    var html = "";
    words.forEach(function (w, i) {
      var cls = accentWords.indexOf(w.replace(/[.,]/g, "")) !== -1 ? "word-mask accent-word" : "word-mask";
      html += '<span class="' + cls + '"><span class="word-unit" style="animation-delay:' + (i * delayStep) + 'ms">' + w + "</span></span> ";
    });
    el.innerHTML = html;
  }
  buildWords("lede", "I build local-first AI that never phones home.", 55, ["local-first", "AI"]);

  // Skills marquee
  var marqueeItems = ["Artificial Intelligence", "Automation Engineering", "Cloud Infrastructure", "Business Intelligence", "Cybersecurity", "Digital Transformation", "Full-Stack Development", "Machine Learning"];
  var m = document.getElementById("marquee");
  if (m) {
    var row = marqueeItems.map(function (t) { return "<span>" + t + "</span>"; }).join("");
    m.innerHTML = row + row;
  }

  // Trailing cursor glow
  var glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    var gx = 0, gy = 0, tx = 0, ty = 0, shown = false;
    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; glow.style.opacity = "1"; gx = tx; gy = ty; }
    });
    (function loop() {
      gx += (tx - gx) * 0.16;
      gy += (ty - gy) * 0.16;
      glow.style.transform = "translate(" + gx + "px," + gy + "px)";
      requestAnimationFrame(loop);
    })();
  }

  // Hover preview image, follows cursor, swaps per work row
  var preview = document.getElementById("hoverPreview");
  var previewImg = document.getElementById("hoverImg");
  if (preview && previewImg && window.matchMedia("(pointer: fine)").matches) {
    var px = 0, py = 0, ptx = 0, pty = 0;
    document.querySelectorAll(".work-row[data-img]").forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        previewImg.src = row.getAttribute("data-img");
        preview.classList.add("show");
      });
      row.addEventListener("mouseleave", function () {
        preview.classList.remove("show");
      });
    });
    window.addEventListener("mousemove", function (e) {
      ptx = e.clientX; pty = e.clientY;
    });
    (function ploop() {
      px += (ptx - px) * 0.2;
      py += (pty - py) * 0.2;
      preview.style.left = px + "px";
      preview.style.top = py + "px";
      requestAnimationFrame(ploop);
    })();
  }

  // Reveal-on-scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
})();
