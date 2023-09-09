const { spawn } = require('child_process');

exports.imageClassification = async function(image_path) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['image_classification.py', image_path]);

        let result = ''; // 이미지 분류 결과를 저장할 변수

        // 파이썬 스크립트의 출력을 
        pythonProcess.stdout.on('data', (data) => {
            const partialResult = data.toString().trim();
            console.log(`파이썬 스크립트의 결과: ${partialResult}`);
            
            // 로그 메시지가 아닌 경우에만 결과를 누적하고 응답으로 보냅니다.
            if (!partialResult.includes('[==============================]')) {
                result += partialResult;
            }

            // 클래스명 추출
            const classMatch = partialResult.match(/(raccoon|roe deer|water deer|wild boar)/);
            if (classMatch) {
                const className = classMatch[0];
                //console.log(className);
                resolve(className); // 클래스명을 Promise를 성공 상태로 처리
            }
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
