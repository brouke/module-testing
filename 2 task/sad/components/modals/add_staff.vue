<template>
  <div
    class="modal"
    ref="email"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <div class="modal__info">
      <div class="modal__close">
        <ButtonClose @click="$emit('close')" />
      </div>
      <div class="modal__form">
        <div class="modal__form-input">
          <p>ФИО</p>
          <Input v-model="staff.name" @blur="validateField('name')" placeholder="ФИО" />
          <span v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div class="modal__form-input">
          <p>Компания</p>
          <Input v-model="staff.company" @blur="validateField('company')" placeholder="Компания" />
          <span v-if="errors.company">{{ errors.company }}</span>
        </div>
        <div class="modal__form-input">
          <p>Группа</p>
          <Select
            :name="staff.group"
            v-model="staff.group"
            class="select"
            :group="nameGroup"
            @blur="validateField('group')"
          />
          <span v-if="errors.group">{{ errors.group }}</span>
        </div>
        <div class="modal__form-checkbox">
          <p>Присутствие</p>
          <Checkbox v-model="staff.qauntity" />
        </div>
      </div>
      <div class="modal__form-button">
        <Button
          placeholder="Сохранить"
          @click="submit()"
          :className="'btn__add-button'"        
          />
        <Button
          @click="$emit('close')"
          placeholder="закрыть"
          :className="'btn__close-button'"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(["close", "update"]);
const nameGroup = ref([
    { label: "Прохожий" },
    { label: "Клиент" },
    { label: "Партнер" },
  ]);
const staff = reactive({
  id: null,
  name: "",
  company: "",
  group: "Выбрать",
  qauntity: false,
});
const items = ref([]);
const errors = reactive({
  name: "",
  company: "",
  group: "",
});

const validateName = () => {
  if (!staff.name) {
    errors.name = "Поле не должно быть пустым";
  } else {
    errors.name = "";
  }
};

const validateCampany = () => {
  if (!staff.company) {
    errors.company = "Поле не должно быть пустым";
  } else {
    errors.company = "";
  }
};

const validateGroup = () => {
  if (staff.group == 'Выбрать') {
    errors.group = "Поле не должно быть пустым";
  } else {
    errors.group = "";
  }
};

const validateForm = () => {
  validateName();
  validateCampany();
  validateGroup();
  return !errors.name && !errors.company && !errors.group;
};

const validateField = (field) => {
  switch (field) {
    case "name":
      validateName();
      break;
    case "company":
      validateCampany();
      break;
    case "group":
      validateGroup();
      break;
    default:
      break;
  }
};

const submit = () => {
  if (validateForm()) {
    const newItem = {
    id: items.value.length ? items.value[items.value.length - 1].id + 1 : 1,
    name: staff.name,
    company: staff.company,
    group: staff.group,
    qauntity: staff.qauntity,
  };
  items.value.push(newItem);
  localStorage.setItem('items', JSON.stringify(items.value));
  staff.name = "";
  staff.company = "";
  staff.group = 'Выбрать';
  staff.qauntity = false;
    emit("update");
  }
};

const loadItemsFromLocalStorage = () => {
  const storedItems = localStorage.getItem('items');
  if (storedItems) {
    items.value = JSON.parse(storedItems);
  }
};

onMounted(() => {
  loadItemsFromLocalStorage();
});
</script>
