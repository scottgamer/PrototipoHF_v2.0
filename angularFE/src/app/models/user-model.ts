import { Application } from "./application-model";
import { Question } from "./questions-model";
import { Response } from './responses-model';
import { Event } from './event-model';

export class User {
    _id: number;
    username:string;
    fullName: string;
    email: string;
    password: string;
    birthday: string;
    genre: string;
    nationality: string;
    bio: string;
    downloadedApps: Application[];
    questionsMade: Question[];
    responsesMade: Response[];
    savedEvents: Event[];
}