// 定数
const k = 0.1; // ばね定数
const M1 = 1.0; // 質量m1
const M2 = 1.0; // 質量m2
const L = 100; // ばねの半分の長さ
const dt = 0.1; // シミュレーションの時間の粒度

let x1, x2; // 質量の位置
let v1, v2; // 質量の速度
let dx1, dx2; // 初期変位

function setup() {
    createCanvas(800, 400);
    textSize(16);
    textFont('Open Sans', 16);    
    textStyle(NORMAL); // フォントを通常のスタイルに設定
    // 初期状態
    dx1 = 100;
    dx2 = 40;
    x1 = -L - dx1;
    x2 = +L + dx2;
    v1 = 0;
    v2 = 0;
}

function draw() {
    background(255);
    translate(width / 2, height / 2);
    
    // 運動方程式
    let F1 = k * (x2 - x1 - 2 * L);
    let F2 = -k * (x2 - x1 - 2 * L);
    let a1 = F1 / M1;
    let a2 = F2 / M2;
    
    // 速度と位置の更新
    v1 += a1 * dt;
    v2 += a2 * dt;
    x1 += v1 * dt;
    x2 += v2 * dt;
    
    // 補助線の描画
    //stroke(200);
    //line(L, -height/2, L, height/2);
    //line(-L, -height/2, -L, height/2);
    
    
    // 質量の描画
    let speed1 = abs(v1);
    let speed2 = abs(v2);
    let maxSpeed = max(speed1, speed2);
    let maxLength = 2*L+dx1+dx2;
    let minLength = 2*L-dx1-dx2;

    let fillRate=( (x2-x1)-minLength )/(maxLength-minLength);
    let antiRate= ( minLength-(x2-x1))/(minLength-maxLength);
    let fillColor=255*fillRate-20;
    strokeWeight(0);
    fill(255,fillColor,fillColor);
    ellipse(x1, 0, 30, 30);
    
    //fill(255, 0, 0, map(speed2, 0, maxSpeed, 0, 255));
    fill(255,fillColor,fillColor);    
    ellipse(x2, 0, 30, 30);

    // ばねの描画
    strokeWeight(1);
    stroke(255,fillColor,fillColor);
    line(x1, 0, x2, 0);

    
    // 数値表示
    strokeWeight(0);
    fill(0);
    text("x1:              " + nf(x1, 0, 2), -width/2 + 20, -height/2 + 30);
    text("x2:              " + nf(x2, 0, 2), -width/2 + 20, -height/2 + 50);
    text("x2 - x1:         " + nf(x2 - x1, 0, 2), -width/2 + 20, -height/2 + 70);
    text("F1:              " + nf(F1, 0, 2), -width/2 + 20, -height/2 + 90);
    text("F2:              " + nf(F2, 0, 2), -width/2 + 20, -height/2 + 110);
    text("fillRate         " + nf(fillRate,0,2), -width/2 + 20, -height/2 +150);
    text("antiRate         " + nf(antiRate,0,2), -width/2 + 20, -height/2 +170);    
    text("fillColor        " + nf(fillColor,0,2), -width/2 + 20, -height/2 +190);    
    text("minLength        " + nf(minLength,0,2), -width/2 + 20, -height/2 +210);
    text("maxLength        " + nf(maxLength,0,2), -width/2 + 20, -height/2 +230);
    text("maxLength        " + nf(maxLength,0,2), -width/2 + 20, -height/2 +250);            
}
