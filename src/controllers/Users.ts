import { IUser, IUsers } from "../types/IUsers";
import fs from "fs";
import path from "path";

class Users {

    private users = JSON.parse(fs.readFileSync(path.resolve("./fixtures/users.json"), "utf-8")) as IUsers;

    find(email: string, password: string) {
        return this.users.find(u => u.email == email && u.password == password);
    }

}

export default new Users();