const stream = require("stream");
const { Duplex } = stream;

module.exports = (buffer) => {
    console.log(getClassType(buffer));
    let ab = new ArrayBuffer(buffer.length);
    let view = new Uint8Array(ab);
    console.log(view);
    console.log(getClassType(view));
    
  const duplexStream = new Duplex();
  duplexStream.push(view);
  duplexStream.push(null);
  return duplexStream;
};

function getClassType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }