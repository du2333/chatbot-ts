<template>
    <div class="storage"></div>
</template>

<script setup lang="ts">
import type { Chat } from '@/types';
import { onMounted } from 'vue';

const emit = defineEmits<
    (e: 'chatLoaded', chats: Chat[]) => void
>()

function saveSelectedChat(selectedChat: number, chat: Chat) {
    localStorage.setItem(`chat-${selectedChat}`, JSON.stringify(chat))
}

function loadSelectedChat(selectedChat: number): Chat | null {
    const chat = localStorage.getItem(`chat-${selectedChat}`)
    return chat ? JSON.parse(chat) : null
}

function deleteSelectedChat(selectedChat: number) {
    if (localStorage.getItem(`chat-${selectedChat}`)) {
        localStorage.removeItem(`chat-${selectedChat}`)
    }
}

onMounted(() => {
    const storedChats: Chat[] = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('chat-')) {
            const index = Number(key.substring(5))
            const chat = loadSelectedChat(index)
            if (chat) {
                //保持消息的原始顺序
                storedChats.splice(index, 0, chat)
            }
        }
    }
    emit('chatLoaded', storedChats)
})
defineExpose({
    saveSelectedChat,
    deleteSelectedChat
})
</script>

<style scoped>
.storage {
    display: none;
}
</style>