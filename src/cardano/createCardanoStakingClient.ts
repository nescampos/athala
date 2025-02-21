import { MeshTxBuilder, BlockfrostProvider, deserializePoolId } from '@meshsdk/core';
import { createCardanoWalletClient } from "./createCardanoWalletClient";
import type { Asset } from '@meshsdk/core';


export async function registerStakeAddress(poolId:string) {
    if (!process.env.BLOCKFROST_API_KEY) {
      throw new Error(
        "⛔ BLOCKFROST_API_KEY environment variable is not set. You need to set it to create a wallet client."
      );
    }
  
    const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY);
    const wallet = createCardanoWalletClient();

    const utxos = await wallet.getUtxos();
    const address = await wallet.getChangeAddress();
    const addresses = await wallet.getRewardAddresses();
    const rewardAddress = addresses[0]!;
    const poolIdHash = deserializePoolId(poolId);

    if (rewardAddress === undefined) {
    throw "No address found";
    }

    const txBuilder = new MeshTxBuilder({
        fetcher: blockchainProvider, // get a provider https://meshjs.dev/providers
        verbose: true,
    });

    const unsignedTx = await txBuilder
        .registerStakeCertificate(rewardAddress)
        .delegateStakeCertificate(rewardAddress, poolIdHash)
        .selectUtxosFrom(utxos)
        .changeAddress(address)
        .complete();

    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);

    return txHash;
  }
  
  export async function delegateStake(poolId:string) {
    if (!process.env.BLOCKFROST_API_KEY) {
      throw new Error(
        "⛔ BLOCKFROST_API_KEY environment variable is not set. You need to set it to create a wallet client."
      );
    }
  
    const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY);
    const wallet = createCardanoWalletClient();

    const utxos = await wallet.getUtxos();
    const address = await wallet.getChangeAddress();
    const addresses = await wallet.getRewardAddresses();
    const rewardAddress = addresses[0]!;
    const poolIdHash = deserializePoolId(poolId);

    if (rewardAddress === undefined) {
        throw "No address found";
    }

    const txBuilder = new MeshTxBuilder({
        fetcher: blockchainProvider, // get a provider https://meshjs.dev/providers
        verbose: true,
    });

    const unsignedTx = await txBuilder
        .delegateStakeCertificate(rewardAddress, poolIdHash)
        .selectUtxosFrom(utxos)
        .changeAddress(address)
        .complete();

    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);

    return txHash;
  }

  export async function withdrawRewards(amount:string) {
    if (!process.env.BLOCKFROST_API_KEY) {
      throw new Error(
        "⛔ BLOCKFROST_API_KEY environment variable is not set. You need to set it to create a wallet client."
      );
    }
  
    const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY);
    const wallet = createCardanoWalletClient();

    const utxos = await wallet.getUtxos();
    const address = await wallet.getChangeAddress();
    const addresses = await wallet.getRewardAddresses();
    const rewardAddress = addresses[0]!;

    if (rewardAddress === undefined) {
        throw "No address found";
    }

    const txBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider, // get a provider https://meshjs.dev/providers
    verbose: true,
    });

    const total = Number.parseInt(amount) * Number(10**6);
    const unsignedTx = await txBuilder
    .withdrawal(rewardAddress, total.toString())
    .selectUtxosFrom(utxos)
    .changeAddress(address)
    .complete();

    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);

    return txHash;
  }

  export async function deregisterStake() {
    if (!process.env.BLOCKFROST_API_KEY) {
      throw new Error(
        "⛔ BLOCKFROST_API_KEY environment variable is not set. You need to set it to create a wallet client."
      );
    }
  
    const blockchainProvider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY);
    const wallet = createCardanoWalletClient();

    const utxos = await wallet.getUtxos();
    const address = await wallet.getChangeAddress();
    const addresses = await wallet.getRewardAddresses();
    const rewardAddress = addresses[0]!;

    if (rewardAddress === undefined) {
        throw "No address found";
    }

    const txBuilder = new MeshTxBuilder({
        fetcher: blockchainProvider, // get a provider https://meshjs.dev/providers
        verbose: true,
    });

    const unsignedTx = await txBuilder
    .deregisterStakeCertificate(rewardAddress)
    .selectUtxosFrom(utxos)
    .changeAddress(address)
    .complete();

    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);

    return txHash;
  }