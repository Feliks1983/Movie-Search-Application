"use client"; 
import { useEffect } from "react";
import { AlertError } from "../ui/alert";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <AlertError />
    </div>
  );
}
