(() => {
  // Only these developer-authored strings are rendered as HTML. Never insert user content here.
  const messages = {
  "zh-CN": {
    "skip": "跳到作品",
    "brand": "DAFTKEN / 文茂权<br>独立探索 · 持续构建",
    "navWork": "作品",
    "navAbout": "关于",
    "navNotes": "笔记 ↗",
    "heroTag": "<span class=\"dot\"></span> 软件开发 / AI 工具 / 创意编程",
    "heroTitle": "让想法<br>成为<em>现实。</em>",
    "heroIntro": "我是文茂权，也叫 DaftKen。我开发连接 AI Agent 的工具，探究日常工作中的难题，也为一点好玩留出空间。",
    "explore": "探索我的作品 <span>↘</span>",
    "experiment": "网站交互 · AI 辅助实现",
    "connect": "01 连接",
    "trace": "02 追踪",
    "play": "03 节奏",
    "fieldCaption": "本页粒子效果由 Codex 实现，<br>不作为个人项目成果展示。",
    "scroll": "向下探索 ↓",
    "selected": "01 / 代表作品",
    "workTitle": "从真实的<br><em>问题</em>出发。",
    "workIntro": "工具小而专注。<br>实现细节，源码里见。",
    "adapterTag": "AI AGENT 工具 / PYTHON",
    "adapterTitle": "一份技能，<br>连接不同工具。",
    "adapterDesc": "为什么要在每个编程工具里重复维护指令？<strong>skill-adapter</strong> 将技能包、命令和规则转换成不同工具所需的格式。",
    "source": "查看源码 ↗",
    "examples": "转换示例 ↗",
    "adapterCaption": "一次组织，按需适配。",
    "traceTag": "本地诊断 / SWIFT",
    "traceTitle": "找到输入<br>被打断的瞬间。",
    "traceDesc": "<strong>FocusTrace</strong> 关联键盘、指针和前台应用事件，辅助排查 macOS 输入中断。只监听、不拦截，并明确说明判断的局限。",
    "traceEvidence": "已公开的验证使用合成时间线，不代表真实场景中的准确率。",
    "report": "验证报告 ↗",
    "key": "按键",
    "pointer": "指针",
    "focus": "焦点",
    "traceCaption": "事件时间线示意",
    "grooveTag": "创意桌面工具 / SWIFT",
    "grooveTitle": "给日常操作，<br>加一点节奏。",
    "grooveDesc": "<strong>Keyboard Hajimi Groove</strong> 为熟悉的快捷键加入音乐反馈。这款 macOS 菜单栏应用还提供本地音频切片编辑器。",
    "grooveEvidence": "音频由使用者自行提供，代码中不附带采样素材。",
    "project": "了解项目 ↗",
    "grooveCaption": "熟悉的操作，不一样的反馈。",
    "aboutTag": "02 / 贯穿其中的线索",
    "aboutTitle": "保持好奇，<br>也把它<em>做出来。</em>",
    "aboutBackground": "我从 Android 和 Flutter 开发起步，现在探索 AI Agent 工具与 macOS 原生应用，并持续向面向真实场景的工程交付（FDE）发展。",
    "aboutWorkflow": "我关心完整的过程：理解工作流，构建聚焦的解决方案，评估效果，再从实际使用中学习。",
    "aboutNote": "立足中国大陆的开发实践，连接更广阔的开发者社区。",
    "archive": "早期笔记与实验 <span>↗</span>",
    "contact": "有个具体的问题，想一起探究？",
    "contactLink": "从代码开始交流 ↗",
    "footer": "DAFTKEN / 2026<br>保持好奇，持续构建。",
    "notFoundTag": "404 / 页面未找到",
    "notFoundTitle": "换个入口，<br><em>继续探索。</em>",
    "notFoundDesc": "这个地址没有对应页面。你可以回到作品首页，或在归档中找到早期文章。",
    "back": "返回作品首页 ↗",
    "browse": "浏览文章归档 ↗",
    "homeAria": "DaftKen 首页",
    "navAria": "主导航",
    "fieldAria": "粒子交互实验",
    "adapterAria": "技能包适配不同编程工具",
    "traceAria": "键盘、指针与焦点事件关联示意",
    "pageTitle": "文茂权 DaftKen — AI 工具、工程与创意实验",
    "pageDescription": "文茂权 DaftKen 的个人作品网站：AI Agent 工具、开发者工作流与 macOS 创意实验。探索 skill-adapter、FocusTrace 和更多工程实践。",
    "errorTitle": "页面未找到 — 文茂权 DaftKen",
    "pause": "暂停动画",
    "resume": "继续动画",
    "mode0": "连接",
    "mode1": "信号",
    "mode2": "节奏"
  },
  "en": {
    "skip": "Skip to projects",
    "brand": "DAFTKEN / 文茂权<br>INDEPENDENT EXPLORATIONS",
    "navWork": "Work",
    "navAbout": "About",
    "navNotes": "Notes ↗",
    "heroTag": "<span class=\"dot\"></span> SOFTWARE / AI TOOLING / CREATIVE CODE",
    "heroTitle": "Ideas into<br>working <em>things.</em>",
    "heroIntro": "I’m DaftKen. I build tools that connect AI agents, investigate everyday friction, and make room for a little play.",
    "explore": "Explore selected work <span>↘</span>",
    "experiment": "SITE INTERACTION · AI-ASSISTED",
    "connect": "01 Connect",
    "trace": "02 Trace",
    "play": "03 Play",
    "fieldCaption": "Particle interaction implemented by Codex.<br>Site presentation, not a portfolio project.",
    "scroll": "SCROLL TO EXPLORE ↓",
    "selected": "01 / SELECTED WORK",
    "workTitle": "Built around<br>a real <em>question.</em>",
    "workIntro": "Small, focused tools.<br>Source code you can inspect.",
    "adapterTag": "AI AGENT TOOLING / PYTHON",
    "adapterTitle": "One skill.<br>Different ecosystems.",
    "adapterDesc": "Why maintain the same instructions in every coding tool? <strong>skill-adapter</strong> converts skill packages, commands, and rules into tool-specific artifacts.",
    "source": "View source ↗",
    "examples": "Conversion examples ↗",
    "adapterCaption": "STRUCTURE ONCE. ADAPT AT THE EDGE.",
    "traceTag": "LOCAL DIAGNOSTICS / SWIFT",
    "traceTitle": "Find the moment<br>focus breaks.",
    "traceDesc": "<strong>FocusTrace</strong> correlates keyboard, pointer, and foreground-app events to investigate interrupted typing on macOS. Listen-only, with explicit limitations.",
    "traceEvidence": "Published verification uses synthetic timelines; it does not establish real-world accuracy.",
    "report": "Verification report ↗",
    "key": "KEY",
    "pointer": "POINTER",
    "focus": "FOCUS",
    "traceCaption": "ILLUSTRATIVE EVENT TIMELINE",
    "grooveTag": "CREATIVE DESKTOP / SWIFT",
    "grooveTitle": "A little rhythm<br>in the routine.",
    "grooveDesc": "<strong>Keyboard Hajimi Groove</strong> turns familiar keyboard shortcuts into musical feedback. A macOS menu bar app with a local audio segment editor.",
    "grooveEvidence": "Bring your own audio. Samples are not bundled with the code.",
    "project": "Explore the project ↗",
    "grooveCaption": "EVERYDAY ACTIONS. UNEXPECTED FEEDBACK.",
    "aboutTag": "02 / THE THREAD BETWEEN THEM",
    "aboutTitle": "Curiosity, with<br>a <em>working version.</em>",
    "aboutBackground": "My background is in Android and Flutter. Today I’m exploring AI agent tooling and native macOS utilities, with a growing focus on forward-deployed engineering.",
    "aboutWorkflow": "I’m interested in the whole path: understand a workflow, build something focused, evaluate what happens, and learn from actual use.",
    "aboutNote": "Based in mainland China, connected to a wider developer community.",
    "archive": "Earlier notes & experiments <span>↗</span>",
    "contact": "Have a concrete problem in mind?",
    "contactLink": "Let’s start with the code ↗",
    "footer": "DAFTKEN / 2026<br>BUILT WITH CURIOSITY.",
    "notFoundTag": "404 / PAGE NOT FOUND",
    "notFoundTitle": "Another<br><em>way in.</em>",
    "notFoundDesc": "This address does not lead to a page. Earlier writing is still in the archive.",
    "back": "Back to projects ↗",
    "browse": "Browse the archive ↗",
    "homeAria": "DaftKen home",
    "navAria": "Main navigation",
    "fieldAria": "Particle experiment",
    "adapterAria": "Skill packages adapt to different coding tools",
    "traceAria": "Illustration of keyboard, pointer and focus event correlation",
    "pageTitle": "DaftKen — tools, systems & experiments",
    "pageDescription": "DaftKen builds AI agent tools and practical developer workflows. Explore skill-adapter, FocusTrace, and creative macOS experiments.",
    "errorTitle": "Page not found — DaftKen",
    "pause": "Pause motion",
    "resume": "Resume motion",
    "mode0": "CONNECTIONS",
    "mode1": "SIGNALS",
    "mode2": "RHYTHM"
  }
};
  let locale = 'zh-CN';
  try {
    const saved = localStorage.getItem('daftken.language');
    if (saved === 'en' || saved === 'zh-CN') locale = saved;
  } catch { /* Storage is optional; language switching still works. */ }
  const toggle = document.querySelector('#language-toggle');
  function t(key) { return messages[locale][key] ?? messages['zh-CN'][key] ?? key; }
  function apply() {
    document.documentElement.lang = locale;
    document.querySelectorAll('[data-i18n]').forEach(el => {el.innerHTML = t(el.dataset.i18n);});
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {el.setAttribute('aria-label', t(el.dataset.i18nAria));});
    document.title = t(document.body.dataset.page === '404' ? 'errorTitle' : 'pageTitle');
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = t('pageDescription');
    if (toggle) {
      toggle.hidden = false;
      toggle.textContent = locale === 'zh-CN' ? 'English' : '中文';
      toggle.lang = locale === 'zh-CN' ? 'en' : 'zh-CN';
      toggle.setAttribute('aria-label', locale === 'zh-CN' ? 'Switch to English' : '切换为简体中文');
    }
    document.dispatchEvent(new Event('portfolio:language'));
  }
  window.portfolioI18n = { t };
  toggle?.addEventListener('click', () => {
    locale = locale === 'zh-CN' ? 'en' : 'zh-CN';
    try { localStorage.setItem('daftken.language', locale); } catch { /* Keep the in-page choice. */ }
    apply();
  });
  apply();
})();
