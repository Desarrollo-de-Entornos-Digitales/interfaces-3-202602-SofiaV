import Image from "next/image";

interface UserAvatarProps {
    name?: string;
    role?: string;
    program?: string;
    locationText?: string;
    avatarUrl?: string;
    isOnline?: boolean;
}

export default function UserAvatar({
    name = "Valeria Cifuentes",
    role = "MONITORA",
    program = "Ingeniería Telemática • 7mo Semestre",
    locationText = "● Disponible en Sala C-201",
    avatarUrl = "https://picsum.photos/150",
    isOnline = true,
}: UserAvatarProps) {
    return (
        <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-[#cecfd4] shadow-sm max-w-md w-full">
            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="w-14 rounded-full ring-2 ring-[#5454e9] ring-offset-2 ring-offset-base-100 overflow-hidden">
                    <Image
                        src={avatarUrl}
                        alt={name}
                        width={56}
                        height={56}
                        unoptimized
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 truncate">{name}</span>
                    <span className="badge badge-primary badge-xs text-[10px] font-bold px-1.5 py-0.5">
                        {role}
                    </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{program}</p>
                <span className="text-[11px] text-[#4cb979] font-medium">{locationText}</span>
            </div>
        </div>
    );
}
