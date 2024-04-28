// REPL
// 자바스크립트는 스크립트 언어라서 즉석에서 코드를 실행할 수 있다.
// 그 중 REPL이라는 콘솔을 제공함으로서 cmd,  터미널에서 node 입력 후 코드 작성 및 실행이 가능함.
// 간단한 코드를 테스트 하는 용도로는 적합하지만 긴 코드를 입력하기엔 부적합

//---------------------------------------------------------------------------------------------------

// node [자바스크립트 파일 경로]
// 자바스크립트 파일을 만들어서 통째로 코드를 실행하는 방법

//---------------------------------------------------------------------------------------------------

// 모듈
// 노드는 자바스크립트 코드를 모듈로 만들 수 있다.
// 모듈은 특정한 기능을 하는 함수나 변수들의 집합이다.
// 모듈로 만들면 여러 프로그램에서 재사용이 용이하다.
// 예를 들어 같은 폴더 내에 var.js, func.js, index.js 파일이 있을 때,
// 파일 끝에 module.exports로 모듈로 만들 값을 지정하면 다른 파일에서 require(파일경로)로 그 모듈의 내용을 가져올 수 있다.

// var.js
// const odd = '홀수'
// const even = '짝수'
//
// module.exports = {
//     odd : odd,
//     even
// }

// func.js
// const value = require('./var')
// console.log(value)

//---------------------------------------------------------------------------------------------------

// ㅇㅇ