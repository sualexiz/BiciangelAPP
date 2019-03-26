export class User{
    constructor(
        public id: number,
        public last_name:string,
        public first_name:string,
        public second_name:string,
        public email:string,
        public password:string,
        public roles:Array<any>,
        public bike_user:any,
        public bike_angel:any
    ){}
}