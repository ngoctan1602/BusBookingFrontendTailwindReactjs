/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      // FiraSans: ['Fira Sans']
      robo: ['Raleway', 'sans-serif']
    },
    colors: {
      'txt': '#090808',
      'button': '#88c194',
      'bg': '#F2ECFF',
      'bgPopup': '#e1e1e1',
      'hover-txt': '#4d4c4f'
    },
    fontSize: {
      '12': '12px',
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '24': '24px'
    },

    spacing: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '1xl': '30px',
      content: '90%',
      input: '40%',
      search: '70%',
      wrapper: '80%',
    },
    extend: {
      backgroundImage: {
        footerImg: "url('/src/assets/images/footer.jpg')",
        bgLogin: "url('/src/assets/images/backgroundlogin.jpg')",
        searchImg: "url('/src/assets/images/bustrip.jpg')"
      },

      animation: {
        wiggle: 'wiggle 0.3s ease-in-out',
        input: 'input 0.3s ease-in-out'
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(100%) translateY(-96%)' },

          '100%': {},
        },
        input:
        {
          '0%': { transform: 'translateX(100%) translateY[-50%]' },
          '100%': { transform: '' },
        }

      }


    },
  },
  plugins: [],
}