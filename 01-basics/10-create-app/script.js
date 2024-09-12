import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'DateString',
  setup() {},
  template: `<div>Сегодня ${new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })}</div>`,
})

createApp(App).mount('#app')
