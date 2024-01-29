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
                <Message v-for="(message, index) in chats[selectedChat].messages" :message="message" :key="index"></Message>
            </div>
        </div>
        <Request @send-message="addMessage"></Request>
    </div>
</template>

<script setup lang="ts">
import type { ChatMessage, Chat } from '@/types';
import { ref, type Ref } from 'vue'
import Message from './Message.vue'
import Request from './Request.vue'


const chats = ref<Chat[]>([])
const selectedChat: Ref<number | null> = ref(null)

function addMessage(message: ChatMessage) {
    if (selectedChat.value !== null) {
        chats.value[selectedChat.value].messages.push(message)
    } else {
        selectedChat.value = 0
        chats.value.push({
            title: '新的聊天',
            messages: []
        })
        addMessage(message)
    }
    // save
}

function createChat() {
    const chat: Chat = {
        title: '新的聊天',
        messages: []
    }
    chats.value.push(chat)
    selectedChat.value = chats.value.length - 1
}

function deleteChat(index: number) {
    chats.value.splice(index, 1)
    if (selectedChat.value === index) {
        selectedChat.value = null
    }
}

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