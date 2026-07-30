"use client";
import { useEffect } from "react";
import { AlertError } from "../../ui/Alert";

type ErrorPageProps = {
  error?: (Error & { digest?: string }) | string | null;
  unstable_retry?: () => void;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <div>
      <AlertError />
    </div>
  );
}
