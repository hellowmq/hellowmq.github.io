(function bootstrap(config) {
  if (!config.hosts.includes(location.hostname) || window.top !== window.self || window.__wenmqAnalyticsLoaded) return;
  window.__wenmqAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  function pageUrl(value) {
    try {
      const url = new URL(value);
      return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : '';
    } catch { return ''; }
  }
  let lastPage = pageUrl(location.href);
  window.gtag('js', new Date());
  window.gtag('config', config.measurementId, {
    page_location: lastPage,
    page_referrer: pageUrl(document.referrer),
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  // Astro swaps article pages without a full load. Calculator tab changes do
  // not dispatch this event, and a query/hash change is not another visit.
  document.addEventListener('astro:page-load', () => {
    const nextPage = pageUrl(location.href);
    if (!nextPage || nextPage === lastPage) return;
    window.gtag('event', 'page_view', {
      send_to: config.measurementId,
      page_location: nextPage,
      page_referrer: lastPage,
      page_title: document.title
    });
    lastPage = nextPage;
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.measurementId);
  document.head.append(script);
})({"measurementId":"G-NK7HHE8WXB","hosts":["tech.wenmq.cn"]});
