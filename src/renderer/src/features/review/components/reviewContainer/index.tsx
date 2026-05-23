import { useAppDispatch, useAppSelector } from "@renderer/lib/redux/hooks";
import { setStep } from "@renderer/lib/redux/slices/reservationSlice";
import { useEffect } from "react";

const ReviewContainer = () => {
  const reservationDetail = useAppSelector((state) => state.reservation);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setStep(3));
  }, [dispatch]);

  return <div>{reservationDetail.selectedDoctor?.full_name}</div>;
};

export default ReviewContainer;
