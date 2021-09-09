import { IsDefined, MaxLength, MinLength } from "class-validator";

export default class Signin {
    @MinLength(5)
    @MaxLength(45)
    @IsDefined()
    userName: string;

    @MinLength(8)
    @MaxLength(20)
    @IsDefined()
    password: string;
}