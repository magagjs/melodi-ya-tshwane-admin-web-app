/**
 * Contains all information required to list event content.
 * Differs from Events class, this class is only used on lists
 */
export class EventList {
    constructor(
        public event_id:number,
        public event_title:string,
        public event_owner:string,
        public event_date:string,
        public event_content:string,
        public event_has_content:boolean,
        public event_has_image:boolean,
        public event_image_dir:string,
        public event_added_by_user:string,
        public event_added_by_token :string,
        public event_added_date:string
    ){}
}
