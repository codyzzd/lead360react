/* --------------------------------- config --------------------------------- */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/* ------------------------------- formulario ------------------------------- */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Avaliação deve ter mais de 2 letras.",
  }),
});
/* ------------------------------- components ------------------------------- */
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/* --------------------------------- funções -------------------------------- */

/* ------------------------------- renderizar ------------------------------- */
export function ModalNewSurvey() {
  const router = useRouter(); // Inicia router
  const { toast } = useToast(); // Inicia o toast

  // Validação Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Função de Submit do form
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setOpen(false); // fecha o modal

    // Converte os dados em JSON
    const data = JSON.stringify({
      name: values.name,
    });

    // Executa api
    const APIURL = process.env.API_URL; // pega url
    const response = await fetch(`/api/surveys`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Refresh na tela
    router.refresh();

    // Envia o toast
    toast({
      title: `Avaliação Criada!`,
      /*description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),*/
    });
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      <Form {...form}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <Plus strokeWidth={2} className="me-2 " />
              Criar Avaliação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-start">Criar Avaliação</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Lideres de vendas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Criar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </>
  );
}
