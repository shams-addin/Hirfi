
interface ToastMessageProps {
    message: string;
    messageType: string
}

export default function ToastMessage({ message, messageType }: ToastMessageProps) {
    return (
        <div role="alert" className="rounded-md border border-green-500 bg-green-50 p-4 shadow-sm">
            <div className="flex items-start gap-4">
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="-mt-0.5 size-6 text-green-700"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>

                <div className="flex-1">
                    <strong className="block leading-tight font-medium text-green-800"> Success </strong>

                    <p className="mt-0.5 text-sm text-green-700">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, dignissimos.
                    </p>
                </div>
            </div>
        </div>
    );
}