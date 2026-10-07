import { Globe } from "lucide-react";
import SelectOptions from "./ui/SelectOptions";

const ARAB_COUNTRIES = [
    { value: "libyan", name: "ليبي" },
    { value: "saudi", name: "سعودي" },
    { value: "egyptian", name: "مصري" },
    { value: "jordanian", name: "أردني" },
    { value: "syrian", name: "سوري" },
    { value: "lebanese", name: "لبناني" },
]

interface StepThreeProps {
    data: {
        nationality: string;
    };
    setData: (key: string, value: string) => void;
    errors: Record<string, string>;
}

export default function StepThree({ data, setData, errors }: StepThreeProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">الجنسية</h2>
            <div>
                <SelectOptions
                    icon={Globe}
                    label="البلد"
                    value={data.nationality}
                    placeholder="اختر جنسيتك..."
                    optionValue={ARAB_COUNTRIES}
                    handleChange={(e) => setData("nationality", e.target.value)}
                />

                {errors.nationality && <p className="text-xs text-red-500 mt-1">{errors.nationality}</p>}
            </div>
        </div>
    );
}