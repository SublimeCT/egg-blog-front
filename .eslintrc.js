module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': 0,
        "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        indent: [
            "error",
            4,{
                SwitchCase: 1
            }
        ],
        'linebreak-style': [
            "error",
            "unix"
        ],
        quotes: [
            "error",
            "single"
        ],
        semi: [
            "error",
            "never"
        ]
    }
}
