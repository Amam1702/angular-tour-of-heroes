export class User {
    user_id?: string;
    user_name?: string;
    password?: string;
    phone_no?: string;
    birth_date?: string;
    gender?: string;
    email:string;
    address:string;
    role_id:number
}


export class tb_birthDetail {
    // id?: string;
    // username?: string;
    // password?: string;
    // firstName?: string;
    // lastName?: string;
    // token?: string;


    child_name?:string;
    father_name?: string;
    mother_name?: string;
    birth_place?: string;
    birth_date?: Date
    genderControl?: string;
    state?: string;
    district?:string
    houseAddress?: string;
   uploadAddressProof?: string
}

export interface AuthResponseDto {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}