"use client";

import { Suspense } from "react";
import Create_password from "@/components/pages/auth/create_password/Create_password";

const page = () => {
  return (
    <Suspense>
      <Create_password />
    </Suspense>
  );
};

export default page;
