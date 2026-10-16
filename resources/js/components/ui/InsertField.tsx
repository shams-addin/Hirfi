import { LucideIcon } from "lucide-react";

interface InsertFieldProps {
    label: string;
    labelClassName: string;
    className: string;
    icon:LucideIcon;
    span: string;
    spanClassName: string;
}

export default function InsertField({ label, labelClassName, className, icon:Icon, span, spanClassName }: InsertFieldProps) {
    return (
        <div>
            <label className={labelClassName}>{label}</label>
            <div className={className}>
              <Icon />
              <span className={spanClassName}>{span}</span>
            </div>
          </div>
    );
}