import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Icon } from '@iconify/react';



function App() {

  const [data, setData] = useState();

  useEffect(() => {
    axios("https://api.weatherapi.com/v1/current.json?key=a14e5ecd9e6447adb5d72811220210 &q=Johor&aqi=yes").then((res) =>
      setData(res.data),
    );
  }, []);


  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    })
  }, []);

  return (
      <div className="flex justify-center items-center w-full h-screen bg-stone-800 flex flex-col select-none p-10" >
        <div className="flex flex-row gap-12 md:gap-24">
          <div>
            <div className="text-lg md:text-2xl font-semibold md:font-bold text-slate-100 tracking-wider">
              {clock}
            </div>
            <div className="text-lime-400 font-semibold text-2xl md:text-5xl mt-1 md:mt-2">
              WEATHER APP
            </div>
            <div className="text-lime-700 text-base md:text-xl font-semibold tracking-wider">
              THE WEATHER IN YOUR CURRENT AREA
            </div>
            <div className="mt-5">
              {data && (
                <div>
                  <img className="w-12 md:w-24" src={data.current.condition.icon} />
                </div>
              )}
            </div>
            <div className="flex flex-row items-center md:gap-3">
              <div className="font-semibold text-sm md:text-xl text-lime-400 tracking-wider uppercase mt-2 md:mt-5">
                WEATHER CONDITION:
              </div>
              {data && (
                <div className="font-semibold text-sm md:text-xl text-slate-100 tracking-wider uppercase mt-2 md:mt-5">
                  {data.current.condition.text}
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-3 mt-2">
              <div className="text-slate-100 text-lg md:text-2xl text-rose-400">
                <Icon icon="akar-icons:location" />
              </div>
              {data && (
                <div className="text-lg md:text-2xl font-semibold md:font-bold text-slate-100 text-lime-400">
                  {data.location.region}
                </div>
              )}
            </div>

            <div>
              {data && (
                <div className="text-slate-100 font-semibold md:font-bold text-sm md:text-xl tracking-wider text-slate-100">
                  FELLS LIKE  {data.current.feelslike_c} °
                </div>
              )}
            </div>

            <div>
              {data && (
                <div className="font-semibold md:font-bold text-sm md:text-xl text-slate-100 tracking-wider text-lime-400 mt-2">
                  CURRENT TEMPERATURE: {data.current.temp_c} °
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 md:gap-3">
            {data && (
              <div className="text-slate-100 font-semibold text-lg md:text-3xl tracking-wider mb-3 md:mb-5">
                WEATHER DETAILS
              </div>
            )}

            {data && (
              <div className="text-lime-400 font-bold tracking-widest text-sm md:text-xl">
                CLOUDY: {data.current.cloud}%
              </div>
            )}
            {data && (
              <div className="text-lime-400 font-bold tracking-widest text-sm md:text-xl">
                HUMDITY: {data.current.humidity}%
              </div>
            )}
            <div className="text-lime-400 font-bold tracking-widest text-sm md:text-xl">
              WIND SPEED:
            </div>
            {data && (
              <div className="text-lime-400 font-bold tracking-widest text-sm md:text-xl">
                {data.current.wind_kph} km/h
              </div>
            )}
            <div className="text-slate-100 font-semibold text-lg md:text-3xl tracking-wider mb-3 md:mb-5">
              AIR QUALITY
            </div>
            {data && (
              <div className="text-lime-400 font-bold tracking-widest text-sm md:text-xl">
                PM2.5: {Math.floor(data.current.air_quality.pm2_5)} (Good)
              </div>
            )}
            {data && (
              <div className="text-lime-400 font-bold tracking-widest text-sm md:text-xl">
                PM10 : {Math.floor(data.current.air_quality.pm10)} (Good)
              </div>
            )}
          </div>
        </div>
        <div className="text-slate-100 font-bold text-xl absolute bottom-10 tracking-widest">
          Made by Daniel from MRGA
        </div>
      </div>
  )
}

export default App