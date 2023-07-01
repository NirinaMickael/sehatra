export interface IMessage {
    conversationId ?: string,
    senderId : string,
    messages : string,
    createdAt ?: Date;
    updateAt ?: Date;
}
export interface IWritting {
    from : string | null,
     isWrite : boolean
}