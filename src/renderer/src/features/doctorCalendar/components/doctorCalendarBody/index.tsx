// src/renderer/src/features/doctorCalendar/components/doctorCalendarBody/index.tsx
//
// REQUIRES: npm install swiper
//
import { format, isSameDay } from "date-fns-jalali";
import { useCallback, useEffect, useRef } from "react";
import { RootState } from "@renderer/lib/redux/store";
import { CombinedAppointmentsByDateType } from "src/shared/types/common";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import { setSelectedAppointmentDetail } from "@renderer/lib/redux/slices/reservationSlice";
import { toast } from "sonner";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

// Swiper React integration — run `npm install swiper` if not already installed
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface CalendarBodyProps {
  calendarData: CombinedAppointmentsByDateType[];
  /** Comes from the shared useCalendar state in DoctorCalendarContainer */
  daysInMonth: Date[];
  /** The nearest available appointment date across all months */
  firstEmptyDate: Date;
  isLoading?: boolean;
  onScrollToTimes: () => void;
  /** Lets this component navigate the shared month state (e.g. on mount restore) */
  onMonthChange: (month: string) => void;
}

const CalendarBody = ({
  calendarData,
  daysInMonth,
  firstEmptyDate,
  onScrollToTimes,
  onMonthChange,
}: CalendarBodyProps) => {
  // ─── Swiper ref — replaces the dead carouselRef ──────────────────────────
  const swiperRef = useRef<SwiperType | null>(null);

  const dispatch = useAppDispatch();
  const { selectedAppointmentDetail } = useAppSelector(
    (state: RootState) => state.reservation,
  );

  // ─── Helpers ─────────────────────────────────────────────────────────────
  const getScheduleForDay = useCallback(
    (day: Date): CombinedAppointmentsByDateType | null =>
      calendarData?.find((s) => isSameDay(new Date(s.date), day)) ?? null,
    [calendarData],
  );

  const handleSelect = useCallback(
    (day: Date) => {
      const schedule = getScheduleForDay(day);
      if (schedule) {
        dispatch(
          setSelectedAppointmentDetail({
            selectedDay: day.toISOString(),
            selectedDayTimes: schedule.combinedTimeStatus,
            selectedService: null,
            selectedTime: null,
          }),
        );
      }
    },
    [getScheduleForDay, dispatch],
  );

  // ─── On mount: restore previously selected day's month (back-navigation) ─
  useEffect(() => {
    if (selectedAppointmentDetail.selectedDay) {
      onMonthChange(
        format(new Date(selectedAppointmentDetail.selectedDay), "MMMM-yyyy"),
      );
    } else {
      // No prior selection — auto-select the first empty date
      handleSelect(firstEmptyDate);
    }
    // Intentionally only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Slide to the correct day whenever the displayed month changes ────────
  // This fires when:
  //   • the user clicks ماه قبل / ماه بعد in the header
  //   • onMonthChange is called above (back-navigation restore)
  //   • the اولین نوبت خالی button navigates to a different month
  useEffect(() => {
    if (!swiperRef.current || daysInMonth.length === 0) return;

    // Try to land on firstEmptyDate if it's in this month, otherwise go to slide 0
    const idx = daysInMonth.findIndex((day) => isSameDay(day, firstEmptyDate));
    const target = idx !== -1 ? idx : 0;

    // Small timeout: lets Swiper finish updating its internal slide list
    // after React has re-rendered the SwiperSlide children
    const timer = setTimeout(() => {
      swiperRef.current?.slideTo(target, 400);
    }, 50);

    return () => clearTimeout(timer);
  }, [daysInMonth, firstEmptyDate]);

  // ─── "اولین نوبت خالی" button ─────────────────────────────────────────────
  // BUG FIX: the old implementation set the month to `selectedAppointmentDetail.selectedDay`
  // (the already-selected day) instead of `firstEmptyDate`.
  const goToFirstEmptyDate = () => {
    handleSelect(firstEmptyDate);
    // Navigate month — this updates daysInMonth, which triggers the effect above
    // to slide the swiper to the correct position automatically
    onMonthChange(format(firstEmptyDate, "MMMM-yyyy"));
  };

  return (
    <Box sx={{ px: { xs: 1.5, md: 2 }, py: 3 }}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        {/* ── Prev slide (right arrow in RTL layout) ── */}
        <IconButton
          size="large"
          onClick={() => swiperRef.current?.slidePrev()}
          sx={{ flexShrink: 0 }}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>

        {/* ── Swiper day strip ── */}
        <Box sx={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
          <Swiper
            slidesPerView="auto"
            spaceBetween={12}
            // These two props tell Swiper to watch for DOM mutations so it
            // recalculates slide positions when daysInMonth children change
            observer
            observeParents
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {daysInMonth.map((day) => {
              const schedule = getScheduleForDay(day);
              // BUG FIX: was using getDate() (day number only) which matches across months.
              // isSameDay is correct.
              const isSelected = selectedAppointmentDetail.selectedDay
                ? isSameDay(
                    new Date(selectedAppointmentDetail.selectedDay),
                    day,
                  )
                : false;

              const emptyCount =
                schedule?.totalReservationStatus?.remaining_capacity ?? 0;
              const isAvailable = !!schedule;
              const isFullyBooked =
                schedule?.totalReservationStatus?.remaining_capacity === 0;
              const isActive = isAvailable && !isFullyBooked;

              return (
                <SwiperSlide
                  key={day.toISOString()}
                  // Fixed width keeps cards uniform; auto slidesPerView
                  // fits as many as the container allows
                  style={{ width: 150 }}
                >
                  <Box
                    onClick={() => {
                      if (isActive && emptyCount > 0) {
                        onScrollToTimes();
                        handleSelect(day);
                      } else {
                        toast.error("این روز در دسترس نیست");
                      }
                    }}
                    sx={{
                      width: 150,
                      px: 2,
                      py: 2,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: isSelected ? "warning.light" : "info.main",
                      bgcolor: isSelected ? "info.light" : "background.paper",
                      cursor: isActive ? "pointer" : "default",
                      textAlign: "center",
                      userSelect: "none",
                      transition:
                        "background-color 0.2s ease, border-color 0.2s ease",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: isSelected
                          ? "info.contrastText"
                          : isActive
                            ? "text.primary"
                            : "error.main",
                      }}
                    >
                      {format(day, "EEEE")}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontWeight: 700,
                        fontSize: 34,
                        lineHeight: 1,
                        color: isSelected
                          ? "info.contrastText"
                          : isActive
                            ? "text.primary"
                            : "error.main",
                      }}
                    >
                      {format(day, "d")}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 18,
                        color: isSelected
                          ? "info.contrastText"
                          : isActive
                            ? "text.primary"
                            : "error.main",
                      }}
                    >
                      {isActive ? `${emptyCount} نوبت خالی` : "موجود نیست"}
                    </Typography>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>

        {/* ── Next slide (left arrow in RTL layout) ── */}
        <IconButton
          size="large"
          onClick={() => swiperRef.current?.slideNext()}
          sx={{ flexShrink: 0 }}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
      </Stack>

      <Stack sx={{ alignItems: "center", mt: 3 }}>
        <Button
          variant="outlined"
          color="info"
          sx={{ px: 4, py: 1, borderRadius: 2, fontSize: 30 }}
          onClick={goToFirstEmptyDate}
        >
          اولین نوبت خالی
        </Button>
      </Stack>
    </Box>
  );
};

export { CalendarBody };
