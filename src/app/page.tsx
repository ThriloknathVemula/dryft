"use client"

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { BrandCard } from "@/components/BrandCard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { WalletCard } from "@/components/WalletCard";
import { AddWalletDialog } from "@/components/AddWalletDialog";
import { Button } from "@/components/ui/button";
import { DeleteWalletDialog } from "@/components/DeleteWalletDialog";

export default function Home() {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const solanawallets = JSON.parse(localStorage.getItem("solanawallets") || "[]");
    const ethwallets = JSON.parse(localStorage.getItem("ethwallets") || "[]");
    const router = useRouter();

    if (solanawallets.length === 0 && ethwallets.length === 0) {
        router.replace("/wallet");
        toast.warning("Create a new wallet or import your existing wallet")
    };

    let filteredWallets = [...solanawallets, ...ethwallets];
    
    if (selectedFilter === "solana") filteredWallets = solanawallets;
    else if (selectedFilter === "ethereum") filteredWallets = ethwallets;
    else filteredWallets = [...solanawallets, ...ethwallets];

    filteredWallets.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return (
        <div className="p-10">
            <BrandCard />
            <div className="flex justify-between items-center mt-7">
                <h1 className="font-bold text-3xl">My Wallets</h1>
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-5">
                        <AddWalletDialog />
                        <DeleteWalletDialog />
                    </div>
                    <Select onValueChange={(value) => setSelectedFilter(value)}  defaultValue={"all"}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Wallet"/>
                        </SelectTrigger>
                        <SelectContent className="focus-visible:outline-none">
                            <SelectItem value="all">All Wallets</SelectItem>
                            <SelectItem value="solana">Solana</SelectItem>
                            <SelectItem value="ethereum">Ethereum</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 mt-10 gap-5">
                {filteredWallets.map((eachItem, index) => (
                    <WalletCard key={index} wallet={eachItem} />
                ))}
            </div>

            <Toaster richColors/>
        </div>
    )
}