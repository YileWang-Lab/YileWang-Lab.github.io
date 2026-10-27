/* ============================================================================
 *  经典版式论文列表渲染 / Publications page renderer
 * ----------------------------------------------------------------------------
 *  数据仍然来自 data/publications.js（与首页共用一份，不重复维护）。
 *  版式照着参考站点复刻：左侧缩略图、标题加粗深蓝且本身就是原文链接，
 *  下面依次是作者（本组成员加粗）、期刊斜体、备注、以及一行链接。
 * ==========================================================================*/
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* **星号** → <b>，用于把本组成员加粗 */
  function rich(s) {
    return esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  }

  /* 「论文原文」的目标：优先出版商文章页，缺省退回 DOI（同样解析到官方页面） */
  function originalUrl(p) {
    var L = p.links || {};
    return L.article || L.doi || "";
  }

  function thumb(p) {
    if (p.figure) {
      return '<img src="' + esc(p.figure) + '" alt="" loading="lazy" decoding="async">';
    }
    var name = p.venueShort || String(p.venue || "").split(/[,(]/)[0].trim();
    return '<div class="pub-thumb--tile" aria-hidden="true">' +
      "<b>" + esc(name) + "</b>" +
      (p.year ? "<span>" + esc(p.year) + "</span>" : "") +
      "</div>";
  }

  function links(p) {
    var L = p.links || {};
    var original = originalUrl(p);
    var out = [];

    if (original) out.push({ href: original, label: "论文原文" });
    if (L.doi && L.doi !== original) out.push({ href: L.doi, label: "DOI" });
    if (p.certificate) out.push({ href: p.certificate, label: "录用证明" });
    if (p.banner) out.push({ href: p.banner, label: "期刊横幅" });

    if (!out.length) return "";
    return '<span class="links">' + out.map(function (l) {
      return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
    }).join("") + "</span>";
  }

  function entry(p) {
    var original = originalUrl(p);
    var titleEn = p.titleEn || p.titleZh || "";

    var titleHtml = original
      ? '<a href="' + esc(original) + '" target="_blank" rel="noopener">' + esc(titleEn) + "</a>"
      : esc(titleEn);

    var authors = (p.authors || []).map(rich).join(", ");
    var venue = [p.venue, p.year].filter(Boolean).join(", ");
    var note = p.noteEn || p.noteZh || "";

    return '<div class="publication">' +
      '<div class="pub-thumb">' + thumb(p) + "</div>" +
      '<div class="pub-body">' +
        '<div class="pub-title">' + titleHtml + "</div>" +
        (p.titleZh ? '<span class="pub-title-zh">' + esc(p.titleZh) + "</span>" : "") +
        (authors ? '<p class="pub-authors">' + authors + ".</p>" : "") +
        (venue ? '<p class="pub-venue"><em>' + esc(venue) + "</em></p>" : "") +
        (note ? '<p class="pub-note">' + esc(note) + "</p>" : "") +
        links(p) +
      "</div>" +
      "</div>";
  }

  function init() {
    var box = document.getElementById("pub-list");
    if (!box) return;

    var list = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS.slice() : [];

    // 年份倒序；同年内按精确日期倒序，没有 date 的退回年份
    list.sort(function (a, b) {
      if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
      var da = a.date || String(a.year || "");
      var db = b.date || String(b.year || "");
      return da < db ? 1 : da > db ? -1 : 0;
    });

    var html = "";
    var currentYear = null;
    list.forEach(function (p) {
      if (p.year !== currentYear) {
        currentYear = p.year;
        html += "<h3>" + esc(currentYear) + "</h3>";
      }
      html += entry(p);
    });

    box.innerHTML = html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
