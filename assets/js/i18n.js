/**
 * Simple i18n (internationalization) handler
 * Supports language switching between Lithuanian (lt), English (en), and Dutch (nl)
 * 
 * Features:
 * - Load translations from JSON files (with fallback to EN)
 * - Support for data-i18n (textContent), data-i18n-html (innerHTML), data-i18n-placeholder, data-i18n-value
 * - Persist language selection to localStorage
 * - Wire up language switcher buttons
 */

class I18n {
    constructor() {
        // Set default language and current language
        this.defaultLang = 'en';  // English as the default/fallback
        this.currentLang = this.getStoredLanguage() || this.detectBrowserLanguage();
        this.translations = {};
        this.translationsEN = {};  // Cache English translations for fallback
    }

    /**
     * Get language from localStorage
     */
    getStoredLanguage() {
        return localStorage.getItem('language');
    }

    /**
     * Detect browser language (fallback to default if not supported)
     */
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0]; // Get 'en' from 'en-US'
        return ['lt', 'en', 'nl'].includes(langCode) ? langCode : this.defaultLang;
    }

    /**
     * Load translation file for specific language
     */
    async loadTranslations(lang) {
        try {
            // Always load English as fallback if not already cached
            if (Object.keys(this.translationsEN).length === 0) {
                const enResponse = await fetch(`assets/i18n/en.json`);
                if (!enResponse.ok) {
                    throw new Error(`Failed to load en.json: ${enResponse.status}`);
                }
                this.translationsEN = await enResponse.json();
            }

            // If requesting the default language, just use cached EN
            if (lang === this.defaultLang) {
                this.translations = this.translationsEN;
                return true;
            }

            // Load the requested language
            const response = await fetch(`assets/i18n/${lang}.json`);
            if (!response.ok) {
                console.warn(`Failed to load ${lang}.json: ${response.status}, falling back to EN`);
                this.translations = this.translationsEN;
                return true;
            }
            this.translations = await response.json();
            return true;
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to EN if available
            if (Object.keys(this.translationsEN).length > 0) {
                this.translations = this.translationsEN;
                return true;
            }
            return false;
        }
    }

    /**
     * Get translated text by key (supports nested keys like "nav.home")
     * Fallback chain: selected lang -> en -> return key as-is
     */
    t(key) {
        const keys = key.split('.');

        // Try to get value from current language
        let value = this.translations;
        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) break;
        }

        // If found and is a string, return it
        if (typeof value === 'string') {
            return value;
        }

        // Fallback to English if translation not found
        if (this.currentLang !== this.defaultLang && Object.keys(this.translationsEN).length > 0) {
            let enValue = this.translationsEN;
            for (const k of keys) {
                enValue = enValue?.[k];
                if (enValue === undefined) break;
            }
            if (typeof enValue === 'string') {
                return enValue;
            }
        }

        // Last resort: return the key itself
        console.warn(`Translation key not found: ${key}`);
        return key;
    }

    /**
     * Apply translations to all elements with data-i18n* attributes
     * Supports:
     * - data-i18n: sets textContent
     * - data-i18n-html: sets innerHTML
     * - data-i18n-placeholder: sets placeholder attribute
     * - data-i18n-value: sets value attribute
     */
    applyTranslations(animate = false) {
        const elements = document.querySelectorAll('[data-i18n]');
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        const valueElements = document.querySelectorAll('[data-i18n-value]');

        const updateElementsLogic = () => {
            // Update text content elements
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.t(key);

                // Skip if element has the 'typed' class (handled by typed.js)
                if (element.classList.contains('typed')) {
                    return;
                }

                // Check if element has data-i18n-attr to translate an attribute instead of text
                const attr = element.getAttribute('data-i18n-attr');

                if (attr) {
                    element.setAttribute(attr, translation);
                } else {
                    // Update textContent
                    element.textContent = translation;
                }
            });

            // Update HTML content elements
            htmlElements.forEach(element => {
                const key = element.getAttribute('data-i18n-html');
                const translation = this.t(key);
                element.innerHTML = translation;
            });

            // Update placeholder attributes
            placeholderElements.forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                const translation = this.t(key);
                element.setAttribute('placeholder', translation);
            });

            // Update value attributes (for input elements)
            valueElements.forEach(element => {
                const key = element.getAttribute('data-i18n-value');
                const translation = this.t(key);
                element.value = translation;
            });
        };

        if (animate) {
            // Animate out first
            elements.forEach(element => {
                if (!element.classList.contains('typed')) {
                    element.classList.add('lang-switching-out');
                }
            });

            // Wait for animation to complete, then update and animate in
            setTimeout(() => {
                updateElementsLogic();

                elements.forEach(element => {
                    element.classList.remove('lang-switching-out');
                    element.classList.add('lang-switching-in');
                });

                // Clean up animation classes
                setTimeout(() => {
                    elements.forEach(element => {
                        element.classList.remove('lang-switching-in');
                    });
                }, 300);
            }, 300);
        } else {
            // No animation - just update
            updateElementsLogic();
        }

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', this.currentLang);
    }

    /**
     * Switch to a different language
     */
    async switchLanguage(lang) {
        if (this.currentLang === lang) {
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('language', lang);

        const loaded = await this.loadTranslations(lang);

        if (loaded) {
            this.applyTranslations(true); // Enable animation on language switch

            // Wait for flip animation to complete before reinitializing typed
            setTimeout(() => {
                this.reinitializeTyped();
            }, 300);

            this.updateLanguageToggle();
        }
    }

    /**
     * Update active state on language toggle buttons
     */
    updateLanguageToggle() {
        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === this.currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Reinitialize typed.js with translated content
     */
    reinitializeTyped() {
        const typedElement = document.querySelector('.typed');
        if (!typedElement) return;

        const dataTypedItems = this.t('hero.roles');
        if (!dataTypedItems || dataTypedItems === 'hero.roles') return;

        // Update the attribute for future reference
        typedElement.setAttribute('data-typed-items', dataTypedItems);

        // Check if Typed is available
        if (typeof Typed !== 'undefined') {
            // Destroy existing typed instance if it exists
            if (window.typedInstance) {
                window.typedInstance.destroy();
            }

            // Reinitialize with new language
            const items = dataTypedItems.split(',').map(item => item.trim());
            window.typedInstance = new Typed('.typed', {
                strings: items,
                loop: true,
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000
            });
        }
    }

    /**
     * Initialize i18n system
     */
    async init() {
        // Load initial translations
        await this.loadTranslations(this.currentLang);
        this.applyTranslations();

        // Initialize typed.js after translations are loaded
        this.initializeTyped();

        // Set up language toggle buttons (direct listeners)
        const buttons = document.querySelectorAll('[data-lang]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });

        // Also add delegated click handling as a fallback
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-lang]');
            if (btn) {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
            }
        });

        this.updateLanguageToggle();
    }

    /**
     * Initialize typed.js for the first time
     */
    initializeTyped() {
        const typedElement = document.querySelector('.typed');
        if (!typedElement) return;

        const dataTypedItems = this.t('hero.roles');
        if (!dataTypedItems || dataTypedItems === 'hero.roles') return;

        // Wait for Typed to be available
        if (typeof Typed === 'undefined') {
            setTimeout(() => this.initializeTyped(), 100);
            return;
        }

        const items = dataTypedItems.split(',').map(item => item.trim());
        window.typedInstance = new Typed('.typed', {
            strings: items,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }
}

// Global i18n functions
/**
 * Set the current language
 * @param {string} lang - Language code (en, lt, nl)
 */
window.setLanguage = function (lang) {
    if (window.i18n) {
        window.i18n.switchLanguage(lang);
    }
};

/**
 * Get the current language
 * @returns {string} Current language code
 */
window.getLanguage = function () {
    return window.i18n ? window.i18n.currentLang : 'en';
};

/**
 * Apply translations to all elements
 */
window.applyTranslations = function () {
    if (window.i18n) {
        window.i18n.applyTranslations();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
    window.i18n.init();
});
