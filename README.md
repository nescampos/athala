# Athala

## Description

**Athala** is a powerful tool designed to interact with Cardano Network. It leverages OpenAI's GPT-4o-mini model to provide a conversational interface for users to perform various blockchain operations, such as checking wallet balances, sending transactions, and more (you can extend in a simple way). The assistant embodies the persona of any character you want.

## Features

- **Conversational Interface**: Engage with the assistant to perform blockchain operations through natural language.
- **Wallet Operations**: Check wallet balances and retrieve connected wallet addresses.
- **Transaction Management**: Send transactions with customizable parameters.
- **Error Handling**: Robust error handling and feedback for failed operations.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- TypeScript
- OpenAI API key
- A [Blockfrost API key](https://blockfrost.io/)
- Environment variables for wallet private key and other configurations

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nescampos/athala.git
   cd athala
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your OpenAI API key and wallet private key:
   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   WALLET_PRIVATE_KEY=your_cardano_mnemonic
   BLOCKFROST_API_KEY=the key from Blockfrost
   ASSISTANT_NAME=eg: Darth Vader
   ```

### Usage

To start the assistant, run:

```bash
bun run src/index.ts
```

You can then interact with the assistant in the command line. Type "exit" to end the conversation.

### Tools

The assistant has access to various tools for performing blockchain operations:

#### Read Operations
- **get_balance**: Check wallet balances on the Cardano network
- **get_wallet_address**: Retrieve the connected wallet's address
- **get_reward_addresses**: Get the rewards addresses (for staking) from connected wallet.
- **get_unused_addresses**: Get the unused addresses from connected wallet.

#### Write Operations
- **send_transaction**: Send transactions with customizable parameters including:
  - Transaction value in ADA
- **create_nft**: Create a NFT with customizable parameters including:
  - You need to specify the name and description.
  - Other parameters are default (TODO)
- **register_stakeaddress**: Register to stake and with a pool id:
  - Pool Id for staking
- **delegate_stake**: Delegate stake to a pool:
  - Pool Id for staking
- **withdraw_rewards**: Withdraw staking rewards specifying:
  - Amount (in ADA) for withdrawing.
- **deregister_stakeaddress**: Deregister the wallet from staking
  - No parameters

## Codebase Flow

The following sequence diagram illustrates the core flow of the application:

```mermaid
sequenceDiagram
    participant User
    participant Main
    participant Assistant
    participant Thread
    participant Tools
    participant Blockchain

    User->>Main: Start Application
    Main->>Assistant: Create Assistant
    Main->>Thread: Create Thread
    
    loop Chat Session
        User->>Main: Enter Command
        alt Command == "exit"
            Main->>User: End Session
        else Valid Command
            Main->>Thread: Add Message
            Thread->>Assistant: Process Message
            
            opt Requires Blockchain Action
                Assistant->>Tools: Call Tool
                Tools->>Blockchain: Execute Operation
                Blockchain-->>Tools: Return Result
                Tools-->>Assistant: Return Response
            end
            
            Assistant-->>Thread: Update Thread
            Thread-->>Main: Return Response
            Main->>User: Display Response
        end
    end
```

### Diagram Explanation

The sequence diagram above shows the interaction flow between different components:

1. **Initialization**:
   - Application starts with creating an OpenAI Assistant
   - A new Thread is created for the conversation

2. **Chat Session Loop**:
   - User enters commands through the CLI
   - Commands are processed through the Thread and Assistant
   - For blockchain operations, specific Tools are called
   - Results are returned through the chain of components

3. **Blockchain Integration**:
   - Tools interface with the blockchain through @meshsdk client
   - Operations are executed on the Cardano network
   - Results are propagated back to the user

4. **Session Management**:
   - Users can exit the application at any time
   - Each command is processed in a sequential manner
   - Responses are displayed back to the user

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4o-mini model.
- [@meshsdk Library](https://meshjs.dev/) for blockchain interaction utilities.

## Contact

https://x.com/nes_campos 
