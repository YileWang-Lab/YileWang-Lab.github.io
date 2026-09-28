/* ============================================================================
 *  站点基础配置 / Site configuration
 * ----------------------------------------------------------------------------
 *  这里集中放"会变动但不属于论文"的信息。改完存盘、提交、推送即可生效。
 *  All site-wide settings live here. Edit, save, commit, push.
 *
 *  ⚠️ 需要你确认的地方用 TODO 标出来了。
 * ==========================================================================*/

window.SITE_CONFIG = {

  /* ---- 课题组名称 / Lab name ------------------------------------------- */
  labNameEn: "Yile Wang Lab",
  labNameZh: "王毅乐课题组",
  // 页头左侧的缩写标记（1-3 个字符最好看）
  labMonogram: "YWL",

  /* ---- 一句话定位 / Tagline -------------------------------------------- */
  taglineEn: "Economics, Financial Engineering & Machine Learning",
  taglineZh: "经济学 · 金融工程 · 机器学习",

  /* ---- 所属单位 / Affiliation ------------------------------------------ */
  // 按课题组要求，不公开学校 / 院系信息
  affiliationEn: "Yile Wang Lab",
  affiliationZh: "王毅乐课题组",

  /* ---- 联系方式 / Contact ---------------------------------------------- */
  contact: {
    email: "wyl13393401611@126.com",
    // 不公开办公地址
    addressEn: "",
    addressZh: "",
    // 外部主页，留空则不显示该按钮
    scholar: "",
    orcid: "",
    github: "https://github.com/YileWang-Lab"
  },

  /* ---- 关联仓库 / Related repositories --------------------------------- */
  repos: [
    {
      name: "yile-wang-lab-data",
      url: "https://github.com/YileWang-Lab/yile-wang-lab-data",
      descEn: "Bilingual reusable economic and financial research data hub — standardized datasets, field dictionaries, source audits and reproducible cleaning code.",
      descZh: "面向经济学与金融工程研究的双语复用数据仓库：标准化数据、字段字典、来源核查与可重跑的清洗代码。",
      lang: "Python",
      badgeEn: "Data Hub",
      badgeZh: "数据仓库"
    },
    {
      name: "Financial-Engineering-notebook",
      url: "https://github.com/YileWang-Lab/Financial-Engineering-notebook",
      descEn: "Teaching and research notebooks for financial engineering.",
      descZh: "金融工程方向的教学与研究 notebook 合集。",
      lang: "Jupyter",
      badgeEn: "Notebooks",
      badgeZh: "教学笔记"
    }
  ],

  /* ---- 研究方向 / Research areas --------------------------------------- */
  // 按课题组已发表论文的实际方向归纳，icon 用 emoji（零依赖、不会加载失败）
  research: [
    {
      icon: "📈",
      titleEn: "FinTech & Market Microstructure",
      titleZh: "金融科技与市场微观结构",
      descEn: "IPO pricing efficiency, investor sentiment and machine-learning identification strategies for financial markets.",
      descZh: "IPO 定价效率、投资者情绪，以及面向金融市场的机器学习因果识别方法。"
    },
    {
      icon: "🌱",
      titleEn: "Energy & Environmental Economics",
      titleZh: "能源与环境经济学",
      descEn: "Energy poverty measurement, carbon-emission accounting, and the coupling coordination between the digital economy and sustainability.",
      descZh: "能源贫困测度、碳排放核算，以及数字经济与可持续发展的耦合协调关系。"
    },
    {
      icon: "🤖",
      titleEn: "Machine Learning & Intelligent Forecasting",
      titleZh: "机器学习与智能预测",
      descEn: "Explainable deep learning, spatiotemporal modelling and hybrid forecasting frameworks, plus vision models for document intelligence.",
      descZh: "可解释深度学习、时空建模与混合预测框架，以及面向文档智能的视觉模型。"
    },
    {
      icon: "📊",
      titleEn: "Macro & Development Assessment",
      titleZh: "宏观与发展评估",
      descEn: "Multidimensional indices for employment, modernization and regional development, built on big-data and dimension-reduction methods.",
      descZh: "面向就业、现代化与区域发展的多维指标体系，基于大数据与降维方法构建。"
    }
  ],

  /* ---- 团队 / Team ------------------------------------------------------ */
  // TODO: 按需增补成员；url 留空则不显示主页链接
  team: [
    {
      nameEn: "Yile Wang",
      nameZh: "王毅乐",
      roleEn: "Principal Investigator",
      roleZh: "课题组负责人",
      url: ""
    }
  ],

  /* ---- 页脚 ------------------------------------------------------------- */
  footerNoteEn: "Built with plain HTML, CSS and JavaScript — no external dependencies, no trackers.",
  footerNoteZh: "由纯 HTML / CSS / JavaScript 构建 —— 无外部依赖、无追踪脚本。"
};
