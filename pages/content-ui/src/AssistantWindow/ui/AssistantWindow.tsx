import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import ArrowUpIcon from '../../assets/arrow-up.svg?react';
import MicrophoneIcon from '../../assets/microphone.svg?react';

import useAutosizeTextArea from '@chrome-extension-boilerplate/shared/lib/hooks/useAutosizeTextArea';
import { MessageList } from '@src/Message/ui';
import { useChatStore } from '@src/Message/model/store';

const AssistantWindow = () => {
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const likeMessage = useChatStore((state) => state.likeMessage);

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const {
    transcript,
    listening,
    // resetTranscript,
    // browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  const handleMicrophoneClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue(''); // Clear the textarea after submission
    sendMessage(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && value !== '') {
      event.preventDefault(); // Prevent new line
      handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
    }
  };

  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  return (
    <div className="absolute -top-[580px] right-0 flex flex-col gap-[8px] h-[565px] w-[350px] bg-white p-[16px] rounded-[24px]">
      <div className="relative flex justify-center py-[10px]">
        <p className="text-center text-black text-2xl font-semibold">
          Тинькофф Ассистент
        </p>
      </div>
      <MessageList
        className="w-full pr-[8px]"
        messages={messages}
        isLoading={isLoading}
        sendMessage={sendMessage}
        likeMessage={likeMessage}
      />
      <form
        className="flex items-end gap-[6px] p-[10px] bg-[#F2F2F2] rounded-[26px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-1 min-w-0 pl-4">
          <textarea
            className="text-black text-[16px] w-full min-h-[40px] max-h-[208px] py-[8px] bg-transparent focus:outline-none resize-none"
            placeholder="Введите сообщение"
            dir="auto"
            rows={1}
            ref={textAreaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        {value.length === 0 || listening ? (
          <button 
            className="relative bg-[#ffdd2d] hover:bg-[#ffcd33] font-bold p-[6.5px] rounded-full"
            onClick={handleMicrophoneClick}
          >
            {listening && <span className="absolute bg-red-600 rounded-full w-[10px] h-[10px]" />}
            <MicrophoneIcon className="w-[28px] h-[28px]" />
          </button>
        ) : (
          <button className="bg-[#ffdd2d] hover:bg-[#ffcd33] font-bold p-[6.5px] rounded-full">
            <ArrowUpIcon className="w-[28px] h-[28px]" />
          </button>
        )}
      </form>
    </div>
  )
};

export default AssistantWindow;
