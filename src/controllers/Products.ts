import { IProduct } from "../types/IProduct";
import fs from "fs";
import path from "path";
import readline from "readline";

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class Products {

    private products: IProduct[] = [];

    constructor() {
        const lineReader = readline.createInterface({
            input: fs.createReadStream(path.resolve("./fixtures/products.txt"))
        });

        lineReader.on("line", (line) => {
            if (isJson(line))
                this.products.push(JSON.parse(line));
        })
    }

    find(tags: string[], departments: string[]) {
        const departmentProducts = this.products.filter(p => departments.includes(p.department));

        if (tags.length > 0)
            return departmentProducts.filter(p => {
                for (const tag of tags) {
                    if (p.tags.includes(tag)) return true;
                }
                return false;
            });
        return departmentProducts;
    }
}

export default new Products();