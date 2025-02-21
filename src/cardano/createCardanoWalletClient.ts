import { BlockfrostProvider, stringToBSArray } from '@meshsdk/core';
import { MeshWallet } from '@meshsdk/core';


/**
 * Creates a new wallet client connected to the Cardano network.
 *
 * A wallet client is a client that is connected to a specific wallet and
 * can therefore perform write operations.
 *
 * @returns A new wallet client.
 */
export function createCardanoWalletClient() {
  if (!process.env.BLOCKFROST_API_KEY) {
    throw new Error(
      "⛔ BLOCKFROST_API_KEY environment variable is not set. You need to set it to create a wallet client."
    );
  }

  // Check if the private key environment variable is set
  if (!process.env.WALLET_PRIVATE_KEY) {
    throw new Error(
      "⛔ WALLET_PRIVATE_KEY environment variable is not set. You need to set it to create a wallet client."
    );
  }

  const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY);

  const mnemonic = process.env.WALLET_PRIVATE_KEY;
  const mnemonicArray = mnemonic.split(" ");
  const wallet = new MeshWallet({
    networkId: 0,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: 'mnemonic',
      words: mnemonicArray,
    },
  });
  // Create the wallet client
  return wallet;
}
