import { Injectable } from '@nestjs/common';
import { CreateSubAccountForReplenishmentDto } from './dto/Creat-subAddress-for-replenishment.dto';
import { InjectModel } from 'nestjs-typegoose';
import { WalletModel } from './model/creatWallet.model/wallet.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { connectToWalletRpc } from 'monero-javascript';
import { GetTxsForSubAddressIndexDto } from './dto/get-txs-for-subAddress-index.dto';

@Injectable()
export class MoneroWalletRpcService {
  constructor() {} // private readonly walletModel: ModelType<WalletModel>, // @InjectModel(WalletModel)

  async createSubAccountForReplenishment(
    dto: CreateSubAccountForReplenishmentDto,
  ) {
    let walletRpc = await this.getWallet();

    let subAddress = await walletRpc.createSubaddress(dto.accountIndex);

    return {
      address: subAddress.getAddress(),
      index: subAddress.getIndex(),
    };
  }

  async getTxsForSubAddressIndex(dto: GetTxsForSubAddressIndexDto) {
    let walletRpc = await this.getWallet();

    let transfers = await walletRpc.getTransfers({
      isOutgoing: false,
      accountIndex: 0,
      subaddressIndex: dto.addressIndex,
    });

    return transfers.map((moneroTransfer) => {
      return moneroTransfer.getTx().toJson();
    });
  }

  async getWallet() {
    return await (
      await connectToWalletRpc(
        'http://192.168.0.2:18084',
        'monero',
        'rpcPassword',
      )
    ).openWallet('boss', '1');
  }
}
