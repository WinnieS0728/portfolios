fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-0309EC10-27F0-4C28-A583-A8AF7CDC94CC").then(function (r) {
    return r.json();
}).then(function (datas) {
    console.log(datas.records);

    // 預報時間
    let startTime = datas.records.location[11].weatherElement[0].time[0].startTime;
    let endtTime = datas.records.location[11].weatherElement[0].time[0].endTime;
    showTime.textContent = `預報時間  ${startTime} 至 ${endtTime}`


    function locate(locate) {
        let wx = datas.records.location[locate].weatherElement[0].time[0].parameter.parameterName;
        let minT = datas.records.location[locate].weatherElement[2].time[0].parameter.parameterName;
        let maxT = datas.records.location[locate].weatherElement[4].time[0].parameter.parameterName;
        let PoP = datas.records.location[locate].weatherElement[1].time[0].parameter.parameterName;


        weather.textContent = wx;
        lowTemp.textContent = minT;
        hiTemp.textContent = maxT;
        rain.textContent = PoP;

        // 資料重置
        areaTags.forEach(tag => {
            tag.addEventListener('click', function () {
                clearAnimate()
                weather.textContent = '天氣概況';
                lowTemp.textContent = '最低溫';
                hiTemp.textContent = '最高溫';
                rain.textContent = '降雨機率';
            })
        });

        // 天氣動畫
        const sun = document.querySelector('.sunny')
        const rainning = document.querySelector('.rainning')
        const wave = document.querySelector('.wave')
        const cloud = document.querySelector('.cloudy')

        function clearAnimate() {
            sun.classList.remove('active')
            rainDisActive()
            cloud.innerHTML = '';
        }

        function makeCloud() {
            let cloudNum = Math.floor(Math.random() * 3 + 1)
            for (let i = 0; i < cloudNum; i++) {
                let cloudX = Math.floor(Math.random() * 60 + 15)
                let cloudY = Math.floor(Math.random() * 20)
                cloud.innerHTML += `
                <img class="cloud" style="left:${cloudX}%; top:${cloudY}%;" src="./img/cloud.gif" alt="">`
            }
            setTimeout(function () {
                let cloudNew = document.querySelectorAll('.cloud')
                cloudNew.forEach(function (cloud) {
                    cloud.classList.add('active')
                })
            }, 100);
        }

        function rainActive() {
            rainning.classList.add('active')
            wave.classList.add('active')
            setTimeout(function () {
                wave.classList.add('soMuch')
            }, 10000)
        }
        function rainDisActive() {
            rainning.classList.remove('active')
            wave.classList.remove('active')
            wave.classList.remove('soMuch')
        }


        if (wx.includes('晴') && (wx.includes('雲') || wx.includes('陰')) && wx.includes('雨')) {
            clearAnimate()
            sun.classList.add('active')
            makeCloud()
            rainActive()
        } else if (wx.includes('晴') && (wx.includes('雲') || wx.includes('陰'))) {
            clearAnimate()
            sun.classList.add('active')
            makeCloud()
        } else if (wx.includes('晴') && wx.includes('雨')) {
            clearAnimate()
            sun.classList.add('active')
            rainActive()
        } else if ((wx.includes('雲') || wx.includes('陰')) && wx.includes('雨')) {
            clearAnimate()
            makeCloud()
            rainActive()
        } else if (wx.includes('晴')) {
            clearAnimate()
            sun.classList.add('active')
        } else if ((wx.includes('雲') || wx.includes('陰'))) {
            clearAnimate()
            makeCloud()
        } else if (wx.includes('雨')) {
            clearAnimate()
            rainActive()
        }
    }

    // 小標籤呈現
    allArea.addEventListener('click', function () {
        imgArea('all');
        locateName('all')
        cityName.innerHTML = '';
    })
    northArea.addEventListener('click', function () {
        imgArea('North');
        locateName('North')
        cityName.innerHTML = `
        <p class="city" data-weather="5">臺北市</p>
        <p class="city" data-weather="1">新北市</p>
        <p class="city" data-weather="18">基隆市</p>
        <p class="city" data-weather="4">新竹市</p>
        <p class="city" data-weather="13">桃園市</p>
        <p class="city" data-weather="3">新竹縣</p>
        <p class="city" data-weather="7">宜蘭縣</p>
        `
        locateConst()
    })
    midArea.addEventListener('click', function () {
        imgArea('Mid')
        locateName('Mid')
        cityName.innerHTML = `
        <p class="city" data-weather="8">苗栗縣</p>
        <p class="city" data-weather="11">臺中市</p>
        <p class="city" data-weather="20">彰化縣</p>
        <p class="city" data-weather="14">南投縣</p>
        <p class="city" data-weather="9">雲林縣</p>
        `
        locateConst()
    })
    southArea.addEventListener('click', function () {
        imgArea('South')
        locateName('South')
        cityName.innerHTML = `
        <p class="city" data-weather="0">嘉義縣</p>
        <p class="city" data-weather="2">嘉義市</p>
        <p class="city" data-weather="6">臺南市</p>
        <p class="city" data-weather="15">高雄市</p>
        <p class="city" data-weather="17">屏東縣</p>
        <p class="city" data-weather="19">澎湖縣</p>
        `
        locateConst()
    })
    eastArea.addEventListener('click', function () {
        imgArea('East')
        locateName('East')
        cityName.innerHTML = `
        <p class="city" data-weather="10">花蓮縣</p>
        <p class="city" data-weather="12">臺東縣</p>
        `
        locateConst()
    })
    outArea.addEventListener('click', function () {
        imgArea('Out')
        locateName('Out')
        cityName.innerHTML = `
        <p class="city" data-weather="16">金門縣</p>
        <p class="city" data-weather="21">連江縣</p>
        `
        locateConst()
    })

    // 小標籤宣告+觸發動作
    function locateConst() {
        p = document.querySelectorAll('.city')
        p.forEach(function (citys) {
            citys.addEventListener('click', function () {
                p.forEach(function (citys) {
                    citys.classList.remove('tagActive');
                })
                citys.classList.add('tagActive');
                console.log(citys.dataset);
                locate(citys.dataset.weather)
            })
        });
    }

})


const areaTags = document.querySelectorAll('.tag')
const allArea = document.querySelector('.tag.all')
const northArea = document.querySelector('.tag.north')
const midArea = document.querySelector('.tag.mid')
const southArea = document.querySelector('.tag.south')
const eastArea = document.querySelector('.tag.east')
const outArea = document.querySelector('.tag.out')
const taiwan = document.querySelector('.taiwan img')
const weather = document.querySelector('.weatherIcon p')
const lowTemp = document.querySelector('.temperature .low.temp')
const hiTemp = document.querySelector('.temperature .hi.temp')
const rain = document.querySelector('.rain p')
const cityName = document.querySelector('.locate')
const showTime = document.querySelector('.showCard.time')





// 地圖效果
function imgArea(area) {
    taiwan.src = `./img/taiwan/${area}.svg`
    taiwan.classList.remove('imgNorth');
    taiwan.classList.remove('imgMid');
    taiwan.classList.remove('imgSouth');
    taiwan.classList.remove('imgEast');
    taiwan.classList.remove('imgOut');
    taiwan.classList.add(`img${area}`);
};

// 大標籤效果
areaTags.forEach(tag => {
    tag.addEventListener('click', function () {
        areaTags.forEach(tag => {
            tag.classList.remove('tagActive');
        });
        tag.classList.add('tagActive');
    })
});

// 小標籤區塊效果
function locateName(area) {
    cityName.classList.remove('NorthLocate');
    cityName.classList.remove('MidLocate');
    cityName.classList.remove('SouthLocate');
    cityName.classList.remove('EastLocate');
    cityName.classList.remove('OutLocate');
    setTimeout(function () {
        cityName.classList.add(`${area}Locate`);
    })
};






