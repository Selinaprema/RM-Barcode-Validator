import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <div className="headerInner">
        <Image
          src="/images/royal-mail-logo-vector.png"
          width={120}
          height={120}
          priority
        />
      </div>
    </header>
  );
}
