<template>
  <input type="checkbox" v-model="model" :value="value" />
</template>

<script setup >
import { computed, defineEmits } from "vue";
const props = defineProps({
  modelValue: { type: [Array, Boolean],
    defoult: false,
   },
  value: { type: [Boolean, Object] },
});
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>