const hight = document.querySelector('#hight');
const weight = document.querySelector('#weight');
const enter = document.querySelector('.btns :nth-child(1)');
const clear = document.querySelector('.btns :nth-child(2)');
const bmi = document.querySelector('.bmi p');
const level = document.querySelector('.level p');
const todo = document.querySelector('.todo p');
const card = document.querySelector('.card-2');
const animate1 = document.querySelector('.bmi');
const animate2 = document.querySelector('.level');
const animate3 = document.querySelector('.todo');
console.log(card);
console.log(animate1);





enter.addEventListener('click', function () {
    let x = hight.value;
    let y = weight.value;
    card.classList.add('active');
    animate1.classList.add('animate')
    animate2.classList.add('animate')
    animate3.classList.add('animate')
    level.innerHTML = '';
    todo.innerHTML = '';
    bmi.textContent = '';
    if (isNaN(parseInt(x)) || isNaN(parseInt(y))) {
        bmi.textContent = '輸入錯誤';
    } else if ((x == '' || x <= 0) && (y == '' || y <= 0)) {
        bmi.textContent = '輸入錯誤';
    } else if (x == '' || x <= 0 || x >= 300) {
        bmi.textContent = '身高輸入錯誤';
    } else if (y == '' || y <= 0 || y >= 300) {
        bmi.textContent = '體重輸入錯誤';
    } else {
        const fx = y / (x / 100) / (x / 100);
        bmi.textContent = fx.toFixed(2);

        if (fx >= 24) {
            level.innerHTML = '過重';;
            todo.innerHTML = '吃少一點';
        } else if (fx >= 18) {
            level.innerHTML = '正常';
            todo.innerHTML = '真棒';
        } else if (fx < 18) {
            level.innerHTML = '過輕';
            todo.innerHTML = '吃多一點';
        }
    }
})

clear.addEventListener('click', function () {
    hight.value = '';
    weight.value = '';
    bmi.innerHTML = '';
    level.innerHTML = '';
    todo.innerHTML = '';
    animate3.classList.remove('animate')
    animate2.classList.remove('animate')
    animate1.classList.remove('animate')
    setTimeout(function () {
        card.classList.remove('active');
    }, 600);
})




window.addEventListener('keydown', function (e) {
    if (e.code == "NumpadEnter" || e.code == "Enter") {
        enter.click();
    }
    if (e.code == "Escape") {
        clear.click();
    }
});
