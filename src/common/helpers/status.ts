import type { AbsenStatus } from "@prisma/client";
import { date } from "../constant/date";

export function absenStatus ( status : string , dateLate : Date ) {
        let absenStatus: AbsenStatus = "Alpha";
    
        if (status === "Hadir") {
          absenStatus = "Hadir";
        }
        if (status === "Izin") {
          absenStatus = "Izin";
        }
        if (status === "Terlambat" || date > dateLate ) {
          absenStatus = "Terlambat";
        }

        return absenStatus
}