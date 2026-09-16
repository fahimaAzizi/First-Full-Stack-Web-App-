const API_URL = "http://localhost:5000";

export async function getServerMessage() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to connect to server");
  }

  return response.json();
}