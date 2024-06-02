import { cn } from "@chrome-extension-boilerplate/shared/utils/cn";
import { Message } from "./Message";
import { MessageType } from "../types";
import LoadingAnim from "../../assets/loading.svg?react";

type MessageListPropsType = {
  className?: string,
  messages: MessageType[],
  isLoading?: boolean,
  sendMessage: (text: string) => void,
  likeMessage: (index: number, value: boolean | null) => void
};

export const MessageList = (props: MessageListPropsType) => {
  const {
    className,
    messages,
    isLoading,
    sendMessage,
    likeMessage
  } = props;
  return (
    <div className={cn('flex flex-col gap-[8px] h-full items-end overflow-y-auto', className)}>
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col gap-[8px] w-full items-end">
          <Message
            className="justify-end" 
            owner={message.owner}
            like={message.like}
            index={index}
            likeMessage={likeMessage}
          >
            {message.text}
          </Message>
        </div>
      ))}
      {messages.length === 0 && (
        <div className="flex flex-col items-center w-full text-[18px] rounded-[13px] text-black divide-y-[1px] divide-black divide-opacity-35">
          <button className="py-[14px] bg-[#FFEA66] hover:bg-[#ffcd33] w-full rounded-t-[13px]" onClick={() => sendMessage('Как открыть ИП?')}>
            Как открыть ИП?
          </button>
          <button className="py-[14px] bg-[#FFEA66] hover:bg-[#ffcd33] w-full" onClick={() => sendMessage('Как открыть ООО?')}>
            Как открыть ООО?
          </button>
          <button className="py-[14px] bg-[#FFEA66] hover:bg-[#ffcd33] w-full" onClick={() => sendMessage('Расскажи про онлайн торговлю')}>
            Расскажи про онлайн торговлю
          </button>
          <button className="py-[14px] bg-[#FFEA66] hover:bg-[#ffcd33] w-full rounded-b-[13px]" onClick={() => sendMessage('Как начать инвестировать?')}>
            Как начать инвестировать?
          </button>
        </div>
      )}
      {isLoading && (
        <div className="flex items-start w-full">
          <div className="bg-[#FFEA66] rounded-[26px] py-[10px] px-[16px]">
            <LoadingAnim className="w-[60px] h-[60px]" />
          </div>
        </div>
      )}
    </div>
  );
};