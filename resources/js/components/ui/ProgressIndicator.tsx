import { motion } from "framer-motion";

interface ProgressIndicatorProps {
    step: number;
}

export default function ProgressIndicator({step}: ProgressIndicatorProps) {
    return (
        <div className = "flex items-center gap-2 mb-10" >
        {
            [1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-2 rounded-full overflow-hidden bg-auth-secondary">
                    <motion.div
                        className="h-full bg-auth-accent"
                        initial={{ width: step > i ? '100%' : '0%' }}
                        animate={{ width: step >= i ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            ))
        }
        </div>
    );
}