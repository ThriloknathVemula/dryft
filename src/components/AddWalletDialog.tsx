import { addEthWallet, addSolanaWallet } from "@/config/wallet";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";

export const AddWalletDialog = () => {
    const mnemonic = localStorage.getItem("mnemonic");

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
                        <Button onClick={() => {addSolanaWallet(mnemonic)}} variant={"secondary"} className="cursor-pointer">Solana Wallet</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button onClick={() => {addEthWallet(mnemonic)}} variant={"secondary"} className="cursor-pointer">Ethereum Wallet</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}