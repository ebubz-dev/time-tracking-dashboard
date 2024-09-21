const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const title = document.getElementsByClassName('title');
const current = document.getElementsByClassName('current');
const previous = document.getElementsByClassName('previous');

fetch('./data.json')
    .then(res => {
        if (res.status === 404) {
            console.log('Specified Url does not exist');
        } else if (res.status === 500) {
            console.log("This a problem with the Server.\nPlease try again later. Thank you!")
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
        getJSON(data);

    })
    .catch(err => {
        console.error('Fetch error: ', err);
    });

function getJSON(data) {
    for(i=0; i<title.length;i++) {
        title[i].innerHTML = `${data[i].title}`;
    }
    timeframe(data, weekly);
    daily.addEventListener('click', () => {
        setMode(daily);
        unsetMode(weekly, monthly);
        timeframe(data, daily);
    });
    weekly.addEventListener('click', () => {
        setMode(weekly);
        unsetMode(daily, monthly);
        timeframe(data, weekly);
    });
    monthly.addEventListener('click', () => {
        setMode(monthly);
        unsetMode(daily, weekly);
        timeframe(data, monthly);
    });
}
function timeframe(data, frame) {
    if (frame == daily) {
        for(i=0;i<current.length&&previous.length;i++) {
            current[i].innerHTML = `${data[i].timeframes.daily.current}hrs`;
            previous[i].innerHTML = `${data[i].timeframes.daily.previous}hrs`;        
        }
    } else if (frame == weekly) {
        for(i=0;i<current.length&&previous.length;i++) {
            current[i].innerHTML = `${data[i].timeframes.weekly.current}hrs`;
            previous[i].innerHTML = `${data[i].timeframes.weekly.previous}hrs`;        
        }
    } else if (frame == monthly) {
        for(i=0;i<current.length&&previous.length;i++) {
            current[i].innerHTML = `${data[i].timeframes.monthly.current}hrs`;
            previous[i].innerHTML = `${data[i].timeframes.monthly.previous}hrs`;        
        }
    }

}
function setMode(mode) {
    mode.style.color = 'hsl(0, 0%, 100%)'
}
function unsetMode(mode2, mode3) {
    mode2.style.color = 'hsl(236, 100%, 87%)';
    mode3.style.color = 'hsl(236, 100%, 87%)';
}
setMode(weekly);
