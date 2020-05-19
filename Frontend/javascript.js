function getPhones() {
    let xhr = new XMLHttpRequest();
    let field = document.getElementById("answer");
    xhr.open('GET', 'http://127.0.0.1:9000/phones', false);
    xhr.send();
    //alert(xhr.status + xhr.responseText);
    field.innerText = xhr.responseText;
}

function createPhone() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", 'http://127.0.0.1:9000/phone', false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    let phoneForm = document.forms["createPhoneForm"];
    xmlhttp.send(JSON.stringify({
        name: phoneForm.elements["name"].value,
        number: phoneForm.elements["number"].value
    }));
    alert(xmlhttp.status + " " + xmlhttp.responseText)
}
function deletePhone() {
    let xmlhttp = new XMLHttpRequest();
    let id = document.forms["deletePhoneForm"].elements["id"].value;
    let url = 'http://127.0.0.1:9000/phone/'+id;
    xmlhttp.open("DELETE", url, false);
    xmlhttp.send();
    alert(xmlhttp.status + " " + xmlhttp.responseText)
}
function findPhone() {
    let xmlhttp = new XMLHttpRequest();
    let field = document.getElementById("answer");
    let name = document.forms["findPhoneForm"].elements["name"].value;
    let url = 'http://127.0.0.1:9000/phones/searchByName/?name='+name;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    //alert(xmlhttp.status + " " + xmlhttp.responseText)
    field.innerText = xmlhttp.responseText;
}
function renderFindPhoneForm() {
    let commandForm = document.getElementById("commandForm");
    let form = "            <form id=\"findPhoneForm\" onsubmit=\"findPhone(); return false;\">\n" +
        "                <legend>Personal information:</legend>\n" +
        "                Name:<br>\n" +
        "                <input type=\"text\" id=\"name\"><br>\n" +
        "                <input type=\"submit\" value=\"Submit\">\n" +
        "            </form>"
    commandForm.innerHTML = form;
}
function renderCreatePhoneForm() {
    let commandForm = document.getElementById("commandForm");
    let form = "            <form id=\"createPhoneForm\" onsubmit=\"createPhone(); return false;\">\n" +
        "                <legend>Personal information:</legend>\n" +
        "                Name:<br>\n" +
        "                <input type=\"text\" id=\"name\"><br>\n" +
        "                Number:<br>\n" +
        "                <input type=\"text\" id=\"number\" value=\"\"><br><br>\n" +
        "                <input type=\"submit\" value=\"Submit\">\n" +
        "            </form>"
    commandForm.innerHTML = form;
}
function renderDeletePhoneForm() {
    let commandForm = document.getElementById("commandForm");
    let form = "            <form id=\"deletePhoneForm\" onsubmit=\"deletePhone(); return false;\">\n" +
        "                <legend>Personal information:</legend>\n" +
        "                Id:<br>\n" +
        "                <input type=\"text\" id=\"id\"><br>\n" +
        "                <input type=\"submit\" value=\"Submit\">\n" +
        "            </form>"
    commandForm.innerHTML = form;
}