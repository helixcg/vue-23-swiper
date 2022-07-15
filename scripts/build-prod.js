const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');
const banner = require('./banner');
const babel = require('rollup-plugin-babel');

(async () => {
    const bundle = await rollup.rollup({
        input: 'src/swiper.js',
        plugins: [
            terser(),
            babel({
                presets: ['@vue/babel-preset-jsx'],
            }),
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

