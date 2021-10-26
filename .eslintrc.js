module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true
    },
    globals: {
      'Ext': 'readonly',
      'Xpand': 'readonly',
      'Fabric': 'readonly'
    },
    extends: "google",
    parserOptions: {
        ecmaVersion: 8
    },
    rules: {
        'prefer-const': "error",
        'max-len': ['error', {code: 120}],
        semi: ['error', 'never'],
        'comma-dangle': [2, 'always-multiline'],
        camelcase: 0,
        indent: ["error", 2],
        'no-undef': ['error'],
        'new-cap': ['error', { "newIsCap": false }]
    }
};
