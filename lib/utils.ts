import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formattingResponse(obj: any): any {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (obj instanceof Date) {
    // Ubah ke string format ISO (atau bisa diubah jadi toLocaleString() jika mau lebih manusiawi)
    return obj.toLocaleDateString('id-ID') // hasil: "19/6/2025"
    // return obj.toLocaleDateString(); // kalau mau format seperti "6/19/2025"
  } else if (Array.isArray(obj)) {
    return obj.map(formattingResponse);
  } else if (obj !== null && typeof obj === "object") {
    const res: any = {};
    for (const key in obj) {
      res[key] = formattingResponse(obj[key]);
    }
    return res;
  }
  return obj;
}
