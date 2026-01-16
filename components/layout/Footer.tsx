export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footerText">© {new Date().getFullYear()} Barcode Validator</p>
      </div>
    </footer>
  );
}
