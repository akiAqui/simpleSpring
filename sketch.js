// 定数
const k = 1.1; // ばね定数
const L = 20; // ばねの半分の長さ
const dt = 0.1; // シミュレーションの時間の粒度
const N = 31; // 質量の数
const M = 29; // 系の数
const RADIUS = 10;
const SPRING_WIDTH = 2;
const INITIAL_DX=20;

let systems = []; // 系の配列

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
    createCanvas(1800, 900);
    textSize(16);
    textFont('Open Sans', 16);
    textStyle(NORMAL);
    
    // 初期状態
    for (let j = 0; j < M; j++) {
        let system = [];
        for (let i = 0; i < N; i++) {
            let x = (i - (N - 1) / 2) * 2 * L;
            system.push(new Mass(x, 0, 0, 20, 1));
        }
        systems.push(system);
    }

    let n,m,r,dt;
    for(let k = 0; k < N*M*3; k++) {
	n=floor(random(0,N-1));
	m=floor(random(0,M-1));
	r=random(-3,3);
	systems[m][n].dx = INITIAL_DX*r;
	console.log("system[m][n]=",systems[m][n].dx);
    }
    for (let j = 0; j < M; j++) {
        for (let i = 0; i < N; i++) {
	    console.log("systems[",j,"][",i,"]=",systems[j][i].dx);
            systems[j][i].x += (i === 0) ? -systems[j][i].dx : ((i === N - 1) ? systems[j][i].dx : 0);
        }
    }

}




function draw() {
    background(255);
    translate(width / 2, height / (2 * M));
    
    for (let j = 0; j < M; j++) {
        // 運動方程式
        for (let i = 0; i < N - 1; i++) {
            let force = k * (systems[j][i + 1].x - systems[j][i].x - 2 * L);
            systems[j][i].f += force;
            systems[j][i + 1].f -= force;
        }
	
        // 速度と位置の更新
        for (let i = 0; i < N; i++) {
            systems[j][i].a = systems[j][i].f / systems[j][i].m;
            systems[j][i].v += systems[j][i].a * dt;
            systems[j][i].x += systems[j][i].v * dt;
            systems[j][i].f = 0; // 力をリセット
        }
	
        // ばねの描画
        strokeWeight(SPRING_WIDTH);
        for (let i = 0; i < N - 1; i++) {
            let x1 = systems[j][i].x;
            let x2 = systems[j][i + 1].x;
            //line(x1, j * height / M, x2, j * height / M);
        }
	
        // 質量の描画
        strokeWeight(1);
        fill(255);
        for (let i = 0; i < N; i++) {
            ellipse(systems[j][i].x, j * height / M/0.8, RADIUS, RADIUS);
        }
    }
}
