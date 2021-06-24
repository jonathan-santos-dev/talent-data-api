import { IOrgazinations } from "../types/IOrgazinations";
import fs from "fs";
import path from "path";

class Organizations {

    private organizations = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "fixtures", "organization.json"), "utf-8")) as IOrgazinations;

    find(name: string) {
        return this.organizations.find(u => u.name == name);
    }
}

export default new Organizations();