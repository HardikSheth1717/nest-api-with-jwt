import { Request } from 'express';

export default interface RequestModel extends Request {
    userId: number;
}