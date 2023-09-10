import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoneroWalletRpcModule } from './monero-wallet-rpc/monero-wallet-rpc.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from 'config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: getMongoConfig  
    }),
    MoneroWalletRpcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 