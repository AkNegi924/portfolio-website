/**
 * Utility functions for the portfolio website
 * Author: Akhilesh Negi
 */

export const Utils = {
  /**
   * Debounce function to limit the rate of function calls
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function to limit function calls to once per specified time
   */
  throttle: (func, delay) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), delay);
      }
    };
  },

  /**
   * Smooth scroll to element
   */
  scrollToElement: (element, offset = 0) => {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  },

  /**
   * Check if element is in viewport
   */
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Create tooltip element
   */
  createTooltip: (text, targetElement) => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.8rem;
      white-space: nowrap;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    `;

    document.body.appendChild(tooltip);

    const rect = targetElement.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";

    setTimeout(() => (tooltip.style.opacity = "1"), 50);
    return tooltip;
  },

  /**
   * Remove tooltip element
   */
  removeTooltip: (tooltip) => {
    if (tooltip) {
      tooltip.remove();
    }
  },
};
