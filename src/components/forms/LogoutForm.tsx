"use client";
import { Button } from "@/components/ui/button";
import { handleLogOutAdminRegency } from "@/lib/actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutForm = () => {
    const router = useRouter();
    const handleLogout = async () => {
        await handleLogOutAdminRegency();
        router.push("/login/citizens");
        toast.success("Logout berhasil", {
            description: "anda akan diarahkan ke halaman login admin",
            action: {
                label: "OK",
                onClick: () => {
                },
            },
        });
    };
    return (
        <Button onClick={handleLogout} className="w-fit" variant="destructive">
            <LogOut/>
            LogOut
        </Button>
    );
};

export default LogoutForm;
