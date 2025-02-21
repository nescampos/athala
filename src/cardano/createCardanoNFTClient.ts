import { MeshTxBuilder, BlockfrostProvider, ForgeScript, resolveScriptHash, stringToHex } from '@meshsdk/core';
import { createCardanoWalletClient } from "./createCardanoWalletClient";
import type { Asset } from '@meshsdk/core';


export async function createCardanoNFTClient(name:string, description:string) {
    if (!process.env.BLOCKFROST_API_KEY) {
      throw new Error(
        "⛔ BLOCKFROST_API_KEY environment variable is not set. You need to set it to create a wallet client."
      );
    }
  
    const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY);
    const wallet = createCardanoWalletClient()

    const utxos = await wallet.getUtxos();
    const changeAddress = await wallet.getChangeAddress();
    const forgingScript = ForgeScript.withOneSignature(changeAddress);

    const demoAssetMetadata = {
    name: name,
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: description,
    };
    const policyId = resolveScriptHash(forgingScript);
    const tokenName = name;
    const tokenNameHex = stringToHex(tokenName);
    const metadata = { [policyId]: { [tokenName]: { ...demoAssetMetadata } } };

    const txBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider, // get a provider https://meshjs.dev/providers
    verbose: true,
    });

    const unsignedTx = await txBuilder
    .mint("1", policyId, tokenNameHex)
    .mintingScript(forgingScript)
    .metadataValue(721, metadata)
    .changeAddress(changeAddress)
    .selectUtxosFrom(utxos)
    .complete();

    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  
    return txHash;
  }
  