/* ============================================================================
 *  界面文案 / UI strings (zh + en)
 * ----------------------------------------------------------------------------
 *  data-i18n="key" 的元素，切换语言时会把 textContent 换成对应文案。
 *  data-i18n-attr="placeholder:key" 可以替换属性，例如 placeholder / aria-label。
 * ==========================================================================*/

window.I18N = {

  zh: {
    "meta.title": "Yile Wang 课题组 · 官网",
    "meta.desc": "Yile Wang 课题组官网：经济学、金融工程与机器学习方向的研究团队，展示已录用与已发表论文、研究数据与开源代码。",

    "a11y.skip": "跳到主要内容",
    "a11y.nav": "主导航",
    "a11y.theme": "切换深色 / 浅色主题",
    "a11y.lang": "切换语言",
    "a11y.menu": "打开菜单",
    "a11y.zoom": "点击放大查看",
    "a11y.lightbox": "图片查看",
    "a11y.close": "关闭",

    "nav.about": "关于",
    "nav.research": "研究方向",
    "nav.pubs": "论文成果",
    "nav.team": "负责人",
    "nav.data": "数据与代码",
    "nav.contact": "联系我们",

    "hero.badge": "正在持续更新",
    "hero.desc": "我们关注金融市场中的定价、风险与预测问题，用严谨的计量方法与机器学习工具做可复现的实证研究，并把数据与代码开放出来。",
    "hero.cta_pubs": "查看论文成果",
    "hero.cta_contact": "联系我们",

    "about.eyebrow": "关于我们",
    "about.title": "让金融研究可复现、可复用",
    "about.p1": "课题组围绕**金融科技、能源与环境经济学、机器学习与智能预测、宏观发展评估**四个方向展开研究。我们相信，一个好的实证结果不仅要有方法上的说服力，也要能被别人按同样的步骤重新做出来。",
    "about.p2": "因此除了论文，我们把清洗好的双语数据、字段字典、来源核查记录和可重跑的分析代码一并整理公开。任何一位合作者或学生，都可以沿着「来源 → 清洗 → 建模」的链条把结果复现出来。",
    "about.p3": "目前已发表的工作覆盖 IPO 定价效率与投资者情绪识别、中国省级能源贫困测度、数字经济与碳排放的耦合协调、光伏发电智能预测，以及古文字分割与识别等方向。",
    "about.facts": "基本信息",
    "about.fact.name": "课题组",
    "about.fact.field": "研究领域",
    "about.fact.fieldval": "经济学 / 金融工程 / 机器学习",
    "about.fact.open": "开放材料",
    "about.fact.openval": "论文、数据、代码",
    "about.fact.contact": "联系方式",

    "story.eyebrow": "写在前面",
    "story.title": "我们的经验，来自没人指导的那几年",
    "story.p1": "大一那年，我联系了一位老师，说我想做科研。他给了我一个题目，之后就再也没有管过我。",
    "story.p2": "后来我才慢慢明白：培养一个本科生的科研能力是一件漫长的事，很多老师不愿意在这上面投入时间。我们课题组的学生大多如此——都是本科生，在没有导师指导的情况下，自己摸索出了众多科研成果，数量比得上本校的副教授和硕士生导师。",
    "story.p3": "所以我把这些经验整理出来，放在这里。希望它能帮到你，帮到每一个爱好科研的学生。",
    "story.sign": "—— 王毅乐",

    "research.eyebrow": "研究方向",
    "research.title": "我们关心的问题",
    "research.lead": "从衍生品定价到系统性风险，从计量识别到深度学习预测，课题组的工作围绕下面四条主线展开。",

    "pubs.eyebrow": "论文成果",
    "pubs.title": "已录用与已发表论文",
    "pubs.lead": "按年份倒序排列。支持关键词搜索与类型筛选，点击标签即可查看摘要或下载原文。",
    "pubs.search": "搜索标题、作者、期刊或关键词…",
    "pubs.filter.type": "类型",
    "pubs.filter.year": "年份",
    "pubs.all": "全部",
    "pubs.empty": "没有找到匹配的论文。试试换一个关键词，或者点「全部」清除筛选。",

    "type.journal": "期刊论文",
    "type.conference": "会议论文",
    "type.working": "工作论文",
    "type.book": "专著章节",

    "status.accepted": "已录用",
    "status.published": "已发表",
    "status.forthcoming": "即将刊出",
    "status.working": "工作论文",

    "link.doi": "DOI",
    "link.article": "文章页面",
    "link.pdf": "PDF",
    "link.code": "代码",
    "link.arxiv": "arXiv",
    "link.ssrn": "SSRN",
    "link.slides": "幻灯片",
    "link.certificate": "录用证明",
    "link.banner": "期刊横幅",

    "pi.eyebrow": "团队负责人",
    "pi.lead": "从本科阶段开始独立做研究，把过程和方法都留了下来。",
    "pi.bio1": "王毅乐，课题组负责人，本科阶段即独立开展研究。他的兴趣位于**随机建模、统计学习与机器学习的交叉处**——以随机过程、空间马尔可夫链、主成分分析等经典数学工具为骨架，结合现代机器学习与深度学习，处理真实的金融与经济问题。",
    "pi.bio2": "已发表的工作覆盖：双重机器学习与 IPO 定价效率、Prophet 与深度时空建模的光伏发电预测、数字经济与碳排放耦合协调的空间马尔可夫分析、可解释深度学习（SSA-LSTM + SHAP）的省级能源贫困预测、Swin Transformer 与 U-Net 的古文字分割识别，以及 PCA-Stacking 的发展轨迹多维评估。",
    "pi.bio3": "他把严谨的数学推理——从测度论概率到随机分析——看作可信机器学习的基石，尤其关注如何让数据驱动的模型更可解释、更有理论依据、在不确定性下更稳健。",
    "pi.bio4": "他坚持研究应当能被别人重新做一遍：课题组把清洗好的双语数据、字段字典、来源核查记录和可重跑的分析代码一并公开，让「来源 → 清洗 → 建模」的每一步都留在可以核对的地方。除论文之外，他长期维护二十余个开源仓库，把课程材料、研究教程与数据分析工具一并开放。",
    "pi.bio5": "他欢迎跨学科的合作，也欢迎对科研感兴趣的同学直接写信给他。",
    "pi.github": "个人 GitHub",
    "pi.members": "其他成员",

    "data.eyebrow": "数据与代码",
    "data.title": "开放的研究材料",
    "data.lead": "我们把整理好的数据、字段字典与处理脚本放在公开仓库里，方便复用与核对。",
    "data.view": "查看仓库 →",

    "contact.eyebrow": "联系我们",
    "contact.title": "欢迎交流与合作",
    "contact.lead": "无论是学术合作、数据问题还是加入课题组的意向，都欢迎通过下面的方式联系我们。",
    "contact.github": "GitHub 组织",
    "contact.githubPersonal": "个人 GitHub",

    "footer.nav": "快速链接",
    "footer.rights": "版权所有。",
    "footer.built": "由纯 HTML / CSS / JavaScript 构建 —— 无外部依赖、无追踪脚本。",

    "toast.lang": "已切换到中文",
    "toast.theme.dark": "已切换到深色主题",
    "toast.theme.light": "已切换到浅色主题"
  },

  en: {
    "meta.title": "Yile Wang Lab — Official Site",
    "meta.desc": "Official website of the Yile Wang Lab: economics, financial engineering and machine learning research — accepted and published papers, open research data and code.",

    "a11y.skip": "Skip to main content",
    "a11y.nav": "Main navigation",
    "a11y.theme": "Toggle dark / light theme",
    "a11y.lang": "Switch language",
    "a11y.menu": "Open menu",
    "a11y.zoom": "Click to enlarge",
    "a11y.lightbox": "Image viewer",
    "a11y.close": "Close",

    "nav.about": "About",
    "nav.research": "Research",
    "nav.pubs": "Publications",
    "nav.team": "Team",
    "nav.data": "Data & Code",
    "nav.contact": "Contact",

    "hero.badge": "Continuously updated",
    "hero.desc": "We study pricing, risk and prediction problems in financial markets — combining careful econometrics with machine learning, and publishing the data and code behind every result.",
    "hero.cta_pubs": "Browse publications",
    "hero.cta_contact": "Get in touch",

    "about.eyebrow": "About",
    "about.title": "Research that others can reproduce",
    "about.p1": "The lab works on **financial technology, energy and environmental economics, machine learning for forecasting, and macro development assessment**. We believe a credible empirical result has to be more than methodologically sound — someone else should be able to rebuild it from the same steps.",
    "about.p2": "So alongside our papers we publish the cleaned bilingual datasets, field dictionaries, source-audit records and re-runnable analysis code. Collaborators and students can follow the chain from source to cleaning to model and reproduce the numbers themselves.",
    "about.p3": "Published work so far covers IPO pricing efficiency and investor sentiment, provincial energy-poverty measurement in China, the coupling coordination between the digital economy and carbon emissions, photovoltaic power forecasting, and ancient-character segmentation and recognition.",
    "about.facts": "At a glance",
    "about.fact.name": "Group",
    "about.fact.field": "Fields",
    "about.fact.fieldval": "Economics / Financial Engineering / ML",
    "about.fact.open": "Open materials",
    "about.fact.openval": "Papers, data, code",
    "about.fact.contact": "Contact",

    "story.eyebrow": "A note from the PI",
    "story.title": "What we learned in the years without a supervisor",
    "story.p1": "In my first year I approached a professor and told him I wanted to do research. He gave me a topic, and after that he never checked in on me again.",
    "story.p2": "It took me a while to understand why: turning an undergraduate into a researcher is slow work, and many professors would rather not spend the time on it. Most of the students in this group are in exactly that position — undergraduates who, with no supervisor guiding them, worked it out themselves and produced a substantial body of research, comparable in volume to many of our associate professors and master's supervisors.",
    "story.p3": "So I have written down what we learned and put it here. I hope it helps you — and every student who loves research.",
    "story.sign": "— Yile Wang",

    "research.eyebrow": "Research",
    "research.title": "Questions we work on",
    "research.lead": "From derivative pricing to systemic risk, from identification to deep learning — four threads run through the group's work.",

    "pubs.eyebrow": "Publications",
    "pubs.title": "Accepted & published papers",
    "pubs.lead": "Newest first. Search by keyword or filter by type; use the links on each entry for the abstract, PDF or code.",
    "pubs.search": "Search title, author, venue or keyword…",
    "pubs.filter.type": "Type",
    "pubs.filter.year": "Year",
    "pubs.all": "All",
    "pubs.empty": "No matching papers. Try another keyword, or press “All” to clear the filters.",

    "type.journal": "Journal",
    "type.conference": "Conference",
    "type.working": "Working paper",
    "type.book": "Book chapter",

    "status.accepted": "Accepted",
    "status.published": "Published",
    "status.forthcoming": "Forthcoming",
    "status.working": "Working paper",

    "link.doi": "DOI",
    "link.article": "Article page",
    "link.pdf": "PDF",
    "link.code": "Code",
    "link.arxiv": "arXiv",
    "link.ssrn": "SSRN",
    "link.slides": "Slides",
    "link.certificate": "Certificate",
    "link.banner": "Journal banner",

    "pi.eyebrow": "Principal Investigator",
    "pi.lead": "He started doing research as an undergraduate — and kept the process, not just the results.",
    "pi.bio1": "Yile Wang leads the group and began doing research independently as an undergraduate. His interests sit at the **intersection of stochastic modelling, statistical learning and machine learning** — using classical tools such as stochastic processes, spatial Markov chains and principal component analysis as the skeleton, combined with modern machine learning and deep learning, to tackle real problems in finance and economics.",
    "pi.bio2": "Published work so far covers double machine learning for IPO pricing efficiency, Prophet-based deep spatiotemporal forecasting of photovoltaic power, spatial Markov analysis of the coupling coordination between China's digital economy and carbon emissions, explainable deep learning (SSA-LSTM + SHAP) for provincial energy-poverty prediction, Swin Transformer + U-Net frameworks for ancient-character segmentation and recognition, and PCA-Stacking hybrids for multidimensional development assessment.",
    "pi.bio3": "He treats rigorous mathematical reasoning — from measure-theoretic probability to stochastic calculus — as the cornerstone of trustworthy machine learning, and is particularly interested in making data-driven models more interpretable, theoretically grounded and robust under uncertainty.",
    "pi.bio4": "He believes research should be something others can rebuild from scratch. The group publishes its cleaned bilingual datasets, field dictionaries, source-audit records and re-runnable analysis code, so every step from source to model stays open to checking. Beyond papers, he maintains more than twenty public repositories covering course materials, research tutorials and data-analysis tooling.",
    "pi.bio5": "He welcomes interdisciplinary collaboration — and any student interested in research is welcome to write to him directly.",
    "pi.github": "Personal GitHub",
    "pi.members": "Members",

    "data.eyebrow": "Data & Code",
    "data.title": "Open research materials",
    "data.lead": "Curated datasets, field dictionaries and processing scripts live in our public repositories, ready to reuse and verify.",
    "data.view": "View repository →",

    "contact.eyebrow": "Contact",
    "contact.title": "Let's work together",
    "contact.lead": "Academic collaboration, data questions, or interest in joining the group — reach us through any of the channels below.",
    "contact.github": "GitHub organization",
    "contact.githubPersonal": "Personal GitHub",

    "footer.nav": "Quick links",
    "footer.rights": "All rights reserved.",
    "footer.built": "Built with plain HTML, CSS and JavaScript — no external dependencies, no trackers.",

    "toast.lang": "Switched to English",
    "toast.theme.dark": "Dark theme on",
    "toast.theme.light": "Light theme on"
  }
};
