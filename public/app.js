
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
        end: 0.5
    },
    scale: {
        start: 0.2,
        end: 0.1,
        minimumScaleMultiplier: 1
    },
    color: {
        start: "#fc0303",
        end: "#2003fc"
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
        min: 40,
        max: 40
    },
    blendMode: "multiply",
    frequency: 0.005,
    emitterLifetime: -1,
    maxParticles: 100000,
    pos: {
        x: 0,
        y: 0
    },
    addAtBack: true,
    spawnType: "point"
});

let resized = false;

emitter.updateOwnerPos(emitterPos.x, emitterPos.y);

app.stage.addChild(container);
app.stage.interactive = false;
//app.ticker.add(onTick);
app.stage.on("pointermove", event => pointer.copy(event.data.global));

window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

let xFnc = 0;



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

drawLorenz(emitter, app);

