/**
 * Navigation Controller
 * Handles navigation menu, mobile menu, and active link updates
 * Author: Akhilesh Negi
 */

import { Utils } from "../utils/index.js";
import { CONFIG } from "../config.js";

export const NavigationController = {
  init() {
    this.navbar = document.getElementById("navbar");
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");

    this.bindEvents();
    this.updateActiveLink();
  },

  bindEvents() {
    // Hamburger menu toggle
    this.hamburger?.addEventListener("click", () => this.toggleMobileMenu());

    // Close mobile menu when clicking on nav links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          Utils.scrollToElement(targetElement, 80);
          this.closeMobileMenu();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.navbar?.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Handle scroll events
    window.addEventListener(
      "scroll",
      Utils.throttle(() => {
        this.handleScroll();
        this.updateActiveLink();
      }, 16)
    );
  },

  toggleMobileMenu() {
    this.hamburger?.classList.toggle("active");
    this.navMenu?.classList.toggle("active");
    document.body.style.overflow = this.navMenu?.classList.contains("active")
      ? "hidden"
      : "";
  },

  closeMobileMenu() {
    this.hamburger?.classList.remove("active");
    this.navMenu?.classList.remove("active");
    document.body.style.overflow = "";
  },

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class to navbar
    if (scrollTop > CONFIG.SCROLL_THRESHOLD) {
      this.navbar?.classList.add("scrolled");
    } else {
      this.navbar?.classList.remove("scrolled");
    }
  },

  updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all links
        this.navLinks.forEach((link) => link.classList.remove("active"));
        // Add active class to current link
        correspondingLink?.classList.add("active");
      }
    });
  },
};
