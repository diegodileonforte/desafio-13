const socket = io.connect();

socket.on('products', data => {
    renderProducts(data);
})

socket.on('messages', data => {
    renderMessages(data);
})

function renderMessages(data) {
    const html = data.map((elem, index) => {
        return (`<div>
            <strong style="color: blue">${elem.email}</strong>: <p class="d-inline mr-1" style="color: brown">${elem.time}</p> <i class="d-inline mr-1" style="color: green">${elem.text}</i> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage() {

    let date = new Date();
    let yy = date.getFullYear()
    let mm = date.getMonth()
    let dd = date.getDate()
    let hh = date.getHours()
    let ms = date.getMinutes()
    let ss = date.getSeconds()
    let fullDate = `[${dd}/${mm}/${yy} ${hh}:${ms}:${ss}]`
    
    const mensaje = {
        email: document.getElementById('email').value,
        time: fullDate,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}

function renderProducts(data) {

    if (data.length > 0) {

        const html = data.map((elem, index) => {
            return (`<tr><td>${elem.title}</td><td>${elem.price}</td><td><img src="${elem.thumbnail}" alt="imagen"></td></tr>`)
        }).join(" ");
        document.getElementById('tableContainer').style.display = "block";
        document.getElementById('noProdMsg').style.display = "none";
        document.getElementById('tableItem').innerHTML = html;
    } else {
        document.getElementById('noProdMsg').innerHTML = `<div class="alert alert-warning text-center" role="alert"> No se encontraron productos </div>`

    }
}

function addProduct(e) {
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', producto);

    return false;
}