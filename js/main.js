

<!-- main.js代码 ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ -->  

// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('个人主页已加载完成');
    
    // 1. 平滑滚动功能
    const scrollLinks = document.querySelectorAll('.scroll');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const currentSection = this.closest('section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 2. 导航栏高亮功能
    const navLinks = document.querySelectorAll('aside a');
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('cur_a');
            if (link.getAttribute('href') === `#${current}` || 
                link.textContent.includes(getNavText(current))) {
                link.classList.add('cur_a');
            }
        });
    }
    
    function getNavText(sectionId) {
        const map = {
            'page1': '游显维',
            'page2': '基本资料',
            'page3': '专业技能',
            'page4': '教育经历',
            'page5': '工作经验'
        };
        return map[sectionId] || '';
    }
    
    // 3. 图片悬停效果增强
    const portraitImg = document.querySelector('.portrait img');
    if (portraitImg) {
        portraitImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        portraitImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // 4. 响应式导航菜单（移动端）
    function createMobileNav() {
        if (window.innerWidth <= 768) {
            const aside = document.querySelector('aside');
            if (aside && !document.querySelector('.mobile-nav-toggle')) {
                // 创建移动端导航按钮
                const navToggle = document.createElement('div');
                navToggle.className = 'mobile-nav-toggle';
                navToggle.innerHTML = '☰';
                navToggle.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1001;
                    background: var(--primary-color);
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                `;
                
                document.body.appendChild(navToggle);
                
                // 移动端导航样式调整
                aside.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: -250px;
                    width: 250px;
                    height: 100vh;
                    transition: left 0.3s ease;
                    padding-top: 80px;
                    z-index: 1000;
                `;
                
                navLinks.forEach(link => {
                    link.querySelector('span').style.transform = 'none';
                });
                
                // 切换导航显示
                navToggle.addEventListener('click', function() {
                    if (aside.style.left === '0px') {
                        aside.style.left = '-250px';
                    } else {
                        aside.style.left = '0px';
                    }
                });
                
                // 点击导航项关闭菜单
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        aside.style.left = '-250px';
                    });
                });
            }
        }
    }
    
    // 5. 页面加载动画
    function addLoadingAnimation() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="font-size: 2rem; margin-bottom: 20px;">游显维</div>
                <div style="font-size: 1.2rem;">个人主页加载中...</div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // 页面加载完成后隐藏加载动画
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 800);
        });
    }
    
    // 6. 初始化函数
    function init() {
        highlightNav();
        createMobileNav();
        addLoadingAnimation();
        
        // 监听滚动事件
        window.addEventListener('scroll', highlightNav);
        
        // 监听窗口大小变化
        window.addEventListener('resize', createMobileNav);
        
        // 添加导航点击事件
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.textContent.trim();
                const targetSection = Array.from(sections).find(section => {
                    const sectionTitle = section.querySelector('h1')?.textContent || 
                                       section.querySelector('h2')?.textContent;
                    return sectionTitle && sectionTitle.includes(targetId);
                });
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // 执行初始化
    init();
    
    // 7. 控制台欢迎信息
    console.log('%c👋 欢迎访问游显维的个人主页！', 'color: #3498db; font-size: 16px; font-weight: bold;');
    console.log('%c💼 全栈工程师 | AA软件创始人', 'color: #2c3e50; font-size: 14px;');
});
