const fs = require("fs"); //save file
const child_process = require("child_process");

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const index = require("./routes/index");

const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4001;

app.use(index);

let server_ip = '';
let server_port = '';
let subProcess;
let start = false;

io.on("connection", socket => {
    socket.on("FromClient", data => {
        let info = data.split(' ');
        server_ip = info[0];
        server_port = info[1];
        subProcess = child_process.spawn("../../cmake-build-debug/COMP4981Assignment3_client",
          [server_ip, server_port]);
    });

    socket.on("sendInit", data => {
        subProcess.stdout.on("data", data => {
            let inArr = data.toString().split("\n");
            socket.emit("receiveInit", inArr);
        });
        start = true;
    });

    if (start)
        subProcess.stdout.on("data", data => {
            let inArr = data.toString().split("\n");
            socket.emit("receiveInit", inArr);
        });
});

server.listen(port, () => console.log(`Listening on port ${port}`));


