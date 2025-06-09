import { CorsOptions } from "cors"

export const corsConfig: CorsOptions = {
/*     origin: function (origin, callback) {
        const whiteList = [process.env.FRONTEND_URL]
        if (process.argv[2] === "--api") {
            whiteList.push(undefined) // Allow requests from Postman or similar tools
        }
        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Error de cors"))
        }
    } */
    origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
}
