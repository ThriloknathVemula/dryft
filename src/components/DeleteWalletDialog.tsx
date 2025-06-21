"use client";

import { toast } from "sonner";
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useRouter } from "next/navigation";

export const DeleteWalletDialog = () => {
    const router = useRouter();

    const deleteAllWallets = () => {
        localStorage.removeItem("mnemonic");
        localStorage.removeItem("solanawallets");
        localStorage.removeItem("ethwallets");
        localStorage.clear();

        toast.error("Deleted all wallets");
        router.refresh();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"} className="cursor-pointer">
                    Clear Wallets
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white rounded-xl shadow-md border border-gray-800">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete all your wallets.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant={"destructive"} onClick={deleteAllWallets} className="cursor-pointer">
                            Delete all Wallets
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}