
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

// 怪物角色資源
let monsterIdleSpriteSheet;
let monsterIdleFrames = [];
const monsterIdleFrameWidth = 275 / 10; // 27.5
const monsterIdleFrameHeight = 28;
const totalMonsterIdleFrames = 10;

let monsterX, monsterY;
let isKirbyEaten = false; // 卡比是否被吃掉
let isLevel3 = false; // 是否進入第三關
let monsterLevel3Counter = 0; // 第三關怪物動畫計數器
let particles = []; // 粒子系統陣列

// 第二關角色資源
let blueSpriteSheet;
let blueFrames = [];
const blueFrameWidth = 615 / 10; // 61.5
const blueFrameHeight = 60;
const totalBlueFrames = 10;

let pinkSpriteSheet;
let pinkFrames = [];
const pinkFrameWidth = 215 / 8; // 26.875
const pinkFrameHeight = 38;
const totalPinkFrames = 8;

// 庫巴角色資源
let bowserSpriteSheet;
let bowserFrames = [];
const bowserFrameWidth = 507 / 8; // 63.375
const bowserFrameHeight = 69;
const totalBowserFrames = 8;

// 蘑菇角色資源
let mushroomSpriteSheet;
let mushroomFrames = [];
const mushroomFrameWidth = 184 / 9; // 20.444...
const mushroomFrameHeight = 23;
const totalMushroomFrames = 9;

// 加一命角色資源（3 幀動畫）
let addLifeFrames = [];
const totalAddLifeFrames = 3; // 使用 0.png, 1.png, 2.png
const addLifeDisplayWidth = 97; // 要繪製的寬（恢復原寬）
const addLifeDisplayHeight = 28 * 2; // 要繪製的高（原本的兩倍）
let addLifeX, addLifeY; // 加一命角色的位置
// 加一命位置
let cnv; // p5 畫布引用（用於設定全螢幕樣式）
let bgImage; // 背景圖片
let bgImage2; // 背景圖片2 (傳送後)
let bgImage3; // 背景圖片3
let bgImageOver; // 結束背景
let bgImageStart; // 開始畫面背景

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
let availableQuestionIndices = []; // 儲存尚未問過的題目索引

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
let questionsAnswered = 0; // 記錄已回答的題數
let questionsCorrect = 0; // 記錄已答對的題數
let damageEffectTimer = 0; // 答錯特效計時器
let correctEffectTimer = 0; // 答對特效計時器
let isGameCleared = false; // 是否完全通關
let gameState = 'START'; // 遊戲狀態: START (開始畫面), NAME_INPUT (輸入名稱), PLAYING (遊戲中)
let nameInput; // 玩家名稱輸入框
let playerName = ''; // 玩家名稱
let notesIframe; // 筆記 iframe
let closeNotesButton; // 關閉筆記按鈕
let isViewingNotes = false; // 是否正在查看筆記
let bgm; // 背景音樂變數
let failSound; // 失敗音效變數
let successSound; // 成功音效變數
let gameOverSound; // 遊戲結束音效變數
let addLifeSound; // 加命音效變數
let gameClearSound; // 通關音效變數
let volumeSlider; // 音量控制滑桿
let addLifeTextActive = false; // +1 文字動畫狀態
let addLifeTextX = 0;
let addLifeTextY = 0;
let addLifeTextTimer = 0;

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

  // 載入怪物待機動畫
  monsterIdleSpriteSheet = loadImage('怪物/全部怪物.png',
    () => console.log('怪物待機圖片載入成功！'),
    () => console.error('錯誤：無法載入怪物待機圖片！')
  );

  // 載入第二關角色
  blueSpriteSheet = loadImage('小藍/全部小藍.png',
    () => console.log('小藍圖片載入成功！'),
    () => console.error('錯誤：無法載入小藍圖片！')
  );
  pinkSpriteSheet = loadImage('小粉/全部小粉.png',
    () => console.log('小粉圖片載入成功！'),
    () => console.error('錯誤：無法載入小粉圖片！')
  );

  // 載入庫巴角色
  bowserSpriteSheet = loadImage('庫巴/全部庫巴.png',
    () => console.log('庫巴圖片載入成功！'),
    () => console.error('錯誤：無法載入庫巴圖片！')
  );

  // 載入蘑菇角色
  mushroomSpriteSheet = loadImage('蘑菇/全部蘑菇.png',
    () => console.log('蘑菇圖片載入成功！'),
    () => console.error('錯誤：無法載入蘑菇圖片！')
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

  // 載入背景圖片
  bgImage = loadImage('背景/1.png',
    () => console.log('背景圖片載入成功！'),
    () => console.error('錯誤：無法載入背景圖片！')
  );
  // 載入背景圖片2
  bgImage2 = loadImage('背景/2.png',
    () => console.log('背景圖片2載入成功！'),
    () => console.error('錯誤：無法載入背景圖片2！')
  );
  // 載入背景圖片3
  bgImage3 = loadImage('背景/3.png',
    () => console.log('背景圖片3載入成功！'),
    () => console.error('錯誤：無法載入背景圖片3！')
  );
  // 載入結束背景
  bgImageOver = loadImage('背景/結束.png',
    () => console.log('結束背景載入成功！'),
    () => console.error('錯誤：無法載入結束背景！')
  );
  // 載入開始畫面背景
  bgImageStart = loadImage('背景/開始.png',
    () => console.log('開始背景載入成功！'),
    () => console.error('錯誤：無法載入開始背景！')
  );

  // 載入背景音樂
  bgm = loadSound('背景音樂.mp3',
    () => console.log('音樂載入成功！'),
    () => console.error('錯誤：無法載入音樂！')
  );

  // 載入失敗音效
  failSound = loadSound('失敗音效.mp3',
    () => console.log('失敗音效載入成功！'),
    () => console.error('錯誤：無法載入失敗音效！')
  );

  // 載入成功音效
  successSound = loadSound('成功音效.mp3',
    () => console.log('成功音效載入成功！'),
    () => console.error('錯誤：無法載入成功音效！')
  );

  // 載入遊戲結束音效
  gameOverSound = loadSound('遊戲結束.mp3',
    () => console.log('遊戲結束音效載入成功！'),
    () => console.error('錯誤：無法載入遊戲結束音效！')
  );

  // 載入加命音效
  addLifeSound = loadSound('加命音效.mp3',
    () => console.log('加命音效載入成功！'),
    () => console.error('錯誤：無法載入加命音效！')
  );

  // 載入通關音效
  gameClearSound = loadSound('通關.mp3',
    () => console.log('通關音效載入成功！'),
    () => console.error('錯誤：無法載入通關音效！')
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
  
  // 設定怪物位置 (在星星右邊)
  monsterX = spinnerX + 300; 
  monsterY = characterY;

  // 設定加一命角色的初始位置（暫時靠在海綿寶寶左邊）
  addLifeX = spongebobX - (spongebobFrameWidth * scaleFactor) / 2 - addLifeDisplayWidth / 2 - 10;
  addLifeY = spongebobY;

  // 建立音量滑桿 (最小值 0, 最大值 1, 預設 0.5, 間距 0.01)
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(20, height - 40);
  volumeSlider.style('width', '100px');

  // --- 音量設定區 (0.0 為靜音，1.0 為最大聲) ---
  if (bgm) bgm.setVolume(0.5);           // 背景音樂
  if (failSound) failSound.setVolume(4.0);     // 失敗音效 (增益)
  if (successSound) successSound.setVolume(0.25); // 成功音效
  if (gameOverSound) gameOverSound.setVolume(0.8); // 遊戲結束音效
  if (addLifeSound) addLifeSound.setVolume(0.2); // 加命音效
  if (gameClearSound) gameClearSound.setVolume(0.4); // 通關音效

  // 初始化可用題目索引
  if (quizData) {
    for (let i = 0; i < quizData.getRowCount(); i++) {
      availableQuestionIndices.push(i);
    }
  }

  // --- 對話系統設定 ---
  // 建立文字輸入框但先隱藏
  kirbyInput = createInput();
  kirbyInput.hide();
  kirbyInput.style('font-size', '18px');

  // 建立玩家名稱輸入框
  nameInput = createInput();
  nameInput.position(width / 2 - 100, height / 2);
  nameInput.size(200, 30);
  nameInput.style('font-size', '20px');
  nameInput.hide();

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

  // 切割怪物待機動畫
  if (monsterIdleSpriteSheet.width > 0) {
    for (let i = 0; i < totalMonsterIdleFrames; i++) {
      let x = Math.round(i * monsterIdleFrameWidth);
      let w = Math.round(monsterIdleFrameWidth);
      monsterIdleFrames.push(monsterIdleSpriteSheet.get(x, 0, w, monsterIdleFrameHeight));
    }
  }

  // 切割小藍動畫
  if (blueSpriteSheet.width > 0) {
    for (let i = 0; i < totalBlueFrames; i++) {
      let x = Math.round(i * blueFrameWidth);
      let w = Math.round(blueFrameWidth);
      blueFrames.push(blueSpriteSheet.get(x, 0, w, blueFrameHeight));
    }
  }

  // 切割小粉動畫
  if (pinkSpriteSheet.width > 0) {
    for (let i = 0; i < totalPinkFrames; i++) {
      let x = Math.round(i * pinkFrameWidth);
      let w = Math.round(pinkFrameWidth);
      pinkFrames.push(pinkSpriteSheet.get(x, 0, w, pinkFrameHeight));
    }
  }

  // 切割庫巴動畫
  if (bowserSpriteSheet.width > 0) {
    for (let i = 0; i < totalBowserFrames; i++) {
      let x = Math.round(i * bowserFrameWidth);
      let w = Math.round(bowserFrameWidth);
      bowserFrames.push(bowserSpriteSheet.get(x, 0, w, bowserFrameHeight));
    }
  }

  // 切割蘑菇動畫
  if (mushroomSpriteSheet.width > 0) {
    for (let i = 0; i < totalMushroomFrames; i++) {
      let x = Math.round(i * mushroomFrameWidth);
      let w = Math.round(mushroomFrameWidth);
      mushroomFrames.push(mushroomSpriteSheet.get(x, 0, w, mushroomFrameHeight));
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
  // 預先清除背景，避免震動時邊緣出現殘影
  background(0);

  // 設定總音量 (Master Volume)
  if (volumeSlider) outputVolume(volumeSlider.value());

  // --- 遊戲狀態控制 ---
  if (gameState === 'START') {
    // --- 開始畫面 ---
    if (bgImageStart) {
      image(bgImageStart, width / 2, height / 2, width, height);
    } else {
      background(100, 150, 200);
    }

    // 顯示製作人資訊
    fill(255);
    textSize(24);
    textAlign(LEFT, TOP);
    text('學號:414730589 姓名:黃讌婷', 10, 10);

    // 標題 (可選)
    // fill(255);
    // textSize(60);
    // textAlign(CENTER, CENTER);
    // text("卡比大冒險", width / 2, height / 3);

    // 繪製 "開始遊戲" 按鈕
    let btnW = 200;
    let btnH = 60;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 50;

    // 按鈕樣式
    fill(255, 200, 0);
    rectMode(CORNER);
    rect(btnX, btnY, btnW, btnH, 15);
    
    // 按鈕文字
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("開始遊戲", width / 2, btnY + btnH / 2);
    drawVolumeUI(); // 繪製音量文字
    return; // 停止繪製後續內容

  } else if (gameState === 'NAME_INPUT') {
    // --- 輸入名稱畫面 ---
    if (bgImageStart) {
      image(bgImageStart, width / 2, height / 2, width, height);
    } else {
      background(100, 150, 200);
    }

    // 提示文字
    fill(255);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("請輸入您的名稱", width / 2, height / 2 - 60);

    // 確保輸入框顯示並定位
    nameInput.show();
    nameInput.position(width / 2 - 100, height / 2);

    // 繪製 "確定" 按鈕
    let btnW = 120;
    let btnH = 50;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 60;

    fill(60, 200, 60);
    rectMode(CORNER);
    rect(btnX, btnY, btnW, btnH, 10);

    fill(255);
    textSize(24);
    text("確定", width / 2, btnY + btnH / 2);
    drawVolumeUI(); // 繪製音量文字
    return; // 停止繪製後續內容
  }

  // --- 以下為遊戲主迴圈 (gameState === 'PLAYING') ---

  // --- 遊戲結束畫面 ---
  if (gameOver) {
    // 顯示結束背景
    if (bgImageOver) {
      image(bgImageOver, width / 2, height / 2, width, height);
    }

    // 顯示文字
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("遊戲結束，太可惜了", width / 2, height / 2 - 50);

    // 繪製 "再玩一次" 按鈕
    rectMode(CORNER); // 確保按鈕繪製位置正確
    let btnW = 200;
    let btnH = 60;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 50;

    fill(255);
    rect(btnX, btnY, btnW, btnH, 10);
    fill(0);
    textSize(32);
    text("再玩一次", width / 2, btnY + btnH / 2);
    drawVolumeUI(); // 繪製音量文字
    return; // 停止繪製其餘遊戲內容
  }

  // --- 震動特效 ---
  let shakeX = 0;
  let shakeY = 0;
  if (damageEffectTimer > 0) {
    shakeX = random(-8, 8);
    shakeY = random(-8, 8);
  }
  push();
  translate(shakeX, shakeY);

  // 設定背景顏色
  if (isLevel3 && bgImage3) {
    image(bgImage3, width / 2, height / 2, width, height);
  } else if (isKirbyEaten && bgImage2) {
    image(bgImage2, width / 2, height / 2, width, height);
  } else if (bgImage) {
    image(bgImage, width / 2, height / 2, width, height);
  } else {
    background('#ffcad4');
  }

  // --- 顯示學生資訊 ---
  push();
  textSize(32); // 設定文字大小
  let displayPlayerName = '玩家:' + playerName;
  let nameW = textWidth(displayPlayerName);
  
  // 繪製半透明背景 (右上角)
  noStroke();
  fill(255, 255, 255, 150); // 半透明白底
  rectMode(CORNER);
  rect(width - nameW - 30, 10, nameW + 20, 45, 10); // 背景框

  fill(0); // 設定文字為黑色
  textAlign(RIGHT, CENTER); // 設定文字對齊右上角垂直置中
  text(displayPlayerName, width - 20, 10 + 45 / 2); // 在右上角繪製文字
  pop();

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
      if (addLifeSound) addLifeSound.play();
      // 觸發 +1 文字動畫
      addLifeTextActive = true;
      addLifeTextX = characterX;
      addLifeTextY = characterY - 60;
      addLifeTextTimer = 40; // 持續 40 幀
    }
  }

  // --- 海綿寶寶邏輯 ---
  // 偵測碰撞
  const collisionDistance = 100; // 觸發碰撞的距離閾值 (僅在第一關有效)
  if (!isKirbyEaten && dist(characterX, characterY, spongebobX, spongebobY) < collisionDistance && !isSpongebobFalling) {
    isSpongebobFalling = true; // 觸發跌倒狀態
    fallFrameCounter = 0; // 從第一幀開始播放跌倒動畫
    // 記錄被撞到的方向，以便正確翻轉跌倒動畫
    spongebobFallDirection = (characterX > spongebobX) ? 1 : -1;
  }

  // 根據狀態繪製海綿寶寶
  if (isLevel3) {
    // --- 第三關：顯示蘑菇 (提示者) ---
    if (mushroomFrames.length > 0) {
      let frameIndex = floor(currentFrame) % totalMushroomFrames;
      let img = mushroomFrames[frameIndex];
      // 判斷方向
      let direction = (characterX > spongebobX) ? 1 : -1;
      push();
      translate(spongebobX, spongebobY);
      scale(direction, 1);
      image(img, 0, 0, mushroomFrameWidth * scaleFactor, mushroomFrameHeight * scaleFactor);
      pop();
    }
  } else if (isKirbyEaten) {
    // --- 第二關：顯示小粉 (提示者) ---
    if (pinkFrames.length > 0) {
      let frameIndex = floor(currentFrame) % totalPinkFrames;
      let img = pinkFrames[frameIndex];
      // 判斷方向
      let direction = (characterX > spongebobX) ? 1 : -1;
      push();
      translate(spongebobX, spongebobY);
      scale(direction, 1);
      image(img, 0, 0, pinkFrameWidth * scaleFactor, pinkFrameHeight * scaleFactor);
      pop();
    }
  } else {
    // --- 第一關：顯示海綿寶寶 ---
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
      // 繪製邏輯在下方共用
    }
    // 判斷卡比相對於海綿寶寶的位置來決定方向
    let spongebobDirection = (characterX > spongebobX) ? 1 : -1;

    // 使用 push/pop 來獨立翻轉海綿寶寶，不影響其他繪圖
    push();
    translate(spongebobX, spongebobY); // 將原點移到海綿寶寶的位置
    scale(spongebobDirection, 1); // 根據方向翻轉 X 軸
    if (!isSpongebobFalling && !isKirbyEaten && spongebobFrames.length > 0) {
       image(spongebobFrames[floor(currentFrame) % totalSpongebobFrames], 0, 0, spongebobFrameWidth * scaleFactor, spongebobFrameHeight * scaleFactor);
    }
    pop();
  }

  // 繪製海綿寶寶頭上的文字
  // 當卡比靠近海綿寶寶時，顯示當前題目的提示文字（若有）
  // 判斷是否達成通關條件
  let levelCompleted = (!isKirbyEaten && questionsCorrect >= 2) || (isKirbyEaten && !isLevel3 && questionsCorrect >= 4) || (isLevel3 && questionsCorrect >= 6);

  if (dist(characterX, characterY, spongebobX, spongebobY) < 140) {
    if (levelCompleted) {
      spongebobText = '(這麼優秀~~)';
    } else if (currentQuestion) {
      spongebobText = currentQuestion.getString('hint');
    } else {
      spongebobText = '';
    }
  } else {
    spongebobText = '';
  }
  if (spongebobText) {
    push();
    textSize(24);
    textAlign(CENTER, CENTER);
    
    // 繪製文字背景框
    noStroke();
    fill(255, 255, 255, 200); // 半透明白底
    rectMode(CENTER);
    let tw = textWidth(spongebobText);
    rect(spongebobX, spongebobY - 130, tw + 20, 40, 5);
    triangle(spongebobX - 10, spongebobY - 110, spongebobX + 10, spongebobY - 110, spongebobX, spongebobY - 100);

    fill(0);
    text(spongebobText, spongebobX, spongebobY - 130);
    pop();
  }

  // 顯示提示者下方的固定文字
    push();
    textSize(20);
    textAlign(CENTER, CENTER);
    let subText = "不會可以來問我喔~~!";
    let subY = spongebobY + 130;

    // 繪製文字背景框
    noStroke();
    fill(255, 255, 255, 200);
    rectMode(CENTER);
    let tw = textWidth(subText);
    rect(spongebobX, subY, tw + 20, 35, 5);
    triangle(spongebobX - 8, subY - 17.5, spongebobX + 8, subY - 17.5, spongebobX, subY - 25);

    fill(0);
    text(subText, spongebobX, subY);
    pop();

  // --- 轉圈角色邏輯 ---
  let currentQuestionerImg;
  let currentQuestionerW, currentQuestionerH;

  if (isLevel3) {
    // --- 第三關：顯示庫巴 (提問者) ---
    if (bowserFrames.length > 0) {
      let frameIndex = floor(currentFrame) % totalBowserFrames;
      currentQuestionerImg = bowserFrames[frameIndex];
      currentQuestionerW = bowserFrameWidth;
      currentQuestionerH = bowserFrameHeight;
    }
  } else if (isKirbyEaten) {
    // --- 第二關：顯示小藍 (提問者) ---
    if (blueFrames.length > 0) {
      let frameIndex = floor(currentFrame) % totalBlueFrames;
      currentQuestionerImg = blueFrames[frameIndex];
      currentQuestionerW = blueFrameWidth;
      currentQuestionerH = blueFrameHeight;
    }
  } else {
    // --- 第一關：顯示轉圈角色 ---
    if (spinnerFrames.length > 0) {
      let frameIndex = floor(currentFrame) % totalSpinnerFrames;
      currentQuestionerImg = spinnerFrames[frameIndex];
      currentQuestionerW = spinnerFrameWidth;
      currentQuestionerH = spinnerFrameHeight;
    }
  }

  if (currentQuestionerImg) {
    image(currentQuestionerImg, spinnerX, spinnerY, currentQuestionerW * scaleFactor, currentQuestionerH * scaleFactor);

    // --- 對話觸發與顯示 ---
    const dialogueDistance = 120;
    // 如果卡比靠近轉圈角色，且問答未開始
    let maxQuestions = 2;
    if (isLevel3) maxQuestions = 6;
    else if (isKirbyEaten) maxQuestions = 4;
    if (dist(characterX, characterY, spinnerX, spinnerY) < dialogueDistance && quizState === 'IDLE' && questionsCorrect < maxQuestions) {
      isDialogueActive = true;
      // 進入是/否問答模式
      useTrueFalse = true;
      kirbyInput.hide();
      startQuiz(); // 開始問答（會載入 currentQuestion）
    }

    // 判斷是否顯示對話框：對話進行中，或是已通關且靠近角色
    let showBubble = isDialogueActive;
    if (levelCompleted && dist(characterX, characterY, spinnerX, spinnerY) < dialogueDistance) {
      showBubble = true;
      quizDialogueText = '(可以前往下一關瞜!)';
    }

    if (showBubble) {
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

      // 顯示轉圈角色頭上的文字 (題目或回饋)，顯示在角色上方
      push();
      textSize(22);
      textAlign(CENTER, CENTER);
      // 根據角色高度調整文字位置 (小藍較高)
      let textOffsetY = isKirbyEaten ? -180 : -80;

      // 繪製文字背景框
      noStroke();
      fill(255, 255, 255, 200);
      rectMode(CENTER);
      let tw = textWidth(quizDialogueText);
      rect(spinnerX, spinnerY + textOffsetY, tw + 20, 40, 5);
      triangle(spinnerX - 10, spinnerY + textOffsetY + 20, spinnerX + 10, spinnerY + textOffsetY + 20, spinnerX, spinnerY + textOffsetY + 30);

      fill(0);
      text(quizDialogueText, spinnerX, spinnerY + textOffsetY);
      pop();
      
      // 顯示並定位輸入框（只有當不是是/否題時顯示）
      if (isDialogueActive && !useTrueFalse) {
        kirbyInput.show();
        kirbyInput.position(boxX + labelWidth + boxPadding * 2, uiY - kirbyInput.height / 2);
      } else {
        kirbyInput.hide();
      }

      // 如果是/否題型，繪製兩個按鈕（是/否）讓玩家以滑鼠點選
      if (isDialogueActive && useTrueFalse) {
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

  // --- 怪物邏輯 ---
  let currentMonsterImg;
  let currentMonsterW, currentMonsterH;
  
  if (isLevel3) {
     // Level 3: 怪物直接消失，僅觸發一次煙霧特效
     if (monsterLevel3Counter === 0) {
        createExplosion(monsterX, monsterY);
        monsterLevel3Counter = 1;
     }
  } else if (isKirbyEaten) {
     // Level 2: 顯示怪物/1 (待機動畫)
     if (monsterIdleFrames.length > 0) {
        let frameIndex = floor(currentFrame) % totalMonsterIdleFrames;
        currentMonsterImg = monsterIdleFrames[frameIndex];
        currentMonsterW = monsterIdleFrameWidth;
        currentMonsterH = monsterIdleFrameHeight;
     }
     // 檢查碰撞進入 Level 3 (需答對 4 題)
     if (dist(characterX, characterY, monsterX, monsterY) < 150 && questionsCorrect >= 4) {
        isLevel3 = true;
     }
  } else {
     // Level 1: 顯示怪物/1 (待機動畫)
     if (monsterIdleFrames.length > 0) {
        let frameIndex = floor(currentFrame) % totalMonsterIdleFrames;
        currentMonsterImg = monsterIdleFrames[frameIndex];
        currentMonsterW = monsterIdleFrameWidth;
        currentMonsterH = monsterIdleFrameHeight;
     }
     // 檢查碰撞進入 Level 2 (需答對 2 題)
     if (dist(characterX, characterY, monsterX, monsterY) < 150 && questionsCorrect >= 2) {
        isKirbyEaten = true;
     }
  }
  
  if (currentMonsterImg) {
      image(currentMonsterImg, monsterX, monsterY, currentMonsterW * scaleFactor, currentMonsterH * scaleFactor);
  }

  // --- 通關特效 (Level 3 完成) ---
  if (isGameCleared) {
    // 半透明遮罩讓背景變暗，突顯特效
    noStroke();
    fill(0, 0, 0, 50);
    rectMode(CORNER);
    rect(0, 0, width, height);

    // 持續產生煙火 (利用現有的粒子系統)
    if (frameCount % 10 === 0) {
      createExplosion(random(width * 0.1, width * 0.9), random(height * 0.1, height * 0.8));
    }

    push();
    textAlign(CENTER, CENTER);
    // 彈跳文字大小
    let s = 80 + sin(frameCount * 0.1) * 10;
    textSize(s);
    // 閃爍顏色
    fill(random(150, 255), random(150, 255), random(150, 255));
    stroke(0);
    strokeWeight(5);
    text("恭喜通關！", width / 2, height / 2);
    pop();

    // 繪製 "查看筆記" 按鈕
    if (!isViewingNotes) {
      let btnW = 200;
      let btnH = 60;
      let btnX = width / 2 - btnW / 2;
      let btnY = height / 2 + 80;

      push();
      // Hover 效果：檢查滑鼠是否在按鈕範圍內
      if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
        fill(100, 180, 255); // 懸停時顏色變亮
      } else {
        fill(50, 150, 255); // 原始顏色
      }
      rectMode(CORNER);
      rect(btnX, btnY, btnW, btnH, 10);
      
      fill(255);
      textSize(28);
      textAlign(CENTER, CENTER);
      text("查看筆記", width / 2, btnY + btnH / 2);
      pop();

      // 繪製 "再玩一次" 按鈕
      let btnY2 = height / 2 + 150;
      push();
      // Hover 效果
      if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY2 && mouseY <= btnY2 + btnH) {
        fill(255, 230, 50); // 懸停時顏色變亮
      } else {
        fill(255, 200, 0); // 原始顏色
      }
      rectMode(CORNER);
      rect(btnX, btnY2, btnW, btnH, 10);
      
      fill(0);
      textSize(28);
      textAlign(CENTER, CENTER);
      text("再玩一次", width / 2, btnY2 + btnH / 2);
      pop();
    }
  }

  // 更新並繪製粒子特效
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();
    if (p.finished()) {
      particles.splice(i, 1);
    }
  }

  // 怪物提示文字：當卡比靠近且未完成挑戰時顯示
  let showWarning = false;
  if (dist(characterX, characterY, monsterX, monsterY) < 150) {
    // 第一關未完成
    if (!isKirbyEaten && questionsCorrect < 2) showWarning = true;
    // 第二關未完成
    if (isKirbyEaten && !isLevel3 && questionsCorrect < 4) showWarning = true;
  }

  if (showWarning) {
    push();
    textSize(32);
    textAlign(CENTER, CENTER);
    
    // 限制文字位置不超出螢幕
    let tx = constrain(monsterX, 140, width - 140);
    let ty = constrain(monsterY - 200, 40, height - 40);
    let msg = '請先完成挑戰';

    // 繪製文字背景框 (深色警告風格)
    noStroke();
    fill(0, 0, 0, 180); // 半透明黑底
    rectMode(CENTER);
    let tw = textWidth(msg);
    rect(tx, ty, tw + 30, 50, 10);
    triangle(tx - 10, ty + 25, tx + 10, ty + 25, tx, ty + 35);

    fill(255); // 白色文字
    text(msg, tx, ty);
    pop();
  }

  // --- +1 加命文字動畫 ---
  if (addLifeTextActive) {
    push();
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 50, 50, map(addLifeTextTimer, 0, 40, 0, 255)); // 淡出效果
    stroke(255);
    strokeWeight(2);
    text("+1", addLifeTextX, addLifeTextY);
    pop();
    
    addLifeTextY -= 1; // 向上飄
    addLifeTextTimer--;
    if (addLifeTextTimer <= 0) {
      addLifeTextActive = false;
    }
  }

  // 繪製生命
  drawHearts();

  pop(); // 結束震動狀態

  // --- 答錯特效 (紅色閃爍) ---
  if (damageEffectTimer > 0) {
    push();
    rectMode(CORNER); // 確保從左上角繪製
    noStroke();
    // 紅色遮罩，透明度隨時間減少 (最大 alpha 150)
    fill(255, 0, 0, map(damageEffectTimer, 0, 10, 0, 150));
    rect(0, 0, width, height);
    pop();
    damageEffectTimer--;
  }

  // --- 答對特效 (綠色閃爍) ---
  if (correctEffectTimer > 0) {
    push();
    rectMode(CORNER);
    noStroke();
    // 綠色遮罩，透明度隨時間減少 (最大 alpha 150)
    fill(0, 255, 0, map(correctEffectTimer, 0, 10, 0, 150));
    rect(0, 0, width, height);
    pop();
    correctEffectTimer--;
  }

  // 繪製音量文字
  drawVolumeUI();

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
  // --- 處理開始畫面的點擊 ---
  if (gameState === 'START') {
    let btnW = 200;
    let btnH = 60;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 50;
    // 檢查是否點擊 "開始遊戲"
    if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
      gameState = 'NAME_INPUT';
      // 播放背景音樂 (循環播放)
      if (bgm && !bgm.isPlaying()) {
        bgm.loop();
      }
    }
    return;
  }

  // --- 處理輸入名稱畫面的點擊 ---
  if (gameState === 'NAME_INPUT') {
    let btnW = 120;
    let btnH = 50;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 60;
    // 檢查是否點擊 "確定"
    if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
      playerName = nameInput.value();
      if (playerName.trim() !== "") {
        gameState = 'PLAYING';
        nameInput.hide();
      }
    }
    return;
  }

  // 處理遊戲結束時的 "再玩一次" 按鈕
  if (gameOver) {
    let btnW = 200;
    let btnH = 60;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 50;
    if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
      resetGame();
    }
    return;
  }

  // 處理通關後的 "查看筆記" 按鈕
  if (isGameCleared && !isViewingNotes) {
    let btnW = 200;
    let btnH = 60;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 + 80;
    if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
      openNotes();
    }

    // 處理通關後的 "再玩一次" 按鈕
    let btnY2 = height / 2 + 150;
    if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY2 && mouseY <= btnY2 + btnH) {
      resetGame();
    }

    return;
  }

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
  // 如果沒有可用題目，重新填滿（防止題庫用盡）
  if (availableQuestionIndices.length === 0) {
    for (let i = 0; i < quizData.getRowCount(); i++) {
      availableQuestionIndices.push(i);
    }
  }

  // 從可用索引中隨機抽取並移除，避免重複
  let randIndex = floor(random(availableQuestionIndices.length));
  let questionIndex = availableQuestionIndices[randIndex];
  availableQuestionIndices.splice(randIndex, 1);

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
    correctEffectTimer = 10; // 觸發特效
    if (successSound) successSound.play();
  } else {
    quizDialogueText = currentQuestion.getString('incorrect_feedback');
    if (failSound) failSound.play();
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
    correctEffectTimer = 10; // 觸發特效
    questionsCorrect++;
    if (successSound) successSound.play();
  } else {
    quizDialogueText = currentQuestion.getString('incorrect_feedback');
    if (failSound) failSound.play();
    // 扣一顆愛心
    lives = max(0, lives - 1);
    damageEffectTimer = 10; // 觸發特效，持續 10 幀
    if (lives <= 0) {
      gameOver = true;
      if (bgm && bgm.isPlaying()) bgm.stop(); // 停止背景音樂
      if (gameOverSound) gameOverSound.play(); // 播放遊戲結束音效
    }
  }
  
  questionsAnswered++; // 增加已回答題數

  quizState = 'FEEDBACK';
  // 等待一段時間後出下一題，或結束
  setTimeout(() => {
    let maxQuestions = 2;
    if (isLevel3) maxQuestions = 6;
    else if (isKirbyEaten) maxQuestions = 4;
    if (!gameOver && questionsCorrect < maxQuestions) {
      pickNewQuestion();
    } else {
      quizDialogueText = '(可以前往下一關瞜!)';
      // 檢查是否為第三關且已完成所有題目 (Level 3 需要累積 6 題)
      if (isLevel3 && questionsCorrect >= 6) {
        isGameCleared = true;
        quizDialogueText = '恭喜完全通關！';
        if (bgm && bgm.isPlaying()) bgm.stop(); // 停止背景音樂
        if (gameClearSound) gameClearSound.play(); // 播放通關音效
      }
      quizState = 'IDLE';
      isDialogueActive = false; // 結束對話互動
    }
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

// --- 粒子特效系統 ---
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-8, 8); // 擴散速度
    this.vy = random(-8, 8);
    this.alpha = 255;
    // 隨機產生粉色/紫色系顏色，配合怪物顏色
    this.r = random(200, 255);
    this.g = random(50, 150);
    this.b = random(150, 255);
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 15; // 消失速度
  }

  show() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    ellipse(this.x, this.y, random(10, 25)); // 隨機大小
  }
}

function createExplosion(x, y) {
  for (let i = 0; i < 50; i++) { // 產生 50 個粒子
    particles.push(new Particle(x, y));
  }
}

// 重置遊戲狀態
function resetGame() {
  window.location.reload();
}

// 當視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 調整輸入框位置
  if (nameInput) nameInput.position(width / 2 - 100, height / 2);
  // 調整 iframe 大小
  if (notesIframe) {
    notesIframe.size(windowWidth, windowHeight);
    if (closeNotesButton) closeNotesButton.position(windowWidth - 120, 20);
  }
  if (volumeSlider) {
    volumeSlider.position(20, height - 40);
  }
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

// 開啟筆記 iframe
function openNotes() {
  isViewingNotes = true;
  if (!notesIframe) {
    notesIframe = createElement('iframe');
    notesIframe.position(0, 0);
    notesIframe.size(windowWidth, windowHeight);
    notesIframe.attribute('src', 'https://hackmd.io/@8R3rNBC5Tz2EDJ4XvI1alQ/rJlezF5Zbl');
    notesIframe.style('border', 'none');
    notesIframe.style('z-index', '1000');
    
    // 建立關閉按鈕
    closeNotesButton = createButton('關閉筆記');
    closeNotesButton.position(windowWidth - 120, 20);
    closeNotesButton.size(100, 40);
    closeNotesButton.style('z-index', '1001');
    closeNotesButton.style('font-size', '16px');
    closeNotesButton.mousePressed(closeNotes);
  } else {
    notesIframe.show();
    closeNotesButton.show();
  }
}

function closeNotes() {
  isViewingNotes = false;
  if (notesIframe) notesIframe.hide();
  if (closeNotesButton) closeNotesButton.hide();
}

// 繪製音量介面文字
function drawVolumeUI() {
  if (volumeSlider) {
    push();
    fill(255);
    textSize(16);
    textAlign(LEFT, CENTER);
    text("音量", 130, height - 32); // 位於滑桿右側
    pop();
  }
}
