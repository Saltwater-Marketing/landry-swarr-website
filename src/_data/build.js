export default function () {
  const now = new Date();
  return { year: now.getFullYear(), v: now.getTime().toString(36), date: now.toISOString().slice(0, 10) };
}
