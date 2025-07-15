/**
 * Main Application Controller
 * Coordinates all modules and handles global application state
 * Author: Akhilesh Negi
 */

import { Utils } from "./utils/index.js";
import { NavigationController } from "./controllers/navigation.js";
import { AnimationController } from "./controllers/animation.js";
import { TypingController } from "./controllers/typing.js";
import { InteractiveController } from "./controllers/interactive.js";
import { PerformanceController } from "./controllers/performance.js";
import { ProjectsSlider } from "./controllers/projectsSlider.js";

export const App = {
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeComponents()
      );
    } else {
      this.initializeComponents();
    }
  },

  initializeComponents() {
    try {
      // Initialize all controllers
      NavigationController.init();
      AnimationController.init();
      TypingController.init();
      InteractiveController.init();
      PerformanceController.init();

      // Initialize Projects Slider
      this.initializeProjectsSlider();

      // Setup global event listeners
      this.setupGlobalEvents();

      console.log("Portfolio website initialized successfully!");
    } catch (error) {
      console.error("Error initializing portfolio website:", error);
    }
  },

  initializeProjectsSlider() {
    // Initialize slider if the required elements exist
    const sliderElement = document.getElementById("projectsSlider");
    if (sliderElement) {
      new ProjectsSlider();
    }
  },

  setupGlobalEvents() {
    // Handle window resize
    window.addEventListener(
      "resize",
      Utils.debounce(() => {
        NavigationController.closeMobileMenu();
      }, 250)
    );

    // Handle visibility change (for performance optimization)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add("tab-hidden");
      } else {
        document.body.classList.remove("tab-hidden");
      }
    });

    // Add loading state management
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");

      // Remove any loading spinners or overlays
      const loader = document.querySelector(".loader");
      if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 500);
      }
    });

    // Handle errors gracefully
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error);
      // You could implement error reporting here
    });

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      // You could implement error reporting here
    });
  },

  // Method to reinitialize components if needed
  reinitialize() {
    this.initializeComponents();
  },

  // Method to get current app state
  getState() {
    return {
      isLoaded: document.body.classList.contains("loaded"),
      isTabHidden: document.body.classList.contains("tab-hidden"),
      currentSection: document
        .querySelector(".nav-link.active")
        ?.getAttribute("href"),
    };
  },
};

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    App,
    NavigationController,
    AnimationController,
    TypingController,
    InteractiveController,
    PerformanceController,
    ProjectsSlider,
    Utils,
  };
}
