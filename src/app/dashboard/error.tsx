"use client";
import { useEffect } from "react";
import { AlertError } from "../ui/alert";

type ErrorPageProps = {
  error?: (Error & { digest?: string }) | string | null;
  unstable_retry?: () => void;
};

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <div>
      <AlertError />
    </div>
  );
}
