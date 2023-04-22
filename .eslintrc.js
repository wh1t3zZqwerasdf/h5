// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const {defineConfig} = require('eslint-define-config');
import {defineConfig} from 'eslint-define-config'

module.exports = defineConfig({
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        './.eslintrc-auto-import.json',
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint', 'unused-imports'],
    rules: {
        'prettier/prettier': 'error',
        'vue/multi-word-component-names': ['off', {ignores: []}],

        /* import */
        // 'import/order': 'error',
        // 'import/first': 'error',
        // 'import/no-mutable-exports': 'error',
        'import/no-unresolved': 'off',
        'import/no-absolute-path': 'off',

        /* Common */
        semi: ['error', 'always'],
        curly: ['error', 'multi-or-nest', 'consistent'],
        // quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        'no-unused-vars': 'off',
        'no-param-reassign': 'off',
        'array-bracket-spacing': ['error', 'never'],
        // 'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'block-spacing': ['error', 'always'],
        camelcase: 'off',
        'comma-spacing': ['error', {before: false, after: true}],
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', 'never'],
        'no-constant-condition': 'warn',
        'no-debugger': 'error',
        'no-console': ['off', {allow: ['warn', 'error']}],
        'no-cond-assign': ['error', 'always'],
        'func-call-spacing': ['off', 'never'],
        'key-spacing': ['error', {beforeColon: false, afterColon: true}],
        indent: [
            'error',
            2,
            {SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1}
        ],
        'no-restricted-syntax': [
            'error',
            'DebuggerStatement',
            'LabeledStatement',
            'WithStatement'
        ],
        'object-curly-spacing': ['error', 'always'],
        'no-return-await': 'off',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'no-multiple-empty-lines': ['error', {max: 1, maxBOF: 0, maxEOF: 1}],

        /* es6 */
        'no-var': 'error',
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: true
            }
        ],
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: false,
                allowUnboundThis: true
            }
        ],
        'object-shorthand': [
            'error',
            'always',
            {
                ignoreConstructors: false,
                avoidQuotes: true
            }
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'template-curly-spacing': 'error',
        'arrow-parens': ['error', 'as-needed'],
        'generator-star-spacing': 'off',
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['/'],
                    exceptions: ['/', '#']
                },
                block: {
                    markers: ['!'],
                    exceptions: ['*'],
                    balanced: true
                }
            }
        ],

        /* best-practice */
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'consistent-return': 'off',
        complexity: ['off', 11],
        eqeqeq: ['error', 'smart'],
        'no-alert': 'warn',
        'no-case-declarations': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-with': 'error',
        'no-void': 'error',
        'no-useless-escape': 'off',
        'vars-on-top': 'error',
        'require-await': 'off',
        'no-return-assign': 'off',
        // 'operator-linebreak': ['error', 'before'],

        /* typescript eslint */
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/no-explicit-any': 'off',

        /* unused-imports */
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'off',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_'
            }
        ]
    }
});
