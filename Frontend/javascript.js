function getPhones() {
    let xhr = new XMLHttpRequest();
    let field = document.getElementById("answerBlock");
    xhr.open('GET', 'http://127.0.0.1:9000/phones', false);
    xhr.send();
    let response = JSON.parse(xhr.responseText);
    field.innerText="";
    response.forEach(x=>renderResponse(x, field));
    }
function writeToCSV() {
    let xhr = new XMLHttpRequest();
    let field = document.getElementById("answerBlock");
    xhr.open('GET', 'http://127.0.0.1:9000/phones/toCSV', false);
    xhr.send();
    //let response = JSON.parse(xhr.responseText);
    //field.innerText="";
    //response.forEach(x=>renderResponse(x, field));
    alert(xhr.responseText)
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
function updatePhone() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", 'http://127.0.0.1:9000/phone/', false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    let phoneForm = document.forms["createPhoneForm"];
    xmlhttp.send(JSON.stringify({
        name: phoneForm.elements["name"].value,
        number: phoneForm.elements["number"].value
    }));
    alert(xmlhttp.status + " " + xmlhttp.responseText)
}
function deletePhone(id) {
    let xmlhttp = new XMLHttpRequest();
    let url = 'http://127.0.0.1:9000/phone/'+id;
    xmlhttp.open("DELETE", url, false);
    xmlhttp.send();
    alert(xmlhttp.status + " " + xmlhttp.responseText)
}
function deletePhoneInstForm() {
    let id = document.forms["deletePhoneForm"].elements["id"].value;
    deletePhone(id);
}
function deletePhoneInstRow(elem) {
    let id = elem.getAttribute("id");
    deletePhone(id);
}
function findPhoneByName() {
    let xmlhttp = new XMLHttpRequest();
    let field = document.getElementById("answerBlock");
    let name = document.forms["findPhoneForm"].elements["name"].value;
    let url = 'http://127.0.0.1:9000/phones/searchByName/?name='+name;
    alert(url);
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    let response = JSON.parse(xmlhttp.responseText);
    field.innerText="";
    response.forEach(x=>renderResponse(x, field));
}
function findPhoneByNumber() {
    let xmlhttp = new XMLHttpRequest();
    let field = document.getElementById("answerBlock");
    let number = document.forms["findPhoneForm"].elements["number"].value;
    let url = 'http://127.0.0.1:9000/phones/searchByNumber/?number='+ number;
    alert(url);
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    let response = JSON.parse(xmlhttp.responseText);
    field.innerText="";
    response.forEach(x=>renderResponse(x, field));
}
function renderFindPhoneByNameForm() {
    let commandForm = document.getElementById("commandForm");
    let form = "            <form id=\"findPhoneForm\" onsubmit=\"findPhoneByName(); return false;\">\n" +
        "                <legend>Phone information</legend>\n" +
        "                Name:<br>\n" +
        "                <input type=\"text\" id=\"name\"><br>\n" +
        "                <input type=\"submit\" value=\"Submit\">\n" +
        "            </form>"
    commandForm.innerHTML = form;
}
function renderFindPhoneByNumberForm() {
    let commandForm = document.getElementById("commandForm");
    let form = "            <form id=\"findPhoneForm\" onsubmit=\"findPhoneByNumber(); return false;\">\n" +
        "                <legend>Phone information</legend>\n" +
        "                Number:<br>\n" +
        "                <input type=\"text\" id=\"number\"><br>\n" +
        "                <input type=\"submit\" value=\"Submit\">\n" +
        "            </form>"
    commandForm.innerHTML = form;
}

function renderCreatePhoneForm() {
    let commandForm = document.getElementById("commandForm");
    let form = "            <form id=\"createPhoneForm\" onsubmit=\"createPhone(); return false;\">\n" +
        "                <legend>Phone information</legend>\n" +
        "                Name:<br>\n" +
        "                <input type=\"text\" id=\"name\"><br>\n" +
        "                Number:<br>\n" +
        "                <input type=\"text\" id=\"number\" value=\"\"><br><br>\n" +
        "                <input type=\"submit\" value=\"Submit\">\n" +
        "            </form>"
    commandForm.innerHTML = form;
}
function renderUpdatePhoneForm() {
    let commandForm = document.getElementById("commandForm");
    let form = "            <form id=\"updatePhoneForm\" onsubmit=\"updatePhone(); return false;\">\n" +
        "                <legend>Phone information</legend>\n" +
        "                Id:<br>\n" +
        "                <input type=\"text\" id=\"id\"><br>\n" +
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
    let form = "            <form id=\"deletePhoneForm\" onsubmit=\"deletePhoneInstForm(); return false;\">\n" +
        "                <legend>Phone information</legend>\n" +
        "                Id:<br>\n" +
        "                <input type=\"text\" id=\"id\"><br>\n" +
        "                <input type=\"submit\" value=\"Submit\">\n" +
        "            </form>"
    commandForm.innerHTML = form;
}
function renderResponse(x, field) {
        field.insertAdjacentHTML("beforeend",
            "<div id = tempId class = row>" +
            "<p class = row>"+x.id+" "+x.name+" "+x.number+"</p>" +
            "<button class='row-btn' onclick='deletePhoneInstRow(parentNode)'>Delete</button>" +
            "</div>");
        let row = document.getElementById("tempId");
        row.setAttribute("id", x.id);

}