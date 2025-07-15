/**
 * Main Entry Point
 * Initializes the entire portfolio website application
 * Author: Akhilesh Negi
 */

import { App } from "./app.js";

// Initialize the application
App.init();

// Make App available globally for debugging purposes
if (typeof window !== "undefined") {
  window.PortfolioApp = App;
}

// Additional initialization for specific features
document.addEventListener("DOMContentLoaded", () => {
  // Add any additional DOM-ready initialization here
  console.log("Portfolio website DOM loaded and initialized");

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add focus management for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
  });
});

// Handle page lifecycle events
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Page hidden - pausing animations");
  } else {
    console.log("Page visible - resuming animations");
  }
});
