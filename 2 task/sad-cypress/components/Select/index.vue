<template>
    <div :class="class" @click.self="optionsGroup = false">
        <div class="name" @click="optionsGroup = !optionsGroup">
            <p calss="name__title">{{ name }}</p>
            <img src="/public/dropdown.png"/>
        </div>
        <div class="options" v-if="optionsGroup == true">
            <p class="options__label"
            @click="emit('update:modelValue', info.label), optionsGroup = false"
            v-for="info in group">
                {{ info.label }}
            </p>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
    group: {
        type: Array,
    },
    placeholder:{
        type: String,
    }, 
    class:{
        type: String,
    },
    name:{
        type: String,
    }
})

const optionsGroup = ref(false);
const emit = defineEmits(['update:modelValue'])
</script>