module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Mono"],
      },
      backgroundImage: () => ({
        "home-background": "url('/home-background.webp')",
      }),
    },
  },
  plugins: [],
};
