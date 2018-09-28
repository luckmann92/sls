$(document).ready(function() {
    /* HEAD CATALOG MENU */
    var catalogMenu = $('.head-menu__catalog'),
        searchPanel = $('.head-search'),
        responsiveMenu = $('.responsive-menu');

    /* HEAD CATALOG MENU */
    $('.js-init-menu').click(function () {
        catalogMenu
            .removeClass('fadeOutLeft animated')
            .addClass('animated slideInLeft');
        return false;
    });
    $('.js-init-menu__close').click(function () {
        catalogMenu
            .removeClass('slideInLeft')
            .addClass('fadeOutLeft');
        return false;
    });

    /* HEAD SEARCH PANEL */
    $('.js-init-search').click(function () {
        searchPanel
            .removeClass('slideOutRight animated')
            .addClass('animated slideInLeft')
            .find('.inp').focus();
        return false;
    });
    searchPanel.find('.inp').blur(function () {
        searchPanel
            .removeClass('slideInLeft')
            .addClass('slideOutRight');
        return false;
    });
    
    /* MODAL */
    $(document).on('click', '.js-init-modal', function () {
        var modal = $(this).attr('data-modal'),
            title = $(this).attr('data-modal-title') || 'Обратная связь';
        $.arcticmodal({
            type: 'ajax',
            url: '../modals/' + $(this).attr('data-modal') + '.html',
            overlay: {
                css: {
                    backgroundColor: '#333',
                    opacity: 1
                }
            },
            closeOnOverlayClick: false,
            ajax: {
                type: 'GET',
                cache: false,
                dataType: 'html',
                success: function(data, el, responce) {
                    var h = $('<div class="box-modal">' +
                        '<div class="box-modal_close arcticmodal-close"><span></span></div>' +
                        '<span class="box-modal_title"></span>' +
                        '<div class="box-modal_content"></div>' +
                        '</div>');
                    $('.box-modal_title', h).html(title);
                    $('.box-modal_content', h).html(responce);


                    data.body.html(h);
                    $(":input").inputmask();
                }
            }
        });
        return false;
    });

    /* RESPONSIVE MENU */
    $('.js-init-responsive_menu').click(function () {
        if($(this).hasClass('open')){
            $(this).removeClass('open');
        } else {
            $(this).addClass('open');
        }
        responsiveMenu.slideToggle();
    });

    /* SCROLL DOWN */
    $('.js-init-scroll_down').click(function () {
        $('html, body').animate({
            scrollTop: $(window).outerHeight()
        }, 1500);
    });

    /* LABELS HOME */
    initSlider();

    $(window).resize(function () {
        initSlider();
    });

    /* DETAIL PRODUCT */
    $('.js-init-product-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="product-detail__prev product-detail__arrows btn btn-arrow btn-default btn-icon slick-prev"><span><i></i></span></button>',
        nextArrow: '<button type="button" class="product-detail__next product-detail__arrows btn btn-arrow btn-default btn-icon slick-next"><span><i></i></span></button>',
    });

    /* PROJECT LINE SLIDER */
    $('.js-init-project-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        centerMode: false,
        variableWidth: true,
        prevArrow: '<button type="button" class="project-detail__prev project-detail__arrows btn btn-arrow btn-default btn-icon slick-prev"><span><i></i></span></button>',
        nextArrow: '<button type="button" class="project-detail__next project-detail__arrows btn btn-arrow btn-default btn-icon slick-next"><span><i></i></span></button>',
    });

    $(":input").inputmask();

    $('body').on('change', '.validate', function(e) {
        if (e.target.value != e.target.defaultValue)
            checkFormField(e.target);
    });
    $('body').on('blur', '.validate', function(e) {
        checkFormField(e.target);
    });
    $('body').on('focus', '.validate', function(e) {
        $(this).parent().removeClass('has-error');
    });

    function checkFormField(field) {
        var parent = $(field).parent(),
            message = '',
            error = false;

        switch ($(field)[0].tagName) {
            case 'INPUT':
                switch ($(field).attr('type')) {
                    case 'tel':
                        var i = $(field).val().replace(/\D+/g,'').length;
                        if(i < 11){
                            error = true;
                        }
                        message = 'Некорректный номер телефона';
                        break;

                    case 'email':
                        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

                        if(!pattern.test($(field).val())){
                            error = true;
                            message = 'Некорректный email';
                        }
                        break;
                    default:
                        if(!$(field).val()){
                            error = true;
                            message = 'Поле обязательно для заполнения';
                        }
                        break;
                }
                break;
            case 'TEXTAREA':
                if(!$(field).val()){
                    error = true;
                    message = 'Поле обязательно для заполнения';
                }
                break;
            case 'CHECKBOX':
                break;
            default:
                if(!$(field).val()){
                    error = true;
                    message = 'Поле обязательно для заполнения';
                }
                break;
        }

        if (error === true){
            parent.addClass('has-error');
            if(parent.find('.error-message').length > 0){
                parent.find('error-message').text(message);
            } else {
                parent.append('<span class="error-message">' + message + '</span>');
            }


            return false;
        } else {
            parent.removeClass('has-error');
            if(parent.find('.error-message').length > 0){
                parent.find('.error-message').remove();
            }
            $(field).attr('title', '');
            return true;
        }
    }

    function  initSlider() {
        if($(window).innerWidth() <= 575){
            $('.slide-item__labels').slick({
                arrows: false,
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true
            });
        } else {
            if($('div').is('.slick-initialized')){
                $('.slide-item__labels').slick('unslick');
            }
        }
    }

});