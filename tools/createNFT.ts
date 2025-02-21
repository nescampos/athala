// Importing necessary functions and types for transaction handling
import { createCardanoNFTClient } from "../src/cardano/createCardanoNFTClient"; // Function to create a Viem wallet client
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { CreateNFTArgs } from "../interface/index.js"; // Type definition for send transaction arguments

// Configuration for the send transaction tool
export const createNFTTool: ToolConfig<CreateNFTArgs> = {
  definition: {
    type: "function",
    function: {
      name: "create_nft",
      description: "Create a new NFT",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the NFT",
          },
          description: {
            type: "string",
            description: "The description of the NFT",
          }
        },
        required: ["name", "description"],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await createNFT(args);
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function createNFT({
  name,
  description,
}: CreateNFTArgs) {
  try {
    const txHash = createCardanoNFTClient(name, description);


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
