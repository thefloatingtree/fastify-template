import { run } from "../server";
import { exec } from "child_process";
import { exit } from "process";

const PORT = process.env.PORT || "3000"

export async function generateClient() {
    await run();

    console.log("Generating client...")
    await exec(`npx swagger-typescript-api -p http://localhost:${PORT}/docs/json -o ./generated/apiClient --clean-output`, () => {
        console.log("Done")
        exit(0)
    })
}

generateClient();