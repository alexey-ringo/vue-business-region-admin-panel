module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/airbnb'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        // indent: ['error', 4, { SwitchCase: 1 }],
        indent: 0,
        semi: 0,
        // 'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-console': 'off',
        'comma-dangle': ['error', 'never'],
        'linebreak-style': 0,
        'class-methods-use-this': 0,
        'no-unused-vars': 0,
        'max-len': 0,
        'no-restricted-syntax': 0,
        'arrow-parens': 0,
        'consistent-return': 0,
        'no-side-effects-in-computed-properties': 0,
        'prefer-destructuring': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-plusplus': 0,
        'newline-per-chained-call': 0,
        'dot-notation': 0
    }
}
