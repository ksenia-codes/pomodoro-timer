import React, { useState, createContext, FC } from "react";

interface Props {
  children?: React.ReactNode;
}

interface ITimerContext {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomos: boolean;
  longBreakInterval: number;
}

export type TimerContextType = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomos: boolean;
  longBreakInterval: number;
  updatePomodoro: (mins: number) => void;
  updateShortBreak: (mins: number) => void;
  updateLongBreak: (mins: number) => void;
  updateAutoStartBreaks: (isAuto: boolean) => void;
  updateAutoStartPomos: (isAuto: boolean) => void;
  updateLongBreakInterval: (interval: number) => void;
  updateTimerSettings: (settings: ITimerContext) => void;
};

export const TimerContext = createContext<TimerContextType>({
  pomodoro: 0,
  shortBreak: 0,
  longBreak: 0,
  autoStartBreaks: false,
  autoStartPomos: false,
  longBreakInterval: 0,
  updatePomodoro: () => {},
  updateShortBreak: () => {},
  updateLongBreak: () => {},
  updateAutoStartBreaks: () => {},
  updateAutoStartPomos: () => {},
  updateLongBreakInterval: () => {},
  updateTimerSettings: () => {},
});

export const TimerProvider: FC<Props> = ({ children }) => {
  // localStorage
  const settingsLS = localStorage.getItem("settings");
  const settingsObj = settingsLS ? JSON.parse(settingsLS).timer : "";

  // useState
  const [pomodoro, setPomodoro] = useState(settingsObj.pomodoroTime);
  const [shortBreak, setShortBreak] = useState(settingsObj.shortBreakTime);
  const [longBreak, setLongBreak] = useState(settingsObj.longBreakTime);
  const [autoStartBreaks, setAutoStartBreaks] = useState(
    settingsObj.autoStartBreaksFlg
  );
  const [autoStartPomos, setAutoStartPomos] = useState(
    settingsObj.autoStartPomosFlg
  );
  const [longBreakInterval, setLongBreakInterval] = useState(
    settingsObj.noOfPomosUntilLongBreak
  );

  // functions
  const updatePomodoro = (mins: number) => {
    setPomodoro(mins);
  };

  const updateShortBreak = (mins: number) => {
    setShortBreak(mins);
  };

  const updateLongBreak = (mins: number) => {
    setLongBreak(mins);
  };

  const updateAutoStartBreaks = (isAutoStart: boolean) => {
    setAutoStartBreaks(isAutoStart);
  };

  const updateAutoStartPomos = (isAutoStart: boolean) => {
    setAutoStartPomos(isAutoStart);
  };

  const updateLongBreakInterval = (interval: number) => {
    setLongBreakInterval(interval);
  };

  const updateTimerSettings = (settings: ITimerContext) => {
    updatePomodoro(settings.pomodoro);
    updateShortBreak(settings.shortBreak);
    updateLongBreak(settings.longBreak);
    updateAutoStartBreaks(settings.autoStartBreaks);
    updateAutoStartPomos(settings.autoStartPomos);
    updateLongBreakInterval(settings.longBreakInterval);
  };

  return (
    <TimerContext.Provider
      value={{
        pomodoro,
        shortBreak,
        longBreak,
        autoStartBreaks,
        autoStartPomos,
        longBreakInterval,
        updatePomodoro,
        updateShortBreak,
        updateLongBreak,
        updateAutoStartBreaks,
        updateAutoStartPomos,
        updateLongBreakInterval,
        updateTimerSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
