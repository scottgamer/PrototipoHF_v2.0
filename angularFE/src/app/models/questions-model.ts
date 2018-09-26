import { Response } from "./responses-model";

export class Question {
    question: string;
    user:string;
    application:string;
    responses: Response[];
}