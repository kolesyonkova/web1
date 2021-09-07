function submit() {
    checkX();
    checkY();
    checkR();
}

function checkX() {
    let x = document.getElementById("X");
    if (x.value.trim() === "") {
        alert("Поле X должно быть заполнено");
    }
    x.value = x.value.replace(',', '.');
    if (!(x.value && !isNaN(x.value))) {
        alert("X должен быть числом!");
    }
    if (x.value <= -3 || x.value >= 5) {
        alert("X должен принадлежать промежутку: (-3; 5)!");
    }
}

function checkY() {
    let xButtons = document.getElementsByName("check_box");
    let counter = 0;
    xButtons.forEach(checkBox => {
        if (checkBox.checked)
            counter++;
    })
    if (counter > 1) {
        alert("Выберите 1 значение Y");
    }
}

function checkR() {
    let r = document.getElementById("R");
    if (r.value.trim() === "") {
        alert("Поле R должно быть заполнено");
    }
    r.value = r.value.replace(',', '.');
    if (!(r.value && !isNaN(r.value))) {
        alert("R должен быть числом!");
    }
    if (r.value <= 2 || r.value >= 5) {
        alert("R должен принадлежать промежутку: (2; 5)!");
    }
}

document.getElementById("send-button").addEventListener("click", submit);
