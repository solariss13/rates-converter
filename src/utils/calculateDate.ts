export default function calculateDate(value: number) {
  const referenceDate = new Date();
  const daysAgo = 1096 - value;
  const dateInPast = referenceDate.getDate() - daysAgo;

  referenceDate.setDate(dateInPast);

  return referenceDate.toISOString().split('T')[0];
}
