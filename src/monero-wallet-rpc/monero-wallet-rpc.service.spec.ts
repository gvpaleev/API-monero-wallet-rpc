import { Test, TestingModule } from '@nestjs/testing';
import { MoneroWalletRpcService } from './monero-wallet-rpc.service';

describe('MoneroWalletRpcService', () => {
  let service: MoneroWalletRpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneroWalletRpcService],
    }).compile();

    service = module.get<MoneroWalletRpcService>(MoneroWalletRpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
