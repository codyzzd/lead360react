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
              className="d-inline-block align-text-top"
              height={32}
              width={32}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Avaliações
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Participantes
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {children}
    </body>
  );
}
