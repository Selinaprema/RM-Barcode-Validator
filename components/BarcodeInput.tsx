"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { validateBarcode } from "@/lib/Barcode";
import { mockValidateBarcodeApi } from "@/lib/mockApi";
import HistoryList from "@/components/HistoryList";
import type { HistoryEntry } from "@/types/history";

//  handles barcode input and submission
export default function BarcodeInput() {
  const input = "barcode-input";
  const [value, setValue] = useState("");
  // (Used AI to help with thisa as wasn't sure how to store the barcode and show message)
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  

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

     const id = crypto.randomUUID();

    setHistory((prev) => [
      // Newest at the top
      { id, barcode: result.capitalised, status: "validating" },
      ...prev,
    ]);
       

    setValue("");
    setSubmitted(result.capitalised);

    // API call 
    setApiStatus("loading");
    

   try {
      await mockValidateBarcodeApi(result.capitalised);
      setApiStatus("success");

      setHistory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "valid" } : item))
      );
    } catch {
      setApiStatus("error");

      setHistory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "invalid" } : item))
      );
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
      <HistoryList items={history} />
    </section>
  );
}
