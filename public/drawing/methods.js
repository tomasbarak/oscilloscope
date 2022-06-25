function moveEmitterTo(emitter, x, y) {
    emitter.updateOwnerPos(x, y);
}

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

function waveformDraw(emitter, app, name) {
    let isReturning = false;
    window.electronAPI.openFile(name).then(data => {
        const waveArr = data.data;
        let index = 0;
        let isChannel0 = true;

        let iX = 0;
        let iY = 0;

        setInterval(() => {

            iX = app.screen.width/2 + waveArr[index];
            iY = app.screen.height/2 + waveArr[index + 1];

            moveEmitterTo(emitter, iX, iY);
            console.log(`${iX}, ${iY}`);
            index+=2;
            if(index >= 2) isChannel0 = !isChannel0;
        }, 1);
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

function drawCircle(emitter, app) {
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

function calcCircle(x, app) {
    const a = 0.05;
    const k = 0;
    const h = 0;
    return a * (x - h) ** 2 + k;
}

function drawLorenz(emitter, app) {
    let x = 1;
    let y = 1;
    let z = 1;

    let offset_x = 0;
    let offset_y = -app.screen.height / 2;
    let offset_z = -app.screen.height / 2;

    let sigma = 10;
    let rho = 28;
    let beta = 8 / 3;
    let stepSize = 0.01;
    let scale = 10;
    setInterval(() => {
        x += lorenz.dx_dt(x, y, sigma) * stepSize;
        y += lorenz.dy_dt(x, y, z, rho) * stepSize;
        z += lorenz.dz_dt(x, y, z, beta) * stepSize;

        const nx = app.screen.width / 2 + x * scale + offset_x;
        const ny = app.screen.height / 2 + y * scale + offset_y;
        const nz = app.screen.height / 2 + z * scale + offset_z;
        moveEmitterTo(emitter, nx, nz);
        document.getElementById("info").innerHTML = `Particles: ${emitter.particleCount}`;
    }, 0)
}