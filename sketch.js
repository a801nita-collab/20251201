
// 卡比待機動畫的資源
let kirbyIdleSpriteSheet;
let kirbyIdleFrames = []; // 卡比待機動畫
const kirbyIdleFrameWidth = 30.5; // 305 / 10
const kirbyIdleFrameHeight = 24;
const totalKirbyIdleFrames = 6; // 前 6 幀是卡比

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

// 海綿寶寶動畫資源
let spongebobSpriteSheet;
let spongebobFrames = [];
const spongebobFrameWidth = 499 / 12;
const spongebobFrameHeight = 36;
const totalSpongebobFrames = 12;
let spongebobX, spongebobY; // 海綿寶寶的獨立位置

// 海綿寶寶跌倒動畫資源
let fallSpriteSheet;
let fallFrames = [];
// 原始整張雪碧圖寬度為 644、高度為 34，總共 11 幀
const fallFrameWidth = 644 / 11;
const fallFrameHeight = 34;
const totalFallFrames = 11;
let isSpongebobFalling = false;
let fallFrameCounter = 0;
let spongebobFallDirection = 1; // 儲存跌倒時的方向

// 轉圈角色動畫資源
let spinnerSpriteSheet;
let spinnerFrames = [];
const spinnerFrameWidth = 225 / 10; // 22.5
const spinnerFrameHeight = 20;
const totalSpinnerFrames = 10;
let spinnerX, spinnerY; // 轉圈角色的位置

// 加一命角色資源（3 幀動畫）
let addLifeFrames = [];
const totalAddLifeFrames = 3; // 使用 0.png, 1.png, 2.png
const addLifeDisplayWidth = 97; // 要繪製的寬（恢復原寬）
const addLifeDisplayHeight = 28 * 2; // 要繪製的高（原本的兩倍）
let addLifeX, addLifeY; // 加一命角色的位置
// 加一命位置
let cnv; // p5 畫布引用（用於設定全螢幕樣式）

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

// 對話系統狀態
let quizData; // 儲存從 CSV 載入的題庫
let currentQuestion; // 當前的題目物件
let quizDialogueText = "靠近我開始問答挑戰！"; // 轉圈角色的對話文字
let quizState = 'IDLE'; // 問答狀態: IDLE, ASKING, FEEDBACK

let kirbyInput;
let spongebobText = ''; // 海綿寶寶頭上的文字
const moveSpeed = 45;
const scaleFactor = 5; // 放大倍率 (原為 5)
const jumpSpeed = 45;
let isDialogueActive = false; // 維持原有變數，用於觸發
// 遊戲模式變數
let lives = 3; // 卡比初始三顆愛心
let maxLives = 5;
let addLifeActive = true; // 加一命是否存在（被撿起後消失）
let useTrueFalse = false; // 當觸碰到轉圈角色時，使用是/否題型
let gameOver = false;

// 是/否按鈕設定（會在 draw 中根據 boxX/uiY 計算，這裡保留狀態）
let tfButtonYes = {x:0,y:0,w:0,h:0};
let tfButtonNo = {x:0,y:0,w:0,h:0};



// 在 setup() 之前執行，用於載入外部檔案
function preload() {
  // 載入卡比待機動畫圖片
  kirbyIdleSpriteSheet = loadImage('卡比噴射/全部的圖卡比噴射.png', 
    () => console.log('卡比待機圖片載入成功！'),
    () => console.error('錯誤：無法載入卡比待機圖片！')
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
  // 載入海綿寶寶動畫圖片 (請確認檔案路徑是否正確)
  spongebobSpriteSheet = loadImage('2/跳舞/全部 跳舞.png',
    () => console.log('海綿寶寶圖片載入成功！'),
    () => console.error('錯誤：無法載入海綿寶寶圖片！')
  );
  // 載入跌倒動畫圖片
  fallSpriteSheet = loadImage('2/跌倒/全部 跌倒.png',
    () => console.log('跌倒圖片載入成功！'),
    () => console.error('錯誤：無法載入跌倒圖片！')
  );
  // 載入轉圈角色動畫圖片
  spinnerSpriteSheet = loadImage('3/轉圈/全部 轉圈.png',
    () => console.log('轉圈角色圖片載入成功！'),
    () => console.error('錯誤：無法載入轉圈角色圖片！')
  );
  
  // 載入加一命三張幀圖片
  addLifeFrames.push(loadImage('加一命/0.png',
    () => console.log('加一命 幀0 載入成功！'),
    () => console.error('錯誤：無法載入 加一命/0.png')
  ));
  addLifeFrames.push(loadImage('加一命/1.png',
    () => console.log('加一命 幀1 載入成功！'),
    () => console.error('錯誤：無法載入 加一命/1.png')
  ));
  addLifeFrames.push(loadImage('加一命/2.png',
    () => console.log('加一命 幀2 載入成功！'),
    () => console.error('錯誤：無法載入 加一命/2.png')
  ));
  // 載入 CSV 題庫檔案
  quizData = loadTable('quiz.csv', 'csv', 'header',
    () => console.log('CSV 題庫載入成功！'),
    () => console.error('錯誤：無法載入 CSV 題庫！')
  );

}

function setup() {
  // 建立一個填滿整個視窗的畫布
  cnv = createCanvas(windowWidth, windowHeight);

  // 設定角色初始位置在畫面中央
  characterX = width / 2;
  characterY = height / 2;
  originalY = characterY; // 儲存初始 Y 位置

  // 設定海綿寶寶的初始位置，使其獨立於卡比
  spongebobX = width / 4; // 例如，在畫布左邊四分之一處
  spongebobY = characterY; // 和卡比在相同的高度

  // 設定轉圈角色的初始位置，使其獨立於卡比
  spinnerX = width * 3 / 4; // 例如，在畫布右邊四分之三處
  spinnerY = characterY; // 和卡比在相同的高度
  

  // 設定加一命角色的初始位置（暫時靠在海綿寶寶左邊）
  addLifeX = spongebobX - (spongebobFrameWidth * scaleFactor) / 2 - addLifeDisplayWidth / 2 - 10;
  addLifeY = spongebobY;

  // --- 對話系統設定 ---
  // 建立文字輸入框但先隱藏
  kirbyInput = createInput();
  kirbyInput.hide();
  kirbyInput.style('font-size', '18px');

  // 切割卡比待機動畫
  if (kirbyIdleSpriteSheet.width > 0) {
    // 只切割前 6 幀作為卡比待機動畫
    for (let i = 0; i < totalKirbyIdleFrames; i++) {
      let x = Math.round(i * kirbyIdleFrameWidth); // 當前幀的起始 x
      let nextX = Math.round((i + 1) * kirbyIdleFrameWidth); // 下一幀的起始 x
      let w = nextX - x; // 當前幀的精確寬度
      kirbyIdleFrames.push(kirbyIdleSpriteSheet.get(x, 0, w, kirbyIdleFrameHeight));
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

  // 切割海綿寶寶動畫
  if (spongebobSpriteSheet.width > 0) {
    for (let i = 0; i < totalSpongebobFrames; i++) {
      let x = Math.round(i * spongebobFrameWidth);
      let w = Math.round(spongebobFrameWidth);
      spongebobFrames.push(spongebobSpriteSheet.get(x, 0, w, spongebobFrameHeight));
    }
  }

  // 切割跌倒動畫
  if (fallSpriteSheet.width > 0) {
    for (let i = 0; i < totalFallFrames; i++) {
      let x = Math.round(i * fallFrameWidth);
      let w = Math.round(fallFrameWidth);
      fallFrames.push(fallSpriteSheet.get(x, 0, w, fallFrameHeight));
    }
  }

  // 切割轉圈角色動畫
  if (spinnerSpriteSheet.width > 0) {
    for (let i = 0; i < totalSpinnerFrames; i++) {
      let x = Math.round(i * spinnerFrameWidth);
      let nextX = Math.round((i + 1) * spinnerFrameWidth);
      let w = nextX - x;
      spinnerFrames.push(spinnerSpriteSheet.get(x, 0, w, spinnerFrameHeight));
    }
  }

  

  // 如果有載入加一命幀，嘗試去背處理（將背景色變透明）
  if (addLifeFrames.length === totalAddLifeFrames) {
    for (let i = 0; i < addLifeFrames.length; i++) {
      if (addLifeFrames[i]) {
        addLifeFrames[i] = makeTransparent(addLifeFrames[i], 30); // 容差可調
        // 進一步移除靠近深藍色的線條雜訊（可調參數）
        addLifeFrames[i] = removeDarkBlueLines(addLifeFrames[i], {blueMin:80, rgMax:60, diffMin:30});
      }
    }
  }

  // 設定動畫播放速度 (每秒 10 格)
  frameRate(10);
  imageMode(CENTER); // 將圖片的繪製原點設為中心，方便翻轉與定位
}

function draw() {
  // 設定背景顏色
  background('#ffcad4');

  // --- 顯示學生資訊 ---
  fill(0); // 設定文字為黑色
  noStroke(); // 移除文字邊框
  textSize(32); // 設定文字大小
  textAlign(LEFT, TOP); // 設定文字對齊左上角
  text('學號414730589 姓名:黃讌婷', 10, 10); // 在 (10, 10) 座標繪製文字

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
    // 播放待機動畫
    if (kirbyIdleFrames.length > 0) {
      push();
      translate(characterX, characterY);
      scale(direction, 1); // 讓待機的卡比也能根據方向翻轉

      // 繪製卡比待機動畫
      let kirbyFrameIndex = floor(currentFrame) % totalKirbyIdleFrames;
      let kirbyImg = kirbyIdleFrames[kirbyFrameIndex];
      image(kirbyImg, 0, 0, kirbyIdleFrameWidth * scaleFactor, kirbyIdleFrameHeight * scaleFactor);
      pop();
    }
  }

  // --- 繪製加一命角色（位於海綿寶寶左側，3 幀動畫） ---
  if (addLifeFrames.length === totalAddLifeFrames && addLifeActive) {
    // 每幀根據海綿寶寶位置更新加一命位置，確保始終在左側
    const leftOffset = (spongebobFrameWidth * scaleFactor) / 2 + addLifeDisplayWidth / 2 + 10;
    addLifeX = spongebobX - leftOffset;
    addLifeY = spongebobY;

    // 使用共用 currentFrame 播放動畫幀
    let frameIndex = floor(currentFrame) % totalAddLifeFrames;
    let img = addLifeFrames[frameIndex];

    push();
    translate(addLifeX, addLifeY);
    image(img, 0, 0, addLifeDisplayWidth, addLifeDisplayHeight);
    pop();
    // 檢查卡比是否撿到加一命
    const dAdd = dist(characterX, characterY, addLifeX, addLifeY);
    if (dAdd < 60 && addLifeActive) {
      addLifeActive = false;
      lives = min(maxLives, lives + 1);
    }
  }

  // --- 海綿寶寶邏輯 ---
  // 偵測碰撞
  const collisionDistance = 100; // 觸發碰撞的距離閾值
  if (dist(characterX, characterY, spongebobX, spongebobY) < collisionDistance && !isSpongebobFalling) {
    isSpongebobFalling = true; // 觸發跌倒狀態
    fallFrameCounter = 0; // 從第一幀開始播放跌倒動畫
    // 記錄被撞到的方向，以便正確翻轉跌倒動畫
    spongebobFallDirection = (characterX > spongebobX) ? 1 : -1;
  }

  // 根據狀態繪製海綿寶寶
  if (isSpongebobFalling && fallFrames.length > 0) {
    // 播放跌倒動畫
    let img = fallFrames[fallFrameCounter];
    push();
    translate(spongebobX, spongebobY);
    scale(spongebobFallDirection, 1); // 使用跌倒時記錄的方向來翻轉
    image(img, 0, 0, fallFrameWidth * scaleFactor, fallFrameHeight * scaleFactor);
    pop();

    fallFrameCounter++;
    
    // 跌倒動畫播放完畢後，重設狀態
    if (fallFrameCounter >= totalFallFrames) {
      isSpongebobFalling = false;
    }
  } else if (spongebobFrames.length > 0) {
    // 播放跳舞動畫
    let frameIndex = floor(currentFrame) % totalSpongebobFrames;
    let img = spongebobFrames[frameIndex];

    // 判斷卡比相對於海綿寶寶的位置來決定方向
    let spongebobDirection = (characterX > spongebobX) ? 1 : -1;

    // 使用 push/pop 來獨立翻轉海綿寶寶，不影響其他繪圖
    push();
    translate(spongebobX, spongebobY); // 將原點移到海綿寶寶的位置
    scale(spongebobDirection, 1); // 根據方向翻轉 X 軸
    image(img, 0, 0, spongebobFrameWidth * scaleFactor, spongebobFrameHeight * scaleFactor);
    pop();
  }

  // 繪製海綿寶寶頭上的文字
  // 當卡比靠近海綿寶寶時，顯示當前題目的提示文字（若有）
  if (dist(characterX, characterY, spongebobX, spongebobY) < 140 && currentQuestion) {
    spongebobText = currentQuestion.getString('hint');
  } else {
    spongebobText = '';
  }
  if (spongebobText) {
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(0);
    text(spongebobText, spongebobX, spongebobY - 80);
  }

  // --- 轉圈角色邏輯 ---
  if (spinnerFrames.length > 0) {
    // 循環播放動畫
    let frameIndex = floor(currentFrame) % totalSpinnerFrames;
    let img = spinnerFrames[frameIndex];
    // 使用在 setup() 中設定好的獨立位置來繪製
    image(img, spinnerX, spinnerY, spinnerFrameWidth * scaleFactor, spinnerFrameHeight * scaleFactor);

    // --- 對話觸發與顯示 ---
    const dialogueDistance = 120;
    // 如果卡比靠近轉圈角色，且問答未開始
    if (dist(characterX, characterY, spinnerX, spinnerY) < dialogueDistance && quizState === 'IDLE') {
      isDialogueActive = true;
      // 進入是/否問答模式
      useTrueFalse = true;
      kirbyInput.hide();
      startQuiz(); // 開始問答（會載入 currentQuestion）
    }

    // 如果在對話模式中 (問答進行中)
    if (isDialogueActive) {
      // --- 繪製整合的作答 UI ---
      // 將 UI 放在卡比下方，避免任何元素出現在卡比上方
      const uiY = characterY + 110; // UI 區塊的 Y 軸位置（下方）
      const boxPadding = 10;
      const textLabel = "請作答:";
      
      // 設定文字樣式以計算寬度
      textSize(18);
      const labelWidth = textWidth(textLabel);
      
      // 計算整個方塊的總寬度和位置
      const boxWidth = labelWidth + kirbyInput.width + boxPadding * 3;
      const boxX = characterX - boxWidth / 2;
      const boxY = uiY - kirbyInput.height / 2 - boxPadding;
      const boxHeight = kirbyInput.height + boxPadding * 2;

      // 對話框已移除：不再繪製紫色背景方塊，僅保留輸入框

      // 繪製 "請作答" 文字（已移除以避免覆蓋卡比上方）

      // 顯示轉圈角色頭上的文字 (題目或回饋)，改為在角色下方顯示以免覆蓋卡比
      textSize(22);
      textAlign(CENTER, CENTER);
      text(quizDialogueText, spinnerX, spinnerY + 50);
      
      // 顯示並定位輸入框（只有當不是是/否題時顯示）
      if (!useTrueFalse) {
        kirbyInput.show();
        kirbyInput.position(boxX + labelWidth + boxPadding * 2, uiY - kirbyInput.height / 2);
      } else {
        kirbyInput.hide();
      }

      // 如果是/否題型，繪製兩個按鈕（是/否）讓玩家以滑鼠點選
      if (useTrueFalse) {
        const btnW = 100;
        const btnH = 44;
        const yesX = characterX - btnW - 12;
        const noX = characterX + 12;
        const btnY = uiY - btnH/2;
        // 紀錄按鈕範圍以便 mousePressed 使用
        tfButtonYes = {x: yesX, y: btnY, w: btnW, h: btnH};
        tfButtonNo = {x: noX, y: btnY, w: btnW, h: btnH};

        // 畫按鈕
        fill(60, 180, 75);
        rect(yesX, btnY, btnW, btnH, 8);
        fill(200, 60, 60);
        rect(noX, btnY, btnW, btnH, 8);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(18);
        fill(255);
        text('是', yesX + btnW/2, btnY + btnH/2);
        text('否', noX + btnW/2, btnY + btnH/2);
      }

      // 提示文字功能已移除
    }
  }
  // 繪製生命
  drawHearts();

  // 更新影格計數器
  currentFrame++;
}

// 畫面左上角繪製愛心（生命）
function drawHearts() {
  const startX = 10;
  const startY = 50;
  const gap = 36;
  for (let i = 0; i < lives; i++) {
    fill(220, 20, 60);
    noStroke();
    // 簡單畫愛心：兩個圓和一個下方三角
    const x = startX + i * gap;
    const y = startY;
    ellipse(x, y, 18, 18);
    ellipse(x + 12, y, 18, 18);
    beginShape();
    vertex(x - 6, y);
    vertex(x + 18, y);
    vertex(x + 6, y + 18);
    endShape(CLOSE);
  }
  // 畫總生命數
  fill(0);
  textSize(16);
  textAlign(LEFT, CENTER);
  text('生命: ' + lives, startX, startY - 28);
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

  // 當對話模式啟動且玩家按下 ENTER 鍵
  if (quizState === 'ASKING' && keyCode === ENTER) {
    // 僅在非是/否題時使用 Enter 提交
    if (!useTrueFalse) checkAnswer();
  }

  // 按下 'f' 或 'F' 鍵切換全螢幕
  if (key === 'f' || key === 'F') {
    let fs = fullscreen();
    fullscreen(!fs);
  }

}

// 處理滑鼠點擊（目前無特殊處理）
function mousePressed() {
  // 處理是/否按鈕點擊
  if (isDialogueActive && useTrueFalse && quizState === 'ASKING') {
    // 檢查是否點擊到是按鈕
    if (mouseX >= tfButtonYes.x && mouseX <= tfButtonYes.x + tfButtonYes.w && mouseY >= tfButtonYes.y && mouseY <= tfButtonYes.y + tfButtonYes.h) {
      handleTFAnswer(true);
      return;
    }
    // 否按鈕
    if (mouseX >= tfButtonNo.x && mouseX <= tfButtonNo.x + tfButtonNo.w && mouseY >= tfButtonNo.y && mouseY <= tfButtonNo.y + tfButtonNo.h) {
      handleTFAnswer(false);
      return;
    }
  }
  // 其他互動保留
}

// --- 問答遊戲相關函式 ---

/**
 * 開始問答遊戲
 */
function startQuiz() {
  quizState = 'ASKING';
  pickNewQuestion();
}

/**
 * 從題庫中隨機抽取一個新題目
 */
function pickNewQuestion() {
  let questionIndex = floor(random(quizData.getRowCount()));
  currentQuestion = quizData.getRow(questionIndex);
  
  quizDialogueText = currentQuestion.getString('question');
  quizState = 'ASKING';
  kirbyInput.value(''); // 清空輸入框
  // 若為提示功能：若玩家靠近海綿寶寶會顯示 hint（在 draw 內處理）
}

/**
 * 檢查玩家輸入的答案
 */
function checkAnswer() {
  if (quizState !== 'ASKING') return;

  const playerAnswer = kirbyInput.value();
  const correctAnswer = currentQuestion.getString('answer');

  if (playerAnswer === correctAnswer) {
    quizDialogueText = currentQuestion.getString('correct_feedback');
  } else {
    quizDialogueText = currentQuestion.getString('incorrect_feedback');
  }
  quizState = 'FEEDBACK';
  setTimeout(pickNewQuestion, 3000); // 3秒後出下一題
}

// 處理是/否題的答案（傳入 boolean）
function handleTFAnswer(valueBool) {
  if (quizState !== 'ASKING') return;
  // 將按鈕選項轉為可比對字串
  const playerTF = valueBool ? 'true' : 'false';
  const correctAnswerRaw = currentQuestion.getString('answer');
  const correctTF = normalizeTF(correctAnswerRaw);
  if (playerTF === correctTF) {
    quizDialogueText = currentQuestion.getString('correct_feedback');
  } else {
    quizDialogueText = currentQuestion.getString('incorrect_feedback');
    // 扣一顆愛心
    lives = max(0, lives - 1);
    if (lives <= 0) {
      gameOver = true;
    }
  }
  quizState = 'FEEDBACK';
  // 等待一段時間後出下一題，或結束
  setTimeout(() => {
    if (!gameOver) pickNewQuestion();
    else quizDialogueText = '遊戲結束！';
  }, 1500);
}

// 將題庫中的答案字串標準化為 'true' 或 'false'
function normalizeTF(raw) {
  if (!raw) return 'false';
  const s = raw.toString().trim().toLowerCase();
  if (s === '是' || s === 'yes' || s === 'y' || s === 'true' || s === '1') return 'true';
  return 'false';
}

// 將圖片背景色（以左上角像素為樣本）變成透明
function makeTransparent(img, tolerance) {
  if (!img || !img.width) return img;
  if (typeof tolerance === 'undefined') tolerance = 30;
  img.loadPixels();
  const w = img.width;
  const h = img.height;

  // 取得左上角像素作為背景樣本
  const bg = img.get(0, 0);
  const br = red(bg);
  const bgc = green(bg);
  const bb = blue(bg);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = 4 * (y * w + x);
      const r = img.pixels[idx];
      const g = img.pixels[idx + 1];
      const b = img.pixels[idx + 2];
      // 比較距離來決定是否認定為背景
      const d = dist(r, g, b, br, bgc, bb);
      if (d <= tolerance) {
        img.pixels[idx + 3] = 0; // 透明
      }
    }
  }
  img.updatePixels();
  return img;
}

// 當視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 移除靠近深藍色（線條雜訊）的像素
// options: { blueMin, rgMax, diffMin }
function removeDarkBlueLines(img, options) {
  if (!img || !img.width) return img;
  const opt = Object.assign({blueMin:80, rgMax:60, diffMin:30}, options || {});
  img.loadPixels();
  const w = img.width;
  const h = img.height;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = 4 * (y * w + x);
      const r = img.pixels[idx];
      const g = img.pixels[idx + 1];
      const b = img.pixels[idx + 2];

      // 如果藍色夠深且紅綠都很低，並且藍色與紅/綠差距夠大，視為深藍線條 -> 透明
      const maxRG = max(r, g);
      if (b >= opt.blueMin && maxRG <= opt.rgMax && (b - maxRG) >= opt.diffMin) {
        img.pixels[idx + 3] = 0;
      }
    }
  }
  img.updatePixels();
  return img;
}
