interface AlertBannerProps {
    title?: string;
    description?: string;
    actionLabel?: string;
}

export default function AlertBanner({
    title = "Período de Adición y Cancelación",
    description = "Recuerda que el sistema Banner cerrará inscripciones el viernes a las 18:00 hrs.",
    actionLabel = "Ver Calendario",
}: AlertBannerProps) {
    return (
        <div
            role="alert"
            className="alert alert-info bg-[#f0f0fd] text-[#1c1c7a] border border-[#cecfd4] rounded-2xl shadow-sm p-4 max-w-lg w-full"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 shrink-0 text-[#5454e9]"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <div className="flex-1">
                <h3 className="font-bold text-sm text-[#1c1c7a]">{title}</h3>
                <p className="text-xs text-[#5454e9]/90">{description}</p>
            </div>
            {actionLabel && (
                <button className="btn btn-xs btn-outline border-[#5454e9] text-[#5454e9] hover:bg-[#5454e9] hover:text-white rounded-lg">
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
