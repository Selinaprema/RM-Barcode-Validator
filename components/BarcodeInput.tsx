"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

//  handles barcode input and submission
export default function BarcodeInput() {
  
  const inputId = "barcode-input";
  const [value, setValue] = useState("");


  const [submitted, setSubmitted] = useState<string | null>(null);

  // Handles form submission
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const capitalised = value.toUpperCase();
    setValue(capitalised);
    setSubmitted(capitalised);
  }

  return (
    <section >
     
      <form className="input" onSubmit={onSubmit}>
        <label className="label" htmlFor={inputId}>
          Barcode
        </label>

        <input
          id={inputId}
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          placeholder="EG. XH545554533GB"
        />
        <div className="row">
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>

      {/* Show feedback only after a barcode has been submitted */}
      {submitted && (
        <div className="message">
          Submitted: <code>{submitted}</code>
        </div>
      )}
    </section>
  );
}
