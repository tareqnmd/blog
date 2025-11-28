'use client';

import { cn } from '@/lib/cn.lib';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  footer?: ReactNode;
  trigger?: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[95vw]',
};

const Modal = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  footer,
  trigger,
  className,
  showCloseButton = true,
  size = 'lg',
  closeOnOverlayClick = true,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                transition={{
                  duration: 0.3,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="fixed inset-0 z-50"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              forceMount
              onPointerDownOutside={(e) => {
                if (!closeOnOverlayClick) {
                  e.preventDefault();
                }
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: '-45%',
                  x: '-50%',
                  rotateX: 15,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: '-50%',
                  x: '-50%',
                  rotateX: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  y: '-55%',
                  x: '-50%',
                  rotateX: -10,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className={cn(
                  'fixed left-[50%] top-[50%] z-50',
                  'w-[calc(100%-2rem)] md:w-full',
                  sizeClasses[size],
                  'max-h-[85vh] md:max-h-[90vh]',
                  'bg-background',
                  'rounded-xl shadow-2xl',
                  'border border-border',
                  'focus:outline-none',
                  className
                )}
                style={{ perspective: 1000 }}
              >
                <div className="flex flex-col">
                  {(title || description) && (
                    <div className="shrink-0 px-6 pt-6 pb-4 border-b border-border">
                      {title && (
                        <Dialog.Title className="text-xl font-semibold text-foreground mb-2">
                          {title}
                        </Dialog.Title>
                      )}
                      {description && (
                        <Dialog.Description className="text-sm text-muted">
                          {description}
                        </Dialog.Description>
                      )}
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

                  {footer && (
                    <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-card-background rounded-b-xl">
                      {footer}
                    </div>
                  )}
                </div>

                {showCloseButton && (
                  <Dialog.Close asChild>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'absolute right-4 top-4',
                        'rounded-lg p-1.5',
                        'text-muted hover:text-foreground',
                        'hover:bg-card-background',
                        'focus:outline-none focus:ring-2 focus:ring-accent',
                        'opacity-70 hover:opacity-100'
                      )}
                    >
                      <RxCross2 className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </motion.button>
                  </Dialog.Close>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Modal;
