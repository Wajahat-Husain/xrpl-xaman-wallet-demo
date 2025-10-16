# XRPL Xaman Wallet Demo

A comprehensive React-based demonstration application showcasing integration with the XRP Ledger (XRPL) using Xaman Wallet (formerly XUMM) and the xrpl-wallet-kit library. This demo provides a complete example of connecting to XRPL testnet, managing wallet sessions, checking balances, and sending XRP transactions.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **XRPL Integration**: xrpl.js, xrpl-wallet-kit
- **Wallet**: Xaman Wallet (XUMM)
- **Network**: XRPL Testnet

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- Xaman Wallet mobile app installed on your device
- XUMM Developer Account (for app registration)

## 🔧 Installation

1. **Clone the repository**


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Copy the environment example file:
     ```bash
     cp #envExample .env
     ```
   - Fill in your environment variables in `.env`:
     ```env
     VITE_XUMM_APP_ID=your_xumm_app_id_here
     VITE_RIPPLE_WS=wss://s.altnet.rippletest.net:51233
     ```

4. **Get XUMM App ID**
   - Visit [XUMM Developer Portal](https://apps.xumm.dev/)
   - Create a new app and get your App ID
   - Add the App ID to your `.env` file

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173`


## 📱 How to Use

1. **Start the Application**: Run `npm run dev` and open your browser
2. **Connect Wallet**: Click "Connect Xumm Wallet" button
3. **Scan QR Code**: Use Xaman Wallet to scan the QR code
4. **Approve Connection**: Approve the connection in your Xaman Wallet
5. **View Balance**: Your XRP balance will be displayed
6. **Send XRP**: Click "Send 1 XRP" to send a test transaction
7. **Sign Transaction**: Approve the transaction in your Xaman Wallet

## 🏗️ Project Structure

```
xrpl-xaman-wallet-demo/
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Component styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── backend/
│   └── xrpl_backend.js  # Backend XRPL utilities
├── public/
│   └── vite.svg         # Vite logo
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
└── README.md           # This file
```

## 🔧 Key Components

### App.jsx

The main React component that handles:

- Wallet connection via xrpl-wallet-kit
- WebSocket connection to XRPL testnet
- Balance retrieval and display
- Transaction creation and signing
- Session management

### backend/xrpl_backend.js

Backend utilities demonstrating:

- Direct XRPL client connection
- Wallet generation and management
- Transaction preparation and submission
- Account information retrieval

## 🔗 XRPL Resources

### Official Documentation

- [XRPL Documentation](https://xrpl.org/docs) - Official XRPL documentation
- [JavaScript SDK](https://js.xrpl.org/) - xrpl.js library documentation

### Wallet Integration

- [xrpl-wallet-kit](https://github.com/garantor/xrpl-wallet-kit) - Wallet integration library
- [xrpl-wallet-standard](https://github.com/tequdev/xrpl-wallet-standard) - Wallet standard implementation

### Other Language SDKs

- [XRPL Swift](https://github.com/Transia-RnD/XRPLSwift) - iOS/macOS SDK
- [XRPKit](https://cocoapods.org/pods/XRPKit) - CocoaPods package
- [xrpl4j](https://github.com/XRPLF/xrpl4j) - Java SDK

## 🧪 Testing

This demo uses the XRPL Testnet. You can get test XRP from:

- [XRPL Testnet Faucet](https://faucet.triangleplatform.com/xrp/testnet)
- [XRPL Testnet Explorer](https://testnet.xrpl.org/)

## 🔒 Security Notes

- This demo uses XRPL Testnet - no real funds are at risk
- Never commit your `.env` file with real credentials
- The seed in `backend/xrpl_backend.js` is for demonstration only
- Always use environment variables for sensitive data in production

