import { User }  from './user';
export class RequestAngel{
    constructor(
        public id: number,
        public take_date:string,
        public time_start:string,
        public time_finish:string,
        public address_start:string,
        public address_finish:string,
        public statuses_id:number,
        public user: Array<any>,
        public bike_angel: any,
        public status: any,
        public observationCancel:string,
        public idUserInsert:number,
        public idBikeAngel: number,
        public description_how_to_arrive:string,
        public log_date_ready:string,
        public log_date_finish:string,
        public latitude_start:string,
        public longitude_start:string,
        public latitude_finish:string,
        public longitude_finish:string,
        public created_by:number,
        public kilometers_traveled:string,
        public user_creator:string,
        public sponsor:any
    ){}
}