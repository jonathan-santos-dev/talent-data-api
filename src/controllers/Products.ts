import { IProduct } from "../types/IProduct";
import fs from "fs";
import path from "path";

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class Products {

    private productsRaw = fs.readFileSync(path.join(process.cwd(), "fixtures", "products.txt"), "utf-8");
    private products = this.productsRaw.split("\r\n").filter(isJson).map(pr => JSON.parse(pr) as IProduct);

    find(tags: string[]) {
        return this.products.filter(p => {
            for (const tag of tags) {
                if (!p.tags.includes(tag)) return false;
            }
            return true;
        });
    }
}

export default new Products();