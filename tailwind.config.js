module.exports = {
  content: ["/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      customBlue: "#1e40af",
    },
      },
    compilerOptions: {
      baseUrl: "src",
      paths: {
        '@components/*': ['components/*'],
        '@pages/*': ['pages/*'],
        '@utils/*': ['utils/*'],
        '@assets/*': ['assets/*'],
        '@styles/*': ['styles/*']
      }
    },
  
  plugins: [],
};
