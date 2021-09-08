function submit() {
    if (checkX() && checkY() && checkR()) {
        let data = "?x=" + parseFloat(document.getElementById("X").value.substring(0, 10).replace(',', '.'));
        data += "&y=";
        document.getElementsByName("check_box").forEach(y => {
            if (y.checked) {
                data += y.value
            }
        })
        data += "&r=" + parseFloat(document.getElementById("R").value.substring(0, 10).replace(',', '.'));
        send_request('GET', 'processing.php', data)
    }
}

function clear() {
    send_request('GET', 'clear.php');
}

function checkX() {
    let x = document.getElementById("X");
    if (x.value.trim() === "") {
        alert("Поле X должно быть заполнено");
        return false;
    }
    x.value = x.value.substring(0, 10).replace(',', '.');
    if (!(x.value && !isNaN(x.value))) {
        alert("X должен быть числом!");
        return false;
    }
    if (!((x.value >= -3) && (x.value <= 5))) {
        alert("X должен принадлежать промежутку: (-3; 5)!");
        return false;
    }
    return true;
}


function checkY() {
    let xButtons = document.getElementsByName("check_box");
    let counter = 0
    xButtons.forEach(y => {
        if (y.checked)
            counter++
    })
    if (counter >= 2) {
        alert("Выберите только одно значение Y")
        return false
    } else if (counter === 0) {
        alert("Вы должны выбрать 1 значение Y")
        return false
    }
    return true;
}

function checkR() {
    let r = document.getElementById("R");
    if (r.value.trim() === "") {
        alert("Поле R должно быть заполнено");
        return false;
    }
    r.value = r.value.substring(0, 10).replace(',', '.');
    if (!(r.value && !isNaN(r.value))) {
        alert("R должен быть числом!");
        return false;
    }
    if (!((r.value >= 2) && (r.value <= 5))) {
        alert("R должен принадлежать промежутку: (2; 5)!");
        return false;
    }
    return true;
}

// function ajax(url, method, functionName, dataArray) {
//     let xhttp = new XMLHttpRequest();
//     xhttp.open(method, url, true);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send(dataArray);
//     xhttp.onreadystatechange = () => {
//         if (this.readyState == 4 && this.status == 200) {
//             functionName(this);
//         }
//     }
// }
function send_request(method, url, params = '') {
    let p = new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        xhttp.open(method, url + params)
        xhttp.onload = () => {
            if (xhttp.status >= 400)
                reject()
            else
                resolve(xhttp)
        }
        xhttp.onerror = () => {
            reject(xhttp)
        }
        xhttp.send();
    })
    p.then(xhttp => {
        let response = xhttp.responseText
        if (response !== "")
            document.querySelector(".result_table").innerHTML = response
        else
            alert("Неверный запрос")
    }).catch((xhttp) => {
        if (xhttp.status === 400)
            alert("неверный запрос")
        else
            alert("неожиданная ошибка")
    })
}


document.getElementById("send-button").addEventListener("click", submit);
document.getElementById("clear-button").addEventListener("click", clear);
