import type { userAbsen } from "../types/absen";
import { Allstatus } from "../constant/status.absen";

// Helper untuk convert array hasil prisma
export function convertObjects(raw: any[]) {
  const grouped: Record<string, Record<string, number>> = {};
  raw.forEach((row: userAbsen) => {
    const tanggal = row?.absen?.tanggal;
    const localTanggal = new Date(tanggal.getTime() + (7 * 60 * 60 * 1000)).toISOString().split("T")[0];
    const status = row?.status

    if (!localTanggal) return;
    if (!grouped[localTanggal]) grouped[localTanggal] = {};

    Allstatus.forEach((stat) => {
      if (grouped[localTanggal]![stat] === undefined) {
        grouped[localTanggal]![stat] = 0;
      }
    });

    grouped[localTanggal]![status]!++
  });

  return Object.entries(grouped).map(([tanggal, status]) => ({
    tanggal,
    ...status,
  }));
}

export function convertObject(raw: any[]) {
  const grouped: Record<string, Record<string, number>> = {};
  raw.forEach((row: userAbsen) => {
    const tanggal = row?.absen?.tanggal
    const localTanggal = new Date(tanggal.getTime() + (7 * 60 * 60 * 1000)).toISOString().split("T")[0];
    const status = row?.status

    if (!localTanggal) return {}
    if (!grouped[localTanggal]) grouped[localTanggal] = {};

    Allstatus.forEach((stat) => {
      if (grouped[localTanggal]![stat] === undefined) {
        grouped[localTanggal]![stat] = 0;
      }
    });

    grouped[localTanggal]![status]!++
  });

  return grouped
}
