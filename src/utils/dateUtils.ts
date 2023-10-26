export const calculateDaysOpened = (created_at: string): number => {
  const dateOpened = new Date(created_at);
  const currentDate = new Date();
  return Math.floor(
    (currentDate.getTime() - dateOpened.getTime()) / (1000 * 60 * 60 * 24)
  );
};
