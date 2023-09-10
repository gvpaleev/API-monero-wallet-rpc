import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { IsString } from "class-validator";


export interface CreateWalletDto extends Base{};

export class CreateWalletDto extends TimeStamps{
    
    @IsString()
    idUser: string
}