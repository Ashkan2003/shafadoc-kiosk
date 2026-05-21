# Reservation System – Calendar Implementation Guide

This document explains **how the reservation calendar works** in `src/features/Reservation`, including component flow, date rendering logic, day selection behavior, calendar footer behavior, URL/query sync, and the current state management approach (Reservation Context + Redux presence).

---

## 1) Where the calendar lives

Main calendar stack:

- `components/ReservationContainer/components/ReservationItem/components/Calendar/index.tsx`
- `components/ReservationContainer/components/ReservationItem/components/Calendar/components/CalendarHeader/index.tsx`
- `components/ReservationContainer/components/ReservationItem/components/Calendar/components/CalendarBody/index.tsx`
- `components/ReservationContainer/components/ReservationItem/components/Calendar/components/CalendarFooter/index.tsx`
- `components/ReservationContainer/components/ReservationItem/components/Calendar/components/CalendarFooter/components/TimeContainer/index.tsx`
- `components/ReservationContainer/components/ReservationItem/components/Calendar/components/CalendarFooter/components/TimeContainer/components/TimeItem/index.tsx`
- `hooks/useCalendar/index.ts`
- `context/ReservationContext.tsx`
- `state/reservationSlice.ts` (Redux slice exists, but the calendar runtime logic mostly uses context local state)

---

## 2) Data contract used by the calendar

At runtime, `Calendar` receives `mycalendardata` (array of day schedule objects). Each schedule is expected to include fields used in selection logic:

- `id` (calendar day id)
- `date` (day date string)
- `start_time`, `end_time` (daily frame)
- `times` (JSON string for time slots; parsed in day selection)
- `reserve_types.online` (used as displayed available count)
- optional `serviceList` (used when selecting a specific time slot)

When a day is selected, the calendar persists these in state/query params and uses them downstream.

---

## 3) State architecture (important for another AI)

### 3.1 Reservation Context (active runtime source of truth)

`ReservationProvider` exposes:

- `reservationState` / `setReservationState` (React `useState` object for selection UI)
- reducer-driven shared data (`calendarData`, `doctor_info`, `patientData`, loading flags)

The **calendar interactions** currently rely on `reservationState` keys such as:

- `selectedDay`
- `selectedDayObj`
- `availableTimes`
- `timeFrame`
- `selectedTime`
- `selectedAppointmentId`
- `selectedService`

### 3.2 Redux slice

`reservationSlice.ts` defines static appointment-shaped data and `setReservationData`. In current calendar flow, the interactive day/time selection is **not** primarily writing to this Redux slice; it updates `reservationState` in `ReservationContext` plus URL search params.

If you extend this system and need strict Redux updates, mirror context updates into Redux actions at the same click points (`handleSelect` day, `TimeItem` time).

---

## 4) Month rendering logic (`useCalendar`)

`useCalendar` is responsible for month/day generation:

1. Initializes `currMonth` with current Jalali month formatted as `MMMM-yyyy`.
2. Parses `currMonth` into `firstDayOfMonth`.
3. Computes `isSameMonth` (current viewed month vs today’s month).
4. Computes `daysInMonth` using `eachDayOfInterval`:
   - If viewed month is current month: start from today.
   - Else: start from first day of selected month.
   - End at `endOfMonth(firstDayOfMonth)`.
5. Exposes `getPrevMonth`, `getNextMonth`, `goNextMonth`, and `setCurrMonth`.
6. Calculates `firstEmptyDate` via `getFirstEmptyAppointment(...)` + `getDateInfoFs(...).jalaliDate`.

**Impact:** in current month, past days are not rendered (starts from today).

---

## 5) Top-level calendar orchestration (`Calendar/index.tsx`)

`Calendar` handles:

- Hooking `useCalendar` and passing generated `daysInMonth` to body.
- Ensuring URL has `step` (defaults to `ReservationSteps.PICK_TIME`).
- Clearing `selectedTime` search param whenever state has no selected time.
- Patient id bootstrap:
  - Reads `patientId` from URL.
  - Fallback to `localStorage.siteUserId`.
  - Writes patient id back to URL if missing.
- Defines `defaultDate = query.defaultDate || firstEmptyDate`.
- Provides `targetRef` + `onScrollToTimes()` for auto scrolling from day card click toward footer time section.

---

## 6) Day rendering and selection (`CalendarBody/index.tsx`)

### 6.1 Rendering days of month

`daysInMonth.map(...)` renders `DayItemContainer` for each day inside a `Carousel`.

Each `DayItemContainer` calculates:

- `selectedSchedule = getScheduleForDay(day)` (match by `isSameDay(new Date(schedule.date), day)`)
- `isAvailable = !!selectedSchedule`
- `isFullyBooked = selectedSchedule?.times && JSON.parse(selectedSchedule.times)?.length === 0`
- `isSelected = selectedDay && getDate(selectedDay) === getDate(day)`
- `emptyCount = selectedSchedule?.reserve_types?.online || 0`

`DateItem` receives those flags and click callback.

### 6.2 What happens when a day is selected

`handleSelect(day)` does all of these:

1. Finds `selectedSchedule` for clicked day.
2. Clears previously selected time search param.
3. Sets query params:
   - `calendarId`
   - `selectedDay`
   - `start_time`
   - `end_time`
4. Updates context state:
   - `selectedTime: null` (reset time on day change)
   - `selectedDay: day.toString()`
   - `selectedDayObj: selectedSchedule`
   - `timeFrame: { start_time, end_time }`
   - `availableTimes: JSON.parse(selectedSchedule.times)` or `null`

### 6.3 Auto default day logic

On mount:

- `goToSelectedDaySlide(defaultDate, carouselRef, daysInMonth)` moves carousel to default date.
- Converts Jalali `defaultDate` to Gregorian via `shamsiToMiladi(defaultDate)` and auto-selects that date via `handleSelect(...)`.

### 6.4 First available day button

Button `"اولین نوبت خالی این ماه"`:

- Scans `daysInMonth` for first day with any matching schedule.
- Moves carousel to that slide.
- Calls `handleSelect(matchingDay)`.
- Shows error toast if no schedule exists in viewed month.

---

## 7) Calendar footer behavior after day selection

`CalendarFooter` reads from context:

- `availableTimes`
- `timeFrame`
- `selectedDay`

### 7.1 When `availableTimes === null`

Footer shows only the doctor presence time frame (start/end) and no slot list.

### 7.2 When `availableTimes !== null`

- If no day selected: message `"لطفا روز را انتخاب کنید"`.
- If day selected:
  - Categorizes slot times into:
    - Morning (05:00–12:00)
    - Midday (12:01–16:30)
    - Afternoon/Night (rest)
  - Renders 3 side-by-side sections (صبح / ظهر / عصر و شب).
  - Each section uses `TimeContainer`.

### 7.3 Time slot rendering (`TimeContainer`)

- Iterates time list and renders `TimeItem` per slot.
- Converts `item.is_reserved` from string/boolean to boolean flag.
- If no items in category, shows category-specific empty message.

### 7.4 What happens when a time is clicked (`TimeItem`)

If slot is **not reserved**:

1. Toggles selected time (`selectedTime` becomes slot id or null if re-clicked).
2. Saves into context:
   - `selectedTime`
   - `selectedAppointmentId`
   - `selectedService` (looked up in `selectedDayObj.serviceList` by `appointmentId`)
3. Sets query params:
   - `selectedTime`
   - `selectedAppointmentId`

If slot **is reserved**:

- No state update.
- Shows toast error (`"این ساعت رزرو شده است"`).

---

## 8) URL search params used as secondary state

Current calendar writes/reads several params:

- `step`
- `patientId`
- `defaultDate`
- `calendarId`
- `selectedDay`
- `start_time`
- `end_time`
- `selectedTime`
- `selectedAppointmentId`

This means refresh/deep-link behavior partially depends on query string. Keep this in sync whenever you refactor state.

---

## 9) Utility behaviors

From `CalendarBody/utils`:

- `goToSelectedDaySlide(jalaliDate, carouselRef, daysInMonth)`:
  - Parses Jalali date (`yyyy/MM/dd`) and moves carousel to matching day index.
- `goToSelectedMonthSlide(jalaliDate, setCurrMonth)`:
  - Derives Gregorian month from Jalali date and sets `currMonth` string.
  - In `Calendar/index.tsx`, usage is currently commented out.

---

## 10) Implementation notes for another AI

If another AI re-implements or ports this section, preserve these behaviors exactly:

1. **Month generation rule:** current month starts from today; future months start day 1.
2. **Day click resets time selection** and updates both context + URL params.
3. **Footer mode switch:**
   - `availableTimes === null` => show only start/end presence frame.
   - array value => categorize and render slots.
4. **Reserved slot guard:** do not allow selecting reserved times.
5. **Default date flow:** move carousel to `defaultDate` and auto-select it on mount.
6. **First available button:** selects first day with schedule in viewed month.
7. **Patient bootstrap from URL/localStorage** should remain if the reservation flow depends on it.

---

## 11) Suggested improvement path (optional)

For cleaner maintainability:

- Unify source of truth (Context vs Redux). Today the reservation interactive selection lives in context and query params; Redux slice is mostly disconnected from this flow.
- Replace `day.toString()` with ISO date serialization to avoid locale/parsing instability.
- Normalize API data once (e.g., parse `times` at fetch boundary) to avoid repeated JSON parsing during render.
- Add explicit TypeScript interfaces for schedule/time objects used in `mycalendardata`.
