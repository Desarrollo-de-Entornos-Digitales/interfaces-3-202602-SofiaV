interface StatusBadgeProps {
    label?: string;
    status?: "active" | "pending" | "danger";
}

export default function StatusBadge({
    label = "Matriculado Activo",
    status = "active",
}: StatusBadgeProps) {
    const styles = {
        active: {
            badge: "bg-[#edf8f2] text-[#2e7d50] border-[#b7e3ca]",
            dot: "bg-[#4cb979] animate-pulse",
        },
        pending: {
            badge: "bg-[#f4f0fd] text-[#5527be] border-[#d5c3fa]",
            dot: "bg-[#865cf0]",
        },
        danger: {
            badge: "bg-[#fdf0eb] text-[#b33a15] border-[#f5c2b0]",
            dot: "bg-[#e9683b]",
        },
    };

    const current = styles[status] || styles.active;

    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${current.badge}`}
        >
            <span className={`w-2 h-2 rounded-full ${current.dot}`} />
            {label}
        </div>
    );
}
