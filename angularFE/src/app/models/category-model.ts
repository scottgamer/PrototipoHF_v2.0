export class Category {
    _id:number;
    name:string;
    url:string;
    children:[{
        name:string;
        url:string;
    }];
}
