import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoneroWalletRpcService } from './monero-wallet-rpc.service';
import { CreateSubAccountForReplenishmentDto } from './dto/Creat-subAddress-for-replenishment.dto';
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

  @Get('createSubAccountForReplenishment')
  async createSubAccountForReplenishment(
    // @Body() dto: CreateSubAccountForReplenishmentDto,
  ) {
    return this.moneroWalletRpcService.createSubAccountForReplenishment();
  }

  @Post('getTxsForSubAddressIndex')
  async getTxsForSubAddressIndex(@Body() dto: GetTxsForSubAddressIndexDto) {
    console.log('con :',dto)
    return this.moneroWalletRpcService.getTxsForSubAddressIndex(dto);
  }
}
