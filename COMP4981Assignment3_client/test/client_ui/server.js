const fs = require("fs"); //save file
const child_process = require("child_process");
const subProcess = child_process.spawn("../../cmake-build-debug/COMP4981Assignment3_client", [""]);

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const index = require("./routes/index");

const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4001;

app.use(index);

io.on("connection", socket => {
    subProcess.stdout.on("data", data => {
        let inArr = data.toString().split("\n");
        socket.emit("FromServer", inArr);
        console.log(inArr);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));


