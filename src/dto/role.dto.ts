import { IsDefined, IsInt, MaxLength, MinLength } from "class-validator";

export default class Role {
    @IsInt()
    @IsDefined()
    id: number;
    
    @MinLength(3)
    @MaxLength(50)
    @IsDefined()
    roleName: string;
}