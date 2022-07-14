const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');
const banner = require('./banner');


(async () => {
    const bundle = await rollup.rollup({
        input: 'src/swiper.js',
        plugins: [
            terser(),
        ],
    });

    // Create the UMD version
    await bundle.write({
        file: 'dist/swiper-for-vue.js',
        banner,
        sourcemap: true,
        format: 'umd',
        name: 'SwiperForVue',
    });

    // Create the ESM version
    await bundle.write({
        file: 'dist/swiper-for-vue.mjs',
        banner,
        sourcemap: true,
        format: 'esm',
    });

})();

