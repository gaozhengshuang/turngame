let path = require('path');
let fs = require('fs');

let sourcePath = path.join(__dirname, '../assets/resources/Image/Animation/Bomb');
fs.readdir(sourcePath, function (err, files) {
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (path.extname(file) == '.meta') {
            let fileName = path.join(sourcePath, file);
            fs.readFile(fileName, { encoding: 'utf-8' }, function (err, data) {
                if (err == null) {
                    let info = JSON.parse(data);
                    for (let key in info.subMetas) {
                        let metainfo = info.subMetas[key];
                        metainfo.trimType = 'custom';
                        metainfo.trimX = 0;
                        metainfo.trimY = 0;
                        metainfo.width = 200;
                        metainfo.height = 200;
                    }
                    fs.writeFile(fileName, JSON.stringify(info), function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
    }
});
