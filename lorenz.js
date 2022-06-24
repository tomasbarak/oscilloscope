import lorenz from './lorenz.build.js';

lorenz.init(); // Init with default values, or
//lorenz.init(sigma, beta, rho, initX, initY, initZ, stepSize) //Init with other initial conditions
lorenz.next(); // Generate next value, or
//lorenz.next(999) // Generate next 999 values
const points = lorenz.points(); // Return array of points [x1, y1, z1, x2, y2, z2, ...]
const pontsAsArray = lorenz.points(true); // Return points [[x1, y1, z1], [x2 ,y2, z2], ...]
const pontsAsVector3 = lorenz.points(true, THREE.Vector3); // Return p