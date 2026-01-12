/*
Документація слайдера: https://swiperjs.com/
*/
import { throttle } from '@js/common/functions';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules';

// Стилі Swiper
// Підключення базових стилів
import './slider.scss';

// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

// Список активних слайдеров
const slidersTree = [];
const slidersTwo = [];
const slidersInner = [];
const slidersAutoplay = [];
const slidersSimple = [];
const slidersMoments = [];
const slidersExample = [];
const slidersExampleInner = [];
const slidersPlaces = [];
const slidersTeam = [];
const slidersFaq = [];
const slidersReviews = [];
const slidersInvolve = [];

// Инициализация слайдеров
function initThreeSliders() {
	if (document.querySelector('.slider-block_three')) {
		const sliderTreeSlides = document.querySelectorAll('.slider-block_three');
		sliderTreeSlides.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			let navigation = {};
			if (sliderParent) {
				navigation = {
					prevEl: sliderParent.querySelector('.slider-block__prev'),
					nextEl: sliderParent.querySelector('.slider-block__next'),
				};
			} else {
				navigation = {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				};
			}

			const swiper = new Swiper(slider, {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				initialSlide: 1,
				spaceBetween: 20,
				speed: 800,
				threshold: 120,
				lazy: true,
				navigation: {
					prevEl: navigation.prevEl,
					nextEl: navigation.nextEl,
				},
				on: {},
			});

			slidersTree.push(swiper);
		});
	}
}

function initTwoSliders() {
	if (document.querySelector('.slider-block_two')) {
		const sliderTreeSlides = document.querySelectorAll('.slider-block_two');
		sliderTreeSlides.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			let navigation = {};
			if (sliderParent) {
				navigation = {
					prevEl: sliderParent.querySelector('.slider-block__prev'),
					nextEl: sliderParent.querySelector('.slider-block__next'),
				};
			} else {
				navigation = {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				};
			}

			const swiper = new Swiper(slider, {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 2,
				initialSlide: 0,
				spaceBetween: 20,
				speed: 800,
				threshold: 120,
				lazy: true,
				navigation: {
					prevEl: navigation.prevEl,
					nextEl: navigation.nextEl,
				},
				on: {},
			});

			slidersTree.push(swiper);
		});
	}
}

function initInnerSliders() {
	if (document.querySelector('.slider-block_inner')) {
		const sliderTreeSlides = document.querySelectorAll('.slider-block_inner');
		sliderTreeSlides.forEach((slider) => {
			const swiper = new Swiper(slider, {
				modules: [Navigation, Pagination, Autoplay],
				centeredSlides: true,
				slidesPerView: 1,
				speed: 500,
				threshold: 0.5,
				breakpoints: {
					768: {
						spaceBetween: 20,
					},
					0: {
						spaceBetween: 300,
					},
				},
				pagination: {
					el: slider.querySelector('.swiper-pagination'),
					clickable: true,
				},
				navigation: {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				},
				on: {},
			});

			slidersInner.push(swiper);
		});
	}
}

function initAutoplaySliders() {
	if (document.querySelector('.slider-block_autoplay')) {
		const sliderAutoplaySlides = document.querySelectorAll(
			'.slider-block_autoplay'
		);
		sliderAutoplaySlides.forEach((slider, i) => {
			if (i % 2 === 0) {
				const swiper = new Swiper(slider, {
					modules: [Autoplay],
					observer: true,
					observeParents: true,
					spaceBetween: 20,
					freeMode: true,
					initialSlide: 0,
					// loop: true,
					speed: 2000,
					autoplay: {
						delay: 0,
						reverseDirection: true,
					},
					breakpoints: {
						0: {
							slidesPerView: 1,
						},
						479: {
							slidesPerView: 2,
						},
						991: {
							slidesPerView: 'auto',
						},
					},

					on: {},
				});

				slidersAutoplay.push(swiper);
			} else {
				const swiper = new Swiper(slider, {
					modules: [Autoplay],
					observer: true,
					observeParents: true,
					spaceBetween: 20,
					freeMode: true,
					initialSlide: 0,
					// loop: true,
					speed: 2000,
					autoplay: {
						delay: 0,
					},
					breakpoints: {
						0: {
							slidesPerView: 1,
						},
						479: {
							slidesPerView: 2,
						},
						991: {
							slidesPerView: 'auto',
						},
					},

					on: {},
				});

				slidersAutoplay.push(swiper);
			}
		});
	}
}

function initSimpleSliders() {
	if (document.querySelector('.slider-block_simple')) {
		const sliderSimpleSlides = document.querySelectorAll(
			'.slider-block_simple'
		);

		sliderSimpleSlides.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			let navigation = {};
			if (sliderParent) {
				navigation = {
					prevEl: sliderParent.querySelector('.slider-block__prev'),
					nextEl: sliderParent.querySelector('.slider-block__next'),
				};
			} else {
				navigation = {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				};
			}

			const swiper = new Swiper(slider, {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				speed: 500,
				autoHeight: true,
				breakpoints: {
					991: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					568: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					0: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
				},

				navigation: {
					prevEl: navigation.prevEl,
					nextEl: navigation.nextEl,
				},
				on: {},
			});

			slidersSimple.push(swiper);
		});
	}
}

function initSlidersMoments() {
	if (document.querySelector('.slider-block_moments')) {
		const sliders = document.querySelectorAll('.slider-block_moments');

		sliders.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			const swiper = new Swiper(slider, {
				modules: [Autoplay],
				slidesPerView: 1,
				spaceBetween: 20,
				speed: 3000,
				autoplay: {
					delay: 3000,
				},

				on: {},
			});

			slidersMoments.push(swiper);
		});
	}
}

function initExampleSliders() {
	if (document.querySelector('.slider-block__example')) {
		const sliders = document.querySelectorAll('.slider-block__example');

		sliders.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			const isFull = slider.closest('.example.example_full');

			let navigation = {};
			if (sliderParent) {
				navigation = {
					prevEl: sliderParent.querySelector('.slider-block__prev'),
					nextEl: sliderParent.querySelector('.slider-block__next'),
				};
			} else {
				navigation = {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				};
			}

			if (!isFull) {
				const swiper = new Swiper(slider, {
					modules: [Navigation],
					speed: 500,
					slidesPerView: 1,
					threshold: 80,
					navigation: {
						prevEl: navigation.prevEl,
						nextEl: navigation.nextEl,
					},
					on: {},
				});
				slidersExample.push(swiper);
			} else {
				const swiper = new Swiper(slider, {
					modules: [Navigation],
					speed: 500,
					threshold: 80,
					breakpoints: {
						0: {
							spaceBetween: 20,
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},

						991: {
							spaceBetween: 0,
							slidesPerView: 3,
						},
					},

					navigation: {
						prevEl: navigation.prevEl,
						nextEl: navigation.nextEl,
					},
					on: {},
				});
				slidersExample.push(swiper);
			}
		});
	}
}

function initExampleInnerSliders() {
	if (document.querySelector('.slider-block__example-inner')) {
		const sliders = document.querySelectorAll('.slider-block__example-inner');

		sliders.forEach((slider) => {
			const sliderTimer = slider.closest('[data-slider-timer]');

			const swiper = new Swiper(slider, {
				modules: [Navigation, Pagination, Autoplay],
				speed: 500,
				slidesPerView: 1,
				spaceBetween: 0,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				},
				navigation: {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				},
				pagination: {
					el: slider.querySelector('.swiper-pagination'),
					clickable: true,
				},
				on: {
					autoplayTimeLeft(swiper, timeLeft, percentage) {
						let widthPrc = `${(percentage * 100).toFixed()}%`;
						sliderTimer.style.setProperty('--progress', widthPrc);
					},
				},
			});

			slidersExampleInner.push(swiper);
		});
	}
}

function initPlacesSliders() {
	if (document.querySelector('.slider-block_place')) {
		const sliderTreeSlides = document.querySelectorAll('.slider-block_place');
		sliderTreeSlides.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			let navigation = {};
			if (sliderParent) {
				navigation = {
					prevEl: sliderParent.querySelector('.slider-block__prev'),
					nextEl: sliderParent.querySelector('.slider-block__next'),
				};
			} else {
				navigation = {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				};
			}

			const swiper = new Swiper(slider, {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				spaceBetween: 10,
				speed: 800,
				navigation: {
					prevEl: navigation.prevEl,
					nextEl: navigation.nextEl,
				},
				breakpoints: {
					0: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 2,
					},
				},
				on: {},
			});

			slidersPlaces.push(swiper);
		});
	}
}

function initTeamSliders() {
	if (document.querySelector('.slider-block_team')) {
		const sliderSimpleSlides = document.querySelectorAll('.slider-block_team');

		sliderSimpleSlides.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			let navigation = {};
			if (sliderParent) {
				navigation = {
					prevEl: sliderParent.querySelector('.slider-block__prev'),
					nextEl: sliderParent.querySelector('.slider-block__next'),
				};
			} else {
				navigation = {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				};
			}

			const swiper = new Swiper(slider, {
				modules: [Navigation],
				slidesPerView: 'auto',
				freeMode: true,
				spaceBetween: 20,
				speed: 500,
				breakpoints: {
					568: {
						spaceBetween: 20,
					},
					0: {
						spaceBetween: 10,
					},
				},

				navigation: {
					prevEl: navigation.prevEl,
					nextEl: navigation.nextEl,
				},
				on: {},
			});

			slidersTeam.push(swiper);
		});
	}
}

function initFaqSliders() {
	if (document.querySelector('.slider-block_faq')) {
		const sliderSimpleSlides = document.querySelectorAll('.slider-block_faq');

		sliderSimpleSlides.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			let navigation = {};
			if (sliderParent) {
				navigation = {
					prevEl: sliderParent.querySelector('.slider-block__prev'),
					nextEl: sliderParent.querySelector('.slider-block__next'),
				};
			} else {
				navigation = {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				};
			}

			const swiper = new Swiper(slider, {
				modules: [Navigation, Pagination],
				observer: true,
				observeParents: true,
				speed: 500,
				slidesPerView: 1,
				initialSlide: 0,
				spaceBetween: 20,
				pagination: {
					el: sliderParent.querySelector('.slider-block__pagination'),
					clickable: true,
				},

				navigation: {
					prevEl: navigation.prevEl,
					nextEl: navigation.nextEl,
				},
				on: {},
			});

			slidersFaq.push(swiper);
		});
	}
}

function initReviewsSliders() {
	if (document.querySelector('.slider-block_review')) {
		const sliderSimpleSlides = document.querySelectorAll(
			'.slider-block_review'
		);

		sliderSimpleSlides.forEach((slider) => {
			const sliderParent = slider.closest('[data-slider-parent]');

			let navigation = {};
			if (sliderParent) {
				navigation = {
					prevEl: sliderParent.querySelector('.slider-block__prev'),
					nextEl: sliderParent.querySelector('.slider-block__next'),
				};
			} else {
				navigation = {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				};
			}

			const swiper = new Swiper(slider, {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				speed: 500,
				slidesPerView: 1,
				initialSlide: 0,
				spaceBetween: 20,
				navigation: {
					prevEl: navigation.prevEl,
					nextEl: navigation.nextEl,
				},
				on: {},
			});

			slidersReviews.push(swiper);
		});
	}
}

function initInvolveSliders() {
	if (document.querySelector('.slider-block_involve')) {
		const sliderSimpleSlides = document.querySelectorAll(
			'.slider-block_involve'
		);

		sliderSimpleSlides.forEach((slider) => {
			const swiper = new Swiper(slider, {
				modules: [Navigation, EffectCards],
				slidesPerView: 1,
				initialSlide: 1,
				freeMode: true,
				effect: 'cards',
				cardsEffect: {
					perSlideOffset: 50,
					perSlideRotate: 0,
				},
				// spaceBetween: 20,
				speed: 500,
				breakpoints: {},

				navigation: {
					prevEl: slider.querySelector('.slider-block__prev'),
					nextEl: slider.querySelector('.slider-block__next'),
				},
				on: {},
			});

			slidersInvolve.push(swiper);
		});
	}
}

// Уничтожение слайдеров из массива
function slidersDestroy(array) {
	array.forEach((slider) => {
		slider.destroy(true, true);
	});
	array = [];
}

// Инициализация слайдеров при загрузке по наличию атрибута
if (document.querySelector('[data-fls-slider]')) {
	// Throttling sliders
	const throttleThreeSliders = throttle(initThreeSliders, 400);
	const throttleTwoSliders = throttle(initTwoSliders, 400);
	const throttleSlidersMoments = throttle(initSlidersMoments, 400);
	const throttleSlidersFaq = throttle(initFaqSliders, 400);

	// Init sliders on load
	window.addEventListener('load', (e) => {
		initInnerSliders();
		initAutoplaySliders();
		initSimpleSliders();
		initExampleSliders();
		initExampleInnerSliders();
		initPlacesSliders();
		initTeamSliders();
		initReviewsSliders();
		initInvolveSliders();

		if (window.innerWidth > 768) {
			initThreeSliders();
			initTwoSliders();
		}

		if (window.innerWidth < 768) {
			initSlidersMoments();
			initFaqSliders();
		}
	});

	// Init sliders on resize
	window.addEventListener('resize', (e) => {
		if (window.innerWidth < 768) {
			slidersDestroy(slidersTree);
			slidersDestroy(slidersTwo);
			throttleSlidersMoments();
			throttleSlidersFaq();
		} else {
			throttleThreeSliders();
			throttleTwoSliders();
			slidersDestroy(slidersMoments);
			slidersDestroy(slidersFaq);
		}
	});
}
