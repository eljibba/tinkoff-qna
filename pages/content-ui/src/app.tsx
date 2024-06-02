import { useEffect, useState } from 'react';

import ChatIcon from './assets/chat.svg?react';
import AssistantWindow from './AssistantWindow/ui/AssistantWindow';

export default function App() {
  const [open, setOpen] = useState(false);

  const toggleWindow = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <div className="relative">
      {open && (
        <AssistantWindow />
      )}
      <button className="bg-white hover:bg-[#F2F2F2] focus:outline-none rounded-3xl w-[104px] h-[104px] flex justify-center items-center" onClick={toggleWindow}>
        <ChatIcon className="w-[48px] h-[48px]" />
      </button>
    </div>
  );
}
