import { IsNumber } from "class-validator";



export class GetBalanceDto{
    @IsNumber()
    index:number
}