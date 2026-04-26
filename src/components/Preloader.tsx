'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Ensure this only runs on the client and is ready
        // 1 second delay to show the opening animation while keeping the site fast and snappy
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gray-900 overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0, 
                        y: "-100%", 
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
                    }}
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                            {/* Outer animated rings */}
                            <motion.div 
                                className="absolute inset-0 rounded-full border-t-4 border-blue-500 opacity-80"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                                className="absolute inset-2 rounded-full border-b-4 border-white opacity-60"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            
                            {/* Inner Logo Circle */}
                            <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] overflow-hidden">
                                <Image 
                                    src="/Logo Chatgpt.png" 
                                    alt="Aqsa Tech Logo" 
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>

                        {/* Title animation */}
                        <div className="overflow-hidden">
                            <motion.h1 
                                className="text-white text-4xl font-extrabold tracking-widest text-center"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <span className="text-blue-500">AQSA</span> TECH
                            </motion.h1>
                        </div>

                        {/* Loading dots */}
                        <motion.div 
                            className="mt-8 flex space-x-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-3 h-3 bg-blue-500 rounded-full"
                                    animate={{ 
                                        y: ["0%", "-100%", "0%"],
                                        scale: [1, 0.8, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Animated background lines for more tech feel */}
                    <motion.div 
                        className="absolute inset-0 z-[-1] opacity-20 pointer-events-none"
                        initial={{ backgroundPosition: "0% 0%" }}
                        animate={{ backgroundPosition: "100% 100%" }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            backgroundImage: "radial-gradient(circle at center, #3b82f6 1px, transparent 1px)",
                            backgroundSize: "40px 40px"
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
