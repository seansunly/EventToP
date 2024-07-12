
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      // keyframes: {
      //   "taiwan-pan": {
      //     "0%": { transform: "translate(0, 0)" },
      //     "100%": { transform: "translate(-50%, -50%)" },
      //   },
      // },
      // animation: {
      //   "taiwan-pan": "taiwan-pan 20s linear infinite",
      // },
    },
  },
  plugins: [flowbite.plugin()],
};

