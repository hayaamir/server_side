class Candidate{
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    address: string;
    current_job: string;
    pasts_occupations: string[];
    parents: string;
    siblings: string;
    height: number;
    remarks: string;
    photos: string[];
    phone: number;


    constructor(
        id: number,
        user_id: number,
        first_name: string,
        last_name: string,
        gender: string,
        age: number,
        address: string,
        current_job: string,
        pasts_occupations: string[],
        parents: string,
        siblings: string,
        height: number,
        remarks: string,
        photos: string[],
        phone: number
    ) {
        this.id = id;
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.age = age;
        this.address = address;
        this.current_job = current_job;
        this.pasts_occupations = pasts_occupations;
        this.parents = parents;
        this.siblings = siblings;
        this.height = height;
        this.remarks = remarks;
        this.photos = photos;
        this.phone = phone;
    }
}

export default Candidate;


