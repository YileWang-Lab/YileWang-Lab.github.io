/* ============================================================================
 *  论文列表 / Publication list
 * ----------------------------------------------------------------------------
 *  ⚠️ 这是全站唯一需要经常编辑的文件。
 *     加一篇论文 = 复制下面任意一条 {...} 粘贴到数组里，改字段即可。
 *
 *  字段说明 / Field reference
 *  ---------------------------------------------------------------------------
 *  titleEn    英文标题（必填）
 *  titleZh    中文标题（可留空 ""，留空时中文界面显示英文标题）
 *  authors    作者数组。想加粗本组成员，在名字两边写 **星号**
 *             例：["**Yile Wang**", "San Zhang", "Si Li"]
 *  venue      期刊/会议全称
 *  venueShort 简称，显示成小标签（可留空）
 *  year       年份，数字，不要加引号
 *  type       "journal" 期刊 | "conference" 会议 | "working" 工作论文 | "book" 专著章节
 *  status     "accepted" 已录用 | "published" 已发表 | "forthcoming" 即将刊出 | "working" 工作论文
 *  links      链接对象，没有的键直接删掉或留空字符串
 *             doi / pdf / code / arxiv / ssrn / slides
 *  tags       关键词数组，会显示成灰色小标签（可留空 []）
 *  featured   true 会置顶并加金色边框（用于最想突出的成果，可省略）
 *  noteEn/noteZh  备注，例如 "Best Paper Award"（可省略）
 * ==========================================================================*/

window.PUBLICATIONS = [

  /* ==========================================================================
   *  ⬇️ 下面是示例条目 —— 等你把真实论文清单发来后我替换掉。
   *     目前 url / 数字都不代表真实成果，先用来验证排版效果。
   * ========================================================================*/

  {
    titleEn: "Sample entry — replace with a real accepted paper",
    titleZh: "示例条目 —— 请替换为真实已录用论文",
    authors: ["**Yile Wang**", "Co-author A", "Co-author B"],
    venue: "Journal name goes here",
    venueShort: "",
    year: 2026,
    type: "journal",
    status: "accepted",
    links: { doi: "", pdf: "", code: "" },
    tags: ["示例", "Sample"],
    featured: true,
    noteEn: "Demonstrates a featured (highlighted) entry.",
    noteZh: "演示「重点突出」条目的样式。"
  },

  {
    titleEn: "Sample entry — a conference paper",
    titleZh: "示例条目 —— 会议论文",
    authors: ["Co-author A", "**Yile Wang**"],
    venue: "Proceedings of the Example Conference",
    venueShort: "EXAMPLE 2025",
    year: 2025,
    type: "conference",
    status: "published",
    links: { doi: "https://example.com", pdf: "" },
    tags: ["机器学习"]
  },

  {
    titleEn: "Sample entry — a working paper",
    titleZh: "示例条目 —— 工作论文",
    authors: ["**Yile Wang**"],
    venue: "Working paper",
    venueShort: "",
    year: 2025,
    type: "working",
    status: "working",
    links: { ssrn: "" },
    tags: []
  }

];
