<template>
    <div class="App">
        <div class="App__logo">
            
        </div>
        <div class="App-button">
            <div class="App-button_add">
                <Button @click="ModalOpen = true"
                placeholder="Добавить"
                :className="'btn__add-button'"
                />
            </div>
            <div class="App-button_post">
                <Button @click="Stats"
                placeholder="Получить статистику"
                :className="'btn__add-button'"
                />
            </div>
        </div>
    </div>
</template>
<script setup>

const ModalOpen = ref(false);

</script>