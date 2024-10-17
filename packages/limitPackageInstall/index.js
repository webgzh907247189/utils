#!/usr/bin/env node

// https://github.com/npm/rfcs/issues/325

const fs = require('fs');
const { spawn } = require('child_process');

const isMatchUsedPkgName = ([wantUseInstallPkgName, isDeleteIllegalInstall]) => {
    const userAgent = process.env.npm_config_user_agent;
    const [useInstallPkgName] = userAgent.split(' ');
    const [usedPkgName] = useInstallPkgName.split('/');
    return [usedPkgName === wantUseInstallPkgName, usedPkgName, wantUseInstallPkgName, isDeleteIllegalInstall];
};

const getArgv = () => {
    const [wantUseInstallPkgName = 'npm', isDeleteIllegalInstallItem] = process.argv.slice(2);

    const [, isDeleteIllegalInstall = true] = (isDeleteIllegalInstallItem ?? '').split('=');

    return [wantUseInstallPkgName, isDeleteIllegalInstall];
};

const deleteFile = ([isDelete, usedPkgName, wantUseInstallPkgName, isDeleteIllegalInstall]) => {
    if (!isDelete) {
        const filePath = `${process.cwd()}/pnpm-lock.yaml`;
        try {
            fs.unlinkSync(filePath);
        } catch {}
        const deleteNodeModules = `${process.cwd()}/node_modules`;
        // 是否删除 非法 安装的 package 包
        if (isDeleteIllegalInstall !== 'false') {
            console.log(`\x1B[32m 即将启用子进程 删除 ${usedPkgName} 安装的 node_modules \x1B[0m`);
            spawn('rm', ['-rf', deleteNodeModules]);
            //   ls.on("close", (code) => {
            //     if (code === 0) {
            //       console.log("目录删除成功");
            //     } else {
            //       console.error("删除目录时发生错误");
            //     }
            //   });
        }

        throw new Error(`\x1B[41;30m  请使用 ${wantUseInstallPkgName} 进行安装依赖  \x1B[0m`);
    }
};

const compose = (...fns) => {
    return fns.reduce((a, b) => {
        return (...args) => {
            return a(b(...args));
        };
    });
};

compose(deleteFile, isMatchUsedPkgName, getArgv)();
