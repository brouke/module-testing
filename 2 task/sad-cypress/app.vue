<template>
  <div class="app">
    <div class="app__head">
      <div class="app__head__info">
        <div class="app__head_logo">
        <img src="/logo.png"/>
      </div>
      <div class="app__head-select">
        <Input 
        placeholder="Поиск по имени"
        inputclass="search"
        v-model="searchName"
        />
        <Input 
        placeholder="Поиск по компании"
        inputclass="search"
        v-model="searchCompany"
        />
        <Button @click="ModalOpen = true"
        placeholder="Добавить"
        :className="'btn__add-button'"
        />
      </div>
      </div>
      <div class="app__head__quantity">
        <div>
          <p class="app__head__staff">Посетители</p>
        </div>
        <div class="app__head__counter">
          <p class="app__head__present">{{present}}</p>/<p class="app__head__absent">{{ absent }}</p>
        </div>
      </div>
    </div>
    <div class="app__body">
      <ModalsAddStaff v-if="ModalOpen"
      @close="ModalOpen = false"  
      @update ="refresh()"
    />
    <ModalsEditStaff 
      v-if="EditModalOpen"
      @close="EditModalOpen = false"  
      @update ="refresh()"
      :item="edits"
    />
    <table>
  <thead>
    <tr>
      <th>Номер</th>
      <th>ФИО</th>
      <th>Компания</th>
      <th>Группа</th>
      <th class="table__th">Присутствие</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in filteredItems" @click="edit(item)">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.company }}</td>
      <td>{{ item.group }}</td>
      <td class="table__td">
        <div class="absent" v-if="item.qauntity"></div>
        <div class="present" v-if="!item.qauntity"></div>
      </td>
    </tr>
  </tbody>
  </table>
    </div>
  <div class="app__filter">
    <p>Фильтровать по:</p>
      <Button 
        @click="filterItems('absent')"
        placeholder="Отсутствующим"
        :className="{ 'active': activeFilter === 'absent' }"
      />
      <Button 
        @click="filterItems('present')"
        placeholder="Присутствующим"
        :className="{ 'active': activeFilter === 'present' }"
      />
      <Button 
        @click="filterItems('all')"
        placeholder="Без фильтра"
        :className="{ 'active': activeFilter === 'all' }"
      />
    </div>
  </div>
</template>
<style>
@import '@/assets/scss/index.scss';
</style>
<script setup>
const searchName = ref('');
const searchCompany = ref('');
const items = ref([]);
const present = ref(null);
const absent = ref(null);
const EditModalOpen = ref(false);
const ModalOpen = ref(false);
const edits = ref([]);
const activeFilter = ref('all');

const filteredItems = computed(() => {
  return items.value.filter(item =>
    item.name.toLowerCase().includes(searchName.value.toLowerCase()) &&
    item.company.toLowerCase().includes(searchCompany.value.toLowerCase())
  );
});
function edit(item){
  edits.value = item;
  EditModalOpen.value = true;
}
function refresh(){
  items.value = JSON.parse(localStorage.getItem('items'));
  present.value = items.value.filter(item => item.qauntity).length;
  absent.value = items.value.filter(item => !item.qauntity).length;
}

onMounted(() => {
  if (localStorage.getItem('items')) {
    items.value = JSON.parse(localStorage.getItem('items'));
    present.value = items.value.filter(item => item.qauntity).length;
    absent.value = items.value.filter(item => !item.qauntity).length;
  }
  document.addEventListener('keydown', function(e) {
    if (e.key == "Escape") {
        ModalOpen.value = false;
    }
});
});
const setActiveFilter = (filter) => {
  activeFilter.value = filter;
};
  const filterItems = (filter) => {
    const tilt = JSON.parse(localStorage.getItem('items'));
  if (filter === 'all') {
    items.value = tilt;
    setActiveFilter(filter);
  } else if (filter === 'present') {
    items.value = tilt.filter(item => item.qauntity);
    setActiveFilter(filter);
  } else if (filter === 'absent') {
    items.value = tilt.filter(item => !item.qauntity);
    setActiveFilter(filter);
  }
};
</script>
