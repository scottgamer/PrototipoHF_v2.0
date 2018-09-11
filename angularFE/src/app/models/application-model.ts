import { Commentary } from "./commentaries-model";

export class Application {
    id:number;
    name:string;
    logo:string;
    imgs:string[];
    category:string;
    description:string;
    rating:number;
    country: string;
    developedBy: string;
    version: number;
    releaseDate: string;
    platform: string;
    androidMin: string;
    appWebPage: string;
    commentaries:Commentary[];
    downloadedTimes:number;
}