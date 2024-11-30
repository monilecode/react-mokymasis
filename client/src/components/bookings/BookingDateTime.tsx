import Calendar from "react-calendar";
import { useState } from "react";
import { add, format } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "./BookingDateTime.Calendar.scss";
import { Button } from "../abstracts/Button";
import classNames from "classnames";
import styles from "./BookingDateTime.module.scss";

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

export const BookingDateTime = () => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const getTimes = () => {
    if (!date.justDate) return;

    const { justDate } = date;

    const start = add(justDate, { hours: 9 });
    const end = add(justDate, { hours: 20 });
    const interval = 60;

    const times = [];
    for (let i = start; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }
    return times;
  };

  const times = getTimes();

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>Book an Service</h3>
        <p className={styles.text}>
          Select Date and Time slot to book a service
        </p>
        <p className={styles.selectDate}>Select Date</p>
      </div>
      <div className="calendar-container">
        <Calendar
          minDate={new Date()}
          view="month"
          onChange={(selectedDate) =>
            setDate((prev) => ({
              ...prev,
              justDate: selectedDate as Date,
            }))
          }
        />
      </div>
      <div>
        <p className={styles.selectTime}>Select Time Slot</p>
        <div className={styles.dateTimesContainer}>
          <div className={styles.timesWrapper}>
            {times?.map((time, index) => (
              <div key={index} className={styles.times}>
                <button
                  type="button"
                  onClick={() => {
                    setDate((prev) => ({
                      ...prev,
                      dateTime: time,
                    }));
                  }}
                  className={classNames(styles.timeButton, {
                    [styles.active]:
                      date.dateTime?.getTime() === time.getTime(),
                  })}
                >
                  {format(time, "kk:mm")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bookButtonContainer}>
        <Button
          onClick={() => console.log("booked")}
          className={styles.bookButton}
          type="button"
          text="Book"
        />
      </div>
    </div>
  );
};
