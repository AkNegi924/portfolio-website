# Portfolio Website

A modern, responsive portfolio website built with vanilla JavaScript and CSS, featuring smooth animations, interactive components, and optimized performance.

## Project Structure

```
src/
├── index.html
├── assets/
│   ├── codechef.svg
│   ├── codeforces.svg
│   ├── kaggle.svg
│   └── leetcode.svg
├── css/
│   ├── animations.css
│   ├── reset.css
│   ├── responsive.css
│   ├── components/
│   │   ├── components.css
│   │   ├── hero.css
│   │   └── navigation.css
│   └── sections/
│       ├── about.css
│       ├── contact.css
│       ├── experience.css
│       ├── footer.css
│       └── projects.css
└── js/
    ├── app.js
    ├── config.js
    ├── main.js
    ├── controllers/
    │   ├── animation.js
    │   ├── interactive.js
    │   ├── navigation.js
    │   ├── performance.js
    │   ├── projectsSlider.js
    │   └── typing.js
    └── utils/
        └── index.js
```

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI Components**:
  - Interactive project carousel with touch support
  - Animated skill tags and floating elements
  - Smooth scrolling navigation
  - Mobile-friendly hamburger menu
- **Performance Optimized**:
  - Lazy loading images
  - Debounced scroll events
  - Preloading of critical resources
- **Animations**:
  - Typing animation effect
  - Scroll-based reveal animations
  - Floating elements with parallax effect
- **Cross-Browser Compatible**: Works across modern browsers with fallbacks

## Technologies Used

- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- FontAwesome Icons
- Google Fonts

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/AkNegi924/portfolio-website.git
```

2. Navigate to the project directory:

```bash
cd portfolio-website
```

3. Open index.html in a web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve src
```

## Development

- `js/controllers/`: Contains modular controllers for different functionalities
- `js/utils/`: Utility functions for common operations
- `css/components/`: Reusable UI component styles
- `css/sections/`: Page section-specific styles

## Performance Considerations

- Images are optimized and lazy-loaded
- CSS is modularized for better maintenance
- JavaScript is organized in modules for better code splitting
- Animations are GPU-accelerated where possible
- Touch events are optimized for mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License

## Author

Akhilesh Negi
