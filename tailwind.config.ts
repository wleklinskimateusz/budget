import formPlugin from "@tailwindcss/forms";
import plugin from "tailwindcss/plugin";
import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const brandColor = "indigo" satisfies keyof typeof colors;

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: colors[brandColor],
      },
      backgroundColor: ({ theme }) => ({
        primary: {
          DEFAULT: theme("colors.gray.100"),
          hover: theme("colors.gray.200"),
        },
      }),
      textColor: ({ theme }) => ({
        primary: {
          DEFAULT: theme("colors.gray.900"),
          hover: theme("colors.gray.800"),
        },
      }),
    },
  },
  plugins: [formPlugin],
} satisfies Config;

export default config;
