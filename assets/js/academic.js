/* ============================================================================
 *  首页（朴素学术风格）：列表渲染 + 中英文切换
 * ----------------------------------------------------------------------------
 *  文案在 assets/js/i18n.js（window.I18N.zh / .en），
 *  结构化内容在 data/site-config.js（window.SITE_CONFIG），
 *  论文在 data/publications.js（window.PUBLICATIONS）。
 * ==========================================================================*/
(function () {
  "use strict";

  var LS_LANG = "ywl.lang";
  var state = { lang: "zh" };

  var CFG = window.SITE_CONFIG || {};
  var I18N = window.I18N || {};

  /* ------------------------------------------------------------ 文案 */
  function t(key) {
    var dict = I18N[state.lang] || I18N.zh || {};
    var s = dict[key];
    if (s === undefined) s = (I18N.zh || {})[key];
    return s === undefined ? key : s;
  }

  function esc(s) { return window.PubRender.esc(s); }

  function pick(zh, en) {
    return state.lang === "zh" ? (zh || en || "") : (en || zh || "");
  }

  /* -------------------------------------------------------- 列表渲染 */
  function block(title, desc, href, hrefLabel) {
    return '<div class="item">' +
      "<b>" + (href
        ? '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(title) + "</a>"
        : esc(title)) + "</b>" +
      (desc ? '<p class="desc">' + esc(desc) + "</p>" : "") +
      "</div>";
  }

  function renderResearch() {
    var box = document.getElementById("research-list");
    if (!box) return;
    var items = Array.isArray(CFG.research) ? CFG.research : [];
    box.innerHTML = items.map(function (r) {
      return block(pick(r.titleZh, r.titleEn), pick(r.descZh, r.descEn));
    }).join("");
  }

  function renderRepos() {
    var box = document.getElementById("repo-list");
    if (!box) return;
    var items = Array.isArray(CFG.repos) ? CFG.repos : [];
    box.innerHTML = items.map(function (r) {
      return block(r.name, pick(r.descZh, r.descEn), r.url);
    }).join("");
  }

  function renderLinks() {
    var box = document.getElementById("link-list");
    if (!box) return;
    var items = Array.isArray(CFG.friendlyLinks) ? CFG.friendlyLinks : [];
    box.innerHTML = items.map(function (r) {
      return block(pick(r.titleZh, r.titleEn), pick(r.descZh, r.descEn), r.url);
    }).join("");
  }

  /* 首页只放最新几篇，全部论文在 publications.html */
  function renderSelectedPubs() {
    var box = document.getElementById("pub-selected");
    if (!box || !window.PubRender) return;
    var list = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS.slice() : [];
    list.sort(function (a, b) {
      var da = a.date || String(a.year || "");
      var db = b.date || String(b.year || "");
      return da < db ? 1 : da > db ? -1 : 0;
    });
    box.innerHTML = list.slice(0, 4).map(window.PubRender.entry).join("");
  }

  /* ------------------------------------------------------- 语言切换 */
  function applyLang() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      // data-i18n-html：允许文案里的 **加粗** 标记，rich() 会先转义再做替换
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = window.PubRender ? window.PubRender.rich(t(el.getAttribute("data-i18n")))
                                       : t(el.getAttribute("data-i18n"));
      } else {
        el.textContent = t(el.getAttribute("data-i18n"));
      }
    });

    var titleEl = document.querySelector('meta[name="description"]');
    if (titleEl) titleEl.setAttribute("content", t("meta.desc"));

    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-lang") === state.lang ? "true" : "false");
    });

    renderResearch();
    renderRepos();
    renderLinks();
    renderSelectedPubs();
  }

  function setLang(lang) {
    state.lang = lang === "en" ? "en" : "zh";
    try { localStorage.setItem(LS_LANG, state.lang); } catch (e) {}
    applyLang();
  }

  /* ---------------------------------------------------------- 启动 */
  function init() {
    var saved = null;
    try { saved = localStorage.getItem(LS_LANG); } catch (e) {}
    if (saved === "zh" || saved === "en") {
      state.lang = saved;
    } else {
      var nav = (navigator.language || "zh").toLowerCase();
      state.lang = nav.indexOf("zh") === 0 ? "zh" : "en";
    }

    var yr = document.getElementById("year");
    if (yr) yr.textContent = String(new Date().getFullYear());

    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        setLang(b.getAttribute("data-lang"));
      });
    });

    applyLang();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
