var ansi_up = new AnsiUp;

var txt = "\n\n\033[1;33;40m 33;40  \033[1;33;41m 33;41  \033[1;33;42m 33;42  \033[1;33;43m 33;43  \033[1;33;44m 33;44  \033[1;33;45m 33;45  \033[1;33;46m 33;46  \033[1m\033[0\n\n\033[1;33;42m >> Tests OK\n\n"
var body = document.querySelector('body');
var cdiv = document.getElementById("console");
cdiv.innerHTML = ""

var ws = new WebSocket('ws://localhost:8888/');
ws.binaryType = "arraybuffer"

ws.onopen = function () {
    console.log('open')
    localStorage.setItem('log', JSON.stringify(cdiv.innerHTML))
    body.scrollTop = cdiv.scrollHeight;
};
ws.onclose = function () {
    console.log('close')
    localStorage.setItem('log', JSON.stringify(cdiv.innerHTML))
}

ws.onmessage = function (event) {
    cdiv.innerHTML += ansi_up.ansi_to_html(event.data) + "\n"
    body.scrollTop = cdiv.scrollHeight;
}

setInterval(() => {
    // ping -> pong
}, 2000);