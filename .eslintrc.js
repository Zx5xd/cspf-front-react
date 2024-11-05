// .eslintrc.js
module.exports = {
    extends: [
        'react-app',                  // 기본 React 규칙
        'plugin:prettier/recommended' // Prettier와 ESLint 규칙 충돌 방지
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                tabWidth: 2,
                trailingComma: 'es5',
                bracketSpacing: true,
                arrowParens: 'always',
            },
        ],
        'no-console': 'warn',        // console.log에 경고 표시
        'no-unused-vars': 'warn',    // 사용하지 않는 변수에 경고 표시
    },
};
