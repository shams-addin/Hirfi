import { motion } from "framer-motion";
import { Briefcase, User, Wrench } from "lucide-react";
import AccountTypeButton from "./ui/AccountTypeButton";
import { AnimatePresence } from "framer-motion";
import SelectOptions from "./ui/SelectOptions";

type Category = {
    category_id: number;
    category_name: string;
};

interface StepTwoProps {
    categories: Category[];
    data: {
        accountType: string;
        serviceType: string;
    };
    setData: (key: string, value: string) => void;
    errors: Record<string, string>;
}

export default function StepTwo({ categories, data, setData, errors }: StepTwoProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">نوع الحساب</h2>

            <div className="grid grid-cols-2 gap-4">
                <AccountTypeButton
                    icon={User}
                    typeName="عميل"
                    typePlaceholder="أبحث عن خدمات"
                    isSelected={data.accountType === "customer"}
                    handleClick={() => setData("accountType", "customer")}
                />

                <AccountTypeButton
                    icon={Briefcase}
                    typeName="مقدم خدمة"
                    typePlaceholder="أقدم خدمات للعملاء"
                    isSelected={data.accountType === "provider"}
                    handleClick={() => setData("accountType", "provider")}
                />
                {errors.accountType && <p className="text-xs text-red-500 mt-1">{errors.accountType}</p>}
                
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
                                optionValue={categories.map((category) => ({
                                    value: String(category.category_id),
                                    name: category.category_name,
                                }))}
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