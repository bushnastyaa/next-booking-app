'use client';

import { useCallback, useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  actionLabel: string;
  footer?: React.ReactElement;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body,
  actionLabel,  
  footer, 
  disabled,
}) => {
  
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-out duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] 
              overflow-y-auto transform rounded-2xl bg-white p-6 text-left 
              shadow-xl transition-all flex flex-col gap-5'>
                <div className="flex items-center p-6 rounded-t justify-center
                  relative border-b-[1px]">
                  <button 
                    className="p-1 border-0 hover:opacity-70 absolute right-9"
                    onClick={onClose}
                  >
                    <IoMdClose size={18} />
                  </button>
                  <div className="text-lg font-semibold">{title}</div>
                </div>
                <div className="relative p-6 pt-2 flex-auto">{body}</div>
                <div className="flex flex-col gap-2 px-6">
                  <div className="flex flex-row items-center gap-4 w-full">
                    <Button 
                      disabled={disabled} 
                      label={actionLabel} 
                      onClick={handleSubmit}
                    />
                  </div>
                  {footer}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
  );
}

export default Modal;
