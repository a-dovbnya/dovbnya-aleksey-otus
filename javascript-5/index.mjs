import * as fs from 'fs/promises';
import path from 'path';
import { Command } from 'commander'

// Запрос входного параметра - путь к директории
const commander = new Command();
commander
    .version("0.0.1")
    .option("-e, --entry <req>", "The path of the source directory")
    .parse(process.argv);

// Обработка ошибок
process.on("exit", code => {
    switch (code) {
        case 400:
            console.error("parameter --entry is required (see help) \n");
            commander.outputHelp();
            break;
        default:
            break;
    }
})

const options = commander.opts();

if (!options.entry) {
    process.exit(400);
}

const entry = path.normalize(options.entry);
const dirs = []
const files = []

const tree = async (source) => {
    if (!dirs.length) {
        dirs.push(source)
    }

    return fs.realpath(source)
        .then(pathToDir => {
            return fs.opendir(pathToDir)
        })
        .then(async currDir => {
            for await (const dirItem of currDir) {
                const dirItemPath = path.join(source, dirItem.name);

                if (dirItem.isDirectory()) {
                    dirs.push(dirItemPath);
                    await tree(dirItemPath);
                    continue
                }

                files.push(dirItemPath);
            }
            return {
                files: files.sort(),
                dirs: dirs.sort()
            }
        })
}

tree(entry)
    .then(result => console.log(result))
    .catch(e => console.error("Error:", e));