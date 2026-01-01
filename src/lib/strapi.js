const STRAPI_TOKEN = "6163c0018879370cdabefb6391a31b0c4159296651451d37156585395520e5528063b0e78f0eaa4d6a4d5e52cea202ee70c30d4f60facad91684527deb306bca7c01bc7ed261ac207bea01c2b57dc7d97ddafd426565215aed0b3888d512274421a0137773a3601103587e212d2146d9ec8b48ed6c2e27452e25d74df52c4fa0";

export async function fetchStrapi(query, variables = {}, options = {}) {
  const {
    token = STRAPI_TOKEN,
    headers = {},
    fetchOptions = {},
  } = options;

  const res = await fetch('https://admin.cricsinfo.com/graphql', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
    ...fetchOptions,
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error(`Strapi GraphQL: Non-JSON response (HTTP ${res.status})`);
  }

  if (!res.ok) {
    throw new Error(`Strapi GraphQL HTTP ${res.status}: ${JSON.stringify(json)}`);
  }

  if (json.errors?.length) {
    throw new Error(`Strapi GraphQL errors: ${JSON.stringify(json.errors, null, 2)}`);
  }

  return json.data;
}