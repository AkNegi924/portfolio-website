/**
 * Typing Animation Controller
 * Handles the typewriter effect for the hero subtitle
 * Author: Akhilesh Negi
 */

import { CONFIG, TYPING_WORDS } from "../config.js";

export const TypingController = {
  init() {
    this.setupTypingAnimation();
  },

  setupTypingAnimation() {
    const subtitle = document.querySelector(".hero-subtitle");
    if (!subtitle) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    subtitle.textContent = "";

    const typeWords = () => {
      const currentWord = TYPING_WORDS[wordIndex];

      if (isDeleting) {
        subtitle.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        subtitle.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = CONFIG.TYPING_SPEED;

      if (isDeleting) {
        typeSpeed /= 2;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % TYPING_WORDS.length;
        typeSpeed = 500; // Pause before next word
      }

      setTimeout(typeWords, typeSpeed);
    };

    // Start typing animation after hero section is visible
    setTimeout(typeWords, 1000);
  },
};
