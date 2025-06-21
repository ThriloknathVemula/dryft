"use client"
import CreateWallet from "@/components/CreateWallet";
import ExistingWallet from "@/components/ExistingWallet";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallets } from "@/components/Wallets";
import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="mt-10">
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-6 flex items-center justify-center gap-3"
          >
            <RocketIcon className="h-10 w-10 text-gray-300 drop-shadow-md animate-pulse" />
            <span className="text-5xl md:text-6xl font-extrabold tracking-widest bg-gradient-to-r from-white via-gray-300 to-gray-400 text-transparent bg-clip-text">
              DRYFT
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 text-md md:text-lg text-center max-w-xl mx-auto"
          >
            Web based wallet for Solana and Ethereum
          </motion.p>
        </div>
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


        <Wallets />
        <Toaster richColors />
      </div>
    </div>
  );
}
