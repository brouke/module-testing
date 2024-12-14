<template>
    <div :class="inputclass">
        <input :class="`${inputclass}__filter`"
        @input="(e) => emit('update:modelValue', e.target.value)"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        ></input>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    placeholder:{
        type: String,
    }, 
    inputclass:{
        type: String,
        default: 'input'
    },
    modelValue: {
        type: String,
    }
})

</script>