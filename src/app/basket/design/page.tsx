// app/basket/design/page.tsx
"use client";

import React, { Suspense } from "react";
import Design from "@/components/pages/basket/design/Design";

const Page = () => (
  <Suspense fallback={<div>Загрузка...</div>}>
    <Design />
  </Suspense>
);

export default Page;
