export interface ChatMessage {
    role: "user" | "bot";
    content: string;
}

export interface Chat {
    id: number;
    timestamp: number;
    title: string;
    messages: ChatMessage[];
}
