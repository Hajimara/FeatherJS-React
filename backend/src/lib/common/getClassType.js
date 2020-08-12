/**
 * 파일의 타입을 체크해 주는 함수
 * @param {*} obj 
 */

module.exports = (obj)=> {
    return Object.prototype.toString.call(obj).slice(8, -1);
}
