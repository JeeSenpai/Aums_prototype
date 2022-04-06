import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmpty()
    name: string;

    @ApiProperty()
    @IsEmpty()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsEmpty()
    @MinLength(8)
    password: string;
   
}
