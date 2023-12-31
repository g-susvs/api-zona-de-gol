module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['standard', 'eslint-config-prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'no-unused-vars': 'warn',
		'prefer-promise-reject-errors': 'off',
		camelcase: 'off',
	},
};
