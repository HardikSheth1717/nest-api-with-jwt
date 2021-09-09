import { IsNumber, IsNumberString, IsPositive } from "class-validator";

export default class CommonDto {
    @IsNumberString()
    id: number;
}