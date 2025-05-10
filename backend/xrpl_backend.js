import {
  Client,
  Wallet,
  dropsToXrp,
  getBalanceChanges,
  xrpToDrops,
} from "xrpl";

const sendXRP = async () => {
  const client = new Client("wss://s.altnet.rippletest.net:51233");

  const wallet = Wallet.fromSeed("sEdSKfNn2su2KMk8753ZS7Rjsc7P7rK");
  console.log(wallet);
  await client.connect();

  const prepared = await client.autofill({
    TransactionType: "Payment",
    Account: wallet.classicAddress,
    Amount: xrpToDrops("1"),
    Destination: "r2pyswkZmwXTDj18LqimhLCWSNJbuz9zi",
  });
  const max_ledger = prepared.LastLedgerSequence;
  console.log("Prepared transaction instructions:", prepared);
  console.log("Transaction cost:", dropsToXrp(prepared.Fee), "XRP");
  console.log("Transaction expires after ledger:", max_ledger);

  // Sign prepared instructions ------------------------------------------------
  const signed = wallet.sign(prepared);
  console.log("Identifying hash:", signed.hash);
  console.log("Signed blob:", signed.tx_blob);

  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(signed.tx_blob);

  console.log(tx.result.meta.TransactionResult);
  // Check transaction results -------------------------------------------------
  console.log("Transaction result:", tx.result.meta.TransactionResult);
  console.log(
    "Balance changes:",
    JSON.stringify(getBalanceChanges(tx.result.meta), null, 2)
  );

  await client.disconnect();
};

const createWallet = async () => {
  const newWallet = Wallet.generate();
  console.log(`new Wallet:`, newWallet);

  const entropy = new Uint8Array(16); // 16 bytes
  window.crypto.getRandomValues(entropy); // Browser-safe random bytes
  const entropyHex = Array.from(entropy)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const walletFromEntropy = Wallet.fromEntropy(entropyHex);
  console.log("Wallet created from entropy:", walletFromEntropy);
  // {
  //   classicAddress: "rDJ9kQSKK2UjqM14fLJyXtozvW8HgRYJfD";
  //   privateKey: "ED2856BA5B26138CC9F32547ABE54905B56007A120B0A8388CFACD31169018A941";
  //   publicKey: "EDEF8CDC95BBB76015A0C55FF801C39B463549564FEDC6BE7A8E4ECDB36E480789";
  //   seed: "sEdSKfNn2su2KMk8753ZS7Rjsc7P7rK";
  // }
};

const accountInfo = async () => {
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const balance = await client.getXrpBalance(
    "rDJ9kQSKK2UjqM14fLJyXtozvW8HgRYJfD"
  );
  console.log(`Balance: ${balance} XRP`);

  const response = await client.request({
    command: "account_info",
    account: "rDJ9kQSKK2UjqM14fLJyXtozvW8HgRYJfD",
    ledger_index: "validated",
  });
  console.log(response);

  await client.disconnect();
};
