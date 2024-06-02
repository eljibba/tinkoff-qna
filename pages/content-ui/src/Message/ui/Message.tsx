import { cn } from '@chrome-extension-boilerplate/shared/utils/cn';
import AutoLinkText from 'react-autolink-text2';

type MessageType = {
  className?: string,
  owner: string,
  children: string,
  like: boolean | null | undefined,
  index: number,
  likeMessage: (index: number, value: boolean | null) => void
};

export const Message = (props: MessageType) => {
  const {
    className,
    owner,
    children,
    like,
    index,
    likeMessage,
  } = props;

  const handleLikeMessage = (value: boolean) => {
    if (like === value) {
      likeMessage(index, null);
      return;
    }
    likeMessage(index, value);
  };

  return (
    <>
      <div className={cn('bg-[#FFEA66] py-[10px] px-[16px] rounded-3xl w-full leading-16 text-black text-[16px] break-words', className, {
        'bg-[#F2F2F2] max-w-[70%]': owner === 'me',
      })}>
        <AutoLinkText
          text={children}
          linkProps={{ className: 'text-blue-600' }}
        />
      </div>
      {owner !== 'me' && (
        <div className="flex items-start w-full gap-[8px]">
          <button
            className={cn('bg-[#F2F2F2] hover:bg-[#fff2cd] px-[12px] py-[6px] text-[18px] rounded-[16px]', {
              'bg-[#fff2cd] outline-[#FFEA66] outline outline-1 -outline-offset-1': like, 
            })}
            onClick={() => handleLikeMessage(true)}
          >
            👍
          </button>
          <button
            className={cn('bg-[#F2F2F2] hover:bg-[#fff2cd] px-[12px] py-[6px] text-[18px] rounded-[16px]', {
              'bg-[#fff2cd] outline-[#FFEA66] outline outline-1 -outline-offset-1': like === false,
            })}
            onClick={() => handleLikeMessage(false)}
          >
            👎
          </button>
        </div>
      )}
    </>
  );
};