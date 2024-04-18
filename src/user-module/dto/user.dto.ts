import { IsDefined, IsEmail, IsString } from "class-validator"


export class UserDto{
    @IsString()
    @IsEmail()
    @IsDefined()
    email:string;

    @IsString()
    @IsDefined()
    username:string;
}

export class UserParamsDto{
    @IsString()
    @IsDefined()
    @IsEmail()
    email:string;
}