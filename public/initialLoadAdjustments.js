(function () {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();

(function () {
  function updateHtmlClass() {
    const pathname = window.location.pathname;
    const isRoot = pathname === "/";
    const html = document.documentElement;

    if (isRoot) {
      html.classList.add("old-scaling");
    } else {
      html.classList.remove("old-scaling");
    }
  }

  // Run on initial load
  updateHtmlClass();
})();
