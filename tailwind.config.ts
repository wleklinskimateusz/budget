import formPlugin from "@tailwindcss/forms";
import plugin from "tailwindcss/plugin";
import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const brandColor = "orange" satisfies keyof typeof colors;

const config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: colors[brandColor],
      },
    },
  },
  plugins: [formPlugin],
} satisfies Config;

export default config;
