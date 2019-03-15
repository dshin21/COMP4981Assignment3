const fs = require("fs"); //save file
const child_process = require("child_process");
const subprocess = child_process.spawn("../cmake-build-debug/COMP4981Assignment3_client", [""]);
subprocess.stdout.on("data", data => {
    let inArr = data.toString().split("\n");
    console.log(inArr);
});
