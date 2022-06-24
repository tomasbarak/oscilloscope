//Export a function to use in html
function drawLine(emitter, app, line = { m: 1, b: 0 }) {
    let xFnc = 0;
    setInterval(() => {
        moveEmitterTo(emitter, xFnc, calcLine(xFnc, line.m, line.b));
        if (xFnc > app.screen.width) {
            xFnc = 0;
        } else {
            xFnc += 100;
        }
        mLine += 0.001;
    }, 1);
}

function calcLine(x, m = 1, b = 0) {
    return m * x + b;
}

function waveformDraw(emitter, app) {
    let isReturning = false;
    window.electronAPI.openFile().then(data => {
        const waveArr = data.data;
        let iY = 0;
        let x = 0;
        let isReturning = false
        setInterval(() => {
            const xCenter = app.screen.width / 2;
            const yCenter = app.screen.height / 2;

            moveEmitterTo(emitter, xCenter + x, yCenter + waveArr[iY]);
            iY++;

            if(iY >= waveArr.length){
                iY = 0;
            }

            if (!isReturning) {
                x += 1;
            } else {
                x -= 1;
            }

            if (x >= app.screen.width - app.screen.width / 2) {
                isReturning = true;
            } else if (x <= -app.screen.width + app.screen.width / 2) {
                isReturning = false;
            }
            console.log(xCenter, yCenter + waveArr[iY]);
            document.getElementById("info").innerHTML = `Particles: ${emitter.particleCount}`;

        }, 0.1);
    });

}

function drawCuadratic(emitter, app) {
    let xFnc = 0;
    setInterval(() => {
        document.getElementById("info").innerHTML = `Particles: ${emitter.particleCount}`;
        moveEmitterTo(emitter, xFnc, calcCuadratic(xFnc));
        if (xFnc > app.screen.width) {
            xFnc = 0;
        } else {
            xFnc += 1;
        }
    }, 100);
}

function calcCuadratic(x) {
    const a = 0.05;
    const k = (app.screen.height / 2) - 375
    const h = app.screen.width / 2;
    return a * (x - h) ** 2 + k;
}

function moveEmitterTo(emitter, x, y) {
    emitter.updateOwnerPos(x, y);
}

function drawCircle(emitter, app){
    let xFnc = 0;
    setInterval(() => {
        document.getElementById("info").innerHTML = `Particles: ${emitter.particleCount}`;
        moveEmitterTo(emitter, xFnc, calcCircle(xFnc, app));
        if (xFnc > app.screen.width) {
            xFnc = 0;
        } else {
            xFnc += 1;
        }
    }, 100);
}

function calcCircle(x, app){
    const a = 0.05;
    const k = 0;
    const h = 0;
    return a * (x - h) ** 2 + k;
}