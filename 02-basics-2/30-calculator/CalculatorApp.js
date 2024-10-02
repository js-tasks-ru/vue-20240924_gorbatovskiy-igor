import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    let firstOperand = ref(0)
    let secondOperand = ref(0)
    let picked = ref('')

    const calculateResult = computed(() => {
      const firstNumber = firstOperand.value
      const secondNumber = secondOperand.value

      switch (picked.value) {
        case 'sum':
          return firstNumber + secondNumber
        case 'subtract':
          return firstNumber - secondNumber
        case 'multiply':
          return firstNumber * secondNumber
        case 'divide':
          if (secondNumber === 0) {
            return 'Ошибка: деление на ноль'
          }
          return firstNumber / secondNumber
        default:
          return ''
      }
    })

    return {
      firstOperand,
      secondOperand,
      picked,
      calculateResult,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="picked" />➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="picked"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="picked"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="picked"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand" />

      <div>=</div>

      <output>{{ calculateResult }}</output>

    </div>
  `,
})
