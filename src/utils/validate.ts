import { validationResult } from 'express-validator';
import { Handler } from "express";
import jwt from "jsonwebtoken";


export const ValidateParams: Handler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array().join(", "));
    }
    next();
}

export const ValidateToken: Handler = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if (!token) return res.status(401).send("Missing authorization");


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as any;

        req.user = {
            email: payload.email,
            userId: payload.userId,
            roles: payload.roles,
        }
    } catch (error) {
        return res.status(400).send("Invalid authorization");
    }
    next();
}