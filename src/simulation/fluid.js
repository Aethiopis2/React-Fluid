/**
 * @file src/simulation/fluid.js
 * @description This file contains the fluid simulation logic.
 * 
 * @author Rediet Worku
 * @date 2023-10-01
 * @version 1.0.0
 */

const N = 64;                   // grid size
const size = (N + 2) * (N + 2); // total size including boundaries

// grid arrays
let denisty = new Float32Array(size);
let densityPrev = new Float32Array(size);

let vx = new Float32Array(size); // x velocity
let vy = new Float32Array(size); // y velocity
let vxPrev = new Float32Array(size); // x velocity previous
let vyPrev = new Float32Array(size); // y velocity previous

// helper function to flatten 2D coordinates to 1D index
const flatten = (x, y) => (y * (N + 2)) + x;

function clear(arr) {
    arr.fill(0);
} // end clear


function addSource(x, y, amount = 100) {
    const i = flatten(x, y);
    denisty[i] += amount;
} // end addSource


function addVelocity(x, y, amountX = 0, amountY = 0) {
    const i = flatten(x, y);
    vx[i] += amountX;
    vy[i] += amountY;
} // end addVelocity


function renderToCanvas(ctx, width, height) {
    const cellWidth = width / N;
    const cellHeight = height / N;

    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            const d = denisty[flatten(j, i)];
            const brightness = Math.min(255, d * 255);

            ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            ctx.fillRect((j -  1) * cellWidth, (i - 1) * cellHeight, 
                cellWidth, cellHeight);
        } // end nested for
    } // end outer for
} // end renderToCanvas


function step() {
    for (let i = 0; i < size; i++) {
        denisty[i] *= 0.99;     // fade
    } // end for
} // end step


export default {
    N,
    addSource,
    addVelocity,
    step,
    renderToCanvas,
}