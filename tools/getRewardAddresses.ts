import { createCardanoWalletClient } from "../src/cardano/createCardanoWalletClient";
import type { ToolConfig } from "./allTools.js";

import type { GetWalletAddressArgs } from "../interface/index.js";

/**
 * Gets the connected wallet address.
 */
export const getRewardAddressesTool: ToolConfig<GetWalletAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_reward_addresses",
      description: "Get reward addresses from the connected wallet",
      // No parameters needed since we're getting the connected wallet
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  handler: async () => {
    return await getWalletAddress();
  },
};

/**
 * Gets the connected wallet address.
 */
async function getWalletAddress(): Promise<string[]> {
  const walletClient = createCardanoWalletClient();
  const address = await walletClient.getRewardAddresses();
  return address;
}
