console.clear();
PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

const sharpness = 1;
const minDelta = 0.05;

const app = new PIXI.Application({
    autoResize: true,
    backgroundColor: 0x000000,
    width: window.innerWidth,
    height: window.innerHeight,
    view: document.querySelector("#canvas")
});

const texture = createTexture(0, 8, app.renderer.resolution);
const pointer = new PIXI.Point(app.screen.width / 2, app.screen.height / 2);
const emitterPos = pointer.clone();

const container = new PIXI.particles.ParticleContainer(5000, {
    scale: true,
    position: true,
    rotation: false,
    uvs: false,
    tint: true
});

const emitter = new PIXI.particles.Emitter(container, [texture], {
    autoUpdate: true,
    alpha: {
        start: 1,
        end: 0
    },
    scale: {
        start: 0.4,
        end: 0.2,
        minimumScaleMultiplier: 1
    },
    color: {
        start: "#afffaf",
        end: "#008000"
    },
    speed: {
        start: 0,
        end: 0,
        minimumSpeedMultiplier: 1
    },
    acceleration: {
        x: 0,
        y: 0
    },
    maxSpeed: 0,
    startRotation: {
        min: 0,
        max: 0
    },
    noRotation: true,
    rotationSpeed: {
        min: 0,
        max: 0
    },
    lifetime: {
        min: 1,
        max: 1
    },
    blendMode: "multiply",
    frequency: 0.00005,
    emitterLifetime: -1,
    maxParticles: 100000,
    pos: {
        x: 0,
        y: 0
    },
    addAtBack: false,
    spawnType: "point"
});

let resized = false;

emitter.updateOwnerPos(emitterPos.x, emitterPos.y);

app.stage.addChild(container);
app.stage.interactive = true;
//app.ticker.add(onTick);
app.stage.on("pointermove", event => pointer.copy(event.data.global));

window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

let xFnc = 0;
let isReturning = false;

function drawCuadratic() {
    setInterval(() => {
        const xCenter = app.screen.width / 2;
        const yCenter = app.screen.height / 2;
        document.getElementById("info").innerHTML = `Particles: ${emitter.particleCount}`;
        moveEmitterTo(emitter, xFnc, calcCuadratic(xFnc));
        if (xFnc > app.screen.width) {
            xFnc = 0;
        } else {
            xFnc += 1;
        }
    }, 100);
}
let mLine = 0;
function drawLine() {
    setInterval(() => {
        const xCenter = app.screen.width / 2;
        const yCenter = app.screen.height / 2;
        document.getElementById("info").innerHTML = `Particles: ${emitter.particleCount}`;
        moveEmitterTo(emitter, xFnc, calcLine(xFnc, mLine));
        if (xFnc > app.screen.width) {
            xFnc = 0;
        } else {
            xFnc += 100;
        }
        mLine += 0.001;
    }, 1);
}

function calcCuadratic(x) {
    const a = 0.05;
    const k = (app.screen.height / 2) - 375
    const h = app.screen.width / 2;
    return a * (x - h) ** 2 + k;
}

function calcLine(x, m) {
    const b = 0
    return m * x + b;
}

function moveEmitterTo(emitter, x, y) {
    emitter.updateOwnerPos(x, y);
}

/*function onTick(delta) {
  
  if (resized) {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    resized = false;
  }
  
  if (!emitterPos.equals(pointer)) {
        
    const dt = 1 - Math.pow(1 - sharpness, delta); 
    const dx = pointer.x - emitterPos.x;
    const dy = pointer.y - emitterPos.y;
    
    if (Math.abs(dx) > minDelta) {
      emitterPos.x += dx * dt;
    } else {
      emitterPos.x = pointer.x;
    }

    if (Math.abs(dy) > minDelta) {
      emitterPos.y += dy * dt;
    } else {
      emitterPos.y = pointer.y;
    }    
    
    emitter.updateOwnerPos(emitterPos.x, emitterPos.y);
  }
}*/


function createTexture(r1, r2, resolution) {

    const c = (r2 + 1) * resolution;
    r1 *= resolution;
    r2 *= resolution;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.height = c * 2;

    const gradient = context.createRadialGradient(c, c, r1, c, c, r2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return PIXI.Texture.fromCanvas(canvas);
}

console.log("PIXI", PIXI);
console.log("APP", app);

function waveformDraw() {
    const data = window.electronAPI.openFile().then(data => {
        const waveArr = data.data;
        let iY = 0;
        let x = 0 - app.screen.width;
        let isReturning = false
        setInterval(() => {
            const xCenter = app.screen.width / 2;
            const yCenter = app.screen.height / 2;
            
            moveEmitterTo(emitter, xCenter + x, yCenter + waveArr[iY]);
            iY++;
            
            if(!isReturning){
                x+=10;
            }else{
                x -= 10;
            }

            if(x >= 100){
                isReturning = true;
            }else if(x <= -100){
                isReturning = false;
            }
            console.log(xCenter, yCenter + waveArr[iY]);
            document.getElementById("info").innerHTML = `Particles: ${emitter.particleCount}`;

        }, );
    });
    
}

waveformDraw();