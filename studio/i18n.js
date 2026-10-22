(() => {
  // Only these developer-authored strings are rendered as HTML. Never insert user content here.
  const messages = {
  "zh-CN": {
    "skip": "跳到作品",
    "brand": "DAFTKEN / 文茂权<br>独立工具创作者",
    "navWork": "作品",
    "navAbout": "关于",
    "navNotes": "工程笔记",
    "heroTag": "个人作品集 · 工具与互动实验",
    "heroTitle": "把日常的麻烦，<br>做成<em>顺手的工具。</em>",
    "heroIntro": "我是文茂权，也叫 DaftKen。从显示器控制到桌面小伙伴，我用代码和 AI 把自己的需求做成工具，再从实际使用中继续改进。",
    "explore": "浏览作品 <span>↓</span>",
    "selected": "01 / 可以动手试的作品",
    "workTitle": "从自己的需求开始，<br><em>给更多人试试。</em>",
    "workIntro": "每个项目，都有一个具体的起点。<br>先体验，再看实现与记录。",
    "adapterDesc": "为什么要在每个编程工具里重复维护指令？<strong>skill-adapter</strong> 将技能包、命令和规则转换成不同工具所需的格式。",
    "source": "查看源码 ↗",
    "traceTag": "本地诊断 / SWIFT",
    "traceTitle": "找到输入<br>被打断的瞬间。",
    "traceDesc": "<strong>FocusTrace</strong> 关联键盘、指针和前台应用事件，辅助排查 macOS 输入中断。只监听、不拦截，并明确说明判断的局限。",
    "traceEvidence": "已公开的验证使用合成时间线，不代表真实场景中的准确率。",
    "report": "验证报告 ↗",
    "key": "按键",
    "pointer": "指针",
    "focus": "焦点",
    "traceCaption": "事件时间线示意",
    "grooveDesc": "<strong>Keyboard Hajimi Groove</strong> 为熟悉的快捷键加入音乐反馈。这款 macOS 菜单栏应用还提供本地音频切片编辑器。",
    "grooveEvidence": "音频由使用者自行提供，代码中不附带采样素材。",
    "petTag": "互动桌宠 / WEB DEMO",
    "petTitle": "和桌面上的<br>小伙伴打个招呼。",
    "petDesc": "<strong>PetApp</strong> 让团子和圆头耄耋回应抚摸、喂食与跳跃。先在这里互动，也可以把这只耄耋拖到书签栏带走。",
    "petDemo": "体验互动 Demo ↗",
    "petWidgetTitle": "圆头耄耋互动小组件",
    "petAria": "可以直接互动的圆头耄耋小组件",
    "aboutTag": "03 / 做工具的人",
    "aboutTitle": "做小一点，<br><em>用深一点。</em>",
    "aboutBackground": "我从 Android 和 Flutter 开发起步，现在主要做 macOS 工具、浏览器小应用和互动实验。起点通常很具体：一块不顺手的显示器、一次难排查的输入中断，或者一个想带到桌面上的小伙伴。",
    "aboutWorkflow": "AI 参与我的研究、编码和迭代。我负责决定要解决什么、判断结果是否有用，也把做成的部分和仍待验证的地方写清楚。",
    "aboutNote": "接下来，继续打磨这些工具，也记录真实使用中的取舍和变化。",
    "archive": "读早期技术笔记 <span>↗</span>",
    "contact": "遇到问题，或有一个具体的使用场景？",
    "contactLink": "到 GitHub 交流 ↗",
    "footer": "文茂权 / DAFTKEN<br>做工具，也写过程。",
    "traceAria": "键盘、指针与焦点事件关联示意",
    "pageTitle": "文茂权 DaftKen — 独立工具创作者",
    "pageDescription": "文茂权（DaftKen）的个人作品：DisplayDJ 显示器控制、PetApp 互动桌宠、MCR 国标麻将计番，以及真实开发与使用记录。",
    "errorTitle": "页面未找到 — 文茂权 DaftKen",
    "heroDownload": "下载 DisplayDJ ↗",
    "heroDemo": "先试试桌宠 ↗",
    "moreTitle": "更多可以动手试的工具",
    "mcrDemo": "国内入口 ↗",
    "mcrBackup": "ChatGPT 版备用入口 ↗",
    "emojiDesc": "从 emoji 或视觉参考制作动画宠物候选包的可恢复工作流。",
    "noteLink": "阅读案例（中文） ↗",
    "petNoteTag": "工程笔记 / PETAPP · 2026-10-17",
    "petNoteTitle": "桌宠卡在加载中：一次 CSP 与跨设备调试复盘",
    "petNoteDesc": "从本机 Google 能运行，到另一台设备上的 X 被拦截：怎样找准安全策略、改成自包含书签，再验证真正发布的版本。",
    "navBlog": "个人博客 ↗",
    "heroFeature": "正在打磨 / DisplayDJ",
    "heroFeatureDesc": "一块显示器，几个顺手的动作。",
    "heroCaption": "真实窗口 · 本机 1.0.2 开发版",
    "heroFeatureLink": "看看它如何工作 ↗",
    "heroScope": "Apple Silicon · ad-hoc 签名，未公证；兼容性取决于显示器与连接。",
    "heroFeatureBody": "亮度调节、显示模式，以及免拔线断开与重连。把频繁用到的控制放到 macOS 菜单栏。",
    "previewTitle": "DisplayDJ · 真实窗口",
    "previewClose": "关闭",
    "previewCloseAria": "关闭图片预览",
    "previewOriginal": "在新标签页打开原图 ↗",
    "previewImageAlt": "DisplayDJ 显示设置与预设，本机 1.0.2 开发版",
    "previewOpen": "放大查看 DisplayDJ 真实窗口",
    "mcrTag": "浏览器工具 / 可离线使用",
    "mcrTitle": "算清一手牌，<br>也查明白规则。",
    "mcrBody": "<strong>MCR 国标麻将计番</strong>，把计番工具和 81 番种参考放在一起。手机上打开就能用，也能离线查阅。",
    "mcrVisual": "81 种番型，一个随手可查的入口。",
    "mcrNote": "计番辅助与规则参考，具体对局请按适用竞赛规则判定。",
    "writingTag": "02 / 在作品背后",
    "writingTitle": "做出来以后，<br><em>把过程说清楚。</em>",
    "writingLead": "技术实现留在工程笔记，想法与日常放在个人博客。",
    "blogCardTag": "个人博客 / 做东西与想事情",
    "blogCardTitle": "我想把屏幕里的线雕做出来",
    "blogCardDesc": "屏幕里悬空的线，到了现实中怎么办？一次从视觉预览走向实物约束的尝试。",
    "blogRead": "去博客读这篇 ↗",
    "notesAll": "全部工程笔记 ↗",
    "aboutMore": "更多关于我 ↗",
    "aboutBlog": "读我的个人博客 ↗"
  },
  "en": {
    "skip": "Skip to projects",
    "brand": "DAFTKEN / WEN MAOQUAN<br>INDEPENDENT MAKER",
    "navWork": "Work",
    "navAbout": "About",
    "navNotes": "Engineering notes",
    "heroTag": "INDEPENDENT TOOLS & INTERACTIVE EXPERIMENTS",
    "heroTitle": "Everyday friction.<br><em>Useful little tools.</em>",
    "heroIntro": "I’m Wen Maoquan, also known as DaftKen. I use code and AI to turn my own needs into tools, from display controls to desktop companions, and improve them through use.",
    "explore": "Explore the work <span>↓</span>",
    "selected": "01 / THINGS YOU CAN TRY",
    "workTitle": "Made for my own needs.<br><em>Shared for yours.</em>",
    "workIntro": "Each project starts with a specific need.<br>Try it, then explore the code and notes.",
    "adapterDesc": "Why maintain the same instructions in every coding tool? <strong>skill-adapter</strong> converts skill packages, commands, and rules into tool-specific artifacts.",
    "source": "View source ↗",
    "traceTag": "LOCAL DIAGNOSTICS / SWIFT",
    "traceTitle": "Find the moment<br>focus breaks.",
    "traceDesc": "<strong>FocusTrace</strong> correlates keyboard, pointer, and foreground-app events to investigate interrupted typing on macOS. Listen-only, with explicit limitations.",
    "traceEvidence": "Published verification uses synthetic timelines; it does not establish real-world accuracy.",
    "report": "Verification report ↗",
    "key": "KEY",
    "pointer": "POINTER",
    "focus": "FOCUS",
    "traceCaption": "ILLUSTRATIVE EVENT TIMELINE",
    "grooveDesc": "<strong>Keyboard Hajimi Groove</strong> turns familiar keyboard shortcuts into musical feedback. A macOS menu bar app with a local audio segment editor.",
    "grooveEvidence": "Bring your own audio. Samples are not bundled with the code.",
    "petTag": "INTERACTIVE DESKTOP PET / WEB DEMO",
    "petTitle": "Say hello to<br>a little companion.",
    "petDesc": "<strong>PetApp</strong> brings Tuanzi and Roundhead Maodie to life with petting, feeding, and jumping. Try interacting here, or drag this Maodie to your bookmarks bar to bring it along.",
    "petDemo": "Try the interactive demo ↗",
    "petWidgetTitle": "Interactive Roundhead Maodie widget",
    "petAria": "Interactive Roundhead Maodie widget",
    "aboutTag": "03 / THE MAKER",
    "aboutTitle": "Small in scope.<br><em>Useful in practice.</em>",
    "aboutBackground": "I started with Android and Flutter. Today I build macOS utilities, small browser tools and interactive experiments. They often begin with a display that is awkward to control, an input issue to investigate, or a companion I want on my desktop.",
    "aboutWorkflow": "AI helps me research, code and iterate. I decide what to solve, judge whether the result is useful, and document what works and what still needs testing.",
    "aboutNote": "Next: keep improving these tools and write about the choices and changes that come from using them.",
    "archive": "Read the earlier technical notes <span>↗</span>",
    "contact": "A bug to report, or a use case in mind?",
    "contactLink": "Find me on GitHub ↗",
    "footer": "WEN MAOQUAN / DAFTKEN<br>TOOLS, AND THE PROCESS BEHIND THEM.",
    "traceAria": "Illustration of keyboard, pointer and focus event correlation",
    "pageTitle": "DaftKen — independent tools & experiments",
    "pageDescription": "Independent tools by Wen Maoquan (DaftKen): DisplayDJ display controls, PetApp desktop companions, MCR scoring, and notes from building and using them.",
    "errorTitle": "Page not found — DaftKen",
    "heroDownload": "Download DisplayDJ ↗",
    "heroDemo": "Try a desktop companion ↗",
    "moreTitle": "More tools to explore",
    "mcrDemo": "Mainland China entry ↗",
    "mcrBackup": "ChatGPT-hosted backup ↗",
    "emojiDesc": "A resumable workflow for animated-pet candidate packages from an emoji or visual reference.",
    "noteLink": "Read the case study (Chinese) ↗",
    "petNoteTag": "ENGINEERING NOTES / PETAPP · 2026-10-17",
    "petNoteTitle": "A pet stuck loading: CSP and cross-device debugging.",
    "petNoteDesc": "From a local Google success to a blocked X frame on another device: finding the host policy, bundling an offline bookmark, and testing the published build.",
    "navBlog": "Personal blog ↗",
    "heroFeature": "IN FOCUS / DisplayDJ",
    "heroFeatureDesc": "Your displays. A few useful controls.",
    "heroCaption": "ACTUAL WINDOW · LOCAL 1.0.2 DEVELOPMENT BUILD",
    "heroFeatureLink": "How it works ↗",
    "heroScope": "Apple Silicon · ad-hoc signed, not notarized. Compatibility depends on your display and connection.",
    "heroFeatureBody": "Brightness, display modes, and disconnecting or reconnecting without unplugging. Frequent display controls, in the macOS menu bar.",
    "previewTitle": "DisplayDJ · actual window",
    "previewClose": "Close",
    "previewCloseAria": "Close image preview",
    "previewOriginal": "Open original image ↗",
    "previewImageAlt": "DisplayDJ display settings and presets, local 1.0.2 development build",
    "previewOpen": "Enlarge the actual DisplayDJ window",
    "mcrTag": "BROWSER TOOL / OFFLINE CAPABLE",
    "mcrTitle": "Score a hand.<br>Explore the patterns.",
    "mcrBody": "<strong>MCR Mahjong Calculator</strong> brings a scoring tool and all 81 scoring patterns together. Open it on your phone and keep it available offline.",
    "mcrVisual": "81 scoring patterns. One handy reference.",
    "mcrNote": "A scoring aid and reference; apply the relevant competition rules to actual play.",
    "writingTag": "02 / BEHIND THE WORK",
    "writingTitle": "Build it.<br><em>Then write it down.</em>",
    "writingLead": "Engineering notes for implementation. A personal blog for ideas and everyday observations.",
    "blogCardTag": "PERSONAL BLOG / MAKING & THINKING",
    "blogCardTitle": "I want to make the wire sculpture real",
    "blogCardDesc": "What happens to floating lines when a screen preview becomes a physical object? Notes on working with real constraints.",
    "blogRead": "Read on the blog ↗",
    "notesAll": "All engineering notes ↗",
    "aboutMore": "More about me ↗",
    "aboutBlog": "Read my personal blog ↗"
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
    document.querySelectorAll('[data-i18n-title]').forEach(el => {el.setAttribute('title', t(el.dataset.i18nTitle));});
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {el.setAttribute('alt', t(el.dataset.i18nAlt));});
    document.title = t(document.body.dataset.page === '404' ? 'errorTitle' : 'pageTitle');
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = t('pageDescription');
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      const meta = document.querySelector(selector);
      if (meta) meta.content = document.title;
    }
    for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      const meta = document.querySelector(selector);
      if (meta) meta.content = t('pageDescription');
    }
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.content = locale === 'zh-CN' ? 'zh_CN' : 'en_US';
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
