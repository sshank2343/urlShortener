import { initTRPC } from "@trpc/server";

const t= initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

// export const createContext = () =>{
//     return {
//         correlationId: asyncLocalStorage.getStore()?.correlationId || 'unknown-error-while-creating-correlation-id'
//     }
// }