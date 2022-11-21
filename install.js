const { exec } = require('child_process');
const path = require('path');

function npmInstallInChildFolders() {
  const folderNames = ['./', './frontend', './api', './cms', './mobile'];

    folderNames.forEach((name) => {
        process.chdir(path.resolve(__dirname, name));

        try {
            exec('npm i');
        } catch (e) {
            console.warn(`Cannot install dependencies in ${name}`);
        }

        console.log(`Installed success in ${name}`);

        process.chdir('../');
    });
}

npmInstallInChildFolders();
