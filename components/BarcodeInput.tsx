"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { validateBarcode } from "@/lib/Barcode";
import { mockValidateBarcodeApi } from "@/lib/mockApi";
import Spinner from "@/components/ui/Spinner";
import type { HistoryEntry } from "@/types/history"; 

export default function BarcodeInput({
  //Removed history state and instead recieves onHistoryUpdate as a prop (used AI to help here)
  onHistoryUpdate,
}: {
  onHistoryUpdate: (entry: HistoryEntry) => void;
}) {
  const input = "barcode-input";
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // change to async function - used AI to he
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setApiStatus("idle");

    const result = validateBarcode(value);

   if (!result.ok) {
  setSubmitted(null);
  setError(result.message);
  return;
}

  setError(null);

    // Used AI to help write this bit
    const id = crypto.randomUUID();

    onHistoryUpdate({ id, barcode: result.capitalised, status: "validating" });

    setValue("");
    setSubmitted(result.capitalised);
    setApiStatus("loading");

    // Used AI to help with error handling
    try {
      await mockValidateBarcodeApi(result.capitalised);
      setApiStatus("success");
      onHistoryUpdate({ id, barcode: result.capitalised, status: "valid" });
    } catch {
      setApiStatus("error");
      onHistoryUpdate({ id, barcode: result.capitalised, status: "invalid" });
    }
  }

  return (
    <section>
      <form className="form" onSubmit={onSubmit}>
        <label className="label" htmlFor={input}>
          Please Input Your Barcode
        </label>

        <div className="inputRow">
          {/*(Used AI to help  with this as wasn't sure how to handle controlled inputs */}
          <input
            id={input}
            className="textInput"
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            placeholder="EG. XH545554533GB"
          />

          <Button type="submit">Submit</Button>
        </div>
      </form>
      {error && (
  <div className="message error">
    {error}
  </div>
)}
      {submitted && (
  <div className="message">
    Submitted: <code>{submitted}</code>
  </div>
)}
      {apiStatus === "loading" && (
        <div className="message">
          <Spinner /> Validating
        </div>
      )}
      {apiStatus === "success" && <div className="message">Valid barcode</div>}
      {apiStatus === "error" && <div className="message">Invalid barcode</div>}
    </section>
  );
}
