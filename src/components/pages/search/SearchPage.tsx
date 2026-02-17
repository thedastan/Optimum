import Search_card from "@/components/pages/search/Search_card";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div></div>}>
      <Search_card />
    </Suspense>
  );
}
