/* --------------------------------- config --------------------------------- */
"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

/* ------------------------------- componentes ------------------------------ */
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { buttonVariants } from "@/components/ui/button";

/* ------------------------------- renderizar ------------------------------- */
export default function LogadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <body>
        <nav className="bg-white shadow">
          <div className="container flex py-2 justify-between">
            <div className="flex ">
              <a className="flex items-center">
                <Image
                  src="/i/logonav_purple.png"
                  alt="Logo LiderScan"
                  className="d-inline-block align-text-top me-2"
                  height={32}
                  width={32}
                />
              </a>
              <div className="flex ">
                <Link
                  className={buttonVariants({ variant: "ghost" })}
                  href={"/avaliacoes"}
                >
                  Avaliações
                </Link>
                <Link
                  className={buttonVariants({ variant: "ghost" })}
                  href={"/participantes"}
                >
                  Participantes
                </Link>
              </div>
            </div>
            {/*<div className="visible md:invisible">
                <Button variant="outline" size="icon">
                <Menu  strokeWidth={2}  />
                </Button>
  </div>*/}
          </div>
        </nav>

        {children}
        <Toaster />
      </body>
    </>
  );
}
