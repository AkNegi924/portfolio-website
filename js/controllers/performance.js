/**
 * Performance Controller
 * Handles lazy loading and resource preloading for optimization
 * Author: Akhilesh Negi
 */

import { CRITICAL_RESOURCES } from "../config.js";

export const PerformanceController = {
  init() {
    this.setupLazyLoading();
    this.setupPreloadCriticalResources();
  },

  setupLazyLoading() {
    // Lazy load images if any are added later
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  },

  setupPreloadCriticalResources() {
    // Preload critical fonts and resources
    CRITICAL_RESOURCES.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = resource;
      document.head.appendChild(link);
    });
  },
};
