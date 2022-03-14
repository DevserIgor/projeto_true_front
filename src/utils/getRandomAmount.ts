export default function getRandomAmount(): number {
  const STORAGE_KEY = "@TRUE_COMMERCE_AVALIACOES";
  const storage = localStorage.getItem("");

  const random = Math.random() * 1000;
  let value: number = 5.0;
  if (random < 1000 && random > 900) {
    value = 5.0;
  } else if (random < 900 && random > 800) {
    value = 4.9;
  } else if (random < 800) {
    value = 4.7;
  } else if (random < 700) {
    value = 4.7;
  }
  return value;
}
