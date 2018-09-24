var galleryTop = new Swiper('.gallery-top', {
  direction : 'vertical',
  loop:false,
  loopedSlides: 5,
    spaceBetween: 10,
    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
});
var galleryThumbs = new Swiper('.gallery-thumbs', {
    direction : 'vertical',
    loop: false,
    loopedSlides: 5,
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slideToClickedSlide: true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;

$(".fancybox").fancybox({
});

galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;

$(".fancybox").fancybox({
});

function updateNavPosition() {
		$('.preview .active-nav').removeClass('active-nav')
		var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index() > previewSwiper.activeIndex) {
				var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
				previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
			} else {
				previewSwiper.slideTo(activeNav.index())
			}
		}
}

// $(function() {
//     var page = {
//
//         // 页面初始化方法
//         init: function() {
//             var self = this,
//                 json = {
//                     api: config.apiServer + 'home/get',
//                     type: 'get',
//                     data: {
//                         actionxm: 'search'
//                     }
//                 };
//             var callback = function(res) {
//                 if(res.status == 0) {
//                     console.log(res['data']);
//                     var list = res['data'],
//                         listTpl = '';
//                     for(var i in list) {
//                       listTpl += '<div class="swiper-slide" style="background-image:url('+list[i]['image']+')"></div>'
//                     }
//                     $('.gallery-top').find('.swiper-wrapper').html(listTpl);
//                     $('.gallery-thumbs').find('.swiper-wrapper').html(listTpl);
//                 } else {
//                     alert(res.msg);
//                 }
//             };
//
//             json.callback = callback;
//             Utils.requestData(json);
//         },
//
//
//     };
//
//     page.init();
//
//
//
// });
