export interface ChatMessage {
    role: "user" | "bot";
    content: string;
}

export interface Chat {
    title: string;
    messages: ChatMessage[];
}
