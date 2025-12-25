export async function fetchHygraph(query, variables = {}, options = {}) {
  const res = await fetch('https://ap-south-1.cdn.hygraph.com/content/cmj7j527t02x407uo1evirc58/master', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NjU4MjYwNzAsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtajdqNTI3dDAyeDQwN3VvMWV2aXJjNTgvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiJkNzIyYzk3NC0zYjllLTQ4MWUtYWUwYS03MDk5MjYyMDc4MzMiLCJqdGkiOiJja2E1ajJlb2IwM3RjMDF3aDBkZmQ2N3J5In0.v3RULliMFzRYIzRUjfDUbeLdrPDvVOFnj4EPVkEks6kEFKD9KvS61_4l-l9TMW_EyfHaFegT2XD-vx-ZesCnL6p6rLhxtS25vN92R4vUc2NQF3qUme_ml5YylSEX8YGwnftpl1_LyiSmHH9SZFm7eJ78A5RuHNK_QqocL_8ah1jjmSLaJJ-4yWuRKPeN_JoxcNjKBZHXaF43m0oFmZNW51N1eMc7aSghXwaDr7LSyfx_BOn7npR3tvJYVTGlA87oF92tZAcJFD3WeOHGnWoRkXWknt8d-3iDSNmUk3hbgU6ke9RsYyW7L5kWPz-VhXd-KbQeUAP1duxHoTxTnHeiOWV3nyE03vRi5O5DJJtRJK6Ws3IWhhC4tMBmuriOcuoasYe_es3hNHDrdjCpwa_HjuUBP2BKJRupsnrlxoAq0LYRmzKAOeR33_MHj3-JUdpWWZAj0Gx8pRRWIkO0HgMqvEYV0hxnq9UKSAdnOMZCUhjxCei87MbUPaccxQGdDFlYzw4Ydc9ZE0JMViXITlXTangvDdeBTJW3xtL6VIQzBLhKbM9svMQbeFKG7J1ehy43fOZGSXdey46W2gQ-SPKhaVBp2ngOAyBhAVNGT0eZwK2w3lV36_lyaBFfAQKyvi2MLnQvaLnOcG6-A0QABK9jOaIIDYhFw6Ci69N-CSV2X8U`,
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: options.revalidate ?? 3600,
    },
  });

  const json = await res.json();

  // Check GraphQL errors
  if (json.errors && json.errors.length > 0) {
    console.error("Hygraph GraphQL errors:", json.errors);
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("Hygraph returned no data");
  }

  return false;
}