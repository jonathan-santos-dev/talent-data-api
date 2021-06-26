declare namespace NodeJS {
    export interface Process {
        env: {
            JWT_SECRET: string
            PORT: string
        }
    }
}

declare namespace Express {
    export interface Request {
        user: {
            userId: string;
            email: string;
            roles: string[]
        };
    }
}