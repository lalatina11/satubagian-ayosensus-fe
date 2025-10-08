import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { faqData } from "@/lib";
import {
  ChartLine,
  CircleHelp,
  Hourglass,
  Mail,
  MessageCircle,
  Phone,
  Play,
  Scale,
  ShieldCheck,
  TextSearch,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ayo Sensus | Home",
  icons: "/ayosensus.svg",
};

const Page = () => {
  return (
    <main className="flex flex-col gap-20">
      <header className="py-[18px] px-[46px] flex justify-between items-center ">
        <Link href="/">
          <Image
            src="/ayo-sensus-nav.svg"
            alt="logo"
            width={200}
            height={200}
            className="object-cover w-[103px] h-[39px]"
          />
        </Link>
        <nav className="flex gap-7 items-center">
          <Link href="#home">Beranda</Link>
          <Link href="#about">Tentang</Link>
          <Link href="#guide">Panduan</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="#contact">Kontak</Link>
        </nav>
        <Link
          className={"bg-nav-link" + buttonVariants({ variant: "linkNav" })}
          href="/login"
        >
          Masuk
        </Link>
      </header>
      <section
        className="w-full pl-[59px] pr-[123px] flex justify-between items-center"
        id="home"
      >
        <div className="flex flex-col gap-6">
          <h1 className="font-semibold text-5xl">
            Akses data kependudukan dengan{" "}
            <span className="text-[#A2C56F]">AyoSensus</span>
          </h1>
          <span>
            Pendataan digital penduduk Indonesia yang aman, mudah, dan akurat.
            Berpartisipasilah dalam membangun data kependudukan yang lebih baik
            untuk masa depan Indonesia.
          </span>
          <div className="flex gap-2 items-center">
            <Link
              className={"bg-nav-link" + buttonVariants({ variant: "linkNav" })}
              href="/login"
            >
              Masuk
            </Link>
            <span>Mulai Isi Sensus</span>
          </div>
        </div>
        <Image
          src="/beranda-1.svg"
          alt="beranda-1"
          width={500}
          height={500}
          className="h-full w-auto object-cover"
        />
      </section>
      <section
        id="about"
        className="mt-[113px] flex flex-col gap-16 w-max mx-auto"
      >
        <div className="flex flex-col justify-center items-center gap-6 w-[907px] mx-auto">
          <h1 className="text-3xl font-semibold">
            Tentang <span className="text-[#A2C56F]">AyoSensus</span>
          </h1>
          <span className="text-center">
            AyoSensus adalah sistem pendataan penduduk digital yang dikembangkan
            pemerintah Indonesia untuk mengumpulkan data kependudukan secara{" "}
            <span className="text-[#A2C56F]">akurat, aman, dan efisien</span>
          </span>
        </div>
        <div className="w-[1168px] grid grid-cols-4 gap-5 h-[187px]">
          <div className="border border-[#E5E5E5] flex flex-col gap-2 justify-center items-center">
            <TextSearch color="#A2C56F" size={35} />
            <div className="flex flex-col justify-center items-center">
              <span className="text-center text-primary font-medium text-[16px]">
                Data Akurat
              </span>
              <span className="text-center text-muted-foreground font-[400] text-sm">
                Pengumpulan data penduduk yang lebih akurat dan terkini
              </span>
            </div>
          </div>
          <div className="border border-[#E5E5E5] flex flex-col gap-2 justify-center items-center">
            <ShieldCheck color="#A2C56F" size={35} />
            <div className="flex flex-col justify-center items-center">
              <span className="text-center text-primary font-medium text-[16px]">
                Keamanan Data
              </span>
              <span className="text-center text-muted-foreground font-[400] text-sm">
                Sistem keamanan berlapis untuk melindungi data pribadi
              </span>
            </div>
          </div>
          <div className="border border-[#E5E5E5] flex flex-col gap-2 justify-center items-center">
            <ChartLine color="#A2C56F" size={35} />
            <div className="flex flex-col justify-center items-center">
              <span className="text-center text-primary font-medium text-[16px]">
                Analisis Realtime
              </span>
              <span className="text-center text-muted-foreground font-[400] text-sm">
                Monitoring dan analisis data partisipasi secara langsung
              </span>
            </div>
          </div>
          <div className="border border-[#E5E5E5] flex flex-col gap-2 justify-center items-center">
            <Hourglass color="#A2C56F" size={35} />
            <div className="flex flex-col justify-center items-center">
              <span className="text-center text-primary font-medium text-[16px]">
                Efisien Waktu
              </span>
              <span className="text-center text-muted-foreground font-[400] text-sm">
                Proses pengisian yang lebih cepat dan mudah
              </span>
            </div>
          </div>
        </div>
        <div className="w-[1168px] flex flex-col gap-7 p-6">
          <div className="flex gap-2 items-center">
            <Scale />
            <span className="text-[#0026A2] font-medium text-[16px]">
              Dasar Hukum
            </span>
          </div>
          <div className="flex gap-[68px] items-center">
            <div className="flex flex-col">
              <span className="font-medium text-[16px] text-primary">
                Undang-undang
              </span>
              <ul className="ml-4 list-disc text-muted-foreground">
                <li>UU No. 16 Tahun 1997 tentang Statistik</li>
                <li>UU No. 23 Tahun 2006 tentang Administrasi Kependudukan</li>
                <li>UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-[16px] text-primary">
                Peraturan Pelaksana
              </span>
              <ul className="ml-4 list-disc text-muted-foreground">
                <li>PP No. 51 Tahun 1999 tentang Penyelenggaraan Statistik</li>
                <li>Perpres No. 39 Tahun 2019 tentang Satu Data Indonesia</li>
                <li>Peraturan BPS tentang Sensus Penduduk 2020</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className="mt-[22px] w-[1168px] mx-auto h-[350px] flex justify-between items-center"
        id="guide"
      >
        <div className="flex flex-col gap-6">
          <span className="text-3xl font-semibold">
            Langkah penggunaan <span className="text-[#A2C56F]">AyoSensus</span>
          </span>
          <span className="font-medium text-[16px]">
            Jika anda merasa kesulitan saat mengakses website AyoSensus, cobalah
            untuk tonton video tutorial berikut untuk membantu anda dalam
            mengakses website kami
          </span>
          <Button className="w-fit" variant={"linkNav"}>
            <Play />
            Tonton Video
          </Button>
        </div>
        <Image
          src="/beranda-2.svg"
          alt="beranda-2"
          width={500}
          height={500}
          className="h-full w-auto object-cover"
        />
      </section>
      <section
        id="faq"
        className="mt-[105px] flex flex-col gap-11 mx-auto w-[1168px]"
      >
        <div className="flex flex-col gap-6">
          <span className="text-2xl font-semibold text-center">
            Pertanyaan yang sering diajukan
          </span>
          <span className="font-medium text-[16px]">
            Panduan singkat untuk membantumu memahami cara kerja Foodie App —
            dari pemesanan hingga makanan sampai di tanganmu
          </span>
        </div>
        <Accordion type="multiple" className="w-full">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id.toString()}>
              <AccordionTrigger>{faq.head}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.body}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <section
        id="contact"
        className="w-[1168px] mt-[15px] mx-auto p-6 flex flex-col gap-6"
      >
        <div className="flex justify-center items-center gap-3 text-[#0026A2]">
          <CircleHelp size={35} />
          <span className="font-medium text-[16px]">Kontak Bantuan</span>
        </div>
        <div className="w-full grid grid-cols-3 gap-5">
          <div className="border border-[#E5E5E5] flex flex-col gap-[16px] justify-center items-center p-6">
            <Mail color="#0026A2" size={35} />
            <div className="flex flex-col justify-center items-center">
              <span className="text-center text-primary font-medium text-[16px]">
                Hubungi Email
              </span>
              <span className="text-center text-muted-foreground font-[400] text-sm">
                Kirim pertanyaan anda melalui email yang sudah tertera
              </span>
            </div>
            <span className="text-center text-primary font-medium text-[16px]">
              help@ayosensus.id
            </span>
            <Button variant="linkNav" className="w-full text-sm font-medium">
              Kirim Email
            </Button>
          </div>
          <div className="border border-[#E5E5E5] flex flex-col gap-[16px] justify-center items-center p-6">
            <Phone color="#0026A2" size={35} />
            <div className="flex flex-col justify-center items-center">
              <span className="text-center text-primary font-medium text-[16px]">
                Telepon 24 Jam
              </span>
              <span className="text-center text-muted-foreground font-[400] text-sm">
                Hubungi nomor dibawah jika anda memiliki keluhan/pertanyaan
              </span>
            </div>
            <span className="text-center text-primary font-medium text-[16px]">
              0123-4567
            </span>
            <Button variant="linkNav" className="w-full text-sm font-medium">
              Hubungi sekarang
            </Button>
          </div>
          <div className="border border-[#E5E5E5] flex flex-col gap-[16px] justify-center items-center p-6">
            <MessageCircle color="#0026A2" size={35} />
            <div className="flex flex-col justify-center items-center">
              <span className="text-center text-primary font-medium text-[16px]">
                Bantuan Chat
              </span>
              <span className="text-center text-muted-foreground font-[400] text-sm">
                Hubungi nomor berikut untuk bertanya melalui chat
              </span>
            </div>
            <span className="text-center text-primary font-medium text-[16px]">
              0823-4567-8910
            </span>
            <Button variant="linkNav" className="w-full text-sm font-medium">
              Chat sekarang
            </Button>
          </div>
        </div>
      </section>
      <footer className="bg-[#3F495A] w-full h-[471px]"></footer>
    </main>
  );
};

export default Page;
