"use client";

import { Wallet } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Copy, Eye, EyeOff, Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

export const WalletCard = ({ wallet }: { wallet: Wallet }) => {
    const badgeStyling = wallet.network === "solana" ? "bg-blue-100 text-blue-400" : "bg-green-100 text-green-400";
    const [show, setShow] = useState(false);
    const [solanawallets, setSolanawallets] = useState<Wallet[]>([]);
    const [ethwallets, setEthwallets] = useState<Wallet[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const solana = JSON.parse(localStorage.getItem("solanawallets") || "[]");
            const eth = JSON.parse(localStorage.getItem("ethwallets") || "[]");
            setSolanawallets(solana);
            setEthwallets(eth);
        }
    }, [])


    const copyKeyToClipboard = (key: string, type: string) => {
        navigator.clipboard.writeText(key);
        toast.success(`Copied ${type} to clipboard`)
    }

    const deleteWallet = () => {
        if (wallet.network === "solana") {
            const updatedwallets = solanawallets.filter(each => each.account !== wallet.account);
            localStorage.setItem("solanawallets", JSON.stringify(updatedwallets));

            window.dispatchEvent(new Event("walletsUpdated"))
        }

        if (wallet.network === "ethereum") {
            const updatedwallets = ethwallets.filter(each => each.account !== wallet.account);
            localStorage.setItem("ethwallets", JSON.stringify(updatedwallets));

            window.dispatchEvent(new Event("walletsUpdated"))
        }

        toast.error("Wallet deleted successfully");
    }

    return (
        <Card className="bg-black text-white p-4 rounded-2xl shadow-lg relative border border-gray-600">
            <CardHeader className="flex justify-between items-center mb-0">
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-300">Public Key:</p>
                        <span className="text-sm text-gray-100 truncate max-w-[180px] font-mono">
                            {wallet.publickey.slice(0, 6)}...{wallet.publickey.slice(-6)}
                        </span>
                        <Button onClick={() => copyKeyToClipboard(wallet.publickey, "public key")} variant={"ghost"} className="p-1 text-gray-400 hover:text-white dark">
                            <Copy className="w-4 h-4" />
                        </Button>
                        <Badge className={`${badgeStyling} text-xs px-2 py-1 rounded-md`}>
                            {wallet.network.charAt(0).toUpperCase() + wallet.network.slice(1)}
                        </Badge>
                    </div>
                </div>
                <Button onClick={deleteWallet} variant={"ghost"} className="text-red-400 hover:text-red-600 p-1 dark cursor-pointer">
                    <Trash className="w-5 h-5" />
                </Button>
            </CardHeader>

            <Separator className="bg-gray-800" />

            <CardContent className="mt-0">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-300">Private Key:</p>
                        <span className="text-sm text-gray-100 truncate max-w-[180px] font-mono">
                            {show ? `${wallet.privatekey.slice(0, 6)}............${wallet.privatekey.slice(-3)}` : "******************"}
                        </span>
                        <Button onClick={() => copyKeyToClipboard(wallet.privatekey, "private key")} variant={"ghost"} className="p-1 text-gray-400 dark">
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button variant={"ghost"} className="text-gray-400 hover:text-white p-1 dark" onClick={() => setShow(!show)}>
                        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}