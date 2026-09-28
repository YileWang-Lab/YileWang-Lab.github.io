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
  authors: ["**Yile Wang**", "San Zhang"],               // **加粗** = 本组成员
  venue: "Journal of Financial Engineering",             // 期刊/会议全称
  venueShort: "JFE",                                     // 简称小标签（可留空）
  year: 2026,                                            // 数字，不要加引号
  type: "journal",                                       // journal | conference | working | book
  status: "accepted",                                    // accepted | published | forthcoming | working
  links: { doi: "https://doi.org/...", pdf: "", code: "" },  // 没有的键留空或删掉
  tags: ["期权", "深度学习"],                             // 关键词（可为 []）
  featured: true,                                        // true = 置顶并加金色边框（可省略）
  noteEn: "Best Paper Award",                            // 备注（可省略）
  noteZh: "最佳论文奖"
}
```

> **注意**：中文文案里如果要用引号，请用中文引号「」或 “ ”，
> 不要用英文双引号 `"`，否则会破坏 JavaScript 语法。

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
- `contact.email` / `contact.addressZh` / `contact.scholar` / `contact.orcid`
- `research` —— 研究方向卡片
- `team` —— 团队成员
- `repos` —— "数据与代码"板块里展示的仓库

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
