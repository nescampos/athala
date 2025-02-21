// Importing necessary functions and types for transaction handling
import { deregisterStake } from "../src/cardano/createCardanoStakingClient"; // Function to create a Viem wallet client
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { GetWalletAddressArgs } from "../interface/index.js"; // Type definition for send transaction arguments

// Configuration for the send transaction tool
export const deregisterStakeAddressTool: ToolConfig<GetWalletAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "deregister_stakeaddress",
      description: "Deregister a stake address.",
      parameters: {
        type: "object",
        properties: {
          //   poolId: {
          //   type: "string",
          //   description: "Id of the pool for the staking",
          // }
        },
        required: [],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await deregisterStaking();
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function deregisterStaking() {
  try {
    const txHash = deregisterStake();


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
