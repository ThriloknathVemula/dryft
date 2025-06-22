import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateWalletDialog } from "./CreateWalletDialog";


export default function CreateWallet(){
    return (
        <div className="w-full">
            <Card className="bg-black text-white rounded-xl shadow-md border border-gray-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-300">Create Wallet</CardTitle>
                    <CardDescription className="text-gray-400">
                        Create a new wallet to store your assets
                    </CardDescription>
                </CardHeader>
                <CardFooter className="grid grid-cols-2 items-center gap-6 p-4">
                    <CreateWalletDialog wallet="Solana"/>
                    <CreateWalletDialog wallet="Ethereum"/>
                </CardFooter>
            </Card>
        </div>
    )
}