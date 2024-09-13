import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    let counter = ref(0)
    const minValue = 0
    const maxValue = 5
    const incrementCounter = () => {
      return counter.value++
    }

    const decrementCounter = () => {
      return counter.value--
    }

    return { counter, minValue, maxValue, incrementCounter, decrementCounter }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
         @click='decrementCounter'
         :disabled="counter <= minValue"
      >➖</button>

      <span class="count" data-testid="count">{{counter}}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click='incrementCounter'
         :disabled="counter >= maxValue"
      >➕</button>
    </div>
  `,
})
