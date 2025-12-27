"use client";

import { useState } from "react";

export function ImageModal({ src }: { src: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        className="h-24 w-24 object-cover rounded cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            className="max-h-[90%] max-w-[90%] rounded"
          />
        </div>
      )}
    </>
  );
}
