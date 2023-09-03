const { spawn } = require('child_process');

exports.add = function() {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['./add.py', '5', '7']);

        // 파이썬 스크립트의 출력을 
        pythonProcess.stdout.on('data', (data) => {
            console.log("called at controllers");
            const result = data.toString().trim();
            console.log(`파이썬 스크립트의 결과: ${result}`);
            resolve(result); // Promise를 성공 상태로 처리
        });

        pythonProcess.stderr.on('data', (data) => {
            const errorData = data.toString().trim();
            console.error(`파이썬 스크립트에서 에러 발생: ${errorData}`);
            reject(errorData); // Promise를 실패 상태로 처리
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`파이썬 스크립트가 종료되었으나 에러 코드(${code})가 반환되었습니다.`);
                reject(`파이썬 스크립트가 종료되었으나 에러 코드(${code})가 반환되었습니다.`);
            }
        });
    });
}
