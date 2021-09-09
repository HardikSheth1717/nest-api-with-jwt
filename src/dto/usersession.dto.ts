import { IsInt, IsNotEmpty, IsString, IsPositive, IsDefined } from "class-validator";

export default class UserSession {
    @IsInt()
    @IsDefined()
    id: number;
    
    @IsInt()
    @IsPositive()
    @IsDefined()
    userId: number;
    
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    refreshToken: string;
    
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    expiryTime: string;
}