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

  /* -------------------------------------------------------- theme + lang */
  function applyTheme(theme, announce) {
    state.theme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
    var btn = $("#theme-toggle");
    if (btn) {
      var icon = $(".toggle__icon", btn);
      if (icon) icon.textContent = state.theme === "dark" ? "☀️" : "🌙";
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
    renderTeam();
    renderRepos();
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
        '<span class="research-card__icon" aria-hidden="true">' + esc(r.icon || "•") + "</span>" +
        '<h3 class="research-card__title">' + esc(title) + "</h3>" +
        '<p class="research-card__desc">' + esc(desc) + "</p>" +
        "</article>";
    }).join("");
  }

  function renderTeam() {
    var box = $("#team-grid");
    if (!box) return;
    var items = Array.isArray(CFG.team) ? CFG.team : [];
    if (!items.length) {
      var sec = $("#team");
      if (sec) sec.hidden = true;
      return;
    }
    box.innerHTML = items.map(function (p) {
      var name = state.lang === "zh" ? (p.nameZh || p.nameEn) : (p.nameEn || p.nameZh);
      var role = state.lang === "zh" ? (p.roleZh || p.roleEn) : (p.roleEn || p.roleZh);
      return '<article class="person reveal">' +
        '<div class="person__avatar" aria-hidden="true">' + esc(initials(name)) + "</div>" +
        '<h3 class="person__name">' + esc(name) + "</h3>" +
        '<p class="person__role">' + esc(role || "") + "</p>" +
        (p.url ? '<a class="person__link" href="' + esc(p.url) + '" target="_blank" rel="noopener">Homepage →</a>' : "") +
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
          '<span class="repo__icon" aria-hidden="true">📦</span>' +
          '<span class="repo__name">' + esc(r.name) + "</span>" +
        "</div>" +
        '<p class="repo__desc">' + esc(desc) + "</p>" +
        '<div class="repo__foot">' +
          '<span class="repo__lang">' + esc(r.lang || "") + "</span>" +
          (badge ? '<span class="pub__tag">' + esc(badge) + "</span>" : "") +
          '<a class="repo__link" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(t("data.view")) + "</a>" +
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
      out.push('<a class="contact-line" href="mailto:' + esc(c.email) + '">✉️ <span>' + esc(c.email) + "</span></a>");
    }
    var addr = state.lang === "zh" ? (c.addressZh || c.addressEn) : (c.addressEn || c.addressZh);
    if (addr) out.push('<span class="contact-line">📍 <span>' + esc(addr) + "</span></span>");
    if (c.github) out.push('<a class="contact-line" href="' + esc(c.github) + '" target="_blank" rel="noopener">💻 <span>' + esc(t("contact.github")) + "</span></a>");
    if (c.githubPersonal) out.push('<a class="contact-line" href="' + esc(c.githubPersonal) + '" target="_blank" rel="noopener">👤 <span>' + esc(t("contact.githubPersonal")) + "</span></a>");
    if (c.scholar) out.push('<a class="contact-line" href="' + esc(c.scholar) + '" target="_blank" rel="noopener">🎓 <span>Google Scholar</span></a>');
    if (c.orcid) out.push('<a class="contact-line" href="' + esc(c.orcid) + '" target="_blank" rel="noopener">🆔 <span>ORCID</span></a>');

    if (!out.length) {
      // 没有任何联系方式时，至少给一个 GitHub 组织入口
      out.push('<a class="contact-line" href="https://github.com/YileWang-Lab" target="_blank" rel="noopener">💻 <span>GitHub</span></a>');
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
  var LINK_ICON = { doi: "🔗", article: "🌐", pdf: "📄", code: "💻", arxiv: "📄", ssrn: "📄", slides: "📊" };

  function renderPub(p) {
    var ti = pubTitle(p);
    var authors = (p.authors || []).map(function (a) {
      return rich(a);
    }).join(", ");

    var badges = [];
    var statusLabel = t("status." + (p.status || "published"));
    badges.push('<span class="badge badge--' + esc(p.status || "published") + '">' + esc(statusLabel) + "</span>");
    if (p.type) badges.push('<span class="badge badge--type">' + esc(t("type." + p.type)) + "</span>");
    if (p.venueShort) badges.push('<span class="badge badge--venue">' + esc(p.venueShort) + "</span>");

    var links = "";
    var L = p.links || {};
    Object.keys(LINK_LABEL).forEach(function (k) {
      var url = L[k];
      if (!url) return;
      links += '<a class="pub__link" href="' + esc(url) + '" target="_blank" rel="noopener">' +
        '<span aria-hidden="true">' + LINK_ICON[k] + "</span>" + esc(t(LINK_LABEL[k])) + "</a>";
    });
    if (p.certificate) {
      links += '<button type="button" class="pub__link"' +
        ' data-lightbox="' + esc(p.certificate) + '"' +
        ' data-caption="' + esc(ti.main) + '">' +
        '<span aria-hidden="true">🎓</span>' + esc(t("link.certificate")) + "</button>";
    }

    // 期刊提供的 article banner，放在卡片顶部
    var banner = p.banner
      ? '<button type="button" class="pub__banner"' +
        ' data-lightbox="' + esc(p.banner) + '"' +
        ' data-caption="' + esc(ti.main) + '"' +
        ' aria-label="' + esc(t("a11y.zoom")) + '">' +
        '<img src="' + esc(p.banner) + '" alt="" loading="lazy" decoding="async" width="1200" height="607">' +
        "</button>"
      : "";

    var note = state.lang === "zh" ? (p.noteZh || p.noteEn) : (p.noteEn || p.noteZh);
    var tags = (p.tags || []).length
      ? '<div class="pub__tags">' + p.tags.map(function (x) { return '<span class="pub__tag">' + esc(x) + "</span>"; }).join("") + "</div>"
      : "";

    return '<article class="pub' + (p.featured ? " pub--featured" : "") + '">' +
      banner +
      '<div class="pub__badges">' + badges.join("") + "</div>" +
      '<h3 class="pub__title">' + esc(ti.main) +
        (ti.alt ? '<span class="pub__title-zh">' + esc(ti.alt) + "</span>" : "") +
      "</h3>" +
      (authors ? '<p class="pub__authors">' + authors + "</p>" : "") +
      (p.venue ? '<p class="pub__venue">' + esc(p.venue) + (p.year ? ' <span class="yr">· ' + esc(p.year) + "</span>" : "") + "</p>" : "") +
      (note ? '<p class="pub__note">ℹ️ ' + esc(note) + "</p>" : "") +
      (links ? '<div class="pub__links">' + links + "</div>" : "") +
      tags +
      "</article>";
  }

  function renderPubs() {
    var box = $("#pub-list");
    var countEl = $("#pub-count");
    if (!box) return;

    var list = visiblePubs();

    if (countEl) {
      countEl.innerHTML = (list.length === PUBS.length)
        ? t("pubs.count", { n: list.length })
        : t("pubs.count.filtered", { n: list.length, total: PUBS.length });
    }

    if (!list.length) {
      box.innerHTML = '<div class="pub-empty"><div class="pub-empty__icon" aria-hidden="true">🔍</div><p>' + esc(t("pubs.empty")) + "</p></div>";
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
        '<div class="pub-list">' + byYear[y].map(renderPub).join("") + "</div>" +
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
