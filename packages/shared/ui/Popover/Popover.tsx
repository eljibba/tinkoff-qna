import React, { ReactNode } from 'react';
import { Popover as HPopover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { cn } from '../../utils/cn';

type PopoverType = {
  anchor?: 'top' | 'bottom' | 'right' | 'left',
  className?: string,
  buttonClassName?: string,
  open?: boolean,
  trigger: ReactNode,
  children?: ReactNode,
}

export const Popover = (props: PopoverType) => {
  const {
    anchor,
    className,
    buttonClassName,
    open,
    trigger,
    children
   } = props;

  return (
    <HPopover className={className}>
      <PopoverButton className={cn('focus:outline-none', buttonClassName)}>
        {trigger}
      </PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        {(open || trigger) && (
          <PopoverPanel
            anchor={anchor}
            portal={false}
            className="flex flex-col gap-2 bg-white p-4 w-[200px]"
          >
            {children}
          </PopoverPanel>
        )}
      </Transition>
    </HPopover>
  );
};
