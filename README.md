# Yile Wang Lab · 课题组官网

经济学、金融工程与机器学习方向课题组的官方网站，重点展示**已录用与已发表论文**、开放数据与开源代码。

线上地址：**https://yilewang-lab.github.io**

---

## 这个网站是怎么搭的

纯静态站点，**没有任何构建步骤、没有框架、没有外部依赖**：

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面结构（单页，锚点导航） |
| `assets/css/style.css` | 全部样式，含深色模式与响应式 |
| `assets/js/i18n.js` | 中英文界面文案 |
| `assets/js/main.js` | 论文渲染、搜索、筛选、主题与语言切换 |
| `data/site-config.js` | 课题组名称、联系方式、研究方向、团队成员 |
| `data/publications.js` | **论文列表 —— 最常改的文件** |
| `.nojekyll` | 告诉 GitHub Pages 跳过 Jekyll 处理 |

不引用任何 CDN 或网络字体，所以在中国大陆访问也能秒开，也不会有第三方追踪。

---

## 怎么加一篇论文

打开 `data/publications.js`，复制任意一条 `{ ... }`，粘贴到数组里改内容即可。

```js
{
  titleEn: "Option Hedging with Deep Neural Networks",   // 英文标题
  titleZh: "基于深度神经网络的期权对冲",                  // 中文标题（可留空 ""）
  authors: ["**Yile Wang**†", "San Zhang"],              // **加粗** = 本组成员，† = 通讯作者
  venue: "Journal of Financial Engineering, Vol. 3, Issue 2",  // 期刊/会议全称
  venueShort: "JFE",                                     // 简称小标签（可留空）
  year: 2026,                                            // 数字，不要加引号
  date: "2026-05-01",                                    // 精确日期，用于同年内排序（可省略）
  type: "journal",                                       // journal | conference | working | book
  status: "published",                                   // accepted | published | forthcoming | working
  links: {
    doi:     "https://doi.org/10.xxxx/yyyy",             // DOI
    article: "https://www.mdpi.com/...",                 // 期刊页面（DOI 未注册时用它）
    pdf:     "", code: "", arxiv: "", ssrn: "", slides: ""   // 没有的键删掉或留空
  },
  tags: ["期权", "深度学习"],                             // 关键词（可为 []）
  banner:      "assets/banners/xxx.jpg",                 // 卡片顶部横幅（可省略）
  certificate: "assets/certificates/xxx.jpg",            // 录用证明，点击灯箱放大（可省略）
  featured: true,                                        // true = 置顶并加金色边框（可省略）
  noteEn: "MDPI · Open Access",                          // 备注（可省略）
  noteZh: "MDPI 开放获取"
}
```

> **注意**：中文文案里如果要用引号，请用中文引号「」或 “ ”，
> 不要用英文双引号 `"`，否则会破坏 JavaScript 语法。

### 图片（横幅 / 录用证明）

把图片放进 `assets/banners/` 或 `assets/certificates/`，然后在条目里写相对路径即可。
两者都会在点击后打开灯箱放大查看。

建议尺寸：横幅 1200px 宽（约 2:1），证书 1700px 宽。命名用 `期刊-卷期页.jpg`
（例如 `systems-319.jpg`），方便和条目对应。

### 状态与类型的显示文字

| 字段值 | 中文显示 | 英文显示 |
| --- | --- | --- |
| `status: "accepted"` | 已录用 | Accepted |
| `status: "published"` | 已发表 | Published |
| `status: "forthcoming"` | 即将刊出 | Forthcoming |
| `status: "working"` | 工作论文 | Working paper |
| `type: "journal"` | 期刊论文 | Journal |
| `type: "conference"` | 会议论文 | Conference |
| `type: "working"` | 工作论文 | Working paper |
| `type: "book"` | 专著章节 | Book chapter |

---

## 怎么改课题组信息

打开 `data/site-config.js`，里面每一项都有中文注释。常改的有：

- `labNameEn` / `labNameZh` —— 课题组名称
- `labMonogram` —— 页头左上角的缩写（1–3 个字符最好看）
- `contact.email` / `contact.github` / `contact.githubPersonal` / `contact.scholar` / `contact.orcid`
- `stats` —— **首屏那排数字**
- `research` —— 研究方向卡片
- `team` —— 团队成员
- `repos` —— "数据与代码"板块里展示的仓库

### 首屏数字（stats）

```js
stats: [
  { value: 23, labelEn: "Personal repositories", labelZh: "个人开源仓库" },
  { value: 2,  labelEn: "Lab repositories",      labelZh: "课题组仓库" },
  { value: 4,  labelEn: "Research areas",        labelZh: "研究方向" }
],
```

增删数组元素即可增删数字；整个数组改成 `[]` 就隐藏这一排。

数字是**写死**的 —— 站点刻意不请求任何外部接口，这样既零依赖，在国内访问也更稳
（`api.github.com` 经常连不上或超时）。个人仓库数会随时间过期，想更新就跑：

```bash
node tools/refresh-repo-count.js   # 需要 Node 18+，会读 site-config 里的 githubPersonal
```

它会查一次 GitHub 并把 `个人开源仓库` 的数字改掉，然后 commit + push 即可。
连不上时也可以手动改 `value`。

---

## 本地预览

直接用浏览器打开 `index.html` 就能看。如果想要一个本地服务器（推荐，行为更接近线上）：

```bash
python -m http.server 8000
# 然后打开 http://localhost:8000
```

---

## 发布

推送到 `main` 分支即可，GitHub Pages 会自动重新构建：

```bash
git add -A
git commit -m "更新论文列表"
git push
```

构建状态可以在仓库的 **Actions** 标签页查看，通常 1 分钟内生效。

---

## 维护小贴士

- 页面上"论文成果"的数字统计（总数、期刊数、年份跨度、仓库数）都是**自动算出来的**，不用手动改。
- 搜索框支持按标题、作者、期刊、关键词搜索；按 `/` 键可以快速聚焦搜索框。
- 语言和主题（深色/浅色）的选择会记在浏览器本地，下次访问自动沿用。
- 如果某条论文没显示出来，按 F12 打开控制台，会有一条 `[publications]` 开头的警告告诉你哪条记录有问题。
