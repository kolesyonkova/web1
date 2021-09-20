function submit() {
    let wrongFieldX = document.getElementById("wrong_field_X");
    let wrongFieldY = document.getElementById("wrong_field_Y");
    let wrongFieldR = document.getElementById("wrong_field_R");
    wrongFieldX.textContent = "";
    wrongFieldY.textContent = "";
    wrongFieldR.textContent = "";
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
    $("#result_table tr:gt(0)").remove();
}

function checkX() {
    let wrongFieldX = document.getElementById("wrong_field_X");
    let x = document.getElementById("X");
    if (x.value.trim() === "") {
        wrongFieldX.textContent = "Поле X должно быть заполнено";
        return false;
    }
    x.value = x.value.substring(0, 10).replace(',', '.');
    if (!(x.value && !isNaN(x.value))) {
        wrongFieldX.textContent = "X должен быть числом!";
        return false;
    }
    if (!((x.value >= -3) && (x.value <= 5))) {
        wrongFieldX.textContent = "X должен принадлежать промежутку: (-3; 5)!";
        return false;
    }
    return true;
}


function checkY() {
    let wrongFieldY = document.getElementById("wrong_field_Y");
    let yButtons = document.getElementsByName("check_box");
    let counter = 0
    yButtons.forEach(y => {
        if (y.checked)
            counter++
    })
    if (counter >= 2) {
        wrongFieldY.textContent = "Выберите только одно значение Y";
        return false
    } else if (counter === 0) {
        wrongFieldY.textContent = "Вы должны выбрать 1 значение Y";
        return false
    }
    return true;
}

function checkR() {
    let wrongFieldR = document.getElementById("wrong_field_R");
    let r = document.getElementById("R");
    if (r.value.trim() === "") {
        wrongFieldR.textContent = "Поле R должно быть заполнено";
        return false;
    }
    r.value = r.value.substring(0, 10).replace(',', '.');
    if (!(r.value && !isNaN(r.value))) {
        wrongFieldR.textContent = "R должен быть числом!";
        return false;
    }
    if (!((r.value >= 2) && (r.value <= 5))) {
        wrongFieldR.textContent = "R должен принадлежать промежутку: (2; 5)!";
        return false;
    }
    return true;
}

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
    }).then(xhttp => {
        let response = xhttp.responseText
        let response1=JSON.parse(xhttp.responseText)
        $("#result_table tr:gt(1)").remove();
        if (response !== "remove") {
            $('#result_table tr:last').after(response);
        }
    }).catch((xhttp) => {
        if (xhttp.status === 400)
            alert("неверный запрос")
        else
            alert("неожиданная ошибка")
    })
}


document.getElementById("send-button").addEventListener("click", submit);
document.getElementById("clear-button").addEventListener("click", clear);