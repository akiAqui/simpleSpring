// 定数
const k = 1.1; // ばね定数
const L = 20; // ばねの半分の長さ
const dt = 0.1; // シミュレーションの時間の粒度
const N = 28; // 質量の数
const RADIUS = 10;
const SPRING_WIDTH = 2;
let masses = []; // 質量の配列

// 質量のクラス
class Mass {
    constructor(x, v, a, dx, m) {
        this.x = x; // 位置
        this.v = v; // 速度
        this.a = a; // 加速度
        this.dx = dx; // 初期変位
        this.m = m; // 質量
        this.f = 0; // 力
    }
}

function setup() {
    createCanvas(1200, 400);
    textSize(16);
    textFont('Open Sans', 16);
    textStyle(NORMAL);

    // 初期状態
    for (let i = 0; i < N; i++) {
        let x = (i - (N - 1) / 2) * 2 * L;
        masses.push(new Mass(x, 0, 0, 20, 1));
    }

    // 初期変位を適用
    for (let i = 0; i < N; i++) {
        masses[i].x += (i === 0) ? -masses[i].dx : ((i === N - 1) ? masses[i].dx : 0);
    }

}

function draw() {
    background(255);
    translate(width / 2, height / 2);

    // 運動方程式
    for (let i = 0; i < N - 1; i++) {
        let force = k * (masses[i + 1].x - masses[i].x - 2 * L);
        masses[i].f += force;
        masses[i + 1].f -= force;
    }

    // 速度と位置の更新
    for (let i = 0; i < N; i++) {
        masses[i].a = masses[i].f / masses[i].m;
        masses[i].v += masses[i].a * dt;
        masses[i].x += masses[i].v * dt;
        masses[i].f = 0; // 力をリセット
    }

    // ばねの描画
    strokeWeight(SPRING_WIDTH);
    for (let i = 0; i < N - 1; i++) {
        let x1 = masses[i].x;
        let x2 = masses[i + 1].x;
        line(x1, 0, x2, 0);
    }

    // 質量の描画
    strokeWeight(1);
    fill(255);
    for (let i = 0; i < N; i++) {
        ellipse(masses[i].x, 0, RADIUS, RADIUS);
    }

    // 数値表示
    strokeWeight(0);
    fill(0);
    /*
    for (let i = 0; i < N; i++) {
        text(`Mass ${i + 1}:`, -width / 2 + 20, -height / 2 + 30 + i * 80);
        text(`x: ${nf(masses[i].x, 0, 2)}`, -width / 2 + 40, -height / 2 + 50 + i * 80);
        text(`v: ${nf(masses[i].v, 0, 2)}`, -width / 2 + 40, -height / 2 + 70 + i * 80);
        text(`a: ${nf(masses[i].a, 0, 2)}`, -width / 2 + 40, -height / 2 + 90 + i * 80);
        text(`f: ${nf(masses[i].f, 0, 2)}`, -width / 2 + 40, -height / 2 + 110 + i * 80);
    }
*/
}
