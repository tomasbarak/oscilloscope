const lorenz = {
    dx_dt: (x = 0, y = 0, sigma = 10) => {
        return sigma * (y - x);
    },
    dy_dt: (x = 0, y = 0, z = 0, rho = 28) => {
        return x * (rho - z) - y;
    },
    dz_dt: (x = 0, y = 0, z = 0, beta = (8/3)) => {
        return x * y - beta * z
    }
}