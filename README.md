# Cryptocurrency Exchange API
### Running live on https://koinx-assignment-j3ks.onrender.com/

### Prerequisites

- Node.js
- MongoDB 

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Chadokar/KoinX-assignment.git
    ```

2. Navigate to the project directory:

    ```bash
    cd KoinX-assignment
    ```

3. Install dependencies:

   ```node
   npm install
   ```

   or alternatively

   ```node
   npm i
   ```

## Defining environment variables

```bash
PORT
DATABASE_URL="<mongodb url>"
EMAIL="<email to send otp with>"
EMAIL_PASSWORD="<app password for email>"
```


## Run the project

Use the following command to run:

```bash
npm start
```


## API endpoints

### GET /

Check if the API is running.

**Response:**

`{ "message": "Running" }`

### GET /exchange-price

Calculate the exchange price between two cryptocurrencies.

**Query Parameters:**

*   `fromCurrency`: ID of the source cryptocurrency
*   `toCurrency`: ID of the target cryptocurrency
*   `date`: Date for historical price data in DD-MM-YYYY (optional)

`curl "http://localhost8000/exchange-price?fromCurrency=bitcoin&toCurrency=ethereum&date=10-04-2024"`

**Response:**

`{   "fromCurrency": "Bitcoin",   "toCurrency": "Ethereum",   "date": "10-04-2024",   "price": 0.075 }`

### GET /companies/public_treasury

Retrieve a list of companies that have a specified cryptocurrency in their public treasury.

**Query Parameters:**

*   `id`: Cryptocurrency ID

`curl "http://localhost:8000/companies/public_treasury?id=bitcoin`

**Response:**

`[     {
    "name": "MicroStrategy Inc.",
    "symbol": "NASDAQ:MSTR",
    "country": "US",
    "total_holdings": 174530,
    "total_entry_value_usd": 4680000000,
    "total_current_value_usd": 12083007132,
    "percentage_of_total_supply": 0.831
  },   ... ]`




