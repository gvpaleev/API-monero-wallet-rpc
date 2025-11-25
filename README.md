# API Monero Wallet RPC

REST API для взаимодействия с Monero Wallet RPC, построенный на фреймворке NestJS. Проект предоставляет удобный интерфейс для управления Monero кошельками, создания субадресов и получения информации о транзакциях.

## Описание

Этот проект представляет собой backend-сервис для работы с Monero криптовалютой через Wallet RPC. Основные возможности включают:

- Создание субадресов для пополнения кошелька
- Получение списка транзакций для конкретного субадреса
- Интеграция с MongoDB для хранения данных
- Типобезопасная работа с данными через TypeScript

## Технологии

- **NestJS** v10.2.4 - прогрессивный Node.js фреймворк
- **TypeScript** v5.1.3 - типизированный JavaScript
- **MongoDB** - NoSQL база данных
- **Typegoose** v11.5.0 - TypeScript обертка для Mongoose
- **monero-javascript** v0.8.4 - библиотека для работы с Monero
- **class-validator** v0.14.0 - валидация данных

## Требования

- Node.js (рекомендуется v18+)
- npm или yarn
- MongoDB (v4.0+)
- Monero Wallet RPC (запущенный и доступный)

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd API-monero-wallet-rpc
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте переменные окружения в файле `.env`:
```env
MONGO_LOGIN=admin
MONGO_PASSWORD=admin
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_AUTHDATABASE=admin
JWT_SECRET=test
```

## Конфигурация

### Подключение к Monero Wallet RPC

В файле `src/monero-wallet-rpc/monero-wallet-rpc.service.ts` настройте параметры подключения:

```typescript
async getWallet() {
  return await connectToWalletRpc(
    'http://192.168.0.2:18084',  // URL вашего Wallet RPC
    'monero',                     // Имя пользователя
    'rpcPassword',                // Пароль RPC
  ).openWallet('boss', '1');      // Имя кошелька и пароль
}
```

### Подключение к MongoDB

Конфигурация MongoDB находится в `config/mongo.config.ts` и использует переменные окружения из `.env`.

## Запуск приложения

```bash
# Режим разработки
npm run start:dev

# Режим отладки
npm run start:debug

# Production режим
npm run build
npm run start:prod
```

Приложение запустится на порту **3001**.

## API Endpoints

### 1. Создание субадреса для пополнения

**GET** `/wallet/createSubAccountForReplenishment`

Создает новый субадрес в аккаунте 0 для получения платежей.

**Ответ:**
```json
{
  "address": "8BW...",
  "index": 5
}
```

### 2. Получение транзакций для субадреса

**POST** `/wallet/getTxsForSubAddressIndex`

Возвращает список входящих транзакций для указанного субадреса.

**Тело запроса:**
```json
{
  "addressIndex": 5
}
```

**Ответ:**
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

## Структура проекта

```
API-monero-wallet-rpc/
├── src/
│   ├── monero-wallet-rpc/          # Основной модуль работы с Monero
│   │   ├── dto/                    # Data Transfer Objects
│   │   │   ├── Creat-subAddress-for-replenishment.dto.ts
│   │   │   └── get-txs-for-subAddress-index.dto.ts
│   │   ├── model/                  # Модели данных
│   │   │   └── creatWallet.model/
│   │   │       └── wallet.model.ts
│   │   ├── monero-wallet-rpc.controller.ts
│   │   ├── monero-wallet-rpc.service.ts
│   │   └── monero-wallet-rpc.module.ts
│   ├── app.module.ts               # Корневой модуль приложения
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts                     # Точка входа
├── config/
│   └── mongo.config.ts             # Конфигурация MongoDB
├── test/                           # E2E тесты
├── .env                            # Переменные окружения
├── package.json
└── tsconfig.json
```

## Разработка

### Форматирование кода

```bash
npm run format
```

### Линтинг

```bash
npm run lint
```

### Тестирование

```bash
# Unit тесты
npm run test

# E2E тесты
npm run test:e2e

# Покрытие тестами
npm run test:cov

# Режим watch
npm run test:watch
```

## Модели данных

### WalletModel

Модель для хранения информации о кошельках в MongoDB:

```typescript
{
  idUSer: string;      // ID пользователя
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

## Безопасность

⚠️ **Важно:**
- Не храните приватные ключи в коде
- Используйте переменные окружения для конфиденциальных данных
- Измените дефолтные пароли в `.env` перед деплоем
- Настройте firewall для ограничения доступа к Wallet RPC
- Используйте HTTPS в production окружении

## Лицензия

UNLICENSED
