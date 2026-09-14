import { format } from "date-fns";
import { ja } from "date-fns/locale";

export function formatPostDate(iso: string): string {
  return format(new Date(iso), "yyyy年M月d日", { locale: ja });
}
