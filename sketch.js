// 噴射動畫的資源
let jetSpriteSheet;
let jetFrames = [];
const jetFrameWidth = 30.5; // 305 / 10
const jetFrameHeight = 24;
const totalJetFrames = 10;

// 翻滾動畫的資源
let rollSpriteSheet;
let rollFrames = [];
const rollFrameWidth = 29.5; // 295 / 10
const rollFrameHeight = 26;
const totalRollFrames = 10;

// 上鉤拳動畫的資源
let uppercutSpriteSheet;
let uppercutFrames = [];
const uppercutFrameWidth = 45.64; // 639 / 14
const uppercutFrameHeight = 73;
const totalUppercutFrames = 14;

// 集氣動畫的資源
let chargeSpriteSheet;
let chargeFrames = [];
const chargeFrameWidth = 40.61; // 528 / 13
const chargeFrameHeight = 32;
const totalChargeFrames = 13;

// 動畫與角色狀態
let currentFrame = 0; // 共用影格計數器
let characterX, characterY;
let originalY; // 儲存原始 Y 座標以便返回
let isMoving = false;
let isUppercutting = false;
let isCharging = false;
let uppercutFrameCounter = 0;
let chargeFrameCounter = 0;
let direction = 1; // 1: 向右, -1: 向左
const moveSpeed = 45;
const scaleFactor = 5; // 放大倍率
const jumpSpeed = 45;

// 在 setup() 之前執行，用於載入外部檔案
function preload() {
  // 載入噴射動畫圖片
  jetSpriteSheet = loadImage('卡比噴射/全部的圖卡比噴射.png', 
    () => console.log('噴射圖片載入成功！'),
    () => console.error('錯誤：無法載入噴射圖片！')
  );
  // 載入翻滾動畫圖片
  rollSpriteSheet = loadImage('翻滾/全部的圖 翻滾.png',
    () => console.log('翻滾圖片載入成功！'),
    () => console.error('錯誤：無法載入翻滾圖片！')
  );
  // 載入上鉤拳動畫圖片
  uppercutSpriteSheet = loadImage('上鉤拳/全部的圖 上鉤拳.png',
    () => console.log('上鉤拳圖片載入成功！'),
    () => console.error('錯誤：無法載入上鉤拳圖片！')
  );
  // 載入集氣動畫圖片
  chargeSpriteSheet = loadImage('集氣/全部的圖 集氣.png',
    () => console.log('集氣圖片載入成功！'),
    () => console.error('錯誤：無法載入集氣圖片！')
  );
}

function setup() {
  // 建立一個填滿整個視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定角色初始位置在畫面中央
  characterX = width / 2;
  characterY = height / 2;
  originalY = characterY; // 儲存初始 Y 位置

  // 切割噴射動畫
  if (jetSpriteSheet.width > 0) {
    for (let i = 0; i < totalJetFrames; i++) {
      let x = Math.round(i * jetFrameWidth);
      let w = Math.round(jetFrameWidth);
      jetFrames.push(jetSpriteSheet.get(x, 0, w, jetFrameHeight));
    }
  }

  // 切割翻滾動畫
  if (rollSpriteSheet.width > 0) {
    for (let i = 0; i < totalRollFrames; i++) {
      let x = Math.round(i * rollFrameWidth);
      let w = Math.round(rollFrameWidth);
      rollFrames.push(rollSpriteSheet.get(x, 0, w, rollFrameHeight));
    }
  }

  // 切割上鉤拳動畫
  if (uppercutSpriteSheet.width > 0) {
    for (let i = 0; i < totalUppercutFrames; i++) {
      let x = Math.round(i * uppercutFrameWidth);
      let w = Math.round(uppercutFrameWidth);
      uppercutFrames.push(uppercutSpriteSheet.get(x, 0, w, uppercutFrameHeight));
    }
  }

  // 切割集氣動畫
  if (chargeSpriteSheet.width > 0) {
    for (let i = 0; i < totalChargeFrames; i++) {
      let x = Math.round(i * chargeFrameWidth);
      let w = Math.round(chargeFrameWidth);
      chargeFrames.push(chargeSpriteSheet.get(x, 0, w, chargeFrameHeight));
    }
  }

  // 設定動畫播放速度 (每秒 10 格)
  frameRate(10);
  imageMode(CENTER); // 將圖片的繪製原點設為中心，方便翻轉與定位
}

function draw() {
  // 設定背景顏色
  background('#ffcad4');

  // 只有在不執行特殊動作時，才處理左右移動
  if (!isUppercutting && !isCharging) {
    handleInput();
  }

  // 根據狀態選擇並繪製動畫
  if (isUppercutting && uppercutFrames.length > 0) {
    // 播放上鉤拳動畫
    let img = uppercutFrames[uppercutFrameCounter];

    // 根據影格數決定上升或下降
    if (uppercutFrameCounter < 9) {
      characterY -= jumpSpeed; // 上升
    } else {
      characterY += jumpSpeed; // 下降
    }

    // 限制角色不能超出畫布頂部
    let halfCharHeight = (uppercutFrameHeight * scaleFactor) / 2;
    characterY = constrain(characterY, halfCharHeight, height);

    image(img, characterX, characterY, uppercutFrameWidth * scaleFactor, uppercutFrameHeight * scaleFactor);

    uppercutFrameCounter++;

    // 動畫播放完畢
    if (uppercutFrameCounter >= totalUppercutFrames) {
      isUppercutting = false;
      characterY = originalY; // 重設回原始高度
    }
  } else if (isCharging && chargeFrames.length > 0) {
    // 播放集氣動畫
    let img = chargeFrames[chargeFrameCounter];
    image(img, characterX, characterY, chargeFrameWidth * scaleFactor, chargeFrameHeight * scaleFactor);

    chargeFrameCounter++;

    // 動畫播放完畢
    if (chargeFrameCounter >= totalChargeFrames) {
      isCharging = false;
      // 集氣結束後自動回到待機，不需重設位置
    }
  } else if (isMoving && rollFrames.length > 0) {
    // 播放翻滾動畫
    let frameIndex = floor(currentFrame) % totalRollFrames;
    let img = rollFrames[frameIndex];
    
    push(); // 儲存當前的繪圖狀態
    translate(characterX, characterY); // 將原點移動到角色位置
    scale(direction, 1); // 根據方向翻轉 x 軸
    image(img, 0, 0, rollFrameWidth * scaleFactor, rollFrameHeight * scaleFactor);
    pop(); // 恢復繪圖狀態    
  } else {
    // 播放站立(噴射)動畫
    if (jetFrames.length > 0) {
      let frameIndex = floor(currentFrame) % totalJetFrames;
      let img = jetFrames[frameIndex];
      image(img, characterX, characterY, jetFrameWidth * scaleFactor, jetFrameHeight * scaleFactor);
    }
  }

  // 更新影格計數器
  currentFrame++;
}

function handleInput() {
  isMoving = false; // 每幀都重設移動狀態

  if (keyIsDown(RIGHT_ARROW)) {
    isMoving = true;
    direction = 1;
    characterX += moveSpeed;
  }
  if (keyIsDown(LEFT_ARROW)) {
    isMoving = true;
    direction = -1;
    characterX -= moveSpeed;
  }
}

function keyPressed() {
  // 當按下向上鍵，且不在執行任何特殊動作時，觸發上鉤拳
  if (keyCode === UP_ARROW && !isUppercutting && !isMoving && !isCharging) {
    isUppercutting = true;
    uppercutFrameCounter = 0; // 重設上鉤拳動畫的影格
    characterY = originalY; // 確保從正確的高度開始跳
  }

  // 當按下空白鍵，且不在執行任何特殊動作時，觸發集氣
  if (keyCode === 32 && !isUppercutting && !isMoving && !isCharging) {
    isCharging = true;
    chargeFrameCounter = 0; // 重設集氣動畫的影格
  }
}
