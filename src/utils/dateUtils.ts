export const calculateDaysOpened = (created_at: string): number => {
  const dateOpened = new Date(created_at);
  if (isNaN(dateOpened.getTime())) {
    throw new Error("Invalid date format");
  }
  const currentDate = new Date();
  return Math.floor(
    (currentDate.getTime() - dateOpened.getTime()) / (1000 * 60 * 60 * 24)
  );
};
