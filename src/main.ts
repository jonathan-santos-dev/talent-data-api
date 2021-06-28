
require('dotenv').config()

import express from "express";
import { body, query } from "express-validator";
import Users from "./controllers/Users";
import jwt from "jsonwebtoken";
import { ValidateParams, ValidateToken } from "./utils/validate";
import Products from "./controllers/Products";
import Organizations from "./controllers/Organizations";
import { HasPermission } from "./utils/HasPermission";
import { Role } from "./types/Role";

import path from 'path';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", body("email").isEmail(), body("password").isString(),
    ValidateParams,
    (req, res) => {
        const { email, password } = req.body;

        const user = Users.find(email, password);

        if (!user) {
            return res.send(400).send("User email or password not found.");
        }

        res.send({
            token: jwt.sign({
                userId: user.userId,
                email: user.email,
                roles: user.roles,
            }, process.env.JWT_SECRET)
        })
    });

app.get("/products/:organizationName", query("tags").isString().optional(),
    ValidateParams,
    ValidateToken,
    (req, res) => {
        const tags = req.query.tags as string | undefined;
        const { organizationName } = req.params;
        const tagsParsed = tags?.split(',') || [];

        const organization = Organizations.find(organizationName);
        if (!organization) return res.status(404).send("Organization not found");
        if (!HasPermission(req.user.roles as Role[], organization.level, organization.name))
            return res.status(401).send("Access is not allowed");

        const products = Products.find(tagsParsed, Organizations.findOneAndChilds(organization.name).map(o => o.name));
        const total = products.length;

        res.send({ total, products });
    });

app.get("/", (req, res) => {
    res.send(fs.readFileSync(path.join(process.cwd(), "fixtures", "organization.json"), "utf-8"))
})

const PORT = process.env.PORT || 3000;
export default app.listen(PORT, () => console.log(`Server at: http://localhost:${PORT}`));
