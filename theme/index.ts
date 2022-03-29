// 1. Import the extendTheme function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

// 2. Extend the theme to include custom colors, fonts, etc
const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const colors = {
	transparent: "transparent",
	black: "#000",
	white: "#fff",
	red: {
		50: "#ffe5ed",
		100: "#fbbac8",
		200: "#f18ea4",
		300: "#ea6180",
		400: "#e3365b",
		500: "#c91c42",
		600: "#9e1433",
		700: "#720c24",
		800: "#460415",
		900: "#1e0006",
	},
	yellow: {
		50: "#ffffdb",
		100: "#ffffad",
		200: "#fefe7d",
		300: "#fefe4b",
		400: "#fefe1a",
		500: "#e5e501",
		600: "#b2b200",
		700: "#7f7f00",
		800: "#4c4c00",
		900: "#1a1a00",
	},
	purple: {
		50: "#f4eefb",
		100: "#d8d0e4",
		200: "#bdb0ce",
		300: "#a391b9",
		400: "#8872a5",
		500: "#6f588b",
		600: "#56456d",
		700: "#3d314f",
		800: "#251d31",
		900: "#0d0916",
	},
};

const components = {
	components: {
		Steps,
	},
};

const theme = extendTheme({ config, colors, components });

export default theme;
