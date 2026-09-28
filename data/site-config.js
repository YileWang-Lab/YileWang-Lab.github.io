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
  // 英文名（显示在页头、标签页）
  labNameEn: "Yile Wang Lab",
  // 中文名（TODO: 请填课题组正式中文名，例如"王义乐课题组"）
  labNameZh: "Yile Wang 课题组",
  // 页头左侧的缩写标记（1-3 个字符最好看）
  labMonogram: "YWL",

  /* ---- 一句话定位 / Tagline -------------------------------------------- */
  taglineEn: "Economics, Financial Engineering & Machine Learning",
  taglineZh: "经济学 · 金融工程 · 机器学习",

  /* ---- 所属单位 / Affiliation ------------------------------------------ */
  affiliationEn: "Yile Wang Lab",
  affiliationZh: "Yile Wang 课题组",

  /* ---- 联系方式 / Contact ---------------------------------------------- */
  contact: {
    // TODO: 填课题组公开邮箱
    email: "",
    // TODO: 填办公地址（可留空）
    addressEn: "",
    addressZh: "",
    // 外部主页 / Google Scholar / ORCID 等，留空则不显示该按钮
    scholar: "",
    orcid: "",
    github: "https://github.com/YileWang-Lab"
  },

  /* ---- 关联仓库 / Related repositories --------------------------------- */
  // 会显示在"数据与代码"板块
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
  // icon 用 emoji，零依赖、跨平台、不会加载失败
  research: [
    {
      icon: "📈",
      titleEn: "Asset Pricing & Derivatives",
      titleZh: "资产定价与衍生品",
      descEn: "Option pricing under illiquidity, volatility modelling, and hedging with neural networks.",
      descZh: "非流动性条件下的期权定价、波动率建模，以及基于神经网络的动态对冲。"
    },
    {
      icon: "🏦",
      titleEn: "Financial Risk & Stability",
      titleZh: "金融风险与稳定",
      descEn: "Systemic risk measurement, network structure, and financial resilience of firms and regions.",
      descZh: "系统性风险度量、网络结构与企业和区域的金融韧性。"
    },
    {
      icon: "🤖",
      titleEn: "Machine Learning in Finance",
      titleZh: "金融机器学习",
      descEn: "Deep learning and statistical learning applied to return prediction and portfolio construction.",
      descZh: "深度学习与统计学习在收益率预测和投资组合构建中的应用。"
    },
    {
      icon: "📊",
      titleEn: "Applied Econometrics & Data",
      titleZh: "应用计量与数据基础设施",
      descEn: "Reproducible empirical pipelines, bilingual data standards, and open research data curation.",
      descZh: "可复现的实证流程、双语数据标准，以及开放研究数据的整理与审计。"
    }
  ],

  /* ---- 团队 / Team ------------------------------------------------------ */
  // TODO: 按需增删；role / name / 主页链接
  team: [
    {
      nameEn: "Yile Wang",
      nameZh: "Yile Wang",
      roleEn: "Principal Investigator",
      roleZh: "课题组负责人",
      url: ""
    }
  ],

  /* ---- 页脚 ------------------------------------------------------------- */
  footerNoteEn: "Built with plain HTML, CSS and JavaScript — no external dependencies, no trackers.",
  footerNoteZh: "由纯 HTML / CSS / JavaScript 构建 —— 无外部依赖、无追踪脚本。"
};
