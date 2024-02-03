<template>
    <div class="chat-wrap">
        <div class="chat-list">
            <div class="chat-controls">
                <button @click="createChat">新的对话</button>
            </div>
            <div class="chat-item" :class="selectedChat == index ? 'selected' : ''" v-for="(chat, index) in chats"
                :key="index" @click="selectedChat = index">
                <h3>{{ chat.title }}</h3>
                <button @click.stop="deleteChat(index)">X</button>
            </div>
        </div>

        <div class="chat" v-if="selectedChat !== null">
            <h2>请开始你的表演</h2>
            <div class="message-container">
                <messageComponent v-for="(message, index) in chats[selectedChat].messages" :message="message" :key="index"></messageComponent>
            </div>
        </div>
        <requestComponent @send-message="addMessage"></requestComponent>
        <storageComponent @chat-loaded="chats = $event" ref="storageRef"></storageComponent>
    </div>
</template>

<script setup lang="ts">
import type { ChatMessage, Chat } from '@/types';
import { ref, onMounted, type Ref } from 'vue'
import messageComponent from './Message.vue'
import requestComponent from './Request.vue'
import storageComponent from './Storage.vue'


const chats = ref<Chat[]>([])
const selectedChat: Ref<number | null> = ref(null)
const storageRef: Ref<InstanceType<typeof storageComponent> | null> = ref(null)

function addMessage(message: ChatMessage) {
    if (selectedChat.value !== null) {
        chats.value[selectedChat.value].messages.push(message)
    } else {
        createChat()
        addMessage(message)
    }
    storageRef.value?.saveChat(chats.value)
}

function createChat() {
    const chat: Chat = {
        id: Date.now(),
        timestamp: Date.now(),
        title: '新的聊天',
        messages: []
    }
    chats.value.push(chat)
    selectedChat.value = chats.value.length - 1
}

function deleteChat(index: number) {
    if (confirm('确定要删除吗？')) {
        chats.value.splice(index, 1)
        if (selectedChat.value === index) {
            selectedChat.value = null
        }
    }
    if (chats.value.length === 0) {
        createChat()
    }
}

onMounted(() => {
    if (chats.value.length === 0) {
        createChat()
    }
})
</script>

<style scoped>
.chat-wrap {
    display: flex;
}

.chat-list {
    width: 25%;
}

.chat-controls {
    display: flex;
    justify-content: flex-end;
}

.chat {
    width: 75%;
}

.selected {
    background-color: #d67676;
}
</style>