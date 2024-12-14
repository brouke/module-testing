<template>
    <div class="btn">
        <button
        :class="className"
        class="btn__default" 
        >{{ placeholder }}</button>
    </div>
</template>
<script setup>
const props = defineProps({
    placeholder:{
        type: String,
    }, 
    className:{
        type: String,
    },
})
</script>