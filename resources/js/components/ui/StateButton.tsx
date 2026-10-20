
interface StateButtonProps {
    state: string;
}

export default function StateButton({ state }: StateButtonProps) {
    
    return (
        <button className={state === 'activated' ? 'btn.danger' : 'btn.primary'} onClick={() => onToggle(u)}>
            {state === 'activated' ? 'إيقاف الحساب' : 'تفعيل الحساب'}
        </button>
    );
}