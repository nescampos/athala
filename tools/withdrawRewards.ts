// Importing necessary functions and types for transaction handling
import { withdrawRewards } from "../src/cardano/createCardanoStakingClient"; // Function to create a Viem wallet client
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { WithdrawRewardsArgs } from "../interface/index.js"; // Type definition for send transaction arguments

// Configuration for the send transaction tool
export const withdrawRewardsTool: ToolConfig<WithdrawRewardsArgs> = {
  definition: {
    type: "function",
    function: {
      name: "withdraw_rewards",
      description: "Withdraw staking rewards",
      parameters: {
        type: "object",
        properties: {
            amount: {
            type: "string",
            description: "The amount for withdrawing rewards from staking",
          }
        },
        required: [],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await withdrawStakingRewards(args);
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function withdrawStakingRewards({
    amount
  }: WithdrawRewardsArgs) {
  try {
    const txHash = withdrawRewards(amount);


    // Returning the transaction hash and a success message
    return {
      success: true,
      hash: txHash,
      message: `Transaction sent successfully. Hash: ${txHash}`,
    };
  } catch (error) {
    // Handling errors and returning an error message
    return {
      success: false,
      hash: null,
      message: `Failed to send transaction: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
