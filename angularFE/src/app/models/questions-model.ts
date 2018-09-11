import { Response } from "./responses-model";

export class Question {
    id: number;
    question: string;
    date: string;
    author:string;
    responses: Response[];
}