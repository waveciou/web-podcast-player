/**
 * The Tailwind CSS IntelliSense Plugin requires a Tailwind config file in order to activate.
 * But my options was writed in nuxt.config.js file.
 */

module.exports = {
  prefix: 'tw-',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#333333',
    },
    extend: {
      padding: {
        '100p': '100%',
      },
    },
  },
};
