export interface Wallet {
    publicKey: string,
    privateKey: string,
    account: number,
    network: "solana" | "ethereum",
    createdAt: string
}