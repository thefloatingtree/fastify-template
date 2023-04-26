import { exit } from "process";
import { Api } from "../../generated/apiClient/Api";
import { run } from "../server";

const api = new Api()
const PORT = process.env.PORT || "3000"

async function test() {
    await run()

    api.baseUrl = `http://localhost:${PORT}`

    try {
        const { data } = await api.v1.helloDetail("tree")
        console.log(data)
    } catch (e: any) {
        console.error(e.error)
    }

    exit(0)
}

test()