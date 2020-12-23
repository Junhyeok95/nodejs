## 01

```
package-lock -> npm6 부터 추가된 것으로, 설치된 패키지의 이름과 정확한 버전 정보를 기재해 둠

"dependencies": {
    "a"; "1.4.7",      // 지정한 버전과 완전히 일치하는 버전을 설치한다
    "b": ">1.4.7",     // 지정한 버전을 제회한 이후 버전을 설치, >= < <= 사용가능

    "Tilde": "~1.4.7", //  >=1.4.7  <1.5.0  patch   끝 기준
    "Tilde": "~1.4",   //  >=1.4.0  <1.5.0  minor   중간 기준
    "Tilde": "~1",     //  >=1.0.0  <2.0.0  major   첫 기준

    "caret": "^1.4.7", //  >=1.0.0  <2.0.0  patch 유지, 하위 호환성 유지
    "caret": "^0.4.7", //  >=0.4.7  <0.5.0  minor 유지
    "caret": "^0.0.7", //  >=0.0.7  <0.0.8  major 유지

    "c": "*",          //  모든 버전을 허용
    "d": "1.4.x",      //  >=1.4.0  <1.5.0
    "e": "1.x",        //  >=1.0.0  <2.0.0
    "f": " "           // * 와 마찬가지로 모든 버전을 허용
```

## 02

```
mkdir -p src/js src/css dist/js dist/css
touch src/js/app.js src/js/hello.js src/css/style.css index.html webpack.config.js
npm i -D webpack webpack-cli

npx webpack             // entry 의 위치에 bundle.js 생성 -> 최적화(uglify/minify)
```

## 03

```
엔트리 : 모듈의 의존관계를 해석하는 시작점
아웃풋 : 번들된 내용을 출력할 파일
로더 : babel, style, css 등 https://webpack.js.org/concepts/

npm i -D babel-core babel-loader
npm i -D style-loader css-loader babel-preset-env babel-preset-react
npx webpack
```

## 04 error

```
npm init -y
npm i -S react react-dom
npm i -D webpack webpack-cli
npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

## 05 book

```
npm i -S react react-dom
npm i -D webpack@4.4.1 webpack-cli@2.0.11
npm i -D babel-loader@7.1.4 style-loader@0.20.3 css-loader@0.28.11 babel-core@6.26.0 babel-preset-env@1.6.1 babel-preset-react@6.24.1
npx webpack
```

## 06 webpack은 정말 어렵군

```
npm i -D extract-text-webpack-plugin@4.0.0-beta.0
npm i -D webpack-dev-server@3.1.1
npx webpack-dev-server --hot --inline --open
```
