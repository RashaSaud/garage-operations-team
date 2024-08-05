/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: { max: "767px" },
      tablet: { min: "768px", max: "1023px" },
      laptop: { min: "1024px", max: "1279px" },
      largeLaptop: { min: "1280px", max: "1535px" },
      desktop: { min: "1536px" },
      largeDesktop: { min: "1536px", max: "3072px" },
    },
    extend: {
      colors: {
        primary: {
          50: "#F59E0B",
        },
        secondary: {
          50: "#EF4444",
        },
        White: {
          DEFAULT: "#FFFFFF",
        },
       
        amber: "#F59E0B",
        50: "#FFFBEB",
        100: "#FEF3C7",
        200: "#FDE68A",
        300: "#FCD34D",
        400: "#FBBF24",
        600: "#D97706",
        700: "#B45309",
      },
      secondary: {
        gray: "#6B7280",
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        600: "#4B5563",
      },
      success: {
        emerald: "#047857",
        50: "#DDEFED",
        100: "#E6F7F1",
        200: "#A7F3D0",
        300: "#6EE7B7",
        400: "#34D399",
        600: "#059669",
      },
      danger: {
        red: "#B91C1C",
        50: "#FEF2F2",
        100: "#FEE2E2",
        200: "#FECACA",
        300: "#FCA5A5",
        400: "#F87171",
        600: "#F87171",
      },
    },
  },

  plugins: [],
};
