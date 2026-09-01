document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const rootHTML = document.documentElement;

    // Initialize Lucide icons if available
    if (window.lucide) {
        lucide.createIcons();
    }

    // 1. Retrieve saved theme from LocalStorage or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // 2. Toggle Theme Event Listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = rootHTML.classList.contains('light-mode');
            const newTheme = isLight ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    /**
     * Applies the designated theme class and updates storage/icon state
     * @param {string} theme - 'dark' or 'light'
     */
    function applyTheme(theme) {
        if (theme === 'light') {
            rootHTML.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            updateToggleIcon('sun');
        } else {
            rootHTML.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            updateToggleIcon('moon');
        }
    }
    function setTheme(theme) {
      if (theme === 'dark') {
        htmlElement.classList.add('dark');
        themeIcon.setAttribute('data-lucide', 'sun');
      } else {
        htmlElement.classList.remove('dark');
        themeIcon.setAttribute('data-lucide', 'moon');
      }
      lucide.createIcons();
      localStorage.setItem('theme', theme);
    }


    /**
     * Replaces and updates the theme button icon dynamically
     * @param {string} iconName - 'sun' or 'moon'
     */
    function updateToggleIcon(iconName) {
        const themeBtn = document.getElementById('themeToggle');
        if (!themeBtn) return;

        let iconEl = themeBtn.querySelector('i') || themeBtn.querySelector('svg');

        if (iconEl) {
            const newIcon = document.createElement('i');
            newIcon.id = 'themeIcon';
            newIcon.setAttribute('data-lucide', iconName);
            iconEl.replaceWith(newIcon);

            if (window.lucide) {
                lucide.createIcons();
            }
        }
    }

    // Modal Control Initializations
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

/**
 * Global function to trigger the project preview lightbox modal
 * @param {string} url - Target URL to load inside iframe
 */
function openModal(url) {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-frame');
    if (modal && iframe) {
        iframe.src = url;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Global function to close the active lightbox modal
 */
function closeModal() {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-frame');
    if (modal && iframe) {
        modal.classList.remove('active');
        iframe.src = 'about:blank';
        document.body.style.overflow = '';
    }
}