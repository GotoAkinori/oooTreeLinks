let { src, dest } = require("gulp");

function distribute() {
    return [
        src('./icon/*')
            .pipe(dest('./dist/icon')),
        src('./js/oootreelink.js')
            .pipe(dest('./dist/js'))
    ]
}

exports.distribute = distribute;
