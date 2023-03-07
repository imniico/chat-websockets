import express from 'express';
import __dirname from './utils.js';
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";

const app = express();
const messages = [];

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/../public'));

app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log('Server escuchando en 8080');
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado!");

    socket.on("chat-message", (data) => {
        messages.push(data);
        io.emit("messages", messages);
    });

    socket.on("new-user", (username) => {
        socket.emit("messages", messages);
        socket.broadcast.emit("new-user", username);
    })
})