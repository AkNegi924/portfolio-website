/**
 * Animation Controller
 * Handles scroll animations, intersection observer, and element animations
 * Author: Akhilesh Negi
 */

import { Utils } from "../utils/index.js";
import { CONFIG } from "../config.js";

export const AnimationController = {
  init() {
    this.setupIntersectionObserver();
    this.animateElements();
    this.setupScrollIndicator();
  },

  setupIntersectionObserver() {
    const options = {
      threshold: CONFIG.INTERSECTION_THRESHOLD,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, options);

    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll(
      ".fade-in, .timeline-item, .project-card, .stat-item"
    );
    fadeElements.forEach((el) => {
      el.classList.add("fade-in");
      this.observer.observe(el);
    });
  },

  animateElements() {
    // Animate stats numbers
    this.animateStats();

    // Animate skill tags
    this.animateSkillTags();

    // Add hover effects to project cards
    this.setupProjectCardAnimations();
  },

  animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number");

    statNumbers.forEach((stat) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.countUpAnimation(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(stat);
    });
  },

  countUpAnimation(element) {
    const text = element.textContent;
    const hasPercent = text.includes("%");
    const hasDecimal = text.includes(".");
    const numericValue = parseFloat(text.replace(/[^\d.]/g, ""));

    if (isNaN(numericValue)) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;
    const stepDuration = duration / steps;

    let currentValue = 0;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      currentValue += stepValue;

      if (currentStep >= steps) {
        currentValue = numericValue;
        clearInterval(timer);
      }

      let displayValue = hasDecimal
        ? currentValue.toFixed(2)
        : Math.floor(currentValue);

      // Handle special cases
      if (text.includes("Top")) {
        element.textContent = `Top ${displayValue}%`;
      } else if (hasPercent) {
        element.textContent = `${displayValue}%`;
      } else {
        element.textContent = displayValue;
      }
    }, stepDuration);
  },

  animateSkillTags() {
    const skillTags = document.querySelectorAll(".skill-tag, .tech-tag");

    skillTags.forEach((tag, index) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      });

      tag.style.opacity = "0";
      tag.style.transform = "translateY(20px)";
      tag.style.transition = "all 0.6s ease";

      observer.observe(tag);
    });
  },

  setupProjectCardAnimations() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const techTags = card.querySelectorAll(".tech-tag");
        techTags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.transform = "scale(1.05)";
          }, index * 50);
        });
      });

      card.addEventListener("mouseleave", () => {
        const techTags = card.querySelectorAll(".tech-tag");
        techTags.forEach((tag) => {
          tag.style.transform = "scale(1)";
        });
      });
    });
  },

  setupScrollIndicator() {
    const scrollIndicator = document.querySelector(".scroll-indicator");

    if (scrollIndicator) {
      window.addEventListener("scroll", () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
          scrollIndicator.style.opacity = "0";
        } else {
          scrollIndicator.style.opacity = "1";
        }
      });

      scrollIndicator.addEventListener("click", () => {
        const aboutSection = document.querySelector("#about");
        if (aboutSection) {
          Utils.scrollToElement(aboutSection, 80);
        }
      });
    }
  },
};
