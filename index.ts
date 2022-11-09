
import * as FFMPEG_INSTALLER from '@ffmpeg-installer/ffmpeg'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { Response } from 'express'

interface IOptions {
    expressResponse: Response,
    text: string,
    videoPath: string,
    fontPath?: string,
    fontSize: number,
    fontColor: string,
    position: {
        x: string,
        y: string
    },
    useProcOnly?: boolean
}

export const createWatermark = ({
    fontColor,
    fontPath,
    fontSize,
    position,
    text,
    videoPath,
    expressResponse,
    useProcOnly = false
}: IOptions): Response | ChildProcessWithoutNullStreams | any => {

    const ffmpeg = () => {
        var cmd = FFMPEG_INSTALLER.path;
        var filter = `drawtext='fontsize=${fontSize}:fontcolor=${fontColor}@0.8:box=1:boxcolor=black@0.75:boxborderw=16:fontfile=${process.cwd() + "/" + fontPath || "./Roboto-Regular.ttf"}:text='${text}':x=${position.x}:y=${position.y}'`
        var args = ["-i", `${process.cwd()}/${videoPath}`];
        args.push(
            "-vf", filter,
            "-acodec", "aac",
            "-vcodec", "h264",
            "-codec:a", "copy",
            "-movflags", "frag_keyframe+empty_moov",
            "-f", "mp4",
            "pipe:1"
        );
        return spawn(cmd, args);
    }
    const proc = ffmpeg();

    if (useProcOnly) {
        return proc;
    } else {
        proc.stdout.pipe(expressResponse);
        expressResponse.on("close", () => {
            proc.kill("SIGKILL");
        });
        return expressResponse;
    }
}