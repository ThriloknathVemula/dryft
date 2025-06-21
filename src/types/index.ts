export interface Wallet {
    publickey: string,
    privatekey: string,
    account: number,
    network: "solana" | "ethereum",
    createdAt: string
}