import mongoose from "mongoose";
import colors from "colors";

export const db = async () => {
    try {
        const database = await mongoose.connect(process.env.MONGO_URI)
        const url = `${database.connection.host}:${database.connection.port}`
        console.log(colors.green.bold(`Mongodb se conectó correctamente: `, url))
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}