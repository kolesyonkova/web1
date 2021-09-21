function submit() {
    wrongFieldX.textContent = "";
    wrongFieldY.textContent = "";
    wrongFieldR.textContent = "";
    if (checkX() & checkY() & checkR()) {
        document.getElementsByName("check_box").forEach(y => {
            if (y.checked) {
                let data = "?x=" + parseFloat(document.getElementById("X").value.substring(0, 10).replace(',', '.'));
                data += "&y=";
                data += y.value
                data += "&r=" + parseFloat(document.getElementById("R").value.substring(0, 10).replace(',', '.'));
                send_request('GET', 'processing.php', data)
            }
        })
    }
}

//TODO:из методов валидации возвращать только строчки
//TODO:доработать неверную обработку запросов на пхп
function clear() {
    wrongFieldX.textContent = "";
    wrongFieldY.textContent = "";
    wrongFieldR.textContent = "";
    send_request('GET', 'clear.php');
    $("#result_table tr:gt(0)").remove();
}

function start() {
    send_request('GET', 'processing.php');
    $("#result_table tr:gt(0)").remove();
}

function checkX() {
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
    let yButtons = document.getElementsByName("check_box");
    let counter = 0
    yButtons.forEach(y => {
        if (y.checked)
            counter++
    })
    // if (counter >= 2) {
    //     wrongFieldY.textContent = "Выберите только одно значение Y";
    //     return false
    // } else
    if (counter === 0) {
        wrongFieldY.textContent = "Вы должны выбрать хотя бы 1 значение Y";
        return false
    }
    return true;
}

function checkR() {
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
        $("#result_table tr:gt(0)").remove();
        let par = xhttp.responseText;
        if (par !== "remove") {
            let result = JSON.parse(xhttp.responseText);
            for (let i in result.response) {
                let newRow = '<tr>';
                newRow += '<td>' + result.response[i].xval + '</td>';
                newRow += '<td>' + result.response[i].yval + '</td>';
                newRow += '<td>' + result.response[i].rval + '</td>';
                if (result.response[i].out === "True") {
                    newRow += '<td><div style="color:#279327">' + result.response[i].out + '</div></td>';
                } else {

                    newRow += '<td><div style="color:#e11a1a">' + result.response[i].out + '</div></td>';
                }
                newRow += '<td>' + result.response[i].sendingTime + '</td>';
                newRow += '<td>' + result.response[i].totalProcessingTime + '</td>';
                newRow += '</tr>';
                $('#result_table').append(newRow);
            }
        }
        // $('#result_table tr:last').after(response);
    }).catch((xhttp) => {
        if (xhttp.status === 400)
            alert("неверный запрос")
        else
            alert("неожиданная ошибка")
    })
}


document.getElementById("send-button").addEventListener("click", submit);
document.getElementById("clear-button").addEventListener("click", clear);
start();
let wrongFieldX = document.getElementById("wrong_field_X");
let wrongFieldY = document.getElementById("wrong_field_Y");
let wrongFieldR = document.getElementById("wrong_field_R");