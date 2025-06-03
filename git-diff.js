const cp = require("child_process");

function execCommand(command) {
    return new Promise((resolve, reject) => {
    execCb(command, (err, stdout, stderr) => {
        if (err) return reject(err);
        if (stderr) return reject(new Error(stderr));
        resolve(stdout);
    });
    });
}
async function run() {
    try {

        const output2 = await execCommand(`git diff-tree --no-commit-id --name-only -r HEAD`);
        console.log(`> Changed files2: ${output2}`);
        const output = await execCommand(`git diff-tree --no-commit-id --name-only -r ${process.env.GITHUB_SHA}`);
        console.log(`> Changed files:${process.env.GITHUB_SHA} -  ${output}`);
    } catch (error) {
        console.error("Error executing command:", error);
    }
}

run().then(() => {
    console.log("Done");
}).catch((error) => {
    console.error("Error in run:", error);
}
);