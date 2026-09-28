#!/usr/bin/env node
/* ============================================================================
 *  刷新首屏的「个人开源仓库」数字
 * ----------------------------------------------------------------------------
 *  站点本身不请求任何外部接口（零依赖 + 国内访问更稳），所以这个数字是写死的，
 *  会随时间过期。想更新时跑一次这个脚本即可：
 *
 *      node tools/refresh-repo-count.js
 *      git add -A && git commit -m "刷新仓库数" && git push
 *
 *  需要 Node 18+（自带 fetch）。若 api.github.com 连不上，可以手动改
 *  data/site-config.js 里的 stats 数组。
 * ==========================================================================*/

const fs = require("fs");
const path = require("path");

const CONFIG = path.join(__dirname, "..", "data", "site-config.js");

/* 从 site-config.js 里读出个人 GitHub 地址，避免把账号写死在脚本里 */
function readPersonalUser() {
  const src = fs.readFileSync(CONFIG, "utf8");
  const m = src.match(/githubPersonal:\s*"https:\/\/github\.com\/([^/"]+)"/);
  if (!m) throw new Error("在 data/site-config.js 里找不到 contact.githubPersonal");
  return m[1];
}

(async () => {
  const user = readPersonalUser();
  console.log("查询账号:", user);

  const r = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}`, {
    headers: { "User-Agent": "yile-wang-lab-site", Accept: "application/vnd.github+json" }
  });
  if (!r.ok) {
    console.error(`GitHub API 返回 HTTP ${r.status}（可能是限流或网络问题），本次不做修改。`);
    process.exit(1);
  }
  const data = await r.json();
  const fresh = data.public_repos;
  console.log("线上公开仓库数:", fresh);

  let src = fs.readFileSync(CONFIG, "utf8");

  // 只替换紧跟在「个人开源仓库」那一项前面的 value
  const re = /(\{\s*value:\s*)(\d+)(\s*,\s*labelEn:\s*"[^"]*"\s*,\s*labelZh:\s*"个人开源仓库")/;
  const m = src.match(re);
  if (!m) {
    console.error('在 data/site-config.js 的 stats 里找不到 labelZh: "个人开源仓库" 那一项。');
    process.exit(1);
  }

  const old = Number(m[2]);
  if (old === fresh) {
    console.log(`已经是最新值 (${fresh})，无需修改。`);
    return;
  }

  src = src.replace(re, `$1${fresh}$3`);
  fs.writeFileSync(CONFIG, src, "utf8");
  console.log(`已更新: ${old} -> ${fresh}`);
  console.log("别忘了 commit + push。");
})().catch((e) => {
  console.error("出错:", e.message);
  process.exit(1);
});
