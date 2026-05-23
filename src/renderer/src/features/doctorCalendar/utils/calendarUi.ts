import { compareAsc, isSameDay, parse } from "date-fns-jalali";
import {
  AppointmentReservationStatsType,
  AppointmentTimeStatusType,
  CalendarAppointmentType,
  CombinedAppointmentsByDateType,
} from "src/shared/types/common";

// ------------------------------------------------------------
/**
 * Groups appointments by date and, for each date, aggregates reservation stats
 * and merges time status arrays. Every unique date becomes one entry.
 */
export const getCombinedAppointmentsByDate = (
  appointments: CalendarAppointmentType[],
): CombinedAppointmentsByDateType[] => {
  if (!Array.isArray(appointments) || appointments.length === 0) {
    return [];
  }

  const groupedByDate = appointments.reduce<
    Record<string, CalendarAppointmentType[]>
  >((acc, appointment) => {
    if (!acc[appointment.date]) {
      acc[appointment.date] = [];
    }
    acc[appointment.date].push(appointment);
    return acc;
  }, {});

  return Object.entries(groupedByDate).map(([date, items]) => {
    const totalReservationStatus =
      items.reduce<AppointmentReservationStatsType>(
        (acc, appointment) => ({
          online_capacity:
            acc.online_capacity + appointment.reservation_stats.online_capacity,
          reserved_count:
            acc.reserved_count + appointment.reservation_stats.reserved_count,
          pending_count:
            acc.pending_count + appointment.reservation_stats.pending_count,
          confirmed_count:
            acc.confirmed_count + appointment.reservation_stats.confirmed_count,
          remaining_capacity:
            acc.remaining_capacity +
            appointment.reservation_stats.remaining_capacity,
          is_available:
            acc.is_available || appointment.reservation_stats.is_available,
        }),
        {
          online_capacity: 0,
          reserved_count: 0,
          pending_count: 0,
          confirmed_count: 0,
          remaining_capacity: 0,
          is_available: false,
        },
      );

    const combinedTimeStatus = items.flatMap((appointment) => {
      if (
        Array.isArray(appointment.times_status) &&
        appointment.times_status.length > 0
      ) {
        return appointment.times_status;
      }

      const fallbackTimeStatus: AppointmentTimeStatusType = {
        appointment_id: appointment.id,
        time: `${appointment.start_time} - ${appointment.end_time}`,
        status: appointment.reservation_stats.is_available
          ? "AVAILABLE"
          : "PENDING",
        reserved_count: appointment.reservation_stats.reserved_count,
        pending_count: appointment.reservation_stats.pending_count,
        is_available: appointment.reservation_stats.is_available,
      };

      return [fallbackTimeStatus];
    });

    return {
      date,
      combinedTimeStatus,
      totalReservationStatus,
    };
  });
};

export function getFirstEmptyAppointment({
  appointments,
}: {
  appointments: CombinedAppointmentsByDateType[] | null;
}) {
  // filter and return the appoinmtnet that has online-reserve-type and is the nearest-date
  if (
    !appointments ||
    !Array.isArray(appointments) ||
    appointments.length === 0
  ) {
    return { numDate: null };
  }
  const firstEmpty = appointments

    .filter(
      (app) => Number(app?.totalReservationStatus?.remaining_capacity) > 0,
    )
    .sort((a, b) => {
      const fmt = "yyyy/M/d";
      const da = parse(a.date, fmt, new Date());
      const db = parse(b.date, fmt, new Date());
      return compareAsc(da, db); // returns -1/0/1
    })[0];

  return {
    numDate: firstEmpty?.date,
  };
}

export const goToSelectedDaySlide = (
  selectedDayDate: Date,
  carouselRef: any,
  daysInMonth: any,
) => {
  // Find the index of the matching day in `daysInMonth`
  const matchingIndex = daysInMonth.findIndex((day: Date) =>
    isSameDay(day, selectedDayDate),
  );

  if (matchingIndex !== -1) {
    // Move the carousel to the found index
    if (carouselRef.current) {
      carouselRef.current.goToSlide(matchingIndex);
    }
  } else {
    // toast.error("تاریخ انتخابی در این ماه موجود نیست", { duration: 1500 });
  }
};
