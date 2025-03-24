// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let scrollTimeout;

// 禁用右键菜单和F12
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
    if (event.keyCode === 123) { // F12键
        event.preventDefault();
        return false;
    }
    // 禁用Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) {
        event.preventDefault();
        return false;
    }
});

// 添加鼠标跟随特效
function createMouseEffect() {
    const body = document.querySelector('body');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    body.addEventListener('mousemove', function(e) {
        let x = e.clientX;
        let y = e.clientY;
        
        let particle = document.createElement('span');
        particle.className = 'mouse-particle';
        
        // 随机颜色
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 设置粒子样式
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = randomColor;
        
        body.appendChild(particle);
        
        // 粒子动画结束后移除
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });
}

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 清除之前的定时器
    clearTimeout(scrollTimeout);
    
    // 添加滚动停止检测
    scrollTimeout = setTimeout(() => {
        navbar.classList.remove('scroll-up', 'scroll-down');
    }, 150);
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(17, 24, 39, 0.8)';
    }
});

// 移动端导航菜单
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // 添加动画效果
    navLinks.style.transition = 'all 0.3s ease-in-out';
});

// 点击导航链接时关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 联系表单
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // 提交表单的模拟操作
        showNotification('消息发送成功！', 'success');
        contactForm.reset();
    });
}

// 硬编码的项目数据
const projects = [
    {
        title: "个人网站",
        description: "我的个人网站项目，展示我的作品和技能。使用现代前端技术构建，包括响应式设计。",
        image: "https://via.placeholder.com/600x400?text=个人网站",
        technologies: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/yourusername/personal-website",
        liveUrl: "#"
    },
    {
        title: "安全扫描器",
        description: "一个Web应用安全扫描工具，可以检测常见的安全漏洞，如XSS、SQL注入等。",
        image: "https://via.placeholder.com/600x400?text=安全扫描器",
        technologies: ["Python", "Flask", "Security"],
        githubUrl: "https://github.com/yourusername/security-scanner",
        liveUrl: null
    },
    {
        title: "CTF解题工具",
        description: "为CTF比赛开发的解题辅助工具，包括各种加密解密、编码解码功能。",
        image: "https://via.placeholder.com/600x400?text=CTF工具",
        technologies: ["Python", "Crypto", "Web"],
        githubUrl: "https://github.com/yourusername/ctf-tools",
        liveUrl: null
    },
    {
        title: "在线学习平台",
        description: "一个专注于安全技术学习的在线平台，提供各种教程和实践环境。",
        image: "https://via.placeholder.com/600x400?text=学习平台",
        technologies: ["React", "Node.js", "MongoDB"],
        githubUrl: "https://github.com/yourusername/learn-platform",
        liveUrl: "#"
    }
];

// 硬编码的文章数据（现在是外部链接）
const articles = [
    {
        title: "Web安全最佳实践",
        excerpt: "本文介绍了保护Web应用安全的最佳实践，包括认证、授权、数据验证等方面。",
        createdAt: "2023-10-15",
        readTime: 10,
        externalUrl: "https://medium.com/your-username/web-security-best-practices",
        icon: "fas fa-shield-alt"
    },
    {
        title: "CTF比赛经验分享",
        excerpt: "分享我参加各类CTF比赛的经验和技巧，以及如何提高解题能力。",
        createdAt: "2023-09-22",
        readTime: 15,
        externalUrl: "https://medium.com/your-username/ctf-experience",
        icon: "fas fa-flag"
    },
    {
        title: "JavaScript安全编程",
        excerpt: "深入研究JavaScript安全编程技术，避免常见的安全漏洞。",
        createdAt: "2023-08-10",
        readTime: 12,
        externalUrl: "https://medium.com/your-username/javascript-security",
        icon: "fab fa-js"
    },
    {
        title: "密码学基础入门",
        excerpt: "密码学基础知识介绍，从古典密码到现代加密算法的发展。",
        createdAt: "2023-07-18",
        readTime: 20,
        externalUrl: "https://medium.com/your-username/cryptography-basics",
        icon: "fas fa-key"
    }
];

// 硬编码的竞赛数据
const competitions = [
    {
        title: "全国大学生信息安全竞赛",
        date: "2023-06-15",
        category: "信息安全",
        description: "参与了Web安全和密码学相关的挑战，解决了多个复杂的安全问题。",
        award: "一等奖"
    },
    {
        title: "DEFCON CTF预选赛",
        date: "2023-04-22",
        category: "CTF",
        description: "作为团队的一部分，参与了世界顶级CTF比赛的预选赛，解决了各种安全挑战。",
        award: "团队前50名"
    },
    {
        title: "全国网络安全大赛",
        date: "2022-11-10",
        category: "网络安全",
        description: "参加了为期两天的网络安全攻防实战演习，负责Web安全防护和渗透测试。",
        award: "二等奖"
    },
    {
        title: "黑客松创新编程大赛",
        date: "2022-08-05",
        category: "创新编程",
        description: "在48小时内开发了一个创新的安全工具，获得了评委的高度评价。",
        award: "最佳创新奖"
    },
    {
        title: "全国信息安全铁人三项",
        date: "2022-05-20",
        category: "综合安全",
        description: "参加了包括防御、攻击和分析三个环节的综合性安全竞赛。",
        award: "个人赛第三名"
    },
    {
        title: "国际网络安全挑战赛",
        date: "2022-03-15",
        category: "国际赛事",
        description: "代表学校参加了国际性的网络安全挑战赛，与全球顶尖选手同台竞技。",
        award: "优胜奖"
    }
];

// 社交媒体联系方式
const socialContacts = {
    wechat: "your_wechat_id",
    qq: "123456789",
    email: "your.email@example.com",
    github: "https://github.com/yourusername"
};

// 加载项目数据
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// 加载文章数据
function loadArticles() {
    const articlesGrid = document.querySelector('#articles .cards-grid');
    if (!articlesGrid) return;
    
    articles.forEach(article => {
        const articleCard = createArticleCard(article);
        articlesGrid.appendChild(articleCard);
    });
}

// 加载竞赛数据
function loadCompetitions() {
    const competitionsGrid = document.querySelector('#competitions .cards-grid');
    if (!competitionsGrid) return;
    
    competitions.forEach(competition => {
        const competitionCard = createCompetitionCard(competition);
        competitionsGrid.appendChild(competitionCard);
    });
}

// 加载联系方式
function loadContactInfo() {
    const contactInfo = document.querySelector('#contact .contact-social');
    if (!contactInfo) return;
    
    contactInfo.innerHTML = `
        <div class="social-item">
            <i class="fab fa-weixin"></i>
            <span>微信: ${socialContacts.wechat}</span>
        </div>
        <div class="social-item">
            <i class="fab fa-qq"></i>
            <span>QQ: ${socialContacts.qq}</span>
        </div>
        <div class="social-item">
            <i class="fas fa-envelope"></i>
            <span>邮箱: ${socialContacts.email}</span>
        </div>
        <div class="social-item">
            <i class="fab fa-github"></i>
            <a href="${socialContacts.github}" target="_blank">GitHub</a>
        </div>
    `;
}

// 创建项目卡片
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
                ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p class="project-tech">${project.technologies.join(' + ')}</p>
            <p class="project-desc">${project.description}</p>
        </div>
    `;
    return card;
}

// 创建文章卡片（现在链接到外部网站）
function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    
    card.innerHTML = `
        <a href="${article.externalUrl}" target="_blank" class="article-link">
            <div class="card-content">
                <div class="card-icon">
                    <i class="${article.icon}"></i>
                </div>
                <h3>${article.title}</h3>
                <div class="card-meta">
                    <span class="date"><i class="far fa-calendar"></i> ${new Date(article.createdAt).toLocaleDateString()}</span>
                    <span class="read-time"><i class="far fa-clock"></i> ${article.readTime}分钟</span>
                </div>
                <p class="excerpt">${article.excerpt}</p>
                <div class="external-link">
                    <i class="fas fa-external-link-alt"></i> 阅读全文
                </div>
            </div>
        </a>
    `;
    return card;
}

// 创建竞赛卡片
function createCompetitionCard(competition) {
    const card = document.createElement('div');
    card.className = 'card competition-card fade-in';
    card.innerHTML = `
        <div class="card-content">
            <div class="award-badge">
                <i class="fas fa-trophy"></i>
                <span>${competition.award}</span>
            </div>
            <h3>${competition.title}</h3>
            <div class="card-meta">
                <span class="date"><i class="far fa-calendar"></i> ${new Date(competition.date).toLocaleDateString()}</span>
                <span class="category"><i class="fas fa-tag"></i> ${competition.category}</span>
            </div>
            <p class="description">${competition.description}</p>
        </div>
    `;
    return card;
}

// 显示通知
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 增加打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 加载数据
    loadProjects();
    loadArticles();
    loadCompetitions();
    loadContactInfo();
    
    // 添加打字机效果到标题
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
    
    // 添加鼠标跟随特效
    createMouseEffect();
    
    // 添加动画元素
    addBackgroundAnimation();
});

// 背景动画
function addBackgroundAnimation() {
    const particles = document.createElement('div');
    particles.className = 'background-particles';
    document.body.appendChild(particles);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置和大小
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 10 + 2}px`;
        particle.style.height = particle.style.width;
        
        // 随机动画延迟
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particles.appendChild(particle);
    }
}

// 滚动动画优化
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // 添加延迟动画
            entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 图片懒加载优化
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // 添加加载动画
                img.classList.add('loading');
                
                // 模拟加载延迟
                setTimeout(() => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.remove('loading');
                    observer.unobserve(img);
                }, 500);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 为所有卡片添加动画
    document.querySelectorAll('.card, .project-card').forEach(card => {
        observer.observe(card);
    });
}); 