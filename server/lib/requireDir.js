const path = require('path');
const fs = require('fs');

module.exports = function (refModule) {
    const refPath = path.dirname(refModule.id);
    return function (dirPath) {
        const fullDirPath = path.resolve(refPath, dirPath);
        const exports = {};
        fs.readdirSync(fullDirPath)
            .forEach(function (fileName) {
                if (fileName.substr(-3) === '.js') {
                    const name = fileName.substr(0, fileName.length - 3);
                    exports[name] = require(path.join(fullDirPath, fileName));
                }
            });

        return exports;
    };
};
