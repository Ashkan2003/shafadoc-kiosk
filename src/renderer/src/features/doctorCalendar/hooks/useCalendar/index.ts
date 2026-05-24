// src/renderer/src/features/doctorCalendar/hooks/useCalendar/index.ts
"use client";
import { useState, useMemo } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isEqual,
  parse,
  startOfToday,
} from "date-fns-jalali";
import { CombinedAppointmentsByDateType } from "src/shared/types/common";
import { getFirstEmptyAppointment } from "../../utils/calendarUi";

export function useCalendar({
  calendarData,
}: {
  calendarData: CombinedAppointmentsByDateType[] | null;
}) {
  const today = startOfToday();
  const { numDate } = getFirstEmptyAppointment({ appointments: calendarData });

  // BUG FIX: guard against null numDate — new Date(null) → epoch (Jan 1 1970)
  const safeInitialDate = numDate ? new Date(numDate) : today;

  const [currMonth, setCurrMonth] = useState(() =>
    format(safeInitialDate, "MMMM-yyyy"),
  );

  const firstDayOfMonth = useMemo(
    () => parse(currMonth, "MMMM-yyyy", new Date()),
    [currMonth],
  );

  const isSameMonth = useMemo(
    () =>
      isEqual(
        parse(format(today, "MMMM-yyyy"), "MMMM-yyyy", new Date()),
        firstDayOfMonth,
      ),
    [today, firstDayOfMonth],
  );

  const daysInMonth = useMemo(
    () =>
      eachDayOfInterval({
        start: isSameMonth ? today : firstDayOfMonth,
        end: endOfMonth(firstDayOfMonth),
      }),
    [isSameMonth, today, firstDayOfMonth],
  );

  const getPrevMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrMonth((prev) =>
      format(
        add(parse(prev, "MMMM-yyyy", new Date()), { months: -1 }),
        "MMMM-yyyy",
      ),
    );
  };

  const getNextMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrMonth((prev) =>
      format(
        add(parse(prev, "MMMM-yyyy", new Date()), { months: 1 }),
        "MMMM-yyyy",
      ),
    );
  };

  const goNextMonth = () => {
    setCurrMonth((prev) =>
      format(
        add(parse(prev, "MMMM-yyyy", new Date()), { months: 1 }),
        "MMMM-yyyy",
      ),
    );
  };

  // Memoized so CalendarBody's useEffect deps don't fire on every render
  const firstEmptyDate = useMemo(
    () => (numDate ? new Date(numDate) : today),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [numDate],
  );

  return {
    goNextMonth,
    currMonth,
    daysInMonth,
    isSameMonth,
    getPrevMonth,
    setCurrMonth,
    getNextMonth,
    firstEmptyDate,
  };
}
