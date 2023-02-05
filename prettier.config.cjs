// prettier.config.js
const tailwindcss = require('prettier-plugin-tailwindcss');

module.exports = {
	plugins: [tailwindcss],
	tailwindConfig: './tailwind.config.cjs',
};
