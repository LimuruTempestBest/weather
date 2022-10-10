import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Icon } from '@iconify/react';
import moment from 'moment';


function App() {

  const [data, setData] = useState();
  const [pm, setPm] = useState();
  const [time, setTime] = useState();
  const [select, setSelect] = useState(2);
  const [forecast, setForecast] = useState();

  useEffect(() => {
    axios("https://api.weatherapi.com/v1/current.json?key=a14e5ecd9e6447adb5d72811220210 &q=Johor&aqi=yes").then((res) =>
      setData(res.data),
    );
  }, []);

  useEffect(() => {
    axios("https://api.weatherapi.com/v1/forecast.json?key=a14e5ecd9e6447adb5d72811220210 &q=Johor&days=5&aqi=no&alerts=no").then((res) =>
      setForecast(res.data),
    );
  }, []);



  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    })
  }, []);

  useEffect(() => {
    if (data && parseInt(data.current.air_quality.pm10) >= 0 && parseInt(data.current.air_quality.pm10) <= 50) {
      setPm("GOOD")
    }
    else {
      setPm("Moderate")
    }
  }, [data])

  useEffect(() => {
    const time = new Date();
    let hour = time.getHours();

    if (hour >= 0 && hour <= 12) {
      setTime("MORNING");
    }
    else if (hour >= 13 && hour <= 18) {
      setTime("AFTERNOON");
    }
    else {
      setTime("NIGHT")
    }
  })




  return (
    <div className="flex justify-center items-center w-full h-screen bg-stone-800 flex flex-col select-none p-10" >
      <div className="text-slate-100 font-bold text-sm md:text-xl absolute bottom-10 tracking-widest">
        Made by Daniel from MRGA
      </div>
      <div>
        {select == 2 ? (
          <div>
            <div className="flex flex-row gap-12 md:gap-24">
              <div>
                <div className="text-lg md:text-2xl font-semibold md:font-bold text-slate-100 tracking-wider">
                  {clock}
                </div>
                <div className="text-lime-400 font-semibold text-xl md:text-5xl mt-1 md:mt-2">
                  WEATHER APP
                </div>
                <div className="text-lime-700 text-xs md:text-xl font-semibold tracking-wider">
                  THE WEATHER IN YOUR CURRENT AREA
                </div>
                <div className="text-lime-400 text-xs md:text-xl font-semibold tracking-wider mt-1">
                  GOOD {time}, SIR
                </div>
                <div className="mt-5">
                  {data && (
                    <div>
                      <img className="w-12 md:w-24" src={data.current.condition.icon} />
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-center md:gap-3">
                  <div className="font-semibold text-sm md:text-xl text-lime-400 tracking-wider uppercase mt-3 md:mt-5">
                    WEATHER CONDITION:
                  </div>
                  {data && (
                    <div className="font-semibold text-sm md:text-xl text-slate-100 tracking-wider uppercase mt-3 md:mt-5">
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
                      FEELS LIKE  {data.current.feelslike_c} °
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
                  <div className="text-lime-400 font-bold tracking-widest text-xs md:text-xl">
                    CLOUDY: {data.current.cloud}%
                  </div>
                )}
                {data && (
                  <div className="text-lime-400 font-bold tracking-widest text-xs md:text-xl">
                    HUMIDITY: {data.current.humidity}%
                  </div>
                )}
                <div className="text-lime-400 font-bold tracking-widest text-xs md:text-xl">
                  WIND SPEED:
                </div>
                {data && (
                  <div className="text-lime-400 font-bold tracking-widest text-xs md:text-xl">
                    {data.current.wind_kph} km/h
                  </div>
                )}
                <div className="text-slate-100 font-semibold text-lg md:text-3xl tracking-wider mt-5">
                  AIR QUALITY
                </div>
                {data && (
                  <div className="text-lime-400 font-bold tracking-widest text-xs md:text-xl mt-3">
                    PM 2.5 : {Math.floor(data.current.air_quality.pm2_5)} ({pm})
                  </div>
                )}
                {data && (
                  <div className="text-lime-400 font-bold tracking-widest text-xs md:text-xl">
                    PM 1 0 : {Math.floor(data.current.air_quality.pm10)} ({pm})
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 mt-4">
              <button onClick={() => setSelect(1)}>
                <Icon className="text-lg md:text-2xl text-slate-100 hover:text-rose-400 duration-200" icon="bi:arrow-right-square-fill" />
              </button>
              <div className="text-slate-100 text-xs md:text-lg font-semibold tracking-wider">
                WEATHER FORECAST
              </div>
            </div>
          </div>) : (


          <div>
            <div className="text-lg md:text-2xl font-semibold md:font-bold text-slate-100 tracking-wider">
              {clock}
            </div>
            <div className="text-lime-400 text-xl md:text-5xl font-semibold tracking-wider mt-2">
              WEATHER FORECAST
            </div>
            <div className="flex flex-row items-center gap-5 md:gap-10 mt-10 md:mt-16">
              {data && (
                <div className="text-rose-400 font-semibold tracking-widest text-xs md:text-xl">
                  {forecast.forecast.forecastday[1].date}
                </div>
              )}
              {data && (
                <div className="text-slate-400 font-bold tracking-widest text-xs md:text-xl ">
                  {forecast.forecast.forecastday[1].day.condition.text}
                </div>
              )}
              {data && (
                <div className="text-slate-400 font-bold tracking-widest text-xs md:text-xl">
                  <img className="w-8 md:w-10" src={forecast.forecast.forecastday[1].day.condition.icon} />
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-5 md:gap-10 mt-5">
              {data && (
                <div className="text-rose-400 font-semibold tracking-widest text-xs md:text-xl">
                  {forecast.forecast.forecastday[2].date}
                </div>
              )}
              {data && (
                <div className="text-slate-400 font-bold tracking-widest text-xs md:text-xl">
                  {forecast.forecast.forecastday[2].day.condition.text}
                </div>
              )}
              {data && (
                <div className="text-slate-400 font-bold tracking-widest text-xs md:text-xl">
                  <img className="w-8 md:w-10" src={forecast.forecast.forecastday[2].day.condition.icon} />
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-5 md:gap-10 mt-5">
              {data && (
                <div className="text-rose-400 font-semibold tracking-widest text-xs md:text-xl">
                  {forecast.forecast.forecastday[3].date}
                </div>
              )}
              {data && (
                <div className="text-slate-400 font-bold tracking-widest text-xs md:text-xl">
                  {forecast.forecast.forecastday[3].day.condition.text}
                </div>
              )}
              {data && (
                <div className="text-slate-400 font-bold tracking-widest text-xs md:text-xl">
                  <img className="w-8 md:w-10" src={forecast.forecast.forecastday[3].day.condition.icon} />
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-5 md:gap-10 mt-5">
              {data && (
                <div className="text-rose-400 font-semibold tracking-widest text-xs md:text-xl">
                  {forecast.forecast.forecastday[4].date}
                </div>
              )}
              {data && (
                <div className="text-slate-400 font-bold tracking-widest text-xs md:text-xl">
                  {forecast.forecast.forecastday[4].day.condition.text}
                </div>
              )}
              {data && (
                <div className="text-slate-400 font-bold tracking-widest text-xs md:text-xl">
                  <img className="w-8 md:w-10" src={forecast.forecast.forecastday[4].day.condition.icon} />
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-2 mt-10">
              <button onClick={() => setSelect(2)}>
                <Icon className="text-lg md:text-2xl text-slate-100 hover:text-rose-400 duration-200" icon="bi:arrow-left-square-fill" />
              </button>
              <div className="text-slate-100 text-xs md:text-lg font-semibold tracking-wider">
                BACK TO LAST PAGE
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-5 left-5 flex flex-col text-lg md:text-2xl gap-3 md:gap-5 text-slate-100">
          <a href="https://www.youtube.com/channel/UCQrCDpJ64I4rDXwcptkYWyA" className="rotate-90 hover:text-pink-400 duration-200">
            <Icon icon="akar-icons:youtube-fill" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100069344944940" className="rotate-90 hover:text-pink-400 duration-200">
            <Icon icon="brandico:facebook-rect" />
          </a>
          <a href="https://github.com/LimuruTempestBest" className="rotate-90 hover:text-pink-400 duration-200">
            <Icon icon="fa:github-square" />
          </a>
        </div>
      </div>
    </div>
  )

}

export default App