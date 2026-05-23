"use client";
import { useState, useMemo, useEffect } from "react";
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
  const { numDate } = getFirstEmptyAppointment({
    appointments: calendarData,
  });
  const [currMonth, setCurrMonth] = useState(() =>
    format(new Date(numDate!), "MMMM-yyyy"),
  );

  // Dynamically calculate first day of the current month
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
  return {
    goNextMonth,
    currMonth,
    daysInMonth,
    isSameMonth,
    getPrevMonth,
    setCurrMonth,
    getNextMonth,

    // @ts-ignore
    firstEmptyDate: new Date(numDate),
  };
}
