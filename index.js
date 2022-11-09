"use strict";
exports.__esModule = true;
exports.createWatermark = void 0;
var FFMPEG_INSTALLER = require("@ffmpeg-installer/ffmpeg");
var child_process_1 = require("child_process");
var createWatermark = function (_a) {
    var fontColor = _a.fontColor, fontPath = _a.fontPath, fontSize = _a.fontSize, position = _a.position, text = _a.text, videoPath = _a.videoPath, expressResponse = _a.expressResponse, _b = _a.useProcOnly, useProcOnly = _b === void 0 ? false : _b;
    var ffmpeg = function () {
        var cmd = FFMPEG_INSTALLER.path;
        var filter = "drawtext='fontsize=".concat(fontSize, ":fontcolor=").concat(fontColor, "@0.8:box=1:boxcolor=black@0.75:boxborderw=16:fontfile=").concat(process.cwd() + "/" + fontPath || "./Roboto-Regular.ttf", ":text='").concat(text, "':x=").concat(position.x, ":y=").concat(position.y, "'");
        var args = ["-i", "".concat(process.cwd(), "/").concat(videoPath)];
        args.push("-vf", filter, "-acodec", "aac", "-vcodec", "h264", "-codec:a", "copy", "-movflags", "frag_keyframe+empty_moov", "-f", "mp4", "pipe:1");
        return (0, child_process_1.spawn)(cmd, args);
    };
    var proc = ffmpeg();
    if (useProcOnly) {
        return proc;
    }
    else {
        proc.stdout.pipe(expressResponse);
        expressResponse.on("close", function () {
            proc.kill("SIGKILL");
        });
        return expressResponse;
    }
};
exports.createWatermark = createWatermark;
