"use client";

import { useState } from "react";
import BarcodeInput from "@/components/BarcodeInput";
import HistoryList from "@/components/HistoryList";
import type { HistoryEntry } from "@/types/history";

export default function Page() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // used AI to help write this as I moved the validation history to a different component
  function handleHistoryUpdate(entry: HistoryEntry) {
    setHistory((prev) => {
      const exists = prev.find((x) => x.id === entry.id);
    
      if (exists) {
        return prev.map((x) => (x.id === entry.id ? { ...x, status: entry.status } : x));
      }

      return [entry, ...prev];
    });
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="heroInner">
          <div className="heroText">
            <h1 className="heroTitle">
              Validate <br />
              <span className="titleAccent">Your Barcode</span>
            </h1>
          </div>

          <div className="heroPanel">
            <BarcodeInput onHistoryUpdate={handleHistoryUpdate} />
          </div>
        </div>
      </section>
      <section className="content">
        <div className="contentInner">
          <HistoryList items={history} />
        </div>
      </section>
    </main>
  );
}
