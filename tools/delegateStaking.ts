// Importing necessary functions and types for transaction handling
import { delegateStake } from "../src/cardano/createCardanoStakingClient"; // Function to create a Viem wallet client
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { RegisterStakeArgs } from "../interface/index.js"; // Type definition for send transaction arguments

// Configuration for the send transaction tool
export const delegateStakeTool: ToolConfig<RegisterStakeArgs> = {
  definition: {
    type: "function",
    function: {
      name: "delegate_stake",
      description: "Delegate a staking with the pool.",
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
    const result = await delegateStaking(args);
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function delegateStaking({
    poolId
}: RegisterStakeArgs) {
  try {
    const txHash = delegateStake(poolId);


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
