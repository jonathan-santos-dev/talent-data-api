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
    if (!authorization) return res.status(401).send("Missing authorization");

    try {
        const payload = jwt.verify(authorization, process.env.JWT_SECRET);
        req.user = JSON.parse(payload.toString());
    } catch (error) {
        return res.status(400).send("Invalid authorization");
    }
    next();
}