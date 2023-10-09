"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";
import { Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Surveys = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Surveys>[] = [
  {
    accessorKey: "name",
    header: "Avaliação",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const values = row.original;

      return (
        <div className="text-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LogIn strokeWidth={2} size={16} className="mr-2 h-4 w-4" />
                <Link href={`/avaliacoes/${values.id}`}>Entrar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Trash size={16} strokeWidth={2}  className="mr-2 h-4 w-4"/>
 
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  // ...
];
