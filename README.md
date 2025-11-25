# API Monero Wallet RPC

REST API for interacting with Monero Wallet RPC, built on the NestJS framework. This project provides a convenient interface for managing Monero wallets, creating subaddresses, and retrieving transaction information.

## Description

This project is a backend service for working with Monero cryptocurrency through Wallet RPC. Key features include:

- Creating subaddresses for wallet replenishment
- Retrieving transaction lists for specific subaddresses
- MongoDB integration for data storage
- Type-safe data handling with TypeScript

## Technologies

- **NestJS** v10.2.4 - Progressive Node.js framework
- **TypeScript** v5.1.3 - Typed JavaScript
- **MongoDB** - NoSQL database
- **Typegoose** v11.5.0 - TypeScript wrapper for Mongoose
- **monero-javascript** v0.8.4 - Library for Monero integration
- **class-validator** v0.14.0 - Data validation

## Requirements

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (v4.0+)
- Monero Wallet RPC (running and accessible)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd API-monero-wallet-rpc
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env` file:
```env
MONGO_LOGIN=admin
MONGO_PASSWORD=admin
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_AUTHDATABASE=admin
JWT_SECRET=test
```

## Configuration

### Monero Wallet RPC Connection

Configure connection parameters in `src/monero-wallet-rpc/monero-wallet-rpc.service.ts`:

```typescript
async getWallet() {
  return await connectToWalletRpc(
    'http://192.168.0.2:18084',  // Your Wallet RPC URL
    'monero',                     // Username
    'rpcPassword',                // RPC password
  ).openWallet('boss', '1');      // Wallet name and password
}
```

### MongoDB Connection

MongoDB configuration is located in `config/mongo.config.ts` and uses environment variables from `.env`.

## Running the Application

```bash
# Development mode
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run build
npm run start:prod
```

The application will start on port **3001**.

## API Endpoints

### 1. Create Subaddress for Replenishment

**GET** `/wallet/createSubAccountForReplenishment`

Creates a new subaddress in account 0 for receiving payments.

**Response:**
```json
{
  "address": "8BW...",
  "index": 5
}
```

### 2. Get Transactions for Subaddress

**POST** `/wallet/getTxsForSubAddressIndex`

Returns a list of incoming transactions for the specified subaddress.

**Request Body:**
```json
{
  "addressIndex": 5
}
```

**Response:**
```json
[
  {
    "hash": "...",
    "amount": "...",
    "confirmations": 10,
    ...
  }
]
```

## Project Structure

```
API-monero-wallet-rpc/
├── src/
│   ├── monero-wallet-rpc/          # Main Monero module
│   │   ├── dto/                    # Data Transfer Objects
│   │   │   ├── Creat-subAddress-for-replenishment.dto.ts
│   │   │   └── get-txs-for-subAddress-index.dto.ts
│   │   ├── model/                  # Data models
│   │   │   └── creatWallet.model/
│   │   │       └── wallet.model.ts
│   │   ├── monero-wallet-rpc.controller.ts
│   │   ├── monero-wallet-rpc.service.ts
│   │   └── monero-wallet-rpc.module.ts
│   ├── app.module.ts               # Root application module
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts                     # Entry point
├── config/
│   └── mongo.config.ts             # MongoDB configuration
├── test/                           # E2E tests
├── .env                            # Environment variables
├── package.json
└── tsconfig.json
```

## Development

### Code Formatting

```bash
npm run format
```

### Linting

```bash
npm run lint
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Data Models

### WalletModel

Model for storing wallet information in MongoDB:

```typescript
{
  idUSer: string;      // User ID
  createdAt: Date;     // Creation date
  updatedAt: Date;     // Update date
}
```

## Security

⚠️ **Important:**
- Never store private keys in code
- Use environment variables for sensitive data
- Change default passwords in `.env` before deployment
- Configure firewall to restrict Wallet RPC access
- Use HTTPS in production environment

## License

UNLICENSED
