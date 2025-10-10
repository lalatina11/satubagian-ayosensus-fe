import { buttonVariants } from "@/components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <Image
        src="/ayo-sensus-nav.svg"
        alt="logo"
        height={500}
        width={500}
        className="w-32 h-auto object-cover"
      />
      <span className="text-3xl font-semibold">404</span>
      <span>Halaman yang anda cari tidak ditemukan</span>
      <Link
        className={
          "w-max flex flex-row mx-auto" + buttonVariants({ variant: "default" })
        }
        href="/"
      >
        <Home /> Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
