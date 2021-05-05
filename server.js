const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const exphbs = require('express-handlebars')

const products = []
const messages = []

app.use(express.static('public'))

app.engine("hbs", exphbs({
        extname: ".hbs",
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
  })

io.on('connection', socket => {
    console.log('Un cliente se ha conectado')
    socket.emit('products', products)
    socket.emit('messages', messages)

    socket.on('new-product', data => {
        products.push(data)
        io.sockets.emit('products', products)
    })

    socket.on('new-message', data => {
        messages.push(data)
        io.sockets.emit('messages', messages)
    })
})

const PORT = process.env.PORT || 8080

const srv = server.listen(PORT, () => {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en servidor ${error}`))