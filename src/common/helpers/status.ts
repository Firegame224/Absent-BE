import type { AbsenStatus } from "@prisma/client";
import { date } from "../constant/date";

export function absenStatus ( status : string , dateLate : Date ) {
        let absenStatus: AbsenStatus = "Alpha";
    
        if (status === "hadir") {
          absenStatus = "Hadir";
        }
        if (status === "izin") {
          absenStatus = "Izin";
        }
        if (status === "terlambat" || date > dateLate ) {
          absenStatus = "Terlambat";
        }

        return absenStatus
}