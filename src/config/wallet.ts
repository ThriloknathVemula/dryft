import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { HDNodeWallet, Wallet } from "ethers";
import { toast } from "sonner";

const solanawallets = JSON.parse(localStorage.getItem("solanawallets") || "[]");
const ethwallets = JSON.parse(localStorage.getItem("ethwallets") || "[]");

export const addSolanaWallet = async (mnemonic: string | null) => {
    if (!mnemonic) {
        toast.error("Something went wrong");
        return;
    }

    const currentIndex = solanawallets.length > 0 ? solanawallets.length : 0;
    const derivationpath = `m/44'/501'/${currentIndex}'/0'`
    const seedphrase = await mnemonicToSeed(mnemonic);
    const derivedSeed = derivePath(derivationpath, seedphrase.toString('hex'));
    const solKeypair = Keypair.fromSeed(derivedSeed.key);

    const publickey = solKeypair.publicKey.toBase58();
    const secretkey = Buffer.from(solKeypair.secretKey).toString('hex');

    const walletData = {
        publickey,
        privatekey: secretkey,
        createdAt: new Date().toLocaleString(),
        network: "solana",
        account: currentIndex
    }

    const updatedWallets = [...solanawallets, walletData]
    localStorage.setItem("solanawallets", JSON.stringify(updatedWallets));
    toast.success("Solana wallet created successfully");
}

export const addEthWallet = async (mnemonic: string | null) => {
    if (!mnemonic) {
        toast.error("Something went wrong");
        return;
    }

    const currentIndex = ethwallets.length > 0 ? ethwallets.length : 0;
    const derivationpath = `m/44'/60'/${currentIndex}'/0'`;
    const seedphrase = await mnemonicToSeed(mnemonic);

    const hdNode = HDNodeWallet.fromSeed(seedphrase);
    const child = hdNode.derivePath(derivationpath);
    const ethWallet = new Wallet(child.privateKey);

    const walletData = {
        publickey: ethWallet.address,
        privatekey: ethWallet.privateKey,
        createdAt: new Date().toLocaleString(),
        network: "ethereum",
        account: currentIndex
    }

    const updatedWallets = [...ethwallets, walletData];
    localStorage.setItem("ethwallets", JSON.stringify(updatedWallets));
    toast.success("Ethereum wallet created successfully");
}