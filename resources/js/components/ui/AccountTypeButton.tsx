import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { LucideIcon, Wrench } from "lucide-react";
import React, { useState } from "react";
import SelectOptions from "./SelectOptions";

// const JOB_TITLE = [
//     {value: "plumber", name: "سباكة"},
//     {value: "electrician", name: "كهرباء"},
//     {value: "hvac", name: "فني تكييف"},
//     {value: "cleaning", name: "تنظيف"},
//     {value: "other", name: "أخرى"},
// ]

interface AccountTypeProps {
    typeName: string;
    accountType: string;
    typePlaceholder: string;
    isSelected: boolean;
    icon: LucideIcon;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AccountTypeButton({icon:Icon, typeName, accountType, typePlaceholder, isSelected, handleClick}: AccountTypeProps) {
    // const [serviceType, setServiceType] = useState("");
    
    // function handleSelectedService(value: string) {
    //     setServiceType(value);
    // }

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                    className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl transition-all ${
                    isSelected
                        ? 'border-auth-accent bg-auth-accent/5 text-auth-accent'
                        : 'border-auth-border bg-auth-card text-muted-foreground hover:border-auth-accent/30 hover:bg-auth-secondary/30'
                        }`}
            >
                <Icon size={32} className="mb-3" />
                <span className="font-semibold">{typeName}</span>
                <span className="text-xs opacity-70 mt-1">{typePlaceholder}</span>
            </button>

            {/* <AnimatePresence>
                    {accountType === "provider" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-4 overflow-hidden"
                        >
                            <SelectOptions icon={Wrench} label="نوع الخدمة" value={serviceType} placeholder="اختر نوع الخدمة التي تقدمها..." optionValue={JOB_TITLE} handleChange={() => handleSelectedService("")} />

                        </motion.div>
                    )}
                </AnimatePresence> */}
        </>
    );
}