import { IsString, IsEmail, MinLength, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // Ensures every item in the array is a string
    preferences?: string[];

    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean; // Optional: Defaults to `false`
}
