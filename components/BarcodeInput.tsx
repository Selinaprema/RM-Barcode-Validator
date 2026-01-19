"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { validateBarcode } from "@/lib/Barcode";



//  handles barcode input and submission
export default function BarcodeInput() {
  
  const input = "barcode-input";
  const [value, setValue] = useState("");

// (Used AI to helo with thisa as wasn't sure how to store the barcode and show message)
  const [submitted, setSubmitted] = useState<string | null>(null);

  // Event handler to handle logic and show message
 function onSubmit(e: React.FormEvent) {
  e.preventDefault();

  const result = validateBarcode(value);

  if (!result.ok) {
    setSubmitted(null);
    alert(result.message); 
    return;
  }

  setValue("");
  setSubmitted(result.capitalised);
}


  return (
    <section >
     
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
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>

      
      {submitted && (
        <div className="message">
          Submitted: <code>{submitted}</code>
        </div>
      )}
    </section>
  );
}
