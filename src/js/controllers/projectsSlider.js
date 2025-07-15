/**
 * Projects Slider Controller
 * Handles the interactive project carousel with auto-scroll, touch/swipe support, and responsive design
 * Author: Akhilesh Negi
 */

import { SLIDER_CONFIG } from "../config.js";

export class ProjectsSlider {
  constructor() {
    this.slider = document.getElementById("projectsSlider");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.indicators = document.getElementById("scrollIndicators");
    this.cards = document.querySelectorAll(".project-card");
    this.currentIndex = 0;
    this.cardWidth = SLIDER_CONFIG.CARD_WIDTH.DESKTOP;
    this.visibleCards = 1;
    this.maxIndex = 0;
    this.autoScrollInterval = null;
    this.autoScrollDelay = SLIDER_CONFIG.AUTO_SCROLL_DELAY;
    this.isPaused = false;

    this.init();
  }

  init() {
    if (!this.slider || this.cards.length === 0) return;

    this.calculateDimensions();
    this.createIndicators();
    this.bindEvents();
    this.updateSlider();
    this.startAutoScroll();

    // Recalculate on window resize
    window.addEventListener("resize", () => {
      this.calculateDimensions();
      this.updateSlider();
    });
  }

  calculateDimensions() {
    if (this.cards.length === 0) return;

    const containerWidth = this.slider.parentElement.offsetWidth;

    // Responsive card width based on screen size
    if (window.innerWidth <= 480) {
      this.cardWidth = SLIDER_CONFIG.CARD_WIDTH.MOBILE;
    } else if (window.innerWidth <= 768) {
      this.cardWidth = SLIDER_CONFIG.CARD_WIDTH.TABLET;
    } else {
      this.cardWidth = SLIDER_CONFIG.CARD_WIDTH.DESKTOP;
    }

    this.visibleCards = Math.floor(containerWidth / this.cardWidth);
    this.visibleCards = Math.max(
      1,
      Math.min(this.visibleCards, this.cards.length)
    );
    this.maxIndex = Math.max(0, this.cards.length - this.visibleCards);

    // Adjust current index if needed
    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }
  }

  createIndicators() {
    if (!this.indicators) return;

    this.indicators.innerHTML = "";
    const totalSlides = this.maxIndex + 1;

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "scroll-dot";
      if (i === this.currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(i));
      this.indicators.appendChild(dot);
    }
  }

  bindEvents() {
    if (!this.prevBtn || !this.nextBtn) return;

    this.prevBtn.addEventListener("click", () => {
      this.prevSlide();
      this.resetAutoScroll();
    });

    this.nextBtn.addEventListener("click", () => {
      this.nextSlide();
      this.resetAutoScroll();
    });

    // Pause auto-scroll on hover
    const projectsWrapper = document.querySelector(".projects-wrapper");
    if (projectsWrapper) {
      projectsWrapper.addEventListener("mouseenter", () => {
        this.pauseAutoScroll();
      });

      projectsWrapper.addEventListener("mouseleave", () => {
        this.resumeAutoScroll();
      });
    }

    // Touch/swipe support
    this.setupTouchEvents();

    // Keyboard navigation
    this.setupKeyboardNavigation();

    // Pause auto-scroll when page is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.pauseAutoScroll();
      } else {
        this.resumeAutoScroll();
      }
    });
  }

  setupTouchEvents() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    this.slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.pauseAutoScroll();
    });

    this.slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      e.preventDefault(); // Prevent scrolling
    });

    this.slider.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;

      const diff = startX - currentX;
      const threshold = SLIDER_CONFIG.SWIPE_THRESHOLD;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }

      this.resetAutoScroll();
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prevSlide();
        this.resetAutoScroll();
      } else if (e.key === "ArrowRight") {
        this.nextSlide();
        this.resetAutoScroll();
      }
    });
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Loop to the end
      this.currentIndex = this.maxIndex;
    }
    this.updateSlider();
  }

  nextSlide() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      // Loop back to the beginning
      this.currentIndex = 0;
    }
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.updateSlider();
    this.resetAutoScroll();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, this.autoScrollDelay);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  pauseAutoScroll() {
    this.isPaused = true;
  }

  resumeAutoScroll() {
    this.isPaused = false;
  }

  resetAutoScroll() {
    this.stopAutoScroll();
    this.startAutoScroll();
  }

  updateSlider() {
    const translateX = -(this.currentIndex * this.cardWidth);
    this.slider.style.transform = `translateX(${translateX}px)`;

    // Update navigation buttons (remove disabled state for infinite scroll)
    if (this.prevBtn) this.prevBtn.disabled = false;
    if (this.nextBtn) this.nextBtn.disabled = false;

    // Update indicators
    if (this.indicators) {
      const dots = this.indicators.querySelectorAll(".scroll-dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === this.currentIndex);
      });
    }
  }
}
