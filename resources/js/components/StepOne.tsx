import { Calendar, MapPin, Phone, User } from "lucide-react";
import InputField from "./ui/InputField";
import PasswordField from "./ui/PasswordField";

interface StepOneProps {
    data: {
        firstName: string;
        lastName: string;
        birthDate: string;
        password: string;
        password_confirmation: string;
        phone: string;
        address: string;
    };
    setData: (key: string, value: string) => void;
    errors: Record<string, string>;
}

export default function StepOne({ data, setData, errors }: StepOneProps) {
    return (
        <div className="space-y-5">
            <h2 className="text-xl font-semibold mb-4">البيانات الأساسية</h2>

            <div className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <InputField
                        label="الاسم"
                        labelClassName="block text-sm font-medium text-foreground mb-1.5"
                        icon={User}
                        inputType="text"
                        inputName="firstName"
                        inputValue={data.firstName}
                        handleChange={(e) => setData("firstName", e.target.value)}
                        inputPlaceholder="محمد أحمد"
                        className="w-full bg-auth-card border border-auth-border rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all"
                        error={errors.firstName}
                    />


                    <InputField
                        label="الاسم الأخير (أختياري)"
                        labelClassName="block text-sm font-medium text-foreground mb-1.5"
                        icon={User}
                        inputType="text"
                        inputName="lastName"
                        inputValue={data.lastName}
                        handleChange={(e) => setData("lastName", e.target.value)}
                        inputPlaceholder="الأوجلي"
                        className="w-full bg-auth-card border border-auth-border rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all"
                        error={errors.lastName}
                    />

                </div>
                <InputField
                    label="رقم الهاتف"
                    labelClassName="block text-sm font-medium text-foreground mb-1.5"
                    icon={Phone}
                    inputType="tel"
                    inputName="phone"
                    inputValue={data.phone}
                    handleChange={(e) => setData("phone", e.target.value)}
                    inputPlaceholder="09X XXX XXXX"
                    className="w-full bg-auth-card border border-auth-border rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all"
                    error={errors.phone}
                />

                <InputField
                    label="تاريخ الميلاد"
                    labelClassName="block text-sm font-medium text-foreground mb-1.5"
                    icon={Calendar}
                    inputType="date"
                    inputName="birthDate"
                    inputValue={data.birthDate}
                    handleChange={(e) => setData("birthDate", e.target.value)}
                    className="w-full bg-auth-card border border-auth-border rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all"
                    error={errors.birthDate}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <PasswordField
                        label="كلمة المرور"
                        inputName="password"
                        inputValue={data.password}
                        handleChange={(e) => setData("password", e.target.value)}
                        inputPlaceholder="••••••••"
                        error={errors.password}
                    />


                    <PasswordField
                        label="تأكيد كلمة المرور"
                        inputName="password_confirmation"
                        inputValue={data.password_confirmation}
                        handleChange={(e) => setData("password_confirmation", e.target.value)}
                        inputPlaceholder="••••••••"
                        error={errors.password_confirmation}
                    />

                </div>

                <InputField
                    label="العنوان"
                    labelClassName="block text-sm font-medium text-foreground mb-1.5"
                    icon={MapPin}
                    inputType="text"
                    inputName="address"
                    inputValue={data.address}
                    handleChange={(e) => setData("address", e.target.value)}
                    inputPlaceholder="الماجوري، شارع 14"
                    className="w-full bg-auth-card border border-auth-border rounded-lg pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-auth-accent/50 focus:border-auth-accent transition-all"
                    error={errors.address}
                />
            </div>
        </div>
    );
}