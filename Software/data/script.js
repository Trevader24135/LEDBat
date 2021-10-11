var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();
}

function initWebSocket() {
    console.log("Trying to establish a websocket connection...");
    websocket = new WebSocket(gateway)
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log("Gateway opened");
}

function onClose(event) {
    console.log("Gateway closed");
}

function onMessage(event) {
    console.log("message received: " + event.data);
}

function colorPickerChange(element) {
    //console.log(element.id + " | " + element.value);
}

function insertRowBelow(element) {
    var tbody = element.parentNode.parentNode.parentNode;
    var existingRow = element.parentNode.parentNode;

    var newRow = tbody.insertRow(existingRow.rowIndex);
    newRow.innerHTML = existingRow.innerHTML;
    newRow.className = existingRow.className;

    for (var i = existingRow.rowIndex; i < tbody.getElementsByClassName("rowNumber").length; i++) {
        tbody.getElementsByClassName("rowNumber")[i].innerHTML = Number(tbody.getElementsByClassName("rowNumber")[i].innerHTML) + 1;
    }
}

function deleteThisRow(element) {
    var tbody = element.parentNode.parentNode.parentNode;
    var thisRow = element.parentNode.parentNode;

    for (var i = thisRow.rowIndex; i < tbody.getElementsByClassName("rowNumber").length; i++) {
        tbody.getElementsByClassName("rowNumber")[i].innerHTML = Number(tbody.getElementsByClassName("rowNumber")[i].innerHTML) - 1;
    }
    tbody.deleteRow(thisRow.rowIndex - 1);
}

function colorInputToRGBList(colorInput, ID) {
    return ID + 'R:' + String(parseInt(colorInput.value.slice(1,3), 16)).padStart(3, "0") + 
    ID + 'G:' + String(parseInt(colorInput.value.slice(3,5), 16)).padStart(3, "0") + 
    ID + 'B:' + String(parseInt(colorInput.value.slice(5), 16)).padStart(3, "0");
}

function upload(element) {
    var table = element.parentNode.parentNode.parentNode.parentNode;

    var colorValues = "";
    Array.from(table.getElementsByClassName("colorRow")).forEach(element => {
        var WingsTop = colorInputToRGBList(element.getElementsByTagName("input")[0], "WT");
        var WingsBottom = colorInputToRGBList(element.getElementsByTagName("input")[1], "WB");
        var Body = colorInputToRGBList(element.getElementsByTagName("input")[2], "BB");

        colorValues += "ROW" + element.getElementsByClassName("rowNumber")[0].innerHTML.padStart(3,"0") + ":" + 
            WingsTop + WingsBottom + Body;
    });;
    console.log(colorValues);
    
    websocket.send(colorValues);
}