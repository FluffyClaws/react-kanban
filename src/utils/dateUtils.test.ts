import { calculateDaysOpened } from "./dateUtils";

describe("calculateDaysOpened", () => {
  it("returns 0 for the current date", () => {
    const today = new Date().toISOString().split("T")[0];
    expect(calculateDaysOpened(today)).toBe(0);
  });

  it("returns the correct number of days for a past date", () => {
    const pastDate = "2023-01-01";
    const expectedDays = Math.floor(
      (new Date().getTime() - new Date(pastDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    expect(calculateDaysOpened(pastDate)).toBe(expectedDays);
  });

  it("handles invalid dates gracefully", () => {
    expect(() => calculateDaysOpened("invalid-date")).toThrow(
      "Invalid date format"
    );
  });
});
