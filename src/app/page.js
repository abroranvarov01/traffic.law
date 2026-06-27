import { redirect } from "next/navigation";
// Import manzilini to'g'rilaymiz
import { i18n } from "../dictionaries/getDictionary";

export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`);
}
