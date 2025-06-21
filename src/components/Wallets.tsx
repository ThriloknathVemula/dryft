"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const Wallets = () => {
    const solanawallets = JSON.parse(localStorage.getItem("solanawallets") || "[]");
    const ethwallets = JSON.parse(localStorage.getItem("ethwallets") || "[]");

    if (solanawallets.length === 0 && ethwallets.length === 0) return null;

    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">My Wallets</h1>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="solana">Solana</SelectItem>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="all">All Wallets</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}