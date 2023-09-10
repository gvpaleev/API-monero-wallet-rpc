import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoneroWalletRpcService } from './monero-wallet-rpc.service';
import { CreateWalletDto } from './dto/creat-wallet-rpc.dto';
import { GetBalanceDto } from './dto/getBalance.dto';



@Controller('wallet')
export class MoneroWalletRpcController {
    constructor(private readonly moneroWalletRpcService: MoneroWalletRpcService){}
    
    // @Post('create')
	// async create(@Body() dto: CreateWalletDto){

    //     // console.log('Hello World!')
    //     // return 'Hello World!';

	// 	return this.moneroWalletRpcService.create(dto);

	// }

    @Get('newAddres')
    async newAddres(){
        return this.moneroWalletRpcService.newAddres();
    }

    @Get('getBalance')
    async getBalance(@Body() dto: GetBalanceDto){
        return this.moneroWalletRpcService.getBalance(dto);
    }
}
