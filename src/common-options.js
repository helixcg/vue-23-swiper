export default {
    props: {
        goodsList: [],
        option: Object,
    },

    mounted(this) {
        new Swiper('.swiper1', {
            pagination: {
                el: '.swiper-pagination'
            },
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            },
            on: {
                navigationShow: function () {
                    console.log('按钮显示了')
                }
            }
        })
    },
    methods: {
        onSlideChange(el) { },
        onSwiper(swiper, scale, imageEl, slideEl) {
            this.$data._flag.observer.observe(+scale)
        },
    },
}
