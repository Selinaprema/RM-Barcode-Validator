"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { validateBarcode } from "@/lib/Barcode";
import { mockValidateBarcodeApi } from "@/lib/mockApi";

//  handles barcode input and submission
export default function BarcodeInput() {
  const input = "barcode-input";
  const [value, setValue] = useState("");

  // (Used AI to help with thisa as wasn't sure how to store the barcode and show message)
  const [submitted, setSubmitted] = useState<string | null>(null);

  // handles API status
  const [apiStatus, setApiStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // change to async function
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setApiStatus("idle");

    const result = validateBarcode(value);

    if (!result.ok) {
      setSubmitted(null);
      alert(result.message);
      return;
    }

    setValue("");
    setSubmitted(result.capitalised);

    // API call (must be inside onSubmit so it runs after pre-validation passes)
    setApiStatus("loading");

    try {
      await mockValidateBarcodeApi(result.capitalised);
      setApiStatus("success");
    } catch {
      setApiStatus("error");
    }
  }

  return (
    <section>
      <form className="form" onSubmit={onSubmit}>
        <label className="label" htmlFor={input}>
          Barcode
        </label>

        {/*(Used AI to helo with thisa as wasn't sure how to handle controlled inputs */}
        <input
          id={input}
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          placeholder="EG. XH545554533GB"
        />

        <div className="row">
          <Button type="submit">Submit</Button>
        </div>
      </form>

      {submitted && (
        <div className="message">
          Submitted: <code>{submitted}</code>
        </div>
      )}

      {apiStatus === "loading" && <div className="message">Validating...</div>}
      {apiStatus === "success" && <div className="message">Valid barcode</div>}
      {apiStatus === "error" && <div className="message">Invalid barcode</div>}
    </section>
  );
}
