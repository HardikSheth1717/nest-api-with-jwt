import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export default class RefreshToken {
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    refreshToken: string;
}