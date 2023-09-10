import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/creat-wallet-rpc.dto';
import { InjectModel } from 'nestjs-typegoose';
import { WalletModel } from './model/creatWallet.model/wallet.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import {connectToWalletRpc}  from 'monero-javascript' ;
import { GetBalanceDto } from './dto/getBalance.dto';


@Injectable()
export class MoneroWalletRpcService {

    constructor (@InjectModel(WalletModel) private readonly walletModel: ModelType<WalletModel>){

    }

    // async create(dto: CreateWalletDto){

    //     const newUser = new this.walletModel({
    //         idUSer:dto.idUser
    //     });
    //     return  newUser.save()
    // }

    async newAddres(){
        let walletRpc = await connectToWalletRpc("http://192.168.0.2:18084", "monero", "rpcPassword"); 
        await walletRpc.openWallet("boss", "1");    
        // let primaryAddress = await walletRpc.getPrimaryAddress(); // 555zgduFhmKd2o8rPU z...
        let subAddress = await walletRpc.createSubaddress(0,"new-sub")
        // let balance = await walletRpc.getBalance(0,4);               // 533648366742
        // let txs = await walletRpc.getTxs();         
        return {
            address:subAddress.state.address,
            index:subAddress.state.index
        }
    }

    async getBalance(dto: GetBalanceDto){
        let walletRpc = await connectToWalletRpc("http://192.168.0.2:18084", "monero", "rpcPassword"); 
        let balance = await walletRpc.getBalance(0,dto.index); 
        
        return balance._d;
    }
}
