const { ref, computed, createApp } = Vue

createApp({
  setup() {
    const categorias = ref([
      'Estudo', 'Lazer', 'Trabalho', 'Leitura'
    ])
    
  const tasks = ref([])

  const inputDescription = ref('')
  const selectCategoria = ref('')
  const isEmpty = computed(() => inputDescription.value.length === 0 )

  const nConcluidas = computed(() => tasks.value.filter((item) => item.concluded === false))
  const concluidas = computed(() => tasks.value.filter((item) => item.concluded === true))

  function addTask() {
    tasks.value.push({
      id: tasks.value.length + 1,
      description: inputDescription.value,
      categoria: selectCategoria.value,
      concluded: false
    })
    inputDescription.value = ""
  }

  function remove(id) {
    const pos = tasks.value.find((item) => item.id == id)
    if(pos != -1) {
      tasks.value.splice(pos, 1)
    }
  }
    return {
      tasks, categorias, inputDescription, selectCategoria, isEmpty, concluidas, nConcluidas, addTask, remove
    }
  }
}).mount('#app')
