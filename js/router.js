export function initRouter(routes, onRoute) {
  function resolve() {
    const route = location.hash.replace("#", "") || "/dashboard";
    document.querySelectorAll(".topnav a").forEach((link) => {
      link.toggleAttribute("aria-current", link.getAttribute("href") === `#${route}`);
    });
    const handler = routes[route] || routes["/dashboard"];
    onRoute(route);
    handler();
  }
  window.addEventListener("hashchange", resolve);
  resolve();
}
