import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";

export const BrandCard = () => {
    return (
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
    )
}