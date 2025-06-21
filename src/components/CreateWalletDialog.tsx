"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { PhraseItem } from "./PhraseItem";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";
import { addEthWallet, addSolanaWallet } from "@/config/wallet";


export const CreateWalletDialog = ({ wallet }: { wallet: string }) => {
    const [mnemonic, setMnemonic] = useState<string | null>(null);

    const createMnemonic = () => {
        const mnemonic = generateMnemonic();
        setMnemonic(mnemonic);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(mnemonic || '');
        toast.info("Copied to clipboard");
    }

    const createKeyPair = async() => {
        if (!mnemonic) {
            toast.error("Please generate a mnemonic first");
            return;
        }   

        localStorage.setItem("mnemonic", mnemonic);
        
        if (wallet.toLowerCase() === "solana") {
            addSolanaWallet(mnemonic); 
        }

        if (wallet.toLowerCase() === "ethereum") {
            addEthWallet(mnemonic);
        }  
    }

    const mnemonicArr = mnemonic ? mnemonic.split(" ") : [];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => {
                        createMnemonic();
                    }}
                    className="cursor-pointer p-4 bg-gray-900 hover:bg-gray-700 text-gray-200 rounded-lg shadow-sm transition-colors duration-200"
                >
                    {wallet}
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white rounded-xl shadow-md border border-gray-800">
                <DialogHeader>
                    <DialogTitle>Save your Recovery phrase in a Secured place</DialogTitle>
                    <DialogDescription>
                        {mnemonicArr.length > 0 && (
                            <div className="text-gray-400 mb-6 max-w-md mx-auto">
                                <p className="mb-4 text-sm md:text-base">
                                    Your recovery phrase is essential for accessing your wallet. Please write it down and store it securely.
                                </p>
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-5 p-5 rounded-xl shadow-lg border border-gray-700 relative">
                                    <CopyIcon className="absolute top-2 right-2 h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors duration-200" onClick={copyToClipboard} />
                                    {mnemonicArr.map((each, index) => (
                                        <PhraseItem key={index} phrase={each} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-center items-center mx-auto">
                    <DialogTrigger asChild>
                        <Button variant={"secondary"} className="cursor-pointer" onClick={createKeyPair}>I have stored my Recovery phrase</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
