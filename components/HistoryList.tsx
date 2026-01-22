import type { HistoryEntry } from "@/types/history";

//Used AI to help write this functiom
export default function HistoryList({ items }: { items: HistoryEntry[] }) {
  return (
    <section>
      <h2 className="subtitle">Validation history</h2>

      {items.length === 0 ? (
        <p className="muted">No validations yet.</p>
      ) : (
        <ul className="list">
          {items.map((item) => (
            <li key={item.id} className="listItem">
              <div className="barcode">{item.barcode}</div>
              <div className="statusText">
                {item.status === "validating" ? "Validating..." : item.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
