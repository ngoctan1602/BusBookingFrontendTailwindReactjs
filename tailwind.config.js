/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'FiraSans': ['Comfortaa'],
      'robo': ['Raleway', 'sans-serif'],
      'Amiro': ['Cabin', 'Comfortaa']
    },
    colors: {
      'txt': '#090808',
      'txt-gray': '#4B4B4B',
      'txt-light':'#FFFFFF',
      'button': '#C6C6C6',
      'bg': '#FFFFFF',
      'bgContent': '#EAEAEA',
      'bgPopup': '#C6C6C6',
      'hover-txt': '#A5A5A5',
      'txt-final': '#868686',
      'button-final': '#03C988',
      'txt-button': '#E5E5CB',
      'notificationNotRead': '#F9F1F2',
      'success': "#00E22D",
      'danger': "#EF6C6C",
      'warning': "#FFC107",
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
        searchImg: "url('/src/assets/images/bustrip.jpg')",
        notfound: "url('/src/assets/images/notfound.png')"
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