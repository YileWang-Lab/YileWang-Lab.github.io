/* ============================================================================
 *  Yile Wang Lab — site logic
 *  纯原生 JavaScript，无框架、无构建步骤、无外部请求。
 * ==========================================================================*/
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var I18N = window.I18N || { zh: {}, en: {} };
  var PUBS = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS.slice() : [];

  var LS_LANG = "ywl.lang";
  var LS_THEME = "ywl.theme";

  var state = {
    lang: "zh",
    theme: "light",
    q: "",
    type: "all",
    year: "all"
  };

  /* ------------------------------------------------------------- helpers */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function t(key, vars) {
    var dict = I18N[state.lang] || I18N.zh || {};
    var s = dict[key];
    if (s === undefined) s = (I18N.zh || {})[key];
    if (s === undefined) return key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split("{" + k + "}").join(String(vars[k]));
      });
    }
    return s;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* Renders **bold** markers and escapes everything else. */
  function rich(s) {
    return esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  }

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  function initials(name) {
    var n = String(name || "").replace(/[*]/g, "").trim();
    if (!n) return "?";
    if (/[\u4e00-\u9fa5]/.test(n)) return n.slice(0, 2);
    var parts = n.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function toast(msg) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove("is-visible"); }, 2200);
  }

  /* ------------------------------------------------------------ icons */
  /* 内联 SVG，代替 emoji：不依赖任何图标字体、各平台渲染一致、颜色跟随文字。
     路径手写，统一 24x24 视野、线条风格。 */
  var ICON = {
    trending: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>',
    chart: '<path d="M12 20V10M18 20V4M6 20v-4"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2.6 6.5 9.4 6.4 9.4-6.4"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    link: '<path d="M10.6 13.4a4.2 4.2 0 0 0 6.3.5l2.1-2.1a4.2 4.2 0 0 0-5.9-5.9l-1.2 1.2"/><path d="M13.4 10.6a4.2 4.2 0 0 0-6.3-.5l-2.1 2.1a4.2 4.2 0 0 0 5.9 5.9l1.2-1.2"/>',
    globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5a15 15 0 0 1 3.8 9.5A15 15 0 0 1 12 21.5a15 15 0 0 1-3.8-9.5A15 15 0 0 1 12 2.5Z"/>',
    doc: '<path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8Z"/><path d="M14 2.5V8h5.5"/>',
    code: '<path d="m15.5 17.5 5.5-5.5-5.5-5.5"/><path d="m8.5 6.5-5.5 5.5 5.5 5.5"/>',
    slides: '<rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8.5 20.5h7M12 16.5v4"/>',
    award: '<circle cx="12" cy="8.5" r="5.5"/><path d="M15.4 13.2 16.8 21.5 12 18.8 7.2 21.5l1.4-8.3"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="m20.5 15.5-4.6-4.6L5 21.5"/>',
    info: '<circle cx="12" cy="12" r="9.5"/><path d="M12 16.5V11.5"/><path d="M12 7.8h.01"/>',
    search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.8 20.8-4.4-4.4"/>',
    box: '<path d="m21 8-9-5-9 5v8l9 5 9-5Z"/><path d="m3.3 7.4 8.7 5 8.7-5"/><path d="M12 22v-9.6"/>',
    user: '<path d="M19 21v-1.6a4.4 4.4 0 0 0-4.4-4.4H9.4A4.4 4.4 0 0 0 5 19.4V21"/><circle cx="12" cy="7.5" r="4"/>',
    building: '<path d="M5 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17"/><path d="M16 8.5h3a1 1 0 0 1 1 1V21"/><path d="M3 21h18"/><path d="M8.5 7h3.5M8.5 11h3.5M8.5 15h3.5"/>',
    pin: '<path d="M20 10.5c0 5.4-8 11.5-8 11.5s-8-6.1-8-11.5a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10.5" r="2.8"/>',
    graduation: '<path d="M22 9 12 4 2 9l10 5 10-5Z"/><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/>',
    github: '<path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.2 4.7 18.2 5 18.2 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 24 12.5C24 5.9 18.6.5 12 .5Z"/>',
    arrowRight: '<path d="M4.5 12h14"/><path d="m12.5 5.5 6.5 6.5-6.5 6.5"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
  };

  function icon(name, cls) {
    var d = ICON[name];
    if (!d) return "";
    var filled = name === "github";
    return '<svg class="icon' + (cls ? " " + cls : "") + (filled ? " icon--filled" : "") +
      '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + d + "</svg>";
  }

  /* -------------------------------------------------------- theme + lang */
  function applyTheme(theme, announce) {
    state.theme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
    var btn = $("#theme-toggle");
    if (btn) {
      var slot = $(".toggle__icon", btn);
      if (slot) slot.innerHTML = icon(state.theme === "dark" ? "sun" : "moon");
      btn.setAttribute("aria-pressed", state.theme === "dark" ? "true" : "false");
    }
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "dark" ? "#080e1a" : "#0b1a33");
    store(LS_THEME, state.theme);
    if (announce) toast(t(state.theme === "dark" ? "toast.theme.dark" : "toast.theme.light"));
  }

  function applyLang(lang, announce) {
    state.lang = lang === "en" ? "en" : "zh";
    document.documentElement.setAttribute("lang", state.lang === "zh" ? "zh-CN" : "en");

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = t(key);
      // data-i18n-html: 允许 **加粗** 标记；rich() 会先转义再做替换，所以是安全的
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = rich(val);
      else el.textContent = val;
    });

    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length !== 2) return;
        el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });

    var titleEl = $('meta[property="og:title"]');
    var descEl = $('meta[property="og:description"]');
    var descEl2 = $('meta[name="description"]');
    if (titleEl) titleEl.setAttribute("content", t("meta.title"));
    if (descEl) descEl.setAttribute("content", t("meta.desc"));
    if (descEl2) descEl2.setAttribute("content", t("meta.desc"));

    $$(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === state.lang ? "true" : "false");
    });

    renderAll();
    store(LS_LANG, state.lang);
    if (announce) toast(t("toast.lang"));
  }

  /* ------------------------------------------------------------- config */
  function renderConfig() {
    var name = state.lang === "zh" ? (CFG.labNameZh || CFG.labNameEn) : (CFG.labNameEn || CFG.labNameZh);
    document.title = name ? (name + (state.lang === "zh" ? " · 官网" : " — Official Site")) : t("meta.title");

    $$("[data-cfg='labName']").forEach(function (el) { el.textContent = name || ""; });
    $$("[data-cfg='monogram']").forEach(function (el) { el.textContent = CFG.labMonogram || "YWL"; });

    var tag = state.lang === "zh" ? (CFG.taglineZh || CFG.taglineEn) : (CFG.taglineEn || CFG.taglineZh);
    $$("[data-cfg='tagline']").forEach(function (el) { el.textContent = tag || ""; });

    var aff = state.lang === "zh" ? (CFG.affiliationZh || CFG.affiliationEn) : (CFG.affiliationEn || CFG.affiliationZh);
    $$("[data-cfg='affiliation']").forEach(function (el) { el.textContent = aff || ""; });

    var yr = $("#year");
    if (yr) yr.textContent = String(new Date().getFullYear());

    var note = state.lang === "zh" ? CFG.footerNoteZh : CFG.footerNoteEn;
    var noteEl = $("[data-cfg='footerNote']");
    if (noteEl && note) noteEl.textContent = note;

    renderFacts();
    renderResearch();
    renderPI();
    renderMembers();
    renderRepos();
    renderFriendlyLinks();
    renderContact();
    renderHeroStats();
  }

  function renderFacts() {
    var ul = $("#fact-list");
    if (!ul) return;
    var c = CFG.contact || {};
    var rows = [
      ["about.fact.name", state.lang === "zh" ? CFG.labNameZh : CFG.labNameEn],
      ["about.fact.field", t("about.fact.fieldval")],
      ["about.fact.open", t("about.fact.openval")]
    ];
    if (c.email) rows.push(["about.fact.contact", c.email]);

    ul.innerHTML = rows.filter(function (r) { return r[1]; }).map(function (r) {
      return '<li><span class="k">' + esc(t(r[0])) + '</span><span class="v">' + esc(r[1]) + "</span></li>";
    }).join("");
  }

  function renderResearch() {
    var box = $("#research-grid");
    if (!box) return;
    var items = Array.isArray(CFG.research) ? CFG.research : [];
    if (!items.length) { box.innerHTML = ""; return; }
    box.innerHTML = items.map(function (r) {
      var title = state.lang === "zh" ? (r.titleZh || r.titleEn) : (r.titleEn || r.titleZh);
      var desc = state.lang === "zh" ? (r.descZh || r.descEn) : (r.descEn || r.descZh);
      return '<article class="research-card reveal">' +
        '<span class="research-card__icon">' + icon(r.icon || "chart", "icon--lg") + "</span>" +
        '<h3 class="research-card__title">' + esc(title) + "</h3>" +
        '<p class="research-card__desc">' + esc(desc) + "</p>" +
        "</article>";
    }).join("");
  }

  function renderPI() {
    var pi = CFG.pi || {};
    var name = state.lang === "zh" ? (pi.nameZh || pi.nameEn) : (pi.nameEn || pi.nameZh);
    var role = state.lang === "zh" ? (pi.roleZh || pi.roleEn) : (pi.roleEn || pi.roleZh);

    var titleEl = $("#pi-name");
    if (titleEl) titleEl.textContent = name || "";
    var leadEl = $("#pi-lead");
    if (leadEl) leadEl.textContent = t("pi.lead");

    var card = $("#pi-card");
    if (card) {
      var avatar = pi.photo
        ? '<img class="pi-card__photo" src="' + esc(pi.photo) + '" alt="' + esc(name) + '" loading="lazy" decoding="async">'
        : '<div class="pi-card__avatar" aria-hidden="true">' + esc(initials(name)) + "</div>";

      var links = [];
      var L = pi.links || {};
      if (L.email) {
        links.push('<a class="pi-card__link" href="mailto:' + esc(L.email) + '">' + icon("mail") + "<span>" + esc(L.email) + "</span></a>");
      }
      if (L.github) {
        links.push('<a class="pi-card__link" href="' + esc(L.github) + '" target="_blank" rel="noopener">' + icon("github") + "<span>" + esc(t("pi.github")) + "</span></a>");
      }
      if (CFG.contact && CFG.contact.github) {
        links.push('<a class="pi-card__link" href="' + esc(CFG.contact.github) + '" target="_blank" rel="noopener">' + icon("building") + "<span>" + esc(t("contact.github")) + "</span></a>");
      }

      card.innerHTML = avatar +
        '<h3 class="pi-card__name">' + esc(name) + "</h3>" +
        '<p class="pi-card__role">' + esc(role || "") + "</p>" +
        (links.length ? '<div class="pi-card__links">' + links.join("") + "</div>" : "");
    }

    var bio = $("#pi-bio");
    if (bio) {
      // 依次读取 pi.bio1、pi.bio2…直到某个编号没有定义为止，
      // 这样在 i18n.js 里增删段落不需要改这里。
      var out = [];
      for (var i = 1; i <= 12; i++) {
        var v = t("pi.bio" + i);
        if (!v || v === "pi.bio" + i) break;
        out.push("<p" + (i === 1 ? ' class="pi-bio__lead"' : "") + ">" + rich(v) + "</p>");
      }
      bio.innerHTML = out.join("");
    }
  }

  function renderMembers() {
    var box = $("#team-grid");
    var wrap = $("#team-members");
    if (!box) return;

    var items = Array.isArray(CFG.team) ? CFG.team : [];
    if (!items.length) {
      if (wrap) wrap.hidden = true;
      return;
    }
    if (wrap) wrap.hidden = false;

    box.innerHTML = items.map(function (p) {
      var name = state.lang === "zh" ? (p.nameZh || p.nameEn) : (p.nameEn || p.nameZh);
      var role = state.lang === "zh" ? (p.roleZh || p.roleEn) : (p.roleEn || p.roleZh);
      return '<article class="person reveal">' +
        '<div class="person__avatar" aria-hidden="true">' + esc(initials(name)) + "</div>" +
        '<h3 class="person__name">' + esc(name) + "</h3>" +
        '<p class="person__role">' + esc(role || "") + "</p>" +
        (p.url ? '<a class="person__link" href="' + esc(p.url) + '" target="_blank" rel="noopener">Homepage' + icon("arrowRight") + "</a>" : "") +
        "</article>";
    }).join("");
  }

  function renderRepos() {
    var box = $("#repo-grid");
    if (!box) return;
    var items = Array.isArray(CFG.repos) ? CFG.repos : [];
    if (!items.length) {
      var sec = $("#data");
      if (sec) sec.hidden = true;
      return;
    }
    box.innerHTML = items.map(function (r) {
      var desc = state.lang === "zh" ? (r.descZh || r.descEn) : (r.descEn || r.descZh);
      var badge = state.lang === "zh" ? (r.badgeZh || r.badgeEn) : (r.badgeEn || r.badgeZh);
      return '<article class="repo reveal">' +
        '<div class="repo__top">' +
          '<span class="repo__icon">' + icon("box", "icon--lg") + "</span>" +
          '<span class="repo__name">' + esc(r.name) + "</span>" +
        "</div>" +
        '<p class="repo__desc">' + esc(desc) + "</p>" +
        '<div class="repo__foot">' +
          '<span class="repo__lang">' + esc(r.lang || "") + "</span>" +
          (badge ? '<span class="pub__tag">' + esc(badge) + "</span>" : "") +
          '<a class="repo__link" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(t("data.view")) + icon("arrowRight") + "</a>" +
        "</div>" +
        "</article>";
    }).join("");
  }

  function renderFriendlyLinks() {
    var box = $("#link-grid");
    if (!box) return;
    var items = Array.isArray(CFG.friendlyLinks) ? CFG.friendlyLinks : [];
    if (!items.length) {
      var sec = $("#links");
      if (sec) sec.hidden = true;
      return;
    }
    box.innerHTML = items.map(function (r) {
      var title = state.lang === "zh" ? (r.titleZh || r.titleEn) : (r.titleEn || r.titleZh);
      var desc = state.lang === "zh" ? (r.descZh || r.descEn) : (r.descEn || r.descZh);
      var badge = state.lang === "zh" ? (r.badgeZh || r.badgeEn) : (r.badgeEn || r.badgeZh);
      return '<article class="repo reveal">' +
        '<div class="repo__top">' +
          '<span class="repo__icon">' + icon(r.icon || "globe", "icon--lg") + "</span>" +
          '<span class="repo__name">' + esc(title) + "</span>" +
        "</div>" +
        '<p class="repo__desc">' + esc(desc) + "</p>" +
        '<div class="repo__foot">' +
          (badge ? '<span class="pub__tag">' + esc(badge) + "</span>" : "") +
          '<a class="repo__link" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(t("links.view")) + icon("arrowRight") + "</a>" +
        "</div>" +
        "</article>";
    }).join("");
  }

  function renderContact() {
    var box = $("#contact-lines");
    if (!box) return;
    var c = CFG.contact || {};
    var out = [];

    if (c.email) {
      out.push('<a class="contact-line" href="mailto:' + esc(c.email) + '">' + icon("mail") + "<span>" + esc(c.email) + "</span></a>");
    }
    var addr = state.lang === "zh" ? (c.addressZh || c.addressEn) : (c.addressEn || c.addressZh);
    if (addr) out.push('<span class="contact-line">' + icon("pin") + "<span>" + esc(addr) + "</span></span>");
    if (c.github) out.push('<a class="contact-line" href="' + esc(c.github) + '" target="_blank" rel="noopener">' + icon("building") + "<span>" + esc(t("contact.github")) + "</span></a>");
    if (c.githubPersonal) out.push('<a class="contact-line" href="' + esc(c.githubPersonal) + '" target="_blank" rel="noopener">' + icon("github") + "<span>" + esc(t("contact.githubPersonal")) + "</span></a>");
    if (c.scholar) out.push('<a class="contact-line" href="' + esc(c.scholar) + '" target="_blank" rel="noopener">' + icon("graduation") + "<span>Google Scholar</span></a>");
    if (c.orcid) out.push('<a class="contact-line" href="' + esc(c.orcid) + '" target="_blank" rel="noopener">' + icon("link") + "<span>ORCID</span></a>");

    if (!out.length) {
      // 没有任何联系方式时，至少给一个 GitHub 组织入口
      out.push('<a class="contact-line" href="https://github.com/YileWang-Lab" target="_blank" rel="noopener">' + icon("building") + "<span>GitHub</span></a>");
    }
    box.innerHTML = out.join("");
  }

  function renderHeroStats() {
    var box = $("#hero-stats");
    if (!box) return;

    // 数字全部来自 data/site-config.js 的 stats，不在前端请求任何外部接口：
    // 一是保持零外部依赖，二是 api.github.com 在国内经常连不上或超时。
    var stats = Array.isArray(CFG.stats) ? CFG.stats : [];
    if (!stats.length) { box.innerHTML = ""; return; }

    box.innerHTML = stats.map(function (s) {
      var label = state.lang === "zh" ? (s.labelZh || s.labelEn) : (s.labelEn || s.labelZh);
      return '<div class="stat"><div class="stat__num">' + esc(s.value) + '</div>' +
             '<div class="stat__label">' + esc(label) + "</div></div>";
    }).join("");
  }

  /* -------------------------------------------------------- publications */
  function pubTitle(p) {
    var en = p.titleEn || "";
    var zh = p.titleZh || "";
    if (state.lang === "zh") {
      if (zh && en && zh !== en) return { main: zh, alt: en };
      return { main: zh || en, alt: "" };
    }
    if (en && zh && en !== zh) return { main: en, alt: zh };
    return { main: en || zh, alt: "" };
  }

  function visiblePubs() {
    var q = state.q.trim().toLowerCase();
    return PUBS.filter(function (p) {
      if (state.type !== "all" && p.type !== state.type) return false;
      if (state.year !== "all" && String(p.year) !== String(state.year)) return false;
      if (!q) return true;
      var hay = [
        p.titleEn, p.titleZh, p.venue, p.venueShort,
        (p.authors || []).join(" "),
        (p.tags || []).join(" "),
        p.noteEn, p.noteZh
      ].join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    }).sort(function (a, b) {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      // 优先按精确日期排（ISO 字符串可直接比较），没有 date 就退回年份
      var da = a.date || String(a.year || "");
      var db = b.date || String(b.year || "");
      if (da !== db) return da < db ? 1 : -1;
      return String(a.titleEn || "").localeCompare(String(b.titleEn || ""));
    });
  }

  var LINK_LABEL = { doi: "link.doi", article: "link.article", pdf: "link.pdf", code: "link.code", arxiv: "link.arxiv", ssrn: "link.ssrn", slides: "link.slides" };
  var LINK_ICON = { doi: "link", article: "globe", pdf: "doc", code: "code", arxiv: "doc", ssrn: "doc", slides: "slides" };

  function renderPub(p) {
    var ti = pubTitle(p);
    var authors = (p.authors || []).map(function (a) {
      return rich(a);
    }).join(", ");

    // 「论文原文」的目标地址：优先出版商文章页，缺省时退回 DOI —— DOI 同样会解析到出版商官方页面
    var L = p.links || {};
    var originalUrl = L.article || L.doi || "";

    var badges = [];
    var statusLabel = t("status." + (p.status || "published"));
    badges.push('<span class="badge badge--' + esc(p.status || "published") + '">' + esc(statusLabel) + "</span>");
    if (p.type) badges.push('<span class="badge badge--type">' + esc(t("type." + p.type)) + "</span>");
    if (p.venueShort) badges.push('<span class="badge badge--venue">' + esc(p.venueShort) + "</span>");

    var links = "";
    if (originalUrl) {
      links += '<a class="pub__link pub__link--primary" href="' + esc(originalUrl) + '" target="_blank" rel="noopener">' +
        icon("external") + esc(t("link.original")) + "</a>";
    }
    Object.keys(LINK_LABEL).forEach(function (k) {
      var url = L[k];
      if (!url) return;
      if (k === "article") return;                     // 由「论文原文」按钮承担，避免重复
      if (k === "doi" && url === originalUrl) return;  // 别和「论文原文」指向同一处
      links += '<a class="pub__link" href="' + esc(url) + '" target="_blank" rel="noopener">' +
        icon(LINK_ICON[k]) + esc(t(LINK_LABEL[k])) + "</a>";
    });
    if (p.certificate) {
      links += '<button type="button" class="pub__link"' +
        ' data-lightbox="' + esc(p.certificate) + '"' +
        ' data-caption="' + esc(ti.main) + '">' +
        icon("award") + esc(t("link.certificate")) + "</button>";
    }
    if (p.banner) {
      links += '<button type="button" class="pub__link"' +
        ' data-lightbox="' + esc(p.banner) + '"' +
        ' data-caption="' + esc(ti.main) + '">' +
        icon("image") + esc(t("link.banner")) + "</button>";
    }

    // 缩略图：有论文配图就用配图，没有就用「期刊名 + 年份」的占位块，
    // 这样网格排下来高度一致，不会有的卡片秃一块。
    var thumb;
    if (p.figure) {
      thumb = '<button type="button" class="pub__thumb" data-lightbox="' + esc(p.figure) + '"' +
        ' data-caption="' + esc(ti.main) + '" aria-label="' + esc(t("a11y.zoom")) + '">' +
        '<img src="' + esc(p.figure) + '" alt="" loading="lazy" decoding="async">' +
        "</button>";
    } else {
      var tileName = p.venueShort || String(p.venue || "").split(/[,(]/)[0].trim();
      thumb = '<div class="pub__thumb pub__thumb--tile pub__thumb--' + esc(p.type || "other") + '">' +
        '<span class="pub__thumb-name">' + esc(tileName) + "</span>" +
        (p.year ? '<span class="pub__thumb-year">' + esc(p.year) + "</span>" : "") +
        "</div>";
    }

    // 标题本身就是通往论文原文的入口；再补一句只给读屏用的说明
    var titleInner = esc(ti.main) +
      (ti.alt ? '<span class="pub__title-zh">' + esc(ti.alt) + "</span>" : "");
    var titleHtml = originalUrl
      ? '<a class="pub__title-link" href="' + esc(originalUrl) + '" target="_blank" rel="noopener">' +
          titleInner + '<span class="sr-only">' + esc(t("a11y.openOriginal")) + "</span></a>"
      : titleInner;

    var note = state.lang === "zh" ? (p.noteZh || p.noteEn) : (p.noteEn || p.noteZh);
    var tags = (p.tags || []).length
      ? '<div class="pub__tags">' + p.tags.map(function (x) { return '<span class="pub__tag">' + esc(x) + "</span>"; }).join("") + "</div>"
      : "";

    return '<article class="pub' + (p.featured ? " pub--featured" : "") + '">' +
      thumb +
      '<div class="pub__body">' +
      '<div class="pub__badges">' + badges.join("") + "</div>" +
      '<h3 class="pub__title">' + titleHtml + "</h3>" +
      (authors ? '<p class="pub__authors">' + authors + "</p>" : "") +
      (p.venue ? '<p class="pub__venue">' + esc(p.venue) + (p.year ? ' <span class="yr">· ' + esc(p.year) + "</span>" : "") + "</p>" : "") +
      (note ? '<p class="pub__note">' + icon("info") + esc(note) + "</p>" : "") +
      (links ? '<div class="pub__links">' + links + "</div>" : "") +
      tags +
      "</div></article>";
  }

  function renderPubs() {
    var box = $("#pub-list");
    if (!box) return;

    var list = visiblePubs();

    if (!list.length) {
      box.innerHTML = '<div class="pub-empty"><div class="pub-empty__icon">' + icon("search", "icon--xl") + "</div><p>" + esc(t("pubs.empty")) + "</p></div>";
      return;
    }

    // 按年份分组，倒序
    var groups = [];
    var byYear = {};
    list.forEach(function (p) {
      var y = String(p.year || "—");
      if (!byYear[y]) { byYear[y] = []; groups.push(y); }
      byYear[y].push(p);
    });
    groups.sort(function (a, b) { return (parseInt(b, 10) || 0) - (parseInt(a, 10) || 0); });

    box.innerHTML = groups.map(function (y) {
      return '<div class="pub-year-group">' +
        '<h3 class="pub-year">' + esc(y) + "</h3>" +
        '<div class="pub-grid">' + byYear[y].map(renderPub).join("") + "</div>" +
        "</div>";
    }).join("");
  }

  function renderFilters() {
    var typeBox = $("#filter-type");
    var yearBox = $("#filter-year");

    if (typeBox) {
      var types = [];
      ["journal", "conference", "working", "book"].forEach(function (k) {
        if (PUBS.some(function (p) { return p.type === k; })) types.push(k);
      });
      var html = '<button class="chip" data-type="all" aria-pressed="' + (state.type === "all") + '">' + esc(t("pubs.all")) + "</button>";
      types.forEach(function (k) {
        html += '<button class="chip" data-type="' + esc(k) + '" aria-pressed="' + (state.type === k) + '">' + esc(t("type." + k)) + "</button>";
      });
      typeBox.innerHTML = html;
    }

    if (yearBox) {
      var years = [];
      PUBS.forEach(function (p) {
        var y = parseInt(p.year, 10);
        if (!isNaN(y) && years.indexOf(y) === -1) years.push(y);
      });
      years.sort(function (a, b) { return b - a; });
      var h = '<button class="chip" data-year="all" aria-pressed="' + (state.year === "all") + '">' + esc(t("pubs.all")) + "</button>";
      years.forEach(function (y) {
        h += '<button class="chip" data-year="' + y + '" aria-pressed="' + (state.year === String(y)) + '">' + y + "</button>";
      });
      yearBox.innerHTML = h;
    }
  }

  function renderAll() {
    renderConfig();
    renderFilters();
    renderPubs();
    observeReveals();
  }

  /* --------------------------------------------------------------- events */
  function bind() {
    // 主题
    var themeBtn = $("#theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        applyTheme(state.theme === "dark" ? "light" : "dark", true);
      });
    }

    // 语言
    $$(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-lang");
        if (l !== state.lang) applyLang(l, true);
      });
    });

    // 移动端菜单
    var navBtn = $("#nav-toggle");
    var nav = $("#site-nav");
    if (navBtn && nav) {
      navBtn.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        navBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          nav.classList.remove("is-open");
          navBtn.setAttribute("aria-expanded", "false");
        }
      });
    }

    // 搜索
    var search = $("#pub-search");
    if (search) {
      var deb;
      search.addEventListener("input", function () {
        clearTimeout(deb);
        var v = search.value;
        deb = setTimeout(function () { state.q = v; renderPubs(); }, 140);
      });
    }

    // 筛选（事件委托）
    var toolbar = $("#pub-toolbar");
    if (toolbar) {
      toolbar.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        if (chip.hasAttribute("data-type")) {
          state.type = chip.getAttribute("data-type");
          $$("#filter-type .chip").forEach(function (c) {
            c.setAttribute("aria-pressed", c === chip ? "true" : "false");
          });
        } else if (chip.hasAttribute("data-year")) {
          state.year = chip.getAttribute("data-year");
          $$("#filter-year .chip").forEach(function (c) {
            c.setAttribute("aria-pressed", c === chip ? "true" : "false");
          });
        }
        renderPubs();
      });
    }

    // 灯箱：点击横幅图或"录用证明"放大查看
    var lb = $("#lightbox");
    if (lb) {
      var lbImg = $("#lightbox-img");
      var lbCap = $("#lightbox-caption");

      function closeLb() {
        lb.classList.remove("is-open");
        lb.setAttribute("hidden", "");
        document.body.style.overflow = "";
        if (lbImg) lbImg.removeAttribute("src");
      }
      function openLb(src, caption) {
        if (!src || !lbImg) return;
        lbImg.setAttribute("src", src);
        lbImg.setAttribute("alt", caption || "");
        if (lbCap) lbCap.textContent = caption || "";
        lb.removeAttribute("hidden");
        void lb.offsetWidth; // 触发 reflow，让淡入过渡生效
        lb.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }

      document.addEventListener("click", function (e) {
        var trigger = e.target.closest("[data-lightbox]");
        if (trigger) {
          e.preventDefault();
          openLb(trigger.getAttribute("data-lightbox"), trigger.getAttribute("data-caption"));
          return;
        }
        if (e.target.closest("#lightbox-close") || e.target === lb) closeLb();
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lb.classList.contains("is-open")) closeLb();
      });
      lb._close = closeLb;
    }

    // 键盘："/" 聚焦搜索框
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        var s = $("#pub-search");
        if (s) { e.preventDefault(); s.focus(); s.select(); }
      }
      if (e.key === "Escape") {
        var n = $("#site-nav");
        if (n && n.classList.contains("is-open")) {
          n.classList.remove("is-open");
          var nb = $("#nav-toggle");
          if (nb) nb.setAttribute("aria-expanded", "false");
        }
      }
    });

    // 滚动高亮当前栏目
    if ("IntersectionObserver" in window) {
      var links = $$(".nav__link");
      var sections = links.map(function (a) {
        var id = a.getAttribute("href");
        return id && id.charAt(0) === "#" ? document.getElementById(id.slice(1)) : null;
      }).filter(Boolean);

      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id ? "true" : "false");
          });
        });
      }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });

      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ------------------------------------------------------------- reveals */
  var revealObserver = null;
  function observeReveals() {
    var els = $$(".reveal:not(.is-visible)");
    if (!els.length) return;

    // 没有 IntersectionObserver 就全部直接显示
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var vh = window.innerHeight || document.documentElement.clientHeight;

    // 先一次性读完所有位置，再统一写 class，避免反复触发同步布局
    var pending = els.map(function (el) {
      var r = el.getBoundingClientRect();
      return { el: el, inView: r.top < vh * 0.92 && r.bottom > -40 };
    });

    var below = [];
    pending.forEach(function (p) {
      // 首屏内的元素立即显示：不依赖 IntersectionObserver 回调的触发时机，
      // 否则某些环境下（后台标签页、打印、无头浏览器）会一直保持透明。
      if (p.inView) p.el.classList.add("is-visible");
      else below.push(p.el);
    });

    if (!below.length) return;

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            obs.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    }
    below.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 45, 260) + "ms";
      revealObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------------- boot */
  function init() {
    // 语言：本地存储 > 浏览器语言 > 中文
    var savedLang = load(LS_LANG);
    if (savedLang === "zh" || savedLang === "en") {
      state.lang = savedLang;
    } else {
      var nav = (navigator.language || "zh").toLowerCase();
      state.lang = nav.indexOf("zh") === 0 ? "zh" : "en";
    }

    // 主题：本地存储 > 系统偏好
    var savedTheme = load(LS_THEME);
    if (savedTheme === "dark" || savedTheme === "light") {
      state.theme = savedTheme;
    } else {
      state.theme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    }

    applyTheme(state.theme, false);
    applyLang(state.lang, false);
    bind();
    observeReveals();

    // 数据自检：帮助维护者发现自己改坏的条目
    var bad = PUBS.filter(function (p) { return !p || (!p.titleEn && !p.titleZh); });
    if (bad.length) {
      console.warn("[publications] " + bad.length + " 条记录缺少标题，已忽略。请检查 data/publications.js");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
