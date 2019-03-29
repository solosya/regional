$('document').ready(function() {
    var mobileView = 620;
    var desktopView = 1119;
    var pageWindow = $(window);
    var scrollMetric = [pageWindow.scrollTop()];
    var articleAd = $('#articleAdScroll');

    
    $("img.lazyload").lazyload({
        effect : "fadeIn"
    });



    var isMobile = function(){
        if (window.innerWidth < mobileView) {
            return true;
        }
        return false;
    };

    var isDesktop = function(){
        if (window.innerWidth > desktopView) {
            return true;
        }
        return false;
    };


    var isScolledPast = function(position){
        if (scrollMetric[0] >= position) {
            return true;
        }
        return false;
    };


    var scrollUpMenu = function() {
        var isMob = isMobile();
        if ( scrollMetric[1] === 'up' && isScolledPast(400) && isMob === false ){
            foldawayPanel.addClass('showMenuPanel');
            menuContainer.show();
        } else {
            menu_top_foldaway.addClass('hide');
            menu_bottom_foldaway.addClass('hide');
            foldawayPanel.removeClass('showMenuPanel');
            menuContainer.show();
        }
    }


    //Onload and resize events
    $(window).on("resize", function () {
        scrollUpMenu();
    }).resize();

    //On Scroll
    $(window).scroll(function() {
        var direction = 'down';
        var scroll = $(window).scrollTop();
        if (scroll < scrollMetric[0]) {
            direction = 'up';
        }
        scrollMetric = [scroll, direction];
        scrollUpMenu();
        adScroll();
    });


    



    var adScroll = function() {

        //set sidebar height for desktop scrolling ad
        if ($('#articleContentContainer').length > 0) {
            var articleTop = $('#articleContentContainer').position().top
            var theHeight = $('#articleContentContainer').height();
            $('#adScrollContainer').css("height",theHeight+"px");
            var screenHeight = $(window).height();
            // if the window is below a certain height some of the sidebar is missing
            // so we have to compensate so the scrolling remains smooth       
            if (screenHeight <= 814) {
                var screenDiff = (814 - screenHeight) + 843;
            } else {
                screenDiff = 843;
            }
            // tell ad when to scroll and when not to based on the size of the article
            // 135 is the space above left for foldaway menu
            if ( scrollMetric[1] === 'up' && !isScolledPast(articleTop-135)) {
                articleAd.removeClass('fixad').removeClass('lockad-bottom').addClass('lockad-top');
            }
            else if ( scrollMetric[1] === 'up' && !isScolledPast((theHeight-screenDiff)+articleTop)) {
                articleAd.removeClass('lockad-bottom').addClass('fixad');
            }
            else if ( scrollMetric[1] === 'down' && isScolledPast((theHeight-screenDiff)+articleTop)) {
                articleAd.removeClass('fixad').removeClass('lockad-top').addClass('lockad-bottom');
            } 
            else if ( scrollMetric[1] === 'down' && isScolledPast(articleTop-135)) {
                articleAd.removeClass('lockad-top').addClass('fixad');
            }
        }
        
    }



    window.Acme.scrollThumbs = function(elem) {

        if (elem.length === 0) {
            return;
        }
        var elem = $(elem);
        var elemWidth = elem.width();
        var container = elem.parent();
        var containerWidth = container.width();
        var scrollAmount = container.scrollLeft();
        var containerView = [scrollAmount, containerWidth + scrollAmount];

        var middle = (containerView[1] - containerView[0]) / 2 ;
        var middle = scrollAmount + middle;
        var elempos = elem[0].offsetLeft + elemWidth/2;

        if ( elempos > middle ) {
            var scroll = true;
            var scrollpos = scrollAmount + (elempos - middle);
        } else if ( elem[0].offsetLeft < middle ) {
            var scroll = true;
            var scrollpos = scrollAmount - (middle - elempos);
        }

        if (scroll) {
            container.animate({
                scrollLeft : scrollpos
            });
        }
    }



    // Onload and resize events
    pageWindow.on("resize", function () {
        removeMobileMenuStyles();
    }).resize();



    // $("#menu-foldaway").on("click", function (e) {
    //     menu_top_foldaway.toggleClass('hide');
    //     menu_bottom_foldaway.toggleClass('hide');
    // });

    // $("#menu-mobile > a").on("click", function (e) {
    //     $('body').toggleClass("active");

    //     var thisMenuElem = $( $(this).parent('.sb-custom-menu') );

    //     var menuButtons = $("#menu-mobile > a");

    //     menuButtons.toggleClass("active");
    //     thisMenuElem.find('.menuContainer').toggleClass("show-on-tablet");
    //     thisMenuElem.toggleClass('open');
    //     if (pageWindow.width() < 620) {
    //         masthead.toggleClass('mobile-menu-active');
    //     }
    //     e.preventDefault();
    // });


    // $(".searchOpen").on("click", function (e) {
    //     $(".searchPanel").css('display', 'inline-block');
    //     $(".searchPanel input").focus();
    // });
    // $(".searchsubmit").on("click", function (e) {
    //     $(".searchPanel").css('display', 'inline-block');
    //     $(".searchPanel input").focus();
    // });
    // $(".searchclose").on("click", function (e) {
    //     $(".searchPanel").css('display', 'none');
    // });



    $('.js-menu').on('click', function (event) {
        event.preventDefault();
        $('body').addClass('noscroll');
        $('.responsive-standalone').addClass('navigation-active');
        $('.responsive-standalone-close').addClass('open');
        $(".responsive-standalone-overlay").animate({
            "opacity": "toggle"
        }, {
            duration: 500
        }, function () {
            $(".responsive-standalone-overlay").fadeIn();
        });
        return false;
    });
    $('.responsive-standalone-close').on('click', function (event) {
        event.preventDefault();
        $('body').removeClass('noscroll');
        $(this).removeClass('open');
        $('.responsive-standalone').removeClass('navigation-active');
        $(".responsive-standalone-overlay").hide();
        return false;
    });
    $(".responsive-standalone-overlay").on('click', function () {
        $('.responsive-standalone-close').removeClass('open');
        $('.responsive-standalone').removeClass('navigation-active');
        $(".responsive-standalone-overlay").hide();
        $('body').removeClass('noscroll');
    });

    $('.js-card-heading').ellipsis({
        responsive: true,
        lines: 2
    });

    $('.js-card-description, .u-without-image .js-card-heading').ellipsis({
        responsive: true,
        lines: 3
    });

    $('.u-without-image .js-card-description').ellipsis({
        responsive: true,
        lines: 4
    });

    $('.js-searchButton').on('click',function() {
        $('.c-navigation__search').show();
    });
    $('.js-searchClose').on('click',function() {
        $('.c-navigation__search').hide();
    });

    $('.c-article__container figure').each(function () {
        var figureStyle = $(this).attr('style') !== undefined;
        var figureClassLeft = $(this).hasClass('alignleft');
        var figureClassRight = $(this).hasClass('alignright');
        if (!(figureStyle) && !(figureClassLeft) && !(figureClassRight)) {
            $(this).after('<div class="clearfix"></div>');
        }
    });

    $('.js-media').slick();







    //this is used for the gallery template
    $("#owl-gallery-article").owlCarousel({
        items: 1,
        thumbs: true,
        thumbsPrerendered: true,
        URLhashListener:true,
        startPosition: 'URLHash',
        pagination: true,
        dots: false,
        nav: true,
        navText: [
            "",
            ""
        ]
    });   






    adScroll();


});
