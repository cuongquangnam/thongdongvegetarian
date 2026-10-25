(function () {
  const KEY = "thongdong-lang";
  let lang = "vi";
  try {
    if (localStorage.getItem(KEY) === "en") lang = "en";
  } catch (err) {
    lang = "vi";
  }

  function applyChrome() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-vi]").forEach(function (el) {
      const value = el.getAttribute(lang === "en" ? "data-en" : "data-vi");
      const attr = el.getAttribute("data-i18n-attr");
      if (attr) el.setAttribute(attr, value);
      else el.textContent = value;
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
  }

  document.addEventListener("click", function (event) {
    const langButton = event.target.closest("[data-set-lang]");
    if (!langButton) return;
    lang = langButton.getAttribute("data-set-lang");
    try {
      localStorage.setItem(KEY, lang);
    } catch (err) {
      /* keep the choice for this visit */
    }
    applyChrome();
  });

  applyChrome();
})();
