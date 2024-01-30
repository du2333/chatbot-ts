<template>
    <div class="storage"></div>
</template>

<script setup lang="ts">
import type { Chat } from '@/types';
import { onMounted } from 'vue';

const emit = defineEmits(['chatLoaded'])

function saveChat(chat: Chat[]) {
    localStorage.setItem('chats', JSON.stringify(chat))
}

function loadChat() {
    const chat = localStorage.getItem('chats')
    if (chat) {
        return JSON.parse(chat)
    }
    return []
}

onMounted(() => {
    emit('chatLoaded', loadChat())
})
defineExpose({
    saveChat
})
</script>

<style scoped>
.storage {
    display: none;
}
</style>