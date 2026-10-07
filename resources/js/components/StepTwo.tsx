import { motion } from "framer-motion";
import { Briefcase, User, Wrench } from "lucide-react";
import AccountTypeButton from "./ui/AccountTypeButton";
import { AnimatePresence } from "framer-motion";
import SelectOptions from "./ui/SelectOptions";

const JOB_TITLE = [
    { value: "plumber", name: "سباكة" },
    { value: "electrician", name: "كهرباء" },
    { value: "hvac", name: "فني تكييف" },
    { value: "cleaning", name: "تنظيف" },
    { value: "other", name: "أخرى" },
]

interface StepTwoProps {
    data: {
        accountType: string;
        serviceType: string;
    };
    setData: (key: string, value: string) => void;
    errors: Record<string, string>;
}

export default function StepTwo({ data, setData, errors }: StepTwoProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">نوع الحساب</h2>

            <div className="grid grid-cols-2 gap-4">
                <AccountTypeButton
                    icon={User}
                    typeName="عميل"
                    accountType={data.accountType}
                    typePlaceholder="أبحث عن خدمات"
                    isSelected={data.accountType === "customer"}
                    handleClick={() => setData("accountType", "customer")}
                />

                <AccountTypeButton
                    icon={Briefcase}
                    typeName="مقدم خدمة"
                    accountType={data.accountType}
                    typePlaceholder="أقدم خدمات للعملاء"
                    isSelected={data.accountType === "provider"}
                    handleClick={() => setData("accountType", "provider")}
                />

                <AnimatePresence>
                    {data.accountType === "provider" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-4 overflow-hidden"
                        >
                            <SelectOptions
                                icon={Wrench}
                                label="نوع الخدمة"
                                value={data.serviceType}
                                placeholder="اختر نوع الخدمة التي تقدمها..."
                                optionValue={JOB_TITLE}
                                handleChange={(e) => setData("serviceType", e.target.value)}
                            />

                            {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}