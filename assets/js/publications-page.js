/* ============================================================================
 *  publications.html：按年份分组渲染全部论文
 * ----------------------------------------------------------------------------
 *  条目本身由 assets/js/pub-render.js 渲染（与首页共用一份逻辑）。
 * ==========================================================================*/
(function () {
  "use strict";

  function init() {
    var box = document.getElementById("pub-list");
    if (!box || !window.PubRender) return;

    var list = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS.slice() : [];
    var esc = window.PubRender.esc;

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
      html += window.PubRender.entry(p);
    });

    box.innerHTML = html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
