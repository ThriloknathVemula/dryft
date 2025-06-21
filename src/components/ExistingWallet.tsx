import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"


export default function ExistingWallet(){
    return (
        <div className="w-full">
            <Card className="bg-black text-white rounded-xl shadow-md border border-gray-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-300">Existing Wallet</CardTitle>
                    <CardDescription className="text-gray-400">
                        Link your existing wallet to access your assets
                    </CardDescription>
                </CardHeader>
                <CardFooter className="grid grid-cols-2 items-center gap-6 p-4">
                <Button className="cursor-pointer p-4 bg-gray-900 hover:bg-gray-700 text-gray-200 rounded-lg shadow-sm transition-colors duration-200">
                    Solana
                </Button>
                <Button className="cursor-pointer p-4 bg-gray-900 hover:bg-gray-700 text-gray-200 rounded-lg shadow-sm transition-colors duration-200">
                    Ethereum
                </Button>
                </CardFooter>
            </Card>
        </div>
    )
}