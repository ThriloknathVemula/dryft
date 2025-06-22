"use client";

import { addEthWallet, addSolanaWallet } from "@/config/wallet";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";

export const AddWalletDialog = () => {
    const [mnemonic, setMnemonic] = useState("")

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mnemonic = localStorage.getItem("mnemonic") || "";
            setMnemonic(mnemonic);
        }
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className="cursor-pointer p-4 rounded-lg shadow-sm">
                    Add Wallet
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white rounded-xl shadow-md border border-gray-800">
                <DialogHeader className="font-bold text-xl">
                    Select a Wallet
                </DialogHeader>
                <DialogFooter className="flex justify-center items-center gap-7 mx-auto">
                    <DialogTrigger asChild>
                        <Button onClick={async() => {
                            await addSolanaWallet(mnemonic)
                            window.dispatchEvent(new Event("walletsUpdated"));
                        }} variant={"secondary"} className="cursor-pointer">Solana Wallet</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button onClick={async() => {
                            await addEthWallet(mnemonic)
                            window.dispatchEvent(new Event("walletsUpdated"));
                        }} variant={"secondary"} className="cursor-pointer">Ethereum Wallet</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}