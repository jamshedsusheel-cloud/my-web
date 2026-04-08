// main.js - 统一脚本

document.addEventListener('DOMContentLoaded', () => {
    // 1. 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. 导航栏当前页面高亮
    // 获取当前页面的文件名（例如 'about.html'）
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') {
        currentPath = 'index.html'; // 默认首页
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 清除所有高亮状态（防呆）
        link.classList.remove('text-primary', 'font-semibold', 'text-white');
        link.classList.add('text-gray-300');
        
        // 匹配当前路径
        if (href === currentPath) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-primary', 'font-semibold');
        }
    });

    // 3. 滚动淡入动画 (Intersection Observer)
    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    
    // 初始化时加上 fade-in-up 类
    fadeElements.forEach(el => {
        el.classList.add('fade-in-up');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 元素露出 15% 时触发
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 触发后可以取消观察，避免重复触发动画
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
