import { Request, Response } from 'express';

export function LoggerMiddleware(
    request: Request, 
    response: Response, 
    next: Function
) {
    console.log(`Request... ${request}`);
    console.log(`Response... ${response}`);
    next();
};