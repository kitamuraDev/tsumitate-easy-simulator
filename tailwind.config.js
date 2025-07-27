/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        // ツマミ部分（スライダーのハンドル）のスタイル
        '.custom-range-thumb': {
          '&::-webkit-slider-thumb': {
            '-webkit-appearance': 'none',
            width: '18px',
            height: '18px',
            'border-radius': '50%',
            'background-color': theme('colors.blue.500'),
            cursor: 'pointer',
            transition: 'transform 0.1s ease-in-out',
          },
          '&::-webkit-slider-thumb:hover': {
            transform: 'scale(1.3)',
          },
          '&::-webkit-slider-thumb:active': {
            transform: 'scale(1.3)',
          },
        },
      });
    },
  ],
};
