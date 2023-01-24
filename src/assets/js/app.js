$(window).on('load', function () {
    $('.preloader__wrapper').fadeOut();
    $('body').removeClass('is-loading');
    $('.js-range-input').each((idx, elem) => {
        $(elem).prev().text($(elem).val())
    });
});

$(() => {
    if ($('.mdc-tooltip').parents('html').length > 0) {
        const tooltip = new mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip'));
    }
})

function initSlider () {
    if ($('.js-range-slider.mdc-slider').parents('html').length > 0) {
        const rangeSlider = new mdc.slider.MDCSlider(document.querySelector('.js-range-slider.mdc-slider'));
        rangeSlider.root.addEventListener('MDCSlider:change', (e) => {
            if (e.detail.thumb === 1) {
                $('.js-range-input-from').val(e.detail.value)
                    .prev().text(e.detail.value)
            } else if (e.detail.thumb === 2) {
                $('.js-range-input-to').val(e.detail.value)
                    .prev().text(e.detail.value)
            }
        });
        $('.js-range-input-from').on('input', function (e) {
            rangeSlider.setValueStart($(this).val());
        })
        $('.js-range-input-to').on('input', function (e) {
            rangeSlider.setValue($(this).val());
        });

        $(function () {
            $('form .js-range-input').on('input', (e) => {
                $(e.target).prev().text($(e.target).val())
            })
        });
    }
}

$(() => {
    if ($('.js-range-slider').parents('html').length > 0) {
        initSlider();
    };
});

$(() => {
    $('.form-number').on('click', '.js-form-number-minus, .js-form-number-plus', function quantityClick() {
        const input = $( this ).siblings( '.form-number__input' );
        if ( (input.val() > +input.attr('min')) && ($( this ).hasClass( 'js-form-number-minus' ) ) ) {
            input.val( +input.val() - 1 );
        } else if (  (input.val() < +input.attr('max') ) && ( $( this ).hasClass( 'js-form-number-plus' ) ) ) {
            input.val( +input.val() + 1 );
        }
    });

    $('.cart-services__info-wrapper').hide();
    $('.js-toggle-cart-services').on('click', function () {
        $(this).toggleClass('active').next('.cart-services__info-wrapper').slideToggle();
    });
});

$(() => {
    $('.js-card-toggle-favorites').on('click', function () {
        if (!($(this).hasClass('active'))) {
            $(this)
                .addClass('active')
                .find('span').text('В избранном')
                .parent()
                .siblings('.card-top__tooltip')
                .addClass('active')
        } else (
            $(this)
                .removeClass('active')
                .find('span').text('В избранное')
                .parent()
                .siblings('.card-top__tooltip')
                .removeClass('active')
        )
    });
});

$(() => {
    $('.js-card-toggle-compare').on('click', function () {
        if (!($(this).hasClass('active'))) {
            $(this)
                .addClass('active')
                .find('span').text('В сравнении')
        } else (
            $(this)
                .removeClass('active')
                .find('span').text('Сравнить')
        )
    });
});

$(() => {
    function initTabs() {
        if ($(window).width() + 15 < 576) {
            $('.tabs__content-item:not(:first-child) .tabs-content__in').hide();
            $('.tabs__content-item:first-child').addClass('active');

            $('.tabs-button').click(function tabListButtonClick() {
                if (!($(this).parent('.tabs__content-item').hasClass('active'))) {
                    const thisLi = $(this).parent('.tabs__content-item');
                    thisLi
                        .addClass('active')
                        .find('.tabs-content__in')
                        .slideToggle()
                        .parent('.tabs__content-item')
                        .siblings()
                        .removeClass('active')
                        .children('.tabs-content__in')
                        .slideUp();
                } else if (($(this).parent('.tabs__content-item').hasClass('active'))) {
                    $(this).next('.tabs-content__in').slideUp().parent('.tabs__content-item').removeClass('active')
                }
            });
        } else {
            $('.tabs__content-item:not(:first-child)').hide();
            $('.tabs__list-item:first-child').addClass('active');
            $('.tabs__list > .tabs__list-item').click(function tabListLiClick() {
                if (!($(this).hasClass('active'))) {
                    const thisLi = $(this);
                    const numLi = thisLi.index();
                    thisLi.addClass('active').siblings().removeClass('active');
                    thisLi.parent().next().children('div').hide()
                        .eq(numLi)
                        .fadeIn('slow');
                }
            });
        }
    }

    initTabs();

    $(window).bind('resize',function(){
        initTabs();
    });

});

$(() => {
    $('.card-tabs-content__item:not(:first-child)').hide();
    $('.card-tabs-list__item:first-child').addClass('active');
    $('.card-tabs-list > .card-tabs-list__item').click(function cardTabListLiClick() {
        if (!($(this).hasClass('active'))) {
            const thisLi = $(this);
            const numLi = thisLi.index();
            thisLi.addClass('active').siblings().removeClass('active');
            thisLi.parent().next().children('.card-tabs-content__item').hide()
                .eq(numLi)
                .fadeIn('slow');
        }
    });
})

$(() => {
    $('.filter .filter-item__top--togglable').each((idx, elem) => {
        if (!($(elem).find('.filter-item__top').hasClass('active'))) {
            $(elem).find('.filter-item__content').hide();
        }
    });

    $('.filter-item__brands').children('label:gt(6)').hide();
    $('.js-toggle-brands-list').on('click', function (e) {
        e.preventDefault();

        if (!($(this).hasClass('active'))) {
            $(this)
                .addClass('active')
                .find('span').text('Скрыть')
                .parent()
                .siblings('.filter-item__brands').children('label:gt(6)').show()
        } else {
            $(this)
                .removeClass('active')
                .find('span').text('Показать все')
                .parent()
                .siblings('.filter-item__brands').children('label:gt(6)').hide();
        }
    });

    $('.js-toggle-filter').on('click', function () {
        $(this).toggleClass('active').next('.filter-item__content').slideToggle();
    });


    $('.js-toggle-filter-modal').on('click', function () {
        setTimeout(() => {
            $.fancybox.open({
                src  : '#filter',
                touch: false,
                animationDuration: 600,
                animationEffect: 'slide-in-in',
                scrolling: true,

                afterLoad: function () {
                    initSlider();
                }
            });
        }, 200);
    });

    function initFilters() {
        if ($(window).width() + 15 < 1260) {
            $('.filter').appendTo('#filter');
        } else {
            $('.filter').appendTo('.filter-wrapper');
        }
    }

    initFilters();

    $(window).bind('resize',function(){
        initSlider();
        initFilters();
    });

});


$(() => {
    $('.js-switch-view').on('change', function () {
        if ($(this)[0].checked && $(this)[0].id === 'view-2') {
            $('.catalog-list').addClass('catalog-list--rows');
        } else {
            $('.catalog-list').removeClass('catalog-list--rows');
        }
    })
})

$(() => {
    $('.js-item-card-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });
    $('.js-item-togglable-card-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });
});

$(() => {
    $('.question-item:first-child').addClass('active').find('.question-item__info').slideToggle();
    $('.js-question-toggle').on('click', function (e) {
        $(this)
            .parent('.question-item')
            .toggleClass('active')
            .find('.question-item__info').slideToggle();
    });
});

$(() => {
    $('.js-toggle-seo-text').on('click', function (e) {
        if (!($(this).hasClass('active'))) {
            $(this)
                .addClass('active')
                .find('span').text('Скрыть')
                .parent()
                .prev('.seo-text')
                .addClass('active')
        } else {
            $(this)
                .removeClass('active')
                .find('span').text('Показать весь')
                .parent()
                .prev('.seo-text')
                .removeClass('active')
        }
    });
})

$(() => {
    const offerSlider = new Swiper(".js-offer-slider", {
        speed: 3000,
        freeMode: false,
        watchSlidesProgress: true,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: ".offer-slider .swiper-pagination",
            clickable: true,
        },
    });
    const homeBestSlider = new Swiper(".js-home-best-slider", {
        speed: 700,
        watchSlidesProgress: true,
        spaceBetween: 20,
        breakpoints: {
            0: {
                pagination: {
                    el: ".js-home-best-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 1,
            },
            576: {
                pagination: {
                    el: ".js-home-best-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 2,
            },
            768: {
                pagination: {
                    el: ".js-home-best-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 3,

            },
            1260: {
                slidesPerView: 4,
                navigation: {
                    nextEl: ".js-home-best-slider-next",
                    prevEl: ".js-home-best-slider-prev",
                },
            },
            1560: {
                slidesPerView: 4,
                navigation: {
                    nextEl: ".js-home-best-slider-next",
                    prevEl: ".js-home-best-slider-prev",
                },
            },
        },
    });
    const gratitudeSlider = new Swiper(".js-gratitude-slider", {
        speed: 700,
        spaceBetween: 20,
        breakpoints: {
            0: {
                pagination: {
                    el: ".js-gratitude-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 2,
            },
            576: {
                pagination: {
                    el: ".js-gratitude-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 2,
            },
            768: {
                pagination: {
                    el: ".js-gratitude-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 3,

            },
            1260: {
                slidesPerView: 4,
                navigation: {
                    nextEl: ".js-gratitude-slider-next",
                    prevEl: ".js-gratitude-slider-prev",
                },
            },
            1560: {
                slidesPerView: 4,
                navigation: {
                    nextEl: ".js-gratitude-slider-next",
                    prevEl: ".js-gratitude-slider-prev",
                },
            },
        },
    });
    const brandsSlider = new Swiper(".js-brands-slider", {
        speed: 700,
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 2,
                pagination: {
                    el: ".js-brands-slider-pagination",
                    clickable: true,
                },
            },
            576: {
                slidesPerView: 3,
                pagination: {
                    el: ".js-brands-slider-pagination",
                    clickable: true,
                },
            },
            768: {
                slidesPerView: 4,
                pagination: {
                    el: ".js-brands-slider-pagination",
                    clickable: true,
                },
            },
            1260: {
                slidesPerView: 6,
                navigation: {
                    nextEl: ".js-brands-slider-next",
                    prevEl: ".js-brands-slider-prev",
                },
            },
            1560: {
                slidesPerView: 6,
                navigation: {
                    nextEl: ".js-brands-slider-next",
                    prevEl: ".js-brands-slider-prev",
                },
            },
        },
    });
    const popularSlider = new Swiper(".js-popular-slider", {
        speed: 700,
        watchSlidesProgress: true,
        spaceBetween: 20,
        breakpoints: {
            0: {
                pagination: {
                    el: ".js-popular-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 1,
            },
            576: {
                pagination: {
                    el: ".js-popular-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 2,
            },
            768: {
                pagination: {
                    el: ".js-popular-slider-pagination",
                    clickable: true,
                },
                slidesPerView: 3,

            },
            1260: {
                slidesPerView: 4,
                navigation: {
                    nextEl: ".js-popular-slider-next",
                    prevEl: ".js-popular-slider-prev",
                },
            },
            1560: {
                slidesPerView: 4,
                navigation: {
                    nextEl: ".js-popular-slider-next",
                    prevEl: ".js-popular-slider-prev",
                },
            },
        },
    });
    const howSlider = new Swiper(".js-how-slider", {
        speed: 700,
        // watchSlidesProgress: true,
        spaceBetween: 20,
        navigation: {
            nextEl: ".js-how-slider-next",
            prevEl: ".js-how-slider-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            976: {
                slidesPerView: 3,
            },
            1260: {
                slidesPerView: 3,
            },
            1560: {
            },
        },
    });
    const lastReviewsSlider = new Swiper(".js-last-reviews-slider", {
        speed: 700,
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 1,
                pagination: {
                    el: ".js-last-reviews-slider-pagination",
                    clickable: true,
                },
            },
            576: {
                slidesPerView: 2,

                pagination: {
                    el: ".js-last-reviews-slider-pagination",
                    clickable: true,
                },
            },
            1260: {
                slidesPerView: 3,
                navigation: {
                    nextEl: ".js-last-reviews-slider-next",
                    prevEl: ".js-last-reviews-slider-prev",
                },
            },
            1560: {
                slidesPerView: 3,
                navigation: {
                    nextEl: ".js-last-reviews-slider-next",
                    prevEl: ".js-last-reviews-slider-prev",
                },
            },
        },
    });
    const reviewsSlider = new Swiper(".js-reviews-slider", {
        speed: 700,
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 1,
                pagination: {
                    el: ".js-reviews-slider-pagination",
                    clickable: true,
                },
            },
            576: {
                slidesPerView: 2,

                pagination: {
                    el: ".js-reviews-slider-pagination",
                    clickable: true,
                },
            },
            1260: {
                slidesPerView: 3,
                navigation: {
                    nextEl: ".js-reviews-slider-next",
                    prevEl: ".js-reviews-slider-prev",
                },
            },
            1560: {
                slidesPerView: 3,
                navigation: {
                    nextEl: ".js-reviews-slider-next",
                    prevEl: ".js-reviews-slider-prev",
                },
            },
        },
    });

    const gallerySlider = new Swiper(".js-gallery-slider", {
        speed: 700,
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 1,
                pagination: {
                    el: ".js-gallery-slider-pagination",
                    clickable: true,
                },
            },
            576: {
                slidesPerView: 2,

                pagination: {
                    el: ".js-gallery-slider-pagination",
                    clickable: true,
                },
            },
            768: {
                slidesPerView: 3,

                pagination: {
                    el: ".js-gallery-slider-pagination",
                    clickable: true,
                },
            },
            1260: {
                slidesPerView: 3,
                navigation: {
                    nextEl: ".js-gallery-slider-next",
                    prevEl: ".js-gallery-slider-prev",
                },
            },
            1560: {
                slidesPerView: 3,
                navigation: {
                    nextEl: ".js-gallery-slider-next",
                    prevEl: ".js-gallery-slider-prev",
                },
            },
        },
    });
    const homeCertsSlider = new Swiper(".js-home-certs-slider", {
        speed: 700,
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 2,
                pagination: {
                    el: ".js-home-certs-slider-pagination",
                    clickable: true,
                },
            },
            576: {
                slidesPerView: 2,
                pagination: {
                    el: ".js-home-certs-slider-pagination",
                    clickable: true,
                },
            },
            768: {
                slidesPerView: 3,
                pagination: {
                    el: ".js-home-certs-slider-pagination",
                    clickable: true,
                },
            },
            976: {
                slidesPerView: 4,
                pagination: {
                    el: ".js-home-certs-slider-pagination",
                    clickable: true,
                },
            },
            1260: {
                slidesPerView: 6,
                navigation: {
                    nextEl: ".js-home-certs-slider-next",
                    prevEl: ".js-home-certs-slider-prev",
                },
            },
            1560: {
                slidesPerView: 6,
                navigation: {
                    nextEl: ".js-home-certs-slider-next",
                    prevEl: ".js-home-certs-slider-prev",
                },
            },
        },
    });

    const categoryBrandsSlider = new Swiper(".js-category-brands-slider", {
        speed: 700,
        slidesPerView: "auto",
        spaceBetween: 10,
        breakpoints: {
            0: {
                pagination: {
                    el: ".js-category-brands-slider-pagination",
                    clickable: true,
                },
            },
            576: {
                pagination: {
                    el: ".js-category-brands-slider-pagination",
                    clickable: true,
                },
            },
            768: {
                pagination: {
                    el: ".js-category-brands-slider-pagination",
                    clickable: true,
                },
            },
            1260: {
                navigation: {
                    nextEl: ".js-category-brands-slider-next",
                    prevEl: ".js-category-brands-slider-prev",
                },
            },
            1560: {
                navigation: {
                    nextEl: ".js-category-brands-slider-next",
                    prevEl: ".js-category-brands-slider-prev",
                },
            },
        },
    });
});

$(() => {
    var cardBottomSlider = new Swiper(".js-card-bottom-slider", {
        speed: 700,
        freeMode: false,
        spaceBetween: 20,
        // allowTouchMove: false,
        slidesPerView: "auto",
        thumbs: {
            swiper: cardTopSlider,
        },
    });
    var cardTopSlider = new Swiper(".js-card-top-slider", {
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 20,
        thumbs: {
            swiper: cardBottomSlider,
        },
    });

    $('.card-reviews-list').children('.chat-item__wrapper:gt(2)').hide();
    $('.js-toggle-card-reviews-list').on('click', function (e) {
        e.preventDefault();

        if (!($(this).hasClass('active'))) {
            $(this)
                .addClass('active')
                .find('span').text('Скрыть')
                .parent()
                .siblings('.chat-list').children('.chat-item__wrapper:gt(2)').show()
        } else {
            $(this)
                .removeClass('active')
                .find('span').text('Показать ещё 3 отзыва')
                .parent()
                .siblings('.chat-list').children('.chat-item__wrapper:gt(2)').hide();
        }
    });

    $('.card-answers-list').children('.chat-item__wrapper:gt(2)').hide();
    $('.js-toggle-card-answers-list').on('click', function (e) {
        e.preventDefault();

        if (!($(this).hasClass('active'))) {
            $(this)
                .addClass('active')
                .find('span').text('Скрыть')
                .parent()
                .siblings('.chat-list').children('.chat-item__wrapper:gt(2)').show()
        } else {
            $(this)
                .removeClass('active')
                .find('span').text('Показать ещё 3 вопроса')
                .parent()
                .siblings('.chat-list').children('.chat-item__wrapper:gt(2)').hide();
        }
    });
})

$(() => {
    $('.js-tel').mask("+7 (999) 999-99-99");
});

$(() => {
    $.fn.select2.amd.define('select2/i18n/ru',[],function () {
        // Russian
        return {
            errorLoading: function () {
                return 'Результат не может быть загружен.';
            },
            inputTooLong: function (args) {
                var overChars = args.input.length - args.maximum;
                var message = 'Пожалуйста, удалите ' + overChars + ' символ';
                if (overChars >= 2 && overChars <= 4) {
                    message += 'а';
                } else if (overChars >= 5) {
                    message += 'ов';
                }
                return message;
            },
            inputTooShort: function (args) {
                var remainingChars = args.minimum - args.input.length;

                var message = 'Пожалуйста, введите ' + remainingChars + ' или более символов';

                return message;
            },
            loadingMore: function () {
                return 'Загружаем ещё ресурсы…';
            },
            maximumSelected: function (args) {
                var message = 'Вы можете выбрать ' + args.maximum + ' элемент';

                if (args.maximum  >= 2 && args.maximum <= 4) {
                    message += 'а';
                } else if (args.maximum >= 5) {
                    message += 'ов';
                }

                return message;
            },
            noResults: function () {
                return 'Ничего не найдено';
            },
            searching: function () {
                return 'Поиск…';
            }
        };
    });
    $(".js-select").select2({
        language: 'ru',
        minimumResultsForSearch: -1,
        width: '100%'
    });
    $(".js-select-auto-width").select2({
        language: 'ru',
        minimumResultsForSearch: -1,
        width: 'auto'
    });
});

$(() => {
    $(".link-anchor").click(function(e) {
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
    });
})

$(() => {
    if ($('#map').parents('html').length > 0) {
        var geojson = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        iconSize: [29,43]
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            49.45480118878082, 53.51478732275671
                        ]
                    }
                }
            ]
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoieGtvcmVkZXVzIiwiYSI6ImNrbGtxcmoybzNmMGIydnM4MWs5ZXo5cmMifQ._YIlgXTnQtUtNubeZg81dg';

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/xkoredeus/cklkrgmef0qsx17mlzyqyo3ga',
            center: [49.456751254551605, 53.51467787844254],
            zoom: 10,
            attributionControl: false
        });

        // add markers to map
        geojson.features.forEach(function (marker) {
            // create a DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage =
                'url(assets/img/balloon.svg)';
            el.style.width = '16px';
            el.style.height = '20px';

            // add marker to map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        });

        var elInner = $('.balloon__content');
        $('.marker').append(elInner);
    }
});


$(() => {
    $('[data-fancybox]').fancybox({
        animationDuration: 600,
        animationEffect: 'slide-in-in',
        touch: false,
        scrolling: true,
    });

    $('.js-close-fancybox').on('click', function () {
        $.fancybox.close();
    });
});


$(() => {
    let state = {};
    // state management
    function updateState(newState) {
        state = { ...state, ...newState };
    }

    // event handlers
    $('.popup-reply .js-file-input').change(function(e) {
        let files = $('.popup-reply .js-file-input-reply')[0].files;
        if (files.length === 0) {
            $('.popup-reply .file-list').html('Прикрепить резюме');
        } else {
            let filesArr = Array.from(files);
            updateState({ files: files, filesArr: filesArr });

            renderFileList();
        }
    });

    // render functions
    function renderFileList() {
        let fileMap = state.filesArr.map((file, index) => {
            let suffix = 'bt';
            let size = file.size;
            if (size >= 1024 && size < 1024000) {
                suffix = 'kb';
                size = Math.round(size / 1024 * 100) / 100;
            } else if (size >= 1024000) {
                suffix = 'mb';
                size = Math.round(size / 1024000 * 100) / 100;
            }

            return (`<div class="file" key="${index}">
                        <div class="file__name">${file.name}</div>
                        <div class="file__size">${size} ${suffix}</div>
                    </div>`);
        });

        $('.popup-reply .file-list').html(fileMap);
    };
})

$(() => {
    let state = {};
    // state management
    function updateState(newState) {
        state = { ...state, ...newState };
    }

    // event handlers
    $('.popup-review .js-file-input-review').change(function(e) {
        let files = $('.popup-review .js-file-input-review')[0].files;
        if (files.length === 0) {
            $('.popup-review .file-list').html('Прикрепить файл');
        } else {
            let filesArr = Array.from(files);
            updateState({ files: files, filesArr: filesArr });

            renderFileList();
        }
    });

    // render functions
    function renderFileList() {
        let fileMap = state.filesArr.map((file, index) => {
            let suffix = 'bt';
            let size = file.size;
            if (size >= 1024 && size < 1024000) {
                suffix = 'kb';
                size = Math.round(size / 1024 * 100) / 100;
            } else if (size >= 1024000) {
                suffix = 'mb';
                size = Math.round(size / 1024000 * 100) / 100;
            }

            return (`<div class="file" key="${index}">
                        <div class="file__name">${file.name}</div>
                        <div class="file__size">${size} ${suffix}</div>
                    </div>`);
        });

        $('.popup-review .file-list').html(fileMap);
    };
})


$(document).on('click', function (e) {
    var container = $('.js-card-toggle-favorites-container');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.card-top__tooltip').removeClass('active');
    }
});


$(() => {
    function initHeader() {
        if ($(window).width() + 15 < 975) {
            $('.header-actions').appendTo('.tapbar__in');
            $('.header-nav').appendTo('.header-menu__in');
            $('.header-phones').appendTo('.header-menu__in')
            $('.header-top').appendTo('.header-menu__in');

            $('.js-toggle-catalog').on('click', function () {
                $(this).toggleClass('active');
                $('.catalog').slideToggle();
            });

            $('.header-nav__link > svg').on('click', function () {
                if ($(this).parent('.header-nav__link').hasClass('active')) {

                    $(this)
                        .parent('.header-nav__link')
                        .next('.header-nav__dropdown')
                        .find('.header-nav__dropdown-link')
                        .removeClass('active');
                    $(this)
                        .parent('.header-nav__link')
                        .next('.header-nav__dropdown')
                        .find('.header-nav__subdropdown')
                        .hide();
                }

                $(this)
                    .parent('.header-nav__link')
                    .toggleClass('active')
                    .next('.header-nav__dropdown')
                    .slideToggle();
            });
            $('.header-nav__dropdown-link > svg').on('click', function () {
                $(this)
                    .parent('.header-nav__dropdown-link')
                    .toggleClass('active')
                    .next('.header-nav__subdropdown')
                    .slideToggle();
            });

            /// ///
            $('.catalog-link > svg').on('click', function () {
                if ($(this).parent('.catalog-link').hasClass('active')) {

                    $(this)
                        .parent('.catalog-link')
                        .next('.catalog-dropdown')
                        .find('.catalog-dropdown__link')
                        .removeClass('active');
                    $(this)
                        .parent('.catalog-link')
                        .next('.catalog-dropdown')
                        .find('.catalog-subdropdown')
                        .hide();
                }

                $(this)
                    .parent('.catalog-link')
                    .toggleClass('active')
                    .next('.catalog-dropdown')
                    .slideToggle();
            });
            $('.catalog-dropdown__link > svg').on('click', function () {
                $(this)
                    .parent('.catalog-dropdown__link')
                    .toggleClass('active')
                    .next('.catalog-subdropdown')
                    .slideToggle();
            });

        } else {
            $('.header-actions').appendTo('.header-actions__wrapper');
            $('.header-nav').appendTo('.header-nav__wrapper');
            $('.header-phones').appendTo('.header-phones__wrapper')
            $('.header-top').appendTo('.header-top__wrapper');

            $('.js-toggle-catalog').on('click', function () {

                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $('body').removeClass('is-loading');
                    $('.catalog').removeClass('active');

                    $('.catalog__column:nth-child(1) .js-catalog-link').removeClass('active');
                    $('.catalog__column:nth-child(2) .js-catalog-dropdown-link').removeClass('active');
                    $('.catalog__column:nth-child(2)').html('');
                    $('.catalog__column:nth-child(3)').html('');
                } else {
                    $(this).addClass('active');
                    $('body').addClass('is-loading');
                    $('.catalog').addClass('active');
                }

            });

            $('.catalog__grid-base').on('click', function () {
                $('.js-toggle-catalog.active').removeClass('active');
                $('body').removeClass('is-loading');
                $('.catalog.active').removeClass('active');

                $('.catalog__column:nth-child(1) .js-catalog-link').removeClass('active');
                $('.catalog__column:nth-child(2) .js-catalog-dropdown-link').removeClass('active');
                $('.catalog__column:nth-child(2)').html('');
                $('.catalog__column:nth-child(3)').html('');
            })

            $(".catalog").on('mouseenter', ".catalog-link", function () {
                $('.catalog__column:nth-child(1) .js-catalog-link').removeClass('active');
                $('.catalog__column:nth-child(2)').html('');
                $('.catalog__column:nth-child(3)').html('');

                if (!($(this).hasClass('active')) &&
                    $(this)
                        .hasClass('js-catalog-link')
                ) {

                    $('.catalog__column:nth-child(2)').html('<div class="catalog__column-in"></div>')
                    $(this)
                        .addClass('active')
                        .next('.catalog-dropdown')
                        .find('.catalog-dropdown__in')
                        .clone()
                        .appendTo('.catalog__column:nth-child(2) > .catalog__column-in');
                }
            });

            $(".catalog").on('mouseenter', '.catalog-dropdown__link', function () {
                $('.catalog__column:nth-child(3)').html('');
                $('.catalog__column:nth-child(2) .js-catalog-dropdown-link').removeClass('active');

                if (!($(this).hasClass('active')) &&
                    $(this)
                        .hasClass('js-catalog-dropdown-link')
                ) {

                    $('.catalog__column:nth-child(3)').html('<div class="catalog__column-in"></div>')
                    $(this)
                        .addClass('active')
                        .next('.catalog-subdropdown')
                        .find('.catalog-subdropdown__in')
                        .clone()
                        .appendTo('.catalog__column:nth-child(3) > .catalog__column-in')
                }
            });
        }
    }

    initHeader();

    $(window).bind('resize',function(){
        initHeader();
    });

    $('.js-toggle-menu').on('click', function () {
        $('body').toggleClass('is-loading');
        $('.header-menu').toggleClass('header-menu--active');
        $('.header').toggleClass('header--active');
        $(this).toggleClass('header-burger--active');
    });

});