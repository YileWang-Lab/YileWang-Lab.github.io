/* ============================================================================
 *  论文列表 / Publication list
 * ----------------------------------------------------------------------------
 *  注意：这是全站唯一需要经常编辑的文件。
 *     加一篇论文 = 复制任意一条 {...} 粘贴到数组里，改字段即可。
 *
 *  字段说明 / Field reference
 *  ---------------------------------------------------------------------------
 *  titleEn    英文标题（必填）
 *  titleZh    中文标题（可留空 ""，留空时中文界面显示英文标题）
 *  authors    作者数组。本组成员用 **星号** 加粗，例如 "**Yile Wang**"
 *  venue      期刊/会议全称（含卷期页码）
 *  venueShort 简称，显示成蓝色小标签（可留空）
 *  year       年份，数字，不要加引号
 *  date       精确日期 "YYYY-MM-DD"，用于同年内排序（可省略）
 *  type       "journal" 期刊 | "conference" 会议 | "working" 工作论文 | "book" 专著章节
 *  status     "accepted" 已录用 | "published" 已发表 | "forthcoming" 即将刊出 | "working" 工作论文
 *  links      链接对象：doi / article / pdf / code / arxiv / ssrn / slides，没有的就删掉
 *             article 是出版商原文页：卡片标题与「论文原文」按钮优先用它，缺省时回退到 doi
 *  tags       关键词数组，显示成灰色小标签（可留空 []）
 *  banner     卡片横幅图路径（可省略）
 *  figure     论文配图路径，显示为卡片顶部缩略图（可省略；没有则用期刊名占位块）
 *  certificate 录用证明图片路径，点击后灯箱放大（可省略）
 *  featured   true 会置顶并加金色边框（可省略）
 *  noteEn/noteZh  备注，例如 "通讯作者"（可省略）
 *
 *  通讯作者标记 †  已并入 authors 文案，例如 "**Yile Wang**†"
 * ==========================================================================*/

window.PUBLICATIONS = [

  /* ======================= 2026 ======================= */

  {
    titleEn: "Analysis of Influencing Factors and Prediction of Provincial Energy Poverty in China Based on Explainable Deep Learning",
    titleZh: "基于可解释深度学习的中国省级能源贫困影响因素分析与预测",
    authors: ["Zihao Fan", "Pengying Fan", "**Yile Wang**†"],
    venue: "Systems, Vol. 14, Issue 3, Article 319",
    venueShort: "Systems",
    year: 2026,
    date: "2026-03-17",
    type: "journal",
    status: "published",
    links: {
      doi: "https://doi.org/10.3390/systems14030319",
      article: "https://www.mdpi.com/2079-8954/14/3/319"
    },
    tags: ["能源贫困", "可解释深度学习", "能源与环境"],
    figure: "assets/figures/systems-319.jpg",
    banner: "assets/banners/systems-319.jpg",
    certificate: "assets/certificates/systems-319.jpg",
    noteEn: "MDPI · Open Access",
    noteZh: "MDPI 开放获取"
  },

  {
    titleEn: "Mapping the Coupling Coordination Between China's Digital Economy and Carbon Emissions: Spatiotemporal Patterns and Spatial Markov Transitions",
    titleZh: "中国数字经济与碳排放耦合协调格局刻画：时空特征与空间马尔可夫转移",
    authors: ["Chen Gao", "Chujia Zhang", "Zhenlin Chen", "**Yile Wang**†"],
    venue: "Sustainability, Vol. 18, Issue 3, Article 1283",
    venueShort: "Sustainability",
    year: 2026,
    date: "2026-01-27",
    type: "journal",
    status: "published",
    links: {
      doi: "https://doi.org/10.3390/su18031283",
      article: "https://www.mdpi.com/2071-1050/18/3/1283"
    },
    tags: ["数字经济", "碳排放", "空间马尔可夫", "能源与环境"],
    figure: "assets/figures/sustainability-1283.jpg",
    banner: "assets/banners/sustainability-1283.jpg",
    certificate: "assets/certificates/sustainability-1283.jpg",
    noteEn: "Gao, Zhang and Chen contributed equally · MDPI Open Access",
    noteZh: "高、张、陈三位作者贡献相同 · MDPI 开放获取"
  },

  {
    titleEn: "Calibrating Generative AI Use for Sustainable Higher Education: Cross-Sectional Evidence on Perceived Capability and Dependence",
    titleZh: "可持续高等教育中生成式人工智能使用的校准：感知能力与依赖性的横截面证据",
    authors: ["Xinchen Zhang", "**Yile Wang**", "Chunbing Li"],
    venue: "Sustainability, Vol. 18, Issue 19, Article 9871",
    venueShort: "Sustainability",
    year: 2026,
    date: "2026-09-01",
    type: "journal",
    status: "published",
    links: {
      doi: "https://doi.org/10.3390/su18199871",
      article: "https://www.mdpi.com/2071-1050/18/19/9871"
    },
    tags: ["生成式人工智能", "高等教育", "可持续发展"],
    figure: "assets/figures/sustainability-9871.jpg",
    banner: "assets/banners/sustainability-9871.jpg",
    certificate: "assets/certificates/sustainability-9871.jpg",
    noteEn: "MDPI · Open Access",
    noteZh: "MDPI 开放获取"
  },

  {
    titleEn: "Optimal Guarantee Level Optimization for Agricultural Insurance-Futures Based on CRRA Utility Maximization",
    titleZh: "基于 CRRA 效用最大化的农业保险—期货最优保障水平优化",
    authors: ["Jiayi Wang", "**Yile Wang**†"],
    venue: "Agricultural & Forestry Economics and Management, Vol. 9, Issue 1",
    venueShort: "Agri. & Forestry Econ.",
    year: 2026,
    type: "journal",
    status: "published",
    links: {
      doi: "https://doi.org/10.23977/agrfem.2026.090110",
      article: "https://www.clausiuspress.com/article/18020.html"
    },
    tags: ["农业保险", "期货", "CRRA 效用", "风险管理"],
    noteEn: "Clausius Press · Corresponding author",
    noteZh: "Clausius Press · 通讯作者"
  },

  /* ======================= 2025 ======================= */

  {
    titleEn: "Research on the Impact of Investor Sentiment on IPO Pricing Efficiency Based on Double Machine Learning",
    titleZh: "基于双重机器学习的投资者情绪对 IPO 定价效率影响研究",
    authors: ["Jintai Ye", "Yunshi Chen", "**Yile Wang**†"],
    venue: "2025 International Conference on Information Technology, Communication Ecosystem and Management (ITCEM), pp. 230–236",
    venueShort: "ITCEM 2025",
    year: 2025,
    date: "2025-12-05",
    type: "conference",
    status: "published",
    links: {
      doi: "https://doi.org/10.1109/itcem68692.2025.00050",
      article: "https://ieeexplore.ieee.org/document/11455037/"
    },
    tags: ["金融科技", "IPO 定价", "双重机器学习", "投资者情绪"]
  },

  {
    titleEn: "A Deep Learning Framework Integrating Swin Transformer and U-Net for Ancient Character Segmentation and Recognition",
    titleZh: "融合 Swin Transformer 与 U-Net 的古文字分割与识别深度学习框架",
    authors: ["**Yile Wang**†", "Kexin Li", "Hao Du", "Yiwei Feng"],
    venue: "2025 IEEE 7th International Conference on Civil Aviation Safety and Information Technology (ICCASIT), pp. 816–822",
    venueShort: "ICCASIT 2025",
    year: 2025,
    date: "2025-10-22",
    type: "conference",
    status: "published",
    links: {
      doi: "https://doi.org/10.1109/iccasit66611.2025.11348884",
      article: "https://ieeexplore.ieee.org/document/11348884/"
    },
    tags: ["计算机视觉", "Swin Transformer", "U-Net", "古文字识别"]
  },

  {
    titleEn: "Research on Intelligent Prediction of Photovoltaic Power Generation by Integrating Prophet and Deep Spatiotemporal Modeling",
    titleZh: "融合 Prophet 与深度时空建模的光伏发电智能预测研究",
    authors: ["**Yile Wang**†", "You Wu", "Tanglong Lian"],
    venue: "2025 IEEE 7th International Conference on Power, Intelligent Computing and Systems (ICPICS), pp. 45–51",
    venueShort: "ICPICS 2025",
    year: 2025,
    date: "2025-08-29",
    type: "conference",
    status: "published",
    links: {
      doi: "https://doi.org/10.1109/icpics66386.2025.11347268",
      article: "https://ieeexplore.ieee.org/document/11347268/"
    },
    tags: ["能源预测", "光伏发电", "Prophet", "时空建模"]
  },

  {
    titleEn: "Research on the Employment Prosperity Index of New Economic Service Industries in China based on Big Data",
    titleZh: "基于大数据的新经济服务业就业景气指数研究",
    authors: ["**Yile Wang**†", "Yicong Liu", "Jinyi Lu"],
    venue: "Frontiers in Economics and Management, Vol. 6, Issue 8",
    venueShort: "Front. Econ. Manag.",
    year: 2025,
    date: "2025-08-01",
    type: "journal",
    status: "published",
    links: {
      doi: "https://doi.org/10.6981/FEM.202508_6(8).0022",
      article: "https://fieam.org/index.php/ojs/article/view/74"
    },
    tags: ["宏观与发展", "就业景气指数", "大数据"]
  },

  {
    titleEn: "A Hybrid PCA-Stacking Framework for Multidimensional Assessment of Development Trajectories: Evidence from China's Modernization Process",
    titleZh: "面向发展轨迹多维评估的混合 PCA-Stacking 框架：来自中国现代化进程的证据",
    authors: ["Hanrui Wang", "**Yile Wang**†"],
    venue: "Frontiers in Economics and Management, Vol. 6, Issue 7",
    venueShort: "Front. Econ. Manag.",
    year: 2025,
    date: "2025-07-01",
    type: "journal",
    status: "published",
    links: {
      doi: "https://doi.org/10.6981/FEM.202507_6(7).0018",
      article: "https://fieam.org/index.php/ojs/article/view/49"
    },
    tags: ["宏观与发展", "PCA-Stacking", "现代化进程"]
  }

];
