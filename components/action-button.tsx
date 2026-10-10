interface ActionButtonProps {
    label?: string;
    badgeText?: string;
    isLoading?: boolean;
}

export default function ActionButton({
    label = "Descargar Guía Lab",
    badgeText = "PDF",
    isLoading = false,
}: ActionButtonProps) {
    return (
        <button
            className="btn btn-primary gap-2 rounded-xl shadow-sm hover:shadow-md transition-all text-xs font-semibold px-4"
            disabled={isLoading}
        >
            {isLoading ? (
                <span className="loading loading-spinner loading-xs" />
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                >
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
            )}
            {label}
            {badgeText && (
                <span className="badge badge-secondary badge-sm text-[10px] font-bold">
                    {badgeText}
                </span>
            )}
        </button>
    );
}
