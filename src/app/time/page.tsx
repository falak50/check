"use client"
import React from 'react'
import { useState, useRef } from 'react';
export default function page() {
    const [meetingTime, setMeetingTime] = useState<Date | null>(null);
    const [now, setNow] = useState<number | null>(null);
    const intervalRef = useRef<number | null>(null);

    function handleStart() {
        setNow(Date.now());

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            setNow(Date.now());
        }, 10);
    }

    function handleStop() {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        console.log('submit')
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const meetingDate = formData.get('meeting-date') as string;
        const meetingTime = formData.get('meeting-time') as string;

        const [year, month, day] = meetingDate.split('-').map((item) => parseInt(item));
        const [hours, minutes] = meetingTime.split(':').map((item) => parseInt(item));
        const meetingDateTime = new Date(year, month - 1, day, hours, minutes);
        setMeetingTime(meetingDateTime);
    }

    let remainingTime: number | null = null;
    console.log('remain', remainingTime);
    if (meetingTime && now) {
        remainingTime = Math.max(0, (meetingTime.getTime() - now) / 1000);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Meeting Date:
                    <input type="date" name="meeting-date" required />
                </label>
                <br />
                <label>
                    Meeting Time:
                    <input type="time" name="meeting-time" required />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            {
                <h1>remaining  {remainingTime}</h1>
            }
            {remainingTime !== null && (
                <>
                    <h1>Time until meeting: {(remainingTime / 3600).toFixed(2)} hours</h1>
                    <button onClick={handleStart}>Start</button>
                    <button onClick={handleStop}>Stop</button>
                </>
            )}
        </>
    )
}
