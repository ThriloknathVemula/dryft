import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { PhraseInput } from "./PhraseInput";
import { Button } from "./ui/button";
import { mnemonicToSeed, validateMnemonic } from "bip39";
import { toast } from "sonner";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { HDNodeWallet, Wallet } from "ethers";
import { useRouter } from "next/navigation";


export default function ExistingWallet() {
    const [selected, setSelected] = useState("");
    const [phraseArr, setPhraseArr] = useState<string[]>(Array(12).fill(""));
    const router = useRouter();

    const handleChange = (index: number, value: string) => {
        const updated = [...phraseArr];
        updated[index] = value;
        setPhraseArr(updated);
    };

    const importExistingWallet = async (accountIndex: number = 0) => {
        const mnemonic = phraseArr.join(" ");

        if (!validateMnemonic(mnemonic)) {
            toast.error("Invalid Secret Phrase. Please check again.");
            return;
        }

        localStorage.setItem("mnemonic", mnemonic)
        const seed = await mnemonicToSeed(mnemonic);
        if (selected === "solana") {
            const derivationPath = `m/44'/501'/${accountIndex}'/0'`;
            const derived = derivePath(derivationPath, seed.toString('hex'));
            const solKeypair = Keypair.fromSeed(derived.key);

            const publickey = solKeypair.publicKey.toBase58();
            const secretkey = Buffer.from(solKeypair.secretKey).toString('hex');
            const walletData = {
                publickey,
                privatekey: secretkey,
                createdAt: new Date().toLocaleString(),
                network: "solana",
                account: accountIndex
            }

            const existing = JSON.parse(localStorage.getItem("solanawallets") || "[]");
            localStorage.setItem("solanawallets", JSON.stringify([...existing, walletData]));
            toast.success("Solana wallet imported successfully");
            if (walletData) router.replace("/");
        }

        else if (selected === "ethereum") {
            const derivationPath = `m/44'/60'/${accountIndex}/0'`;
            const root = HDNodeWallet.fromSeed(seed);
            const child = root.derivePath(derivationPath);
            const ethwallet = new Wallet(child.privateKey);

            const walletData = {
                publickey: ethwallet.address,
                privatekey: ethwallet.privateKey,
                createdAt: new Date().toLocaleString(),
                network: "ethereum",
                accountIndex
            }

            const existing = JSON.parse(localStorage.getItem("ethwallets") || "[]");
            localStorage.setItem("ethwallets", JSON.stringify([...existing, walletData]));
            toast.success("Ethereum wallet imported successfully");
            if (walletData) router.replace("/");
        }

        else {
            toast.error("Unsupported network");
            return;
        }
    }

    return (
        <div className="w-full">
            <Card className="bg-black text-white rounded-xl shadow-md border border-gray-800 mb-10">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-300">Existing Wallet</CardTitle>
                    <CardDescription className="text-gray-400">
                        Import your existing wallet to access your assets
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 items-center gap-6 px-4">
                    <Button onClick={() => setSelected("solana")} className={`cursor-pointer p-4 bg-gray-900 hover:bg-gray-700 text-gray-200 rounded-lg shadow-sm transition-colors duration-200 ${selected === "solana" ? "bg-gray-700 border-gray-900" : ""}`}>
                        Solana
                    </Button>
                    <Button onClick={() => setSelected("ethereum")} className={`cursor-pointer p-4 bg-gray-900 hover:bg-gray-700 text-gray-200 rounded-lg shadow-sm transition-colors duration-200 ${selected === "ethereum" ? "bg-gray-700 border-gray-900" : ""}`}>
                        Ethereum
                    </Button>
                </CardContent>
                <CardHeader className="mb-0">
                    <h1 className="font-bold text-xl text-white">Enter your Secret Recovery Phrase</h1>
                </CardHeader>
                <CardContent className="grid grid-cols-3 md:grid-cols-4 items-center gap-6 px-4 pb-4">
                    {phraseArr.map((value, i) => (
                        <PhraseInput key={i} index={i} value={value} onChange={handleChange} />
                    ))}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={() => { importExistingWallet(0) }} variant={"secondary"} className="cursor-pointer">Import Wallet</Button>
                </CardFooter>
            </Card>
        </div>
    )
}