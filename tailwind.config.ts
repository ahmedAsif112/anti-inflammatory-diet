import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        clamp: "clamp(17px, 2vw, 20px)",
        midClamp: "clamp(13px, 2vw, 16px)",
        smClamp: "clamp(10px, 2vw, 13px)",
      },
      colors: {
        primary_color: "#3FB1FA",
        secondry_color: "#3fb2fa7a",
        secondry_lite_color: "#3fb2fa27",
        primary_text_color: "#6B7A99",
      },
      screens: {
        smMobile: { max: "400px" },
        mobile: { max: "575px" },
        tablet: { max: "768px" },
        tabletlg: { max: "992px" },
      },
    },
  },
  plugins: [],
};
export default config;
