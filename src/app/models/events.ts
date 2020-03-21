export class Events {
    
    constructor(
        public title:string,
        public owner:string,
        public date:string,
        public content:string,
        public hasContent:boolean,
        public hasImage:boolean,
        public imagePath:string
    ){}
}
