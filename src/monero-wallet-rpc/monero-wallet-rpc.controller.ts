import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoneroWalletRpcService } from './monero-wallet-rpc.service';
import { CreateWalletDto } from './dto/creat-wallet-rpc.dto';
import { GetTxsForSubAddressIndexDto } from './dto/get-txs-for-subAddress-index.dto';

@Controller('wallet')
export class MoneroWalletRpcController {
  constructor(
    private readonly moneroWalletRpcService: MoneroWalletRpcService,
  ) {}

  // @Post('create')
  // async create(@Body() dto: CreateWalletDto){

  //     // console.log('Hello World!')
  //     // return 'Hello World!';

  // 	return this.moneroWalletRpcService.create(dto);

  // }

  @Get('getAddressForReplenishment')
  async getAddressForReplenishment() {
    return this.moneroWalletRpcService.getAddressForReplenishment();
  }

  @Get('getTxsForSubAddressIndex')
  async getTxsForSubAddressIndex(@Body() dto: GetTxsForSubAddressIndexDto) {
    return this.moneroWalletRpcService.getTxsForSubAddressIndex(dto);
  }
}
