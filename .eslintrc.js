'use strict';

module.exports = {
    extends: 'airbnb',
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        strict: ['error', 'safe'],
				indent: ['error', 'tab'],
				'react/jsx-indent': [4, 'tab'],
				'react/jsx-filename-extension': 0,
				'react/jsx-indent-props': 0,
				'react/jsx-wrap-multilines': 0,
				'implicit-arrow-linebreak': 0,
				'react/prop-types': 0,
				'react/destructuring-assignment': 0,
				'import/prefer-default-export': 0,
				'class-methods-use-this': 0,
				'react/sort-comp': 0,
				'react/no-multi-comp': 0,
				'react/jsx-one-expression-per-line': 0,
				'no-tabs': 0,
        quotes: ['error', 'single', {allowTemplateLiterals: true}],
        'comma-dangle': ['error', 'never'],
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': ['error', 'always'],
        camelcase: 0,
        'consistent-return': 0,
        'max-len': 0,
				'no-underscore-dangle': 0,
				'jsx-a11y/tabindex-no-positive': 0
    },
    env: {
        browser: true
    }
};
