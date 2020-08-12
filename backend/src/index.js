const app = require('./app');
const express = require('@feathersjs/express');

const mainApp = express().use('/', app);

// // cluster.js
// const cluster = require('cluster'); // 클러스터 모듈 로드
// const numCPUs = require('os').cpus().length; // CPU 개수 가져오기

// if (cluster.isMaster) { // 마스터 처리
// 	for (var i = 0; i < numCPUs; i++) {
// 		cluster.fork(); // CPU 개수만큼 fork
//   }
//   cluster.on('online', function(worker) {
//     console.log('Worker ' + worker.process.pid + ' is online');
//   });
// 	// 워커 종료시 다잉 메시지 출력
// 	cluster.on('exit', function(worker, code, signal) {
// 		console.log('worker ' + worker.process.pid + ' died');
// 	});
// }else{
//     const server = mainApp.listen(3030, ()=>{
//         console.log('running on http://localhost:3030');
//     });
//     //   const server = app.listen(3000, function () {
//     //     server.setTimeout( 3 * 60 * 1000 )
//     //     console.log('Example app listening on port 3000!');
//     // });
//     app.setup(server);
    
//     process.setMaxListeners(15);
// }

const server = mainApp.listen(3030, ()=>{
    console.log('running on http://localhost:3030');
});
//   const server = app.listen(3000, function () {
//     server.setTimeout( 3 * 60 * 1000 )
//     console.log('Example app listening on port 3000!');
// });
app.setup(server);

process.setMaxListeners(15);