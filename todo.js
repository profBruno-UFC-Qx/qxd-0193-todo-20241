const { ref, computed, createApp } = Vue

const app = createApp({
  setup() {
    
  const tasks = ref([])

  const nConcluidas = computed(() => tasks.value.filter((item) => item.concluded === false))
  const concluidas = computed(() => tasks.value.filter((item) => item.concluded === true))

  function addTask(task) {
    tasks.value.push({
      id: tasks.value.length + 1,
      description: task.description,
      categoria: task.categoria,
      concluded: task.concluded
    })
  }

  function remove(id) {
    const pos = tasks.value.find((item) => item.id == id)
    if(pos != -1) {
      tasks.value.splice(pos, 1)
    }
  }

    return {
      tasks, concluidas, nConcluidas, addTask, remove
    }
  }
})

app.component('task-form', {
  emit: ['add'],
  setup(_, { emit }) {
    const categorias = ref([
      'Estudo', 'Lazer', 'Trabalho', 'Leitura'
    ])

    const inputDescription = ref('')
    const selectCategoria = ref('')
    const isEmpty = computed(() => inputDescription.value.length === 0 )

    function askToAdd() {
      emit('add', {
        description: inputDescription.value,
        categoria: selectCategoria.value,
        concluded: false
      })

      inputDescription.value = ""
    }

    return {
      inputDescription, selectCategoria, isEmpty, categorias, askToAdd
    }
  },
  template: `
      <form @submit.prevent="askToAdd">
      <label>
        Descrição:
        <input type="text" v-model="inputDescription"> 
      </label>
      <label>
        Categoria:
        <select v-model="selectCategoria">
          <option v-for="cat in categorias" :value="cat">
            {{ cat }}
          </option>
        </select> 
      </label>
      <input type="submit" :disabled="isEmpty">
    </form>
  `
})

app.component('task-list', {
  props: ['description', 'empty', 'tasks'],
  template: `
    <div>
      <h2> {{ description }} </h2>
      <ul v-if="tasks.length > 0">
        <slot></slot>
      </ul>
      <p v-else>
        {{ empty }}
      </p>
    </div>
  `
})

app.component('task-item', {
  props: ['id', 'description', 'categoria', 'concluded'],
  emit: ['delete', 'change'],
  setup(props, { emit }){
    function askToRemove() {
      emit('delete', props.id)
    }
    
    return { askToRemove }
  },
  template: `
  <li>
    {{ description }} - {{ categoria }}
    <input type="checkbox" @change="concluded = !concluded" :checked="concluded">
    <button @click="askToRemove"> Remover </button>
  </li>`
})

app.mount('#app')
