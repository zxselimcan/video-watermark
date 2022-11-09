# video-watermark

Add watermarks to videos dynamically with expressJS


## Install
npm 

`npm i video-watermark`

yarn

`yarn add video-watermark`

## Usage

```js

import { createWatermark } from "video-watermark"
// const { createWatermark } = require("video-watermark")

async (req: Request, res: Response) => {

    return createWatermark({
        expressResponse: res,
        text: "Hello World",
        fontColor: "red",
        fontSize: 42,
        videoPath: "./assets/video2.mp4",
        // optional params
        position: {
            x: "(main_w/2-text_w/2)",
            y: "(main_h/2-text_h/2)"
        }
        // fontPath: "./Roboto-Regular.ttf"
        // useProcOnly: false
    })
}

```

### or you can check the ./example folder.

![](./ss.png)


## Pull request welcome

