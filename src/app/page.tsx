"use client"

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { BrandCard } from "@/components/BrandCard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { WalletCard } from "@/components/WalletCard";
import { AddWalletDialog } from "@/components/AddWalletDialog";
import { DeleteWalletDialog } from "@/components/DeleteWalletDialog";
import { Wallet } from "@/types";
import { HashLoader } from "react-spinners"

export default function Home() {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [solanawallets, setSolanawallets] = useState<Wallet[]>([]);
    const [ethwallets, setEthwallets] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadWallets = () => {
            const solanawallets = JSON.parse(localStorage.getItem("solanawallets") || "[]");
            const ethwallets = JSON.parse(localStorage.getItem("ethwallets") || "[]");
            setSolanawallets(solanawallets);
            setEthwallets(ethwallets);
            setLoading(false);

            if (solanawallets.length === 0 && ethwallets.length === 0) {
                toast.warning("Create a new wallet or import your existing wallet");
                router.replace("/wallet");
            }
        };

        loadWallets();

        window.addEventListener("walletsUpdated", loadWallets);
        return () => window.removeEventListener("walletsUpdated", loadWallets);
    }, [router])

    let filteredWallets = [...solanawallets, ...ethwallets];

    if (selectedFilter === "solana") filteredWallets = solanawallets;
    else if (selectedFilter === "ethereum") filteredWallets = ethwallets;
    else filteredWallets = [...solanawallets, ...ethwallets];

    filteredWallets.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    if (loading) {
        return <div>
            <HashLoader className="bg-white" />
        </div>
    }

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
                    <Select onValueChange={(value) => setSelectedFilter(value)} defaultValue={"all"}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Wallet" />
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

            <Toaster richColors />
        </div>
    )
}