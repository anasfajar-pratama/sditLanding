/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.{js,jsx,blade.php}',
        './resources/js/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Fredoka', 'sans-serif'],
                sans: ['Nunito', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#f97316',
                    light: '#fdba74',
                    dark: '#c2410c',
                    50: '#fff7ed',
                    100: '#ffedd5',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c',
                },
                secondary: {
                    DEFAULT: '#0d9488',
                    light: '#5eead4',
                    dark: '#0f766e',
                    500: '#0d9488',
                    600: '#0f766e',
                },
                accent: {
                    DEFAULT: '#facc15',
                },
            },
            animation: {
                'float': 'float 5s ease-in-out infinite',
                'flutter': 'flutter 2.5s ease-in-out infinite',
                'fade-up': 'fadeUp 0.7s ease forwards',
                'scale-in': 'scaleIn 0.6s ease forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-16px)' },
                },
                flutter: {
                    '0%, 100%': { transform: 'translateY(0) rotate(-5deg) scaleX(1)' },
                    '25%': { transform: 'translateY(-12px) rotate(5deg) scaleX(-1)' },
                    '50%': { transform: 'translateY(-6px) rotate(-3deg) scaleX(1)' },
                    '75%': { transform: 'translateY(-18px) rotate(8deg) scaleX(-1)' },
                },
                fadeUp: {
                    from: { opacity: 0, transform: 'translateY(30px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                scaleIn: {
                    from: { opacity: 0, transform: 'scale(0.9)' },
                    to: { opacity: 1, transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
