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

    const fadeElements = document.querySelectorAll(
      ".fade-in, .timeline-item, .project-card, .cp-link"
    );
    fadeElements.forEach((el) => {
      el.classList.add("fade-in");
      this.observer.observe(el);
    });
  },

  animateElements() {
    // Animate skill tags
    this.animateSkillTags();

    // Add hover effects to project cards
    this.setupProjectCardAnimations();
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
