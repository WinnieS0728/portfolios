const board = document.querySelector('.board')
const stage = document.querySelector('.stage>span')
const score = document.querySelector('.score>span:nth-child(1)')
const stage_correct = document.querySelector('.stage>span:nth-child(2)')
const time_text = document.querySelector('.time')
const overBoard = document.querySelector('.overBoard')
const start = document.querySelector('.start')
const restart = document.querySelector('.overBoard a')
const pause = document.querySelector('.pauseBtn')
const pauseBoard = document.querySelector('.pauseBoard')
const rick_roll = document.querySelector('.pauseBoard audio')
const correct_wav = document.querySelector('.correct_wav')
const wrong_wav = document.querySelector('.wrong_wav')
const bgm_wav = document.querySelector('.bgm_wav')
const soundOn = document.querySelector('.soundOn')
const soundMute = document.querySelector('.soundMute')

console.dir(bgm_wav);
bgm_wav.volume = 0.7;



// 放方塊
function setBox() {
    let r = Math.floor(Math.random() * 255) + 1
    let g = Math.floor(Math.random() * 255) + 1
    let b = Math.floor(Math.random() * 255) + 1
    let rdmNum = Math.floor(Math.random() * (level + 1) * (level + 1))
    let side = ((468 - (10 * level)) / (level + 1))
    board.innerHTML = '';
    for (let i = 0; i < (level + 1) * (level + 1); i++) {
        if (i == rdmNum) {
            board.innerHTML += `<div class="color-box stage${level} answer" style="background-color: rgba(${r},${g},${b},0.5);width:${side}px;height:${side}px;"></div>`;
        } else {
            board.innerHTML += `<div class="color-box stage${level}" style="background-color: rgba(${r},${g},${b});width:${side}px;height:${side}px;"></div>`;
        }
    }
}


// 遊戲機制設定
let level = 1;
let scoreNum = 0;
let correct = 0;
function reset() {
    setBox();
    const boxes = document.querySelectorAll('.color-box')
    boxes.forEach(function (box) {
        box.addEventListener('click', function () {
            if (box.classList.contains('answer')) {
                correct_wav.play()
                correct_wav.currentTime = 0;
                setBox();
                stage.textContent = level;
                scoreNum += 1;
                correct += 1;
                stage_correct.textContent = ` - ${correct % 3 + 1}`;
                score.textContent = scoreNum;
                if (correct % 3 == 0) {
                    level += 1;
                    correct = 0;
                    stage.textContent = level;
                }
                reset()
            } else {
                wrong_wav.play()
                wrong_wav.currentTime = 0;
                if (scoreNum > 0) {
                    scoreNum = scoreNum - 1;
                    score.textContent = scoreNum;
                }
                if (correct % 3 != 0) {
                    correct -= 1;
                    stage_correct.textContent = ` - ${correct % 3 + 1}`;
                    reset();
                }
            }
        })
    })
}





// 計時器+開始暫停鍵
let time = 60;
let timer;
time_text.textContent = time;
start.addEventListener('click', function () {
    bgm_wav.play()
    bgm_wav.loop = true;
    stage.textContent = '1';
    score.textContent = '0';
    stage_correct.textContent = ` - ${correct % 3 + 1}`
    reset();
    time_text.textContent = time;
    timer = setInterval(function () {
        if (time > 0) {
            time--;
        } else {
            bgm_wav.pause()
            clearInterval();
            overBoard.classList.add('over');
        }
        time_text.textContent = time;
    }, 1000);

    pause.addEventListener('click', function () {
        pauseBoard.classList.toggle('pause');
        if (pause.textContent == 'pause') {
            pause.textContent = 'play';
            pauseBoard.classList.add('active')
            rick_roll.play();
            rick_roll.loop = true;
            bgm_wav.pause()
            clearInterval(timer)
        } else {
            pause.textContent = 'pause';
            pauseBoard.classList.remove('active')
            rick_roll.pause();
            rick_roll.currentTime = 0;
            bgm_wav.play()
            timer = setInterval(function () {
                if (time > 0) {
                    time--;
                } else {
                    clearInterval();
                    overBoard.classList.add('over');
                    bgm_wav.pause()
                }
                time_text.textContent = time;
            }, 1000);
        }
    })
})


// 聲音開關
function onMute() {
    soundOn.addEventListener('click', function () {
        soundOn.classList.add('none')
        soundMute.classList.remove('none')
        bgm_wav.muted = true;
        rick_roll.muted = true;
        correct_wav.muted = true;
        wrong_wav.muted = true;
    })
    soundMute.addEventListener('click', function () {
        soundMute.classList.add('none')
        soundOn.classList.remove('none')
        bgm_wav.muted = false;
        rick_roll.muted = false;
        correct_wav.muted = false;
        wrong_wav.muted = false;
    })
}
onMute()



// 重新開始-動畫
restart.addEventListener('mousedown', function () {
    console.log(1);
    restart.classList.add('move')
})
restart.addEventListener('mouseup', function () {
    console.log(2);
    restart.classList.remove('move')
})
restart.addEventListener('mouseout', function () {
    console.log(2);
    restart.classList.remove('move')
})




