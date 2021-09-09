import { IsInt, IsNotEmpty, IsPositive, Length, MinLength, MaxLength, IsDefined } from 'class-validator';

export default class User {
    @IsInt()
    @IsDefined()
    Id: number;

    @MinLength(3)
    @MaxLength(50)
    @IsDefined()
    FirstName: string;
 
    @MinLength(3)
    @MaxLength(50)
    @IsDefined()
    LastName: string;
 
    @IsInt()
    @IsPositive()
    @IsDefined()
    Age: number;
 
    @MinLength(4)
    @MaxLength(6)
    @IsDefined()
    Gender: string;
 
    @MinLength(5)
    @MaxLength(45)
    @IsDefined()
    UserName: string;
 
    @IsInt()
    @IsPositive()
    @IsDefined()
    RoleId: number;
 
    @MinLength(8)
    @MaxLength(20)
    @IsDefined()
    Password: string;
}