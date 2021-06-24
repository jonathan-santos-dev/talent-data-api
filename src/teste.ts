require('dotenv').config()

import jwt from "jsonwebtoken";

const token = jwt.sign({
    sla: 'dasdsdsa',
    idaa: 2
}, process.env.JWT_SECRET);
console.log({ token });


const msg = jwt.verify(token, process.env.JWT_SECRET);

console.log({ msg });
