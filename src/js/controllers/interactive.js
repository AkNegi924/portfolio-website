/**
 * Interactive Features Controller
 * Handles floating elements, parallax effects, tooltips, and back to top button
 * Author: Akhilesh Negi
 */

import { Utils } from "../utils/index.js";

export const InteractiveController = {
  init() {
    this.setupFloatingElements();
    this.setupParallaxEffect();
    this.setupContactForm();
    this.setupTooltips();
    this.setupBackToTop();
  },

  setupFloatingElements() {
    const floatingElements = document.querySelectorAll(".floating-element");

    floatingElements.forEach((element, index) => {
      // Add random movement
      setInterval(() => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;

        element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${
          Math.random() * 10 - 5
        }deg)`;
      }, 3000 + index * 500);

      // Mouse interaction
      element.addEventListener("mouseenter", () => {
        element.style.transform += " scale(1.1)";
        element.style.filter = "brightness(1.2)";
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = element.style.transform.replace(
          " scale(1.1)",
          ""
        );
        element.style.filter = "brightness(1)";
      });
    });
  },

  setupParallaxEffect() {
    window.addEventListener(
      "scroll",
      Utils.throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll(".floating-element");

        parallaxElements.forEach((element, index) => {
          const speed = 0.5 + index * 0.1;
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      }, 16)
    );
  },

  setupContactForm() {
    // Since there's no actual form in the HTML, we'll add click handlers to social links
    const socialLinks = document.querySelectorAll(".social-link");

    socialLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Add a subtle animation on click
        link.style.transform = "scale(0.95)";
        setTimeout(() => {
          link.style.transform = "";
        }, 150);
      });
    });
  },

  setupTooltips() {
    const skillTags = document.querySelectorAll(".skill-tag");

    skillTags.forEach((tag) => {
      tag.addEventListener("mouseenter", (e) => {
        const tooltipText = `Proficient in ${tag.textContent}`;
        tag._tooltip = Utils.createTooltip(tooltipText, tag);
      });

      tag.addEventListener("mouseleave", () => {
        if (tag._tooltip) {
          Utils.removeTooltip(tag._tooltip);
          tag._tooltip = null;
        }
      });
    });
  },

  setupBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement("button");
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = "back-to-top";
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.visibility = "visible";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.visibility = "hidden";
      }
    });

    // Click to scroll to top
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Hover effect
    backToTopBtn.addEventListener("mouseenter", () => {
      backToTopBtn.style.transform = "scale(1.1)";
    });

    backToTopBtn.addEventListener("mouseleave", () => {
      backToTopBtn.style.transform = "scale(1)";
    });
  },
};
