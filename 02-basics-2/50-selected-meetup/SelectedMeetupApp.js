import { defineComponent, ref, watch, onMounted } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const numbers = ref([1, 2, 3, 4, 5])
    const title = ref('')
    const selectedId = ref(numbers.value[0])

    onMounted(async () => {
      const data = await getMeetup(selectedId.value)
      title.value = data.title
    })

    watch(selectedId, async (newId, oldId) => {
      if (newId) {
        const data = await getMeetup(newId)
        title.value = data.title
      }
    })

    const incrementId = () => {
      selectedId.value++
    }

    const decrementId = () => {
      selectedId.value--
    }

    return {
      numbers,
      title,
      selectedId,
      incrementId,
      decrementId,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" @click="decrementId" :disabled="selectedId === 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup" v-for="number in numbers" >
          <div class="radio-group__button">
            <input
              :id="'meetup-id-' + number"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="number"
              v-model="selectedId"
            />
            <label :for="'meetup-id-' + number" class="radio-group__label">{{ number }}</label>
          </div>

        </div>

        <button class="button button--secondary" type="button" @click="incrementId" :disabled="selectedId === 5">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ title }}</h1>
        </div>
      </div>

    </div>
  `,
})
