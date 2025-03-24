// 页面加载动画
class PageLoader {
    constructor() {
        this.loader = document.createElement('div');
        this.loader.className = 'loading-overlay';
        this.loader.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">加载中...</div>
        `;
        document.body.appendChild(this.loader);
    }

    show() {
        this.loader.style.opacity = '1';
    }

    hide() {
        this.loader.style.opacity = '0';
        setTimeout(() => {
            this.loader.style.display = 'none';
        }, 500);
    }
}

// 主题切换器
class ThemeSwitcher {
    constructor() {
        this.themes = ['dark', 'light', 'purple', 'green'];
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.createSwitcher();
        this.applyTheme(this.currentTheme);
    }

    createSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = '<i class="fas fa-palette"></i>';

        const options = document.createElement('div');
        options.className = 'theme-options';
        this.themes.forEach(theme => {
            const option = document.createElement('div');
            option.className = `theme-option ${theme}`;
            option.onclick = () => this.applyTheme(theme);
            options.appendChild(option);
        });

        switcher.appendChild(options);
        switcher.onclick = () => options.classList.toggle('active');
        document.body.appendChild(switcher);
    }

    applyTheme(theme) {
        document.body.className = `${theme}-theme`;
        localStorage.setItem('theme', theme);
    }
}

// 返回顶部按钮
class BackToTop {
    constructor() {
        this.button = document.createElement('div');
        this.button.className = 'back-to-top';
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.button.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(this.button);
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });
    }
}

// 页面过渡效果
class PageTransition {
    constructor() {
        this.init();
    }

    init() {
        document.body.classList.add('page-transition');
        setTimeout(() => {
            document.body.classList.add('active');
        }, 100);
    }
}

// 性能优化
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // 延迟加载图片
        this.lazyLoadImages();
        // 优化滚动性能
        this.optimizeScroll();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });