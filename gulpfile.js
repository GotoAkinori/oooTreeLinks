let { src, dest } = require("gulp");

async function distribute() {
    return await Promise.all([
        src('./icon/*')
            .pipe(dest('./dist/icon')),
        src('./js/oootreelink.js')
            .pipe(dest('./dist/js'))
    ]);
}

exports.distribute = distribute;
