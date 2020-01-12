//slick slider

$(function () {
    $('.js-slider').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 30000,
        speed: 600,
        cssEase: 'cubic-bezier(0.000, 0.840, 0.475, 0.985)',
        arrows: true,
    });
});

//tab's

$(function () {

    $('.promo__item').on('click', function (e) {
        e.preventDefault();

        $(this).addClass('js-active').siblings().removeClass('js-active');

        let linkCurrent = $(this).children().attr('href');

        $(linkCurrent).addClass('js-active').siblings().removeClass('js-active');
    });
});