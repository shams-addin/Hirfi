import React, { useState } from "react";
import ProgressIndicator from "./ui/ProgressIndicator";
import StepOne from "./StepOne";
import NextButton from "./ui/NextButton";
import BackButton from "./ui/BackButton";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useForm } from "@inertiajs/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { differenceInYears, isValid, parseISO } from "date-fns";

type Category = {
    category_id: number;
    category_name: string;
}

function isAtLeast18(birthDateValue: string): boolean {
    if (!birthDateValue) {
        return false;
    }

    const birthDate = parseISO(birthDateValue);

    return isValid(birthDate) && differenceInYears(new Date(), birthDate) >= 18;
}

export default function SignUpForm({ categories }: { categories: Category[] }) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        firstName: "",
        lastName: "",
        birthDate: "",
        password: "",
        password_confirmation: "",
        phone: "",
        address: "",
        accountType: "",
        serviceType: "",
        nationality: "",
    });

    function handleNext() { // FIXME
        if (step === 1) {
            const birthDateIsValid = isAtLeast18(data.birthDate);

            if (
                !errors.firstName &&
                !data.phone &&
                !errors.password &&
                !errors.birthDate &&
                birthDateIsValid &&
                data.password_confirmation.trim() &&
                !errors.address
            ) {
                return;
            }
        }

        if (step === 2) {
            if (errors.accountType) {
                return;
            }

            if (data.accountType === "provider" && errors.serviceType) {
                return;
            }

        }

        if (step === 3) {
            if (errors.nationality) {
                return;
            }
            return;
        }

        // clearErrors();
        setStep(step + 1);
    }

    function handleBack() {
        setStep(step - 1);
    }

    function handleSubmint(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/sign-up', {
            onSuccess: () => reset(),
        });
    }

    function stepPage(stepNumber: number) {
        switch (stepNumber) {
            case 1:
                return <StepOne data={data} setData={setData} errors={errors} />;

            case 2:
                return <StepTwo categories={categories} data={data} setData={setData} errors={errors} />;

            case 3:
                return <StepThree data={data} setData={setData} errors={errors} />;
        }
    }

    return (
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">إنشاء حساب جديد</h1>
                <p className="text-muted-foreground">انضم إلينا الآن للوصول إلى أفضل الخدمات.</p>
            </div>

            <ProgressIndicator step={step} />

            <form onSubmit={handleSubmint}>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                    >

                    {stepPage(step)}

                    <div className="mt-12 flex gap-4 pt-6 border-t border-auth-border">
                        <NextButton stepNumber={step} onClick={handleNext} buttonType={step !== 3 ? undefined : "submit"} isProcessing={processing} />
                        {step > 1 &&
                            <BackButton stepNumber={step} onClick={handleBack} isProcessing={processing} />}
                    </div>
                    </motion.div>
                </AnimatePresence>
            </form>
        </div>
    );
}