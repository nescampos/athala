import { getBalanceTool } from "./getBalance";
import { getWalletAddressTool } from "./getWalletAddress";
import { sendTransactionTool } from "./sendTransaction";
import { createNFTTool } from "./createNFT";
import { registerStakeAddressTool } from "./registerStake";
import { delegateStakeTool } from "./delegateStaking";

export interface ToolConfig<T = any> {
  /**
   * The definition of the tool.
   */
  definition: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
      };
    };
  };

  /**
   * The handler function that will be called when the tool is executed.
   */
  handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
  // == READ == \\
  /**
   * Get the balance of a wallet.
   */
  get_balance: getBalanceTool,
  /**
   * Get the connected wallet address.
   */
  get_wallet_address: getWalletAddressTool,

  // == WRITE == \\
  /**
   * Send a transaction with optional parameters.
   */
  send_transaction: sendTransactionTool,
  /**
   * Create a NFT with required parameters.
   */
   create_nft: createNFTTool,

  /**
   * Register a pool id for staking
   */
   register_stakeaddress: registerStakeAddressTool,

  /**
   * Delegate stake to a pool
   */
   delegate_stake: delegateStakeTool,
};
