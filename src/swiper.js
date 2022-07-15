
import commonOptions from './common-options'

import Swiper, {
    Autoplay,
    EffectCoverflow,
    EffectCube,
    Pagination,
    Navigation
} from 'swiper'
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation])

// swiper-bundle.min.css 决定了小圆点和左右翻页标签，如果不需要可以不引用
import 'swiper/swiper-bundle.min.css'

// swiper.less/sass/css 决定了基础的样式
import 'swiper/swiper.less'

export function createComponent({ h }) {
    const options = {}
    if (typeof h === 'function') {
        options.render = getVue3Render(h)
        options.beforeUnmount = beforeUnmount
        options.emits = ['resize']
    } else {
        options.render = vue2Render
        options.beforeDestroy = beforeUnmount
    }

    return {
        ...commonOptions,
        ...options,
        data() {
            return {
                _flag: 1
            }
        },
        methods: {
            ...commonOptions.methods
        },
    }
}


const style = {
    height: '100%',
    overflow: 'hidden',
}
function vue2Render() {
    return (
        <div class="box">
            <Swiper
                slides-per-view="1"
                space-between="50"
                slideChange={onSlideChange}
                ref="root"
                navigation
                style="{height: 100 + 'vh', width: screenWidth + 'px' }"
                class="swiper_style"
                zoomChange={onSwiper}
                initialSlide="indexImg"
            >
                {
                    goodsList.map((value, index) =>
                        <swiper-slide
                            key={value}
                            virtualIndex={index}
                            class="swiper-item-infor"
                            v-slot="{isActive}"
                            nativeOnClick={goBack}
                        >
                            <div class="swiper-zoom-container">
                                <span class="swiperImgSpan" v-if="flag == 1 && isActive">
                                    {index + 1}/{goodsList?.length}
                                </span>
                                <img
                                    src={value.img}
                                    flags="flag"
                                    style="width: 100vw"
                                />
                            </div>
                        </swiper-slide>
                    )
                }

            </Swiper >
        </div >
    )
}
function getVue3Render(h) {
    return function () {
        return h('div', {
            style,
        })
    }
}

export function plugin(app, options) {
    const definition = createComponent(options)
    app.component(definition.name, definition)
}
