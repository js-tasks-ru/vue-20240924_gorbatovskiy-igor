import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const items = getWeatherData()
    const weatherConditionIcons = WeatherConditionIcons

    const getCelsiusTemp = temp => {
      const T0 = 273.15
      const celsiusTemp = `${(temp - T0).toFixed(1)} °C`
      return celsiusTemp
    }

    const getPressure = pressure => {
      const conversionFactor = 0.75
      const convertPressure = Math.round(pressure * conversionFactor)
      return convertPressure
    }

    const isDaytime = (dt, sunrise, sunset) => {
      const dtDate = new Date(`2000-01-01 ${dt}`)
      const sunriseDate = new Date(`2000-01-01 ${sunrise}`)
      const sunsetDate = new Date(`2000-01-01 ${sunset}`)
      if (dtDate.getHours() >= sunriseDate.getHours() && dtDate.getHours() <= sunsetDate.getHours()) {
        return true
      } else return false
    }

    return {
      items,
      getCelsiusTemp,
      getPressure,
      weatherConditionIcons,
      isDaytime,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in items" class="weather-card" :class="{ 'weather-card--night': !isDaytime(item.current.dt, item.current.sunrise, item.current.sunset) }">
          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{item.alert.sender_name}}:<br>{{item.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{item.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{item.current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{weatherConditionIcons[item.current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{getCelsiusTemp(item.current.temp)}}</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{getPressure(item.current.pressure)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{item.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{item.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{item.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
