import type { userAbsen } from "../types/absen";
import { Allstatus } from "../constant/status.absen";
import { group } from "console";

// Helper untuk convert array hasil prisma
export async function convertObject(raw: any[]) {
  const grouped: Record<string, Record<string, number>> = {};
  raw.forEach((row: userAbsen) => {
    const tanggal = row?.absen?.tanggal?.toISOString().split("T")[0];
    const status = row?.status

    if (!tanggal) return;
    if (!grouped[tanggal]) grouped[tanggal] = {};

    Allstatus.forEach((stat) => {
      if (grouped[tanggal]![stat] === undefined) {
        grouped[tanggal]![stat] = 0;
      }
    });

    grouped[tanggal]![status]!++
  });

  return Object.entries(grouped).map(([tanggal, status]) => ({
    tanggal,
    ...status,
  }));
}
