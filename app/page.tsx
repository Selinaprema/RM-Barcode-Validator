import BarcodeInput from "@/components/BarcodeInput";

export default function Page() {
  return (
    <main className="container">
      <section className="card">
        <h1 className="title">Validate a Royal Mail barcode</h1>
        <p className="instructions">
          Enter your barcode and check it's validity
        </p>
         <BarcodeInput />
      </section>
    </main>
  );
}
