// core version + navigation, pagination modules:
import Swiper, { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export const slider = new Swiper('.slider', {
    modules:  [Navigation, Autoplay],
    speed:    500,
    autoplay: {
        delay: 3000,
    },
    slidesPerView:  1,
    slidesPerGroup: 1,
    spaceBetween:   10,
    // loop:         true,
    breakpoints:    {
        320: { // when window width is >= 320px
            slidesPerView: 1,
            spaceBetween:  6,
        },
        576: { // when window width is >= 576px
            slidesPerView: 2,
            spaceBetween:  8,
        },
        920: { // when window width is >= 920px
            slidesPerView: 1,
            spaceBetween:  10,
        }
    },
    navigation: {
        nextEl: '.slider__button_next',
        prevEl: '.slider__button_prev',
    },
});
