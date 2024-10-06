import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'DateString',
  setup() {
    let currentDate = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })

    return {
      currentDate,
    }
  },

  template: `<div>Сегодня {{ currentDate }}</div>`,
})

createApp(App).mount('#app')
