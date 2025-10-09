import { ActionResponse, UserRole } from "@/types";

export const getRoleFromSession = (
  role: Array<UserRole> | undefined,
): UserRole => {
  if (!role) return "user";
  const isSuperAdmin = role?.includes("superadmin");
  const isAdmin = role.includes("admin") && !role.includes("superadmin");
  if (isSuperAdmin) return "superadmin";
  if (isAdmin) return "admin";
  return "user";
};

export const faqData = [
  {
    id: 1,
    head: "Bagaimana keamanan dan privasi data saya dijamin?",
    body: "Data Anda dilindungi dengan enkripsi end-to-end dan sistem keamanan berlapis. Kami mematuhi UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi dan telah bersertifikat ISO 27001. Data hanya digunakan untuk keperluan statistik resmi dan tidak akan dibagikan kepada pihak ketiga tanpa persetujuan.",
  },
  {
    id: 2,
    head: "Apakah wajib mengisi E-Sensus?",
    body: "Ya, berdasarkan UU No. 16 Tahun 1997 tentang Statistik, setiap warga negara wajib memberikan data untuk keperluan statistik resmi negara. E-Sensus merupakan program resmi pemerintah untuk pendataan kependudukan nasional.",
  },
  {
    id: 3,
    head: "Bagaimana jika mengalami kendala teknis saat mengisi?",
    body: "Jika mengalami kendala teknis, Anda dapat: 1) Coba refresh halaman atau gunakan browser lain, 2) Hubungi helpdesk melalui nomor 14045 atau live chat, 3) Kunjungi kantor BPS terdekat untuk bantuan langsung. Tim support tersedia 24/7 selama periode sensus.",
  },
  {
    id: 4,
    head: "Untuk apa data E-Sensus akan digunakan?",
    body: "Data E-Sensus digunakan untuk: 1) Perencanaan pembangunan nasional dan daerah, 2) Penyusunan kebijakan publik, 3) Alokasi anggaran pembangunan, 4) Peningkatan layanan publik, 5) Penelitian dan analisis statistik resmi. Data akan diolah secara agregat dan tidak mengidentifikasi individu.",
  },
  {
    id: 5,
    head: "Berapa lama waktu yang dibutuhkan untuk mengisi E-Sensus?",
    body: "Pengisian E-Sensus membutuhkan waktu sekitar 15-30 menit per keluarga, tergantung jumlah anggota keluarga. Anda dapat menyimpan progress dan melanjutkan pengisian di lain waktu. Sistem akan otomatis menyimpan data yang telah diisi.",
  },
];

export const actionResponse = <T = unknown>(props: ActionResponse<T>) => {
  return props;
};
