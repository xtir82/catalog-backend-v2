import { Command } from "commander";

const program = new Command();
            //Comando,      Descripcion,         Valor por Defecto
program
    .option("--mode <mode>", "entorno de trabajo", "produccion")
program.parse();

export default program;