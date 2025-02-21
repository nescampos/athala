// Importing necessary functions and types for transaction handling
import { registerStakeAddress } from "../src/cardano/createCardanoStakingClient"; // Function to create a Viem wallet client
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { RegisterStakeArgs } from "../interface/index.js"; // Type definition for send transaction arguments

// Configuration for the send transaction tool
export const registerStakeAddressTool: ToolConfig<RegisterStakeArgs> = {
  definition: {
    type: "function",
    function: {
      name: "register_stakeaddress",
      description: "Register a stake address before delegate to stakepools.",
      parameters: {
        type: "object",
        properties: {
            poolId: {
            type: "string",
            description: "Id of the pool for the staking",
          }
        },
        required: ["poolId"],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await registerStake(args);
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function registerStake({
    poolId
}: RegisterStakeArgs) {
  try {
    const txHash = registerStakeAddress(poolId);


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
