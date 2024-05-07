"use client"
import React from 'react'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useRef } from 'react';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const PSTHours = [16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const GMTHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const UTCHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

export default function page() {
    // -------------------------------------------------- timer -------
    const [startTime, setStartTime] = useState<number | null>(null);
    const [now, setNow] = useState<number | null>(null);
    const intervalRef = useRef<number | null>(null);
    // -----------------------------------------------------
    const [date, setDate] = useState(new Date());
    const [timeZone, setTimeZone] = useState('PST');
    const [hour, setHour] = useState(16);
    const [objTime, setObjTime] = useState(PSTHours)
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (timeZone == 'PST') {
            setObjTime(PSTHours)
        } else if (timeZone == 'GMT') {
            setObjTime(GMTHours)
        } else {
            setObjTime(UTCHours)
        }
    }, [timeZone])
    const onChange = (date) => {
        setDate(date);
    };

    const onTimeZoneChange = (e) => {
        setTimeZone(e.target.value);
        setIsSubmit(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
    const onHourChange = (e) => {
        setHour(e.target.value)
        setIsSubmit(false);
        // -----------
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const formatTime = (time, zone) => {
        return DateTime.fromJSDate(time, { zone }).toLocaleString(DateTime.DATETIME_MED);
    };



    // Get today's date

    function handleSubmit() {
        console.log('submit')
        setIsSubmit(true);

        // ------------- timer 
        setStartTime(Date.now());
        setNow(Date.now());

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            setNow(Date.now());
        }, 1000);


    }


    let secondsPassed = 0;
    if (startTime != null && now != null) {
        console.log('now', now)
        secondsPassed = (now - startTime) / 1000;

    }


    const today = new Date();
    return (
        <div>
            <h1>Time Zone Project</h1>


            <Calendar onChange={onChange} value={date} minDate={today} />
            <p>Selected Date: {date.toString()}</p>
            <p>{timeZone}: {formatTime(date, timeZone)}</p>
            <select name="zone" onChange={onTimeZoneChange}>
                <option value="PST">PST</option>
                <option value="GMT">GMT</option>
                <option value="UTC">UTC</option>
            </select>
            <select name="selectTime" onChange={onHourChange}>
                {
                    objTime.map(t => {
                        return <option value={t}>{t}</option>
                    })
                }

            </select>

            <button onClick={() => handleSubmit()}>Submit</button>
            {isSubmit &&
                <div>
                    <h1>meeting </h1>
                    <p>Selected Date:  {date.getDate()}</p>
                    <p>timezone : {timeZone}</p>
                    <p>hour : {hour}</p>
                    <p>remaining time : </p>
                    <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
                </div>
            }

        </div>
    )
}
