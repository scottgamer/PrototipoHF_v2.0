import { Application } from "./application-model";

export class Category {
    id: number;
    name: string;
    subcategory: string;
    applications:Application[];
}