import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1800px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontFamily: {
      Rethink: ["var(--font-rethink)", "sans-serif"],
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        dividerWeight: "1px",
        disabledOpacity: 0.5,
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        lineHeight: {
          tiny: "1rem",
          small: "1.25rem",
          medium: "1.5rem",
          large: "1.75rem",
        },
        radius: {
          small: "8px",
          medium: "12px",
          large: "14px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
      themes: {
        light: {
          layout: {
            hoverOpacity: 0.8,
            boxShadow: {
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            },
          },
          colors: {
            background: "#F8F8FF",
            foreground: "#1a1a1a",
            white: "#ffffff",
            secondary: {
              50: "#FFF7CD",
              100: "#FFF7CD",
              200: "#FFED9B",
              300: "#FFE16A",
              400: "#FFD545",
              500: "#FFA808",
              600: "#DBA005",
              700: "#B78103",
              800: "#936402",
              900: "#7A4F01",
              DEFAULT: "#FFA808",
              foreground: "#ffffff",
            },
            primary: {
              50: "#f3faf3",
              100: "#e3f5e3",
              200: "#c8eac9",
              300: "#9dd89f",
              400: "#6bbd6e",
              500: "#4caf50",
              600: "#358438",
              700: "#2d6830",
              800: "#2d6830",
              900: "#224525",
              DEFAULT: "#4caf50",
              foreground: "#ffffff",
            },
            focus: "#FFD545",
          },
        },
        dark: {
          hoverOpacity: 0.9,
          boxShadow: {
            small:
              "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            medium:
              "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            large:
              "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
          },
          colors: {
            background: "#1a1a1a",
            foreground: "#F8F8FF",
            white: "#ffffff",
            secondary: {
              50: "#7A4F01",
              100: "#936402",
              200: "#B78103",
              300: "#DBA005",
              400: "#FFA808",
              500: "#FFA808",
              600: "#FFD545",
              700: "#FFE16A",
              800: "#FFED9B",
              900: "#FFF7CD",
              DEFAULT: "#FFA808",
              foreground: "#ffffff",
            },
            primary: {
              50: "#224525",
              100: "#2d6830",
              200: "#2d6830",
              300: "#358438",
              400: "#4caf50",
              500: "#4caf50",
              600: "#9dd89f",
              700: "#c8eac9",
              800: "#e3f5e3",
              900: "#f3faf3",
              DEFAULT: "#4caf50",
              foreground: "#ffffff",
            },
            focus: "#FFD545",
          },
        },
      },
    }),
  ],
};
