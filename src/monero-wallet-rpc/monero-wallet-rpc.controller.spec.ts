import { Test, TestingModule } from '@nestjs/testing';
import { MoneroWalletRpcController } from './monero-wallet-rpc.controller';

describe('MoneroWalletRpcController', () => {
  let controller: MoneroWalletRpcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneroWalletRpcController],
    }).compile();

    controller = module.get<MoneroWalletRpcController>(MoneroWalletRpcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
