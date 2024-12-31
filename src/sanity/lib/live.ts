// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from './client'
const token =process.env.SANITY_API_TOKEN
if (!token) {
  throw new Error('The environment variable SANITY_API_TOKEN is missing')
  
}

export const { sanityFetch, SanityLive } = defineLive({ 
  client,
  serverToken:token,
  browserToken:token,
  fetchOptions:{
    revalidate: 0
  }
  // client: client.withConfig({ 
  //   // Live content is currently only available on the experimental API
  //   // https://www.sanity.io/docs/api-versioning
  //   apiVersion: 'vX' 
  // }) 
});