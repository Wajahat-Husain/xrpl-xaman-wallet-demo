import React, { useState } from "react";
import { dropsToXrp, Client as XrplClientWs, xrpToDrops } from "xrpl";
import { EsupportedWallet, Networks, XRPLKit } from "xrpl-wallet-kit";
import "./App.css";

function App() {
  const [kit, setKit] = useState(null); // XRPLKit instance
  const [session, setSession] = useState(null); // wallet session
  const [wsClient, setWsClient] = useState(null); // xrpl.js Client
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    const xkit = new XRPLKit(EsupportedWallet.XUMM, Networks.TESTNET); // :contentReference[oaicite:1]{index=1}
    setKit(xkit);

    const sess = await xkit.connectKitToWallet(
      null,
      import.meta.env.VITE_XUMM_APP_ID
    );
    setSession(sess);
    const userAddress = sess.activeSession.me.account;
    setAddress(userAddress);

    const ws = new XrplClientWs(import.meta.env.VITE_RIPPLE_WS); // :contentReference[oaicite:2]{index=2}
    await ws.connect();
    setWsClient(ws);

    await getBalance(ws, userAddress);
  };

  const getBalance = async (ws, addr) => {
    try {
      const response = await ws.request({
        command: "account_info",
        account: addr,
        ledger_index: "validated",
      });

      setBalance(dropsToXrp(response?.result?.account_data?.Balance));
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const disconnectWallet = async () => {
    if (kit) await kit.disconnect();
    if (wsClient) await wsClient.disconnect();
    setKit(null);
    setSession(null);
    setWsClient(null);
    setAddress("");
  };

  const sendXrp = async () => {
    if (!kit || !session || !wsClient) return;

    // For signing with other wallets(XUMM, GEM)
    const tx = {
      TransactionType: "Payment",
      Account: address,
      Destination: "r2pyswkZmwXTDj18LqimhLCWSNJbuz9zi",
      Amount: xrpToDrops("1"),
    };

    // To send a walletconnect transaction for signing;
    // const tx = {
    //   request: {
    //     method: "the_wallet_connect_method",
    //     params: {
    //       tx_json: {
    //         TransactionType: "Payment",
    //         Account: address,
    //         Destination: "r2pyswkZmwXTDj18LqimhLCWSNJbuz9zi",
    //         Amount: xrpToDrops("1"),
    //       },
    //     },
    //   },
    // };

    // sign via the wallet
    const hash = await kit.signTransaction(tx);
    console.log("Payment hash result:", hash);
  };

  return (
    <div className="App">
      {!session ? (
        <button onClick={connectWallet}>Connect Xumm Wallet</button>
      ) : (
        <>
          <p>Address: {address}</p>
          <p>Balance: {balance ? `${balance} XRP` : "Loading..."}</p>
          <button onClick={sendXrp}>Send 1 XRP</button>
          <button onClick={disconnectWallet}>Disconnect</button>
        </>
      )}
    </div>
  );
}

export default App;
