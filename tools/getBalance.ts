import { createCardanoWalletClient } from "../src/cardano/createCardanoWalletClient";
import type { ToolConfig } from "./allTools.js";

import type { GetBalanceArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_balance",
      description: "Get the balance of a wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            //pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the balance from",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    return await getBalance(wallet);
  },
};

async function getBalance(address: string) {
  const publicClient = createCardanoWalletClient();
  const totalBalance = await publicClient.getBalance();
  const lovelaceObject = totalBalance.find(item => item.unit === "lovelace");
  const adaAmount = Number.parseInt(lovelaceObject.quantity) / Number(10**6);
  return adaAmount;
}
