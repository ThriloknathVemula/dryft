"use client"
import { BrandCard } from "@/components/BrandCard";
import CreateWallet from "@/components/CreateWallet";
import ExistingWallet from "@/components/ExistingWallet";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Wallets() {
  const solanawallets = JSON.parse(localStorage.getItem("solanawallets") || "[]");
  const ethwallets = JSON.parse(localStorage.getItem("ethwallets") || "[]");
  const router = useRouter();

  if (solanawallets.length !== 0 || ethwallets.length !== 0) {
      toast.warning("Wallet already exists")
      router.replace("/");
  };

  return (
    <div>
      <div className="mt-10">
        <BrandCard />
        <div className="grid grid-cols-1 w-[50%] md:w-[35%] mx-auto mt-10">
          <Tabs defaultValue="createWallet" className="w-full">
            <TabsList className="w-full bg-gray-800 rounded-t-lg flex justify-between">
              <TabsTrigger className="w-full py-3 text-center cursor-pointer text-sm font-medium text-gray-300 hover:text-white data-[state=active]:bg-gray-900 data-[state=active]:text-white transition-colors duration-300 rounded-t-lg" value="createWallet">Create a New Wallet</TabsTrigger>
              <TabsTrigger className="w-full py-3 text-center cursor-pointer text-sm font-medium text-gray-300 hover:text-white data-[state=active]:bg-gray-900 data-[state=active]:text-white transition-colors duration-300 rounded-t-lg" value="existingWallet">Add an Existing Wallet</TabsTrigger>
            </TabsList>
            <TabsContent value="createWallet"><CreateWallet /></TabsContent>
            <TabsContent value="existingWallet"><ExistingWallet /></TabsContent>
          </Tabs>
        </div>

        <Toaster richColors />
      </div>
    </div>
  );
}
