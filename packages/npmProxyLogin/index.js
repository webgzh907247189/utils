#!/usr/bin/env node
const { exec } = "child_process";

const [registry, ...otherArgvList] = process.argv.slice(2);

const inputArray = otherArgvList.reduce((result, item) => {
	result.push(item + "\n");
	return result;
}, []);

const result = exec(
	`npm adduser --registry ${registry}`,
	{
		shell: true,
		async: true,
		stdio: [0, 1, 2],
		timeout: 600000,
	},
	(err, stdout) => {
		console.log(err, stdout, "stdout");
		if (err) {
			console.log("\x1b[41;30m 执行登陆 npm 出错！！！！！  \x1b[0m");
			process.exit(1);
		}
	},
);
result.stdout.on("data", (chunk) => {
	console.log("111", chunk.toString());
	const cmd = inputArray.shift();
	console.log("\x1b[42;30m ～～～npm login 输入中～～～ \x1b[0m", chunk, cmd);
	result.stdin.write(String(cmd));
});

process.on("error", () => {
	process.exit(1);
});
