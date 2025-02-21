import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";
import { createCardanoWalletClient } from "./createCardanoWalletClient";


export async function createCardanoTransactionClient(destination:string, amount) {
    if (!process.env.BLOCKFROST_API_KEY) {
      throw new Error(
        "⛔ BLOCKFROST_API_KEY environment variable is not set. You need to set it to create a wallet client."
      );
    }
  
    const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY);
    const wallet = createCardanoWalletClient()

    const txBuilder = new MeshTxBuilder({
        fetcher: blockchainProvider,
        verbose: true,
      });

    const utxos = await wallet.getUtxos();
    const changeAddress = await wallet.getChangeAddress();
    
    const lovelaceAmount = Number.parseInt(amount) * Number(10**6);
    const unsignedTx = await txBuilder
        .txOut(destination, [{ unit: "lovelace", quantity: lovelaceAmount.toString() }])
        .changeAddress(changeAddress)
        .selectUtxosFrom(utxos)
        .complete();
    
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  
    return txHash;
  }
  