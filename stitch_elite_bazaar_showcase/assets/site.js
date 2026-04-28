(() => {
  const MENU_HIDDEN_CLASS = "hidden";

  /** @param {HTMLElement|null|undefined} menu */
  function closeMenu(menu, button) {
    if (!menu) return;
    menu.classList.add(MENU_HIDDEN_CLASS);
    if (button) button.setAttribute("aria-expanded", "false");
  }

  /** @param {HTMLElement|null|undefined} menu */
  function openMenu(menu, button) {
    if (!menu) return;
    menu.classList.remove(MENU_HIDDEN_CLASS);
    if (button) button.setAttribute("aria-expanded", "true");
  }

  /** @param {HTMLElement} button */
  function setupMenu(button) {
    const container = button.closest("nav") || button.closest("header") || document.body;
    const menu = container.querySelector("[data-mobile-menu]");

    if (!(menu instanceof HTMLElement)) return;

    // Ensure a known initial state
    button.setAttribute("aria-expanded", menu.classList.contains(MENU_HIDDEN_CLASS) ? "false" : "true");

    button.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = !menu.classList.contains(MENU_HIDDEN_CLASS);

      // Close any other open menus
      document
        .querySelectorAll("[data-mobile-menu]")
        .forEach((otherMenu) => {
          if (otherMenu !== menu && otherMenu instanceof HTMLElement) {
            const otherContainer = otherMenu.closest("nav") || otherMenu.closest("header") || document.body;
            const otherButton = otherContainer.querySelector("[data-mobile-menu-button]");
            closeMenu(otherMenu, otherButton instanceof HTMLElement ? otherButton : null);
          }
        });

      if (isOpen) closeMenu(menu, button);
      else openMenu(menu, button);
    });

    // Close when a link is clicked
    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.closest("a")) {
        closeMenu(menu, button);
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu(menu, button);
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (!container.contains(target) && !menu.classList.contains(MENU_HIDDEN_CLASS)) {
        closeMenu(menu, button);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelectorAll("[data-mobile-menu-button]")
      .forEach((btn) => {
        if (btn instanceof HTMLElement) setupMenu(btn);
      });
  });
})();
