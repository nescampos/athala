/**
 * Arguments for the get_balance tool
 */
export interface GetBalanceArgs {
  /**
   * The wallet to get the balance of
   */
  wallet: string;
}

// No arguments needed since we're getting the connected wallet
export interface GetWalletAddressArgs {}

export interface SendTransactionArgs {
  /**
   * The recipient address
   */
  to: string;
  /**
   * The amount of ADA to send
   */
  value?: string;
  
}

export interface CreateNFTArgs {
  name: string;
  description: string;
  
}

export interface RegisterStakeArgs {
  poolId: string;
  
}

export interface WithdrawRewardsArgs {
  amount: string;
  
}



