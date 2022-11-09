# Express Watermark Video

Add watermarks to videos dynamically with expressJS


## Install
npm 

`npm i express-watermark-video`

yarn

`yarn add express-watermark-video`

## Usage

```js

import { createWatermark } from "express-watermark-video"
// const { createWatermark } = require("express-watermark-video")

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

or you can check the ./example folder.



## Pull request welcome

