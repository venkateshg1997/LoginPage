export async function fetchHorror() {
  const url = "https://api.sampleapis.com/movies/horror";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch horror movies");
  return await res.json();
}

export async function fetchAnimation() {
  const url = "https://api.sampleapis.com/movies/animation";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch animation movies");
  return await res.json();
}
