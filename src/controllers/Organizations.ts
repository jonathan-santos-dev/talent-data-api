import { IOrgazinations } from "../types/IOrgazinations";
import fs from "fs";
import path from "path";

class Organizations {

    private organizations = JSON.parse(
        fs.readFileSync(path.resolve("./fixtures/organization.json"), "utf-8")) as IOrgazinations;

    find(name: string) {
        return this.organizations.find(u => u.name == name);
    }

    findOneAndChilds(name: string) {
        const organization = this.find(name);
        if (!organization) return [];
        const organizations = this.findAllChilds(organization.name);
        organizations.push(organization);

        for (const c of organizations) {
            organizations.push(...this.findAllChilds(c.name));
        }
        return organizations;
    }

    findAllChilds(name: string) {
        return this.organizations.filter(o => o.parent == name);
    }
}

export default new Organizations();