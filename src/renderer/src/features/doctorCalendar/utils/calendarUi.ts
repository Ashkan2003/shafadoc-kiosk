export type CalendarDayUi = {
  id: string;
  date: Date;
  weekdayName: string;
  dayOfMonth: number;
  availableSlots: string[];
};

const weekDayFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  weekday: "long",
});

const monthFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  month: "long",
  year: "numeric",
});

export const toPersianNumber = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

export const normalizeTimeLabel = (value: string) => toPersianNumber(value.slice(0, 5));

const toDate = (value: unknown): Date | null => {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parseSlots = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => (typeof item === "string" ? item : item?.from || item?.start_time || ""))
        .filter(Boolean);
    }
  } catch {
    return [];
  }

  return [];
};

export const extractCalendarDays = (data: any): CalendarDayUi[] => {
  const items = Array.isArray(data) ? data : data?.items || data?.appointments || data?.calendar || [];

  return items
    .map((item: any) => {
      const date = toDate(item?.date || item?.day || item?.appointment_date);
      if (!date) return null;
      return {
        id: String(item?.id ?? item?.calendar_id ?? item?.date),
        date,
        weekdayName: weekDayFormatter.format(date),
        dayOfMonth: date.getDate(),
        availableSlots: parseSlots(item?.times),
      };
    })
    .filter(Boolean) as CalendarDayUi[];
};

export const getMonthLabel = (date: Date) => monthFormatter.format(date);

export const getFirstAvailableSlot = (day: CalendarDayUi) => day.availableSlots[0] ?? null;
