import Image from "next/image";

export default function ForaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <nav
        className="navbar navbar-expand-lg sticky-top mb-3 mb-sm-5"
        style={{ backgroundColor: "#6929F3" }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image
              src="/i/logonav.png"
              alt="Logo LiderScan"
              className="d-inline-block align-text-top me-2"
              height={32}
              width={32}
            />
            LiderScan
          </a>
        </div>
      </nav>

      {children}
    </body>
  );
}
