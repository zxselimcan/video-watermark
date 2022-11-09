import express, { Request, Response } from 'express'
import { validationResult } from 'express-validator';
import { param } from 'express-validator';
import { createWatermark } from 'express-watermark-video'

const app = express()
const port: number = 3000

app.use(express.static("./public/"))

app.get('/video/:name',
    [
        param('name')
            .isAlphanumeric("tr-TR", { ignore: " " })
            .withMessage("ONLY_ALPHANUMERIC_ALLOWED")
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400);
        }

        return createWatermark({
            expressResponse: res,
            text: req.params.name,
            fontColor: "red",
            fontSize: 42,
            videoPath: "./assets/video2.mp4",
            fontPath: "./assets/Roboto-Regular.ttf",
            position: {
                x: "(main_w/2-text_w/2)",
                y: "(main_h/2-text_h/2)"
            }
        })
    }

)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default app