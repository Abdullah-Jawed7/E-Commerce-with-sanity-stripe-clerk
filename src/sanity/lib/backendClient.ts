import { createClient } from "next-sanity";
import { dataset , apiVersion ,projectId } from "../env";

export const backendClient  =createClient({
projectId,
dataset,
apiVersion,
useCdn:true,
token:process.env.SANITY_API_TOKEN,
})