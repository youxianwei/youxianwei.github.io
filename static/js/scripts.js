/*-----------------------------------------------------------------------------------

    Theme Name: Robertson
    Theme URI: http://
    Description: Portfolio / Resume Onepage Template
    Author: Uddog
    Author URI: http://themeforest.net/user/uddog
    Version: 1.0

-----------------------------------------------------------------------------------*/


$(function () {

    "use strict";

    var wind = $(window);

    /* ----------------------------------------------------------------
                    [ Navbar ( scrollIt ) ]
    -----------------------------------------------------------------*/

    $.scrollIt({
        upKey: 38,                // key code to navigate to the next section
        downKey: 40,              // key code to navigate to the previous section
        easing: 'swing',          // the easing function for animation
        scrollTime: 600,          // how long (in ms) the animation takes
        activeClass: 'active',    // class given to the active nav element
        onPageChange: null,       // function(pageIndex) that is called when page is changed
        topOffset: -80            // offste (in px) for fixed top navigation
    });


    /* ----------------------------------------------------------------
                    [ Navbar ( Change Background & Logo ) ]
    -----------------------------------------------------------------*/

    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> image");

        if (bodyScroll > 100) {

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo.png');

        } else {

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo.png');
        }
    });


    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });


    /* ----------------------------------------------------------------
                    [ Progress Bar ]
    -----------------------------------------------------------------*/

    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });



    /* ----------------------------------------------------------------
                    [ Sections Background Image With Data ]
    -----------------------------------------------------------------*/

    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


    /* ----------------------------------------------------------------
                    [ Owl-Carousel ]
    -----------------------------------------------------------------*/

    // Testimonials owlCarousel
    $('.carousel-single .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500
    });



    /* ----------------------------------------------------------------
                    [ magnificPopup ]
    -----------------------------------------------------------------*/

    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    

    /* ----------------------------------------------------------------
                    [ Preloader ]
    -----------------------------------------------------------------*/

    $(".loading").addClass("loading-end").fadeOut(1000);


    /* ----------------------------------------------------------------
                    [ stellar ( Parallax ) ]
    -----------------------------------------------------------------*/

    wind.stellar();


    /* ----------------------------------------------------------------
                    [ isotope Portfolio ( Masonery Style ) ]
    -----------------------------------------------------------------*/

    $('.gallery').isotope({
        // options
        itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
        // options
    });

    // filter items on button click
    $('.filtering').on('click', 'span', function () {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on('click', 'span', function () {

        $(this).addClass('active').siblings().removeClass('active');

    });


    /* ----------------------------------------------------------------
                    [ contact form validator ]
    -----------------------------------------------------------------*/

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});

const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("Email and message field is required!") != -1 || response.indexOf("Enter a valid email address!") != -1 || response.indexOf("Sorry, failed to send your message!") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}



// 确保DOM完全加载后再执行        
document.addEventListener('DOMContentLoaded', function() {
        // 轮播图功能
        const slider = document.querySelector('.slider');
        const slides = document.querySelector('.slides');
        const slideCount = document.querySelectorAll('.slide').length;
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
        let slideInterval;
    
    // 初始化轮播
        function initSlider() {
        // 设置初始位置
        updateSliderPosition();
        
        // 设置轮播自动播放
        startAutoSlide();
        
        // 添加事件监听器
        prevBtn.addEventListener('click', showPrevSlide);
        nextBtn.addEventListener('click', showNextSlide);
        
        // 添加点状指示器点击事件
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
        
        // 鼠标悬停时暂停自动播放
        slider.addEventListener('mouseenter', pauseAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            pauseAutoSlide();
        });
        
        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // 向左滑动，下一张
                    showNextSlide();
                } else {
                    // 向右滑动，上一张
                    showPrevSlide();
                }
            }
        }
        }
    
    // 更新轮播位置
        function updateSliderPosition() {
        slides.style.transform = `translateX(-${currentSlide * 20}%)`;
        
        // 更新点状指示器
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        }
    
    // 显示下一张
        function showNextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSliderPosition();
        resetAutoSlide();
        }
    
    // 显示上一张
        function showPrevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSliderPosition();
        resetAutoSlide();
        }
    
    // 跳转到指定幻灯片
        function goToSlide(index) {
        if (index >= 0 && index < slideCount) {
            currentSlide = index;
            updateSliderPosition();
            resetAutoSlide();
        }
        }
    
    // 开始自动轮播
        function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, 5000); // 5秒切换
        }
    
    // 暂停自动轮播
        function pauseAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        }
    
    // 重置自动轮播
        function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
        }
    
    // 初始化轮播
        initSlider();
    
    // 图片懒加载处理
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
        } else {
        // 回退方案：直接加载所有图片
        lazyImages.forEach(img => {
            img.src = img.src;
        });
        }
    
    // 淘宝按钮点击动画
        const taobaoBtn = document.querySelector('.taobao-btn');
        if (taobaoBtn) {
        taobaoBtn.addEventListener('click', function(e) {
            // 添加点击反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // 确保链接正常跳转
            console.log('跳转到淘宝店铺:', this.href);
            });
            }
    
        // 错误处理
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.message, e.filename, e.lineno);
        // 可以在这里添加错误上报逻辑
    });
    
    // 页面加载完成
    console.log('AA软件作品页面加载完成');
});
