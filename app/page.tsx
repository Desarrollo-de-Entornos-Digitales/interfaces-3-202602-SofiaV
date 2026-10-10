import ActionButton from "@/components/action-button";
import StatusBadge from "@/components/status-badge";
import AlertBanner from "@/components/alert-banner";
import UserAvatar from "@/components/user-avatar";

export default function Home() {
  return (
    <main className="p-8 space-y-6">
      <ActionButton />
      <StatusBadge />
      <AlertBanner />
      <UserAvatar />
    </main>
  );
}
