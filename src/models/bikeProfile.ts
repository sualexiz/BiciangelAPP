import { User }  from './user';
export class BikeProfile{
    constructor(
        public id: number,
        public last_name:string,
        public first_name:string,
        public second_name:string,
        public email:string,
        public acities_id:number,
        public statuses_id:number,
        public gender_id:number,
        public birthdate:string,
        public phone:number,
        public mobile:number,
        public doc_number:number,
        public neighborhood:string,
        public created_by:number,
        public requests_count:number,
        public promedio:number
    ){}
}
