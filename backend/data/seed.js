import dotenv from "dotenv";
import {db} from "../config/db.js";
import Service from "../models/Service.js";
import {services} from "./beautyServices.js";
import colors from "colors";

dotenv.config()
await db()

async function seed() {
    try {
        await Service.insertMany(services)
        console.log(colors.green.bold("Servicios agregados exitosamente"))
        process.exit(0)
    } catch (e) {
        console.error(e)
    }
}

async function destroy() {
    try {
        await Service.deleteMany()
        console.log(colors.red.bold("Servicios eliminados exitosamente"))
        process.exit(0)
    } catch (e) {
        console.error(e)
    }
}

// Manejo de argumentos
const argument = process.argv[2]

if (argument === "--import") {
    seed()
} else if (argument === "--destroy") {
    destroy()
} else {
    console.log("Uso: node data/seed.js --import | --destroy")
    process.exit(1)
}
