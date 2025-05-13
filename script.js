document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const clickBox = document.getElementById('click-box');
    const resetAnimationBtn = document.getElementById('reset-animation');
    const bgColorPicker = document.getElementById('bg-color');
    const animationSpeedSelect = document.getElementById('animation-speed');
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const resetCounterBtn = document.getElementById('reset-counter');

    // Load saved preferences
    loadPreferences();

    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Click Box Animation
    clickBox.addEventListener('click', function() {
        // Remove any existing animation classes
        this.classList.remove('spin-animation', 'pulse-animation', 'rainbow-animation');
        
        // Get random animation
        const animations = ['spin-animation', 'pulse-animation', 'rainbow-animation'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        
        // Apply random animation
        this.classList.add(randomAnimation);
        
        // Save animation to localStorage
        localStorage.setItem('lastAnimation', randomAnimation);
    });

    // Reset Animation
    resetAnimationBtn.addEventListener('click', function() {
        clickBox.classList.remove('spin-animation', 'pulse-animation', 'rainbow-animation');
        localStorage.removeItem('lastAnimation');
    });

    // Background Color Picker
    bgColorPicker.addEventListener('input', function() {
        document.documentElement.style.setProperty('--bg-color', this.value);
        localStorage.setItem('bgColor', this.value);
    });

    // Animation Speed Selector
    animationSpeedSelect.addEventListener('change', function() {
        let speed;
        switch(this.value) {
            case 'slow': speed = '0.5s'; break;
            case 'fast': speed = '0.1s'; break;
            default: speed = '0.3s';
        }
        document.documentElement.style.setProperty('--animation-speed', speed);
        localStorage.setItem('animationSpeed', this.value);
    });

    // Counter Controls
    incrementBtn.addEventListener('click', () => updateCounter(1));
    decrementBtn.addEventListener('click', () => updateCounter(-1));
    resetCounterBtn.addEventListener('click', resetCounter);

    // Load saved counter value
    const savedCount = localStorage.getItem('counterValue');
    if (savedCount) {
        counterValue.textContent = savedCount;
    }

    // Functions
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        themeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    }

    function loadPreferences() {
        // Load theme
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️ Light Mode';
        }

        // Load background color
        const savedBgColor = localStorage.getItem('bgColor');
        if (savedBgColor) {
            bgColorPicker.value = savedBgColor;
            document.documentElement.style.setProperty('--bg-color', savedBgColor);
        }

        // Load animation speed
        const savedSpeed = localStorage.getItem('animationSpeed');
        if (savedSpeed) {
            animationSpeedSelect.value = savedSpeed;
            let speed;
            switch(savedSpeed) {
                case 'slow': speed = '0.5s'; break;
                case 'fast': speed = '0.1s'; break;
                default: speed = '0.3s';
            }
            document.documentElement.style.setProperty('--animation-speed', speed);
        }

        // Load last animation
        const lastAnimation = localStorage.getItem('lastAnimation');
        if (lastAnimation) {
            clickBox.classList.add(lastAnimation);
        }
    }

    function updateCounter(change) {
        let currentValue = parseInt(counterValue.textContent) || 0;
        currentValue += change;
        counterValue.textContent = currentValue;
        localStorage.setItem('counterValue', currentValue);
        
        // Add visual feedback
        counterValue.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterValue.style.transform = 'scale(1)';
        }, 200);
    }

    function resetCounter() {
        counterValue.textContent = '0';
        localStorage.setItem('counterValue', '0');
        
        // Add visual feedback
        counterValue.classList.add('pulse-animation');
        setTimeout(() => {
            counterValue.classList.remove('pulse-animation');
        }, 1000);
    }
});