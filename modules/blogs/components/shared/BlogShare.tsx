'use client';
import Modal from '@/components/ui/Modal';
import { cn } from '@/lib';
import { useState } from 'react';
import { BsShare } from 'react-icons/bs';
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { IoCheckmark, IoCopyOutline } from 'react-icons/io5';
import { toast } from 'sonner';

const BlogShare = ({
  title,
  link,
  className,
  iconSize = 16,
  shareBtnTitle = 'Share',
}: {
  title?: string;
  link: string;
  className?: string;
  iconSize?: number;
  shareBtnTitle?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const closeModal = () => {
    setOpen(false);
    setCopied(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(title || '')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title || ''} ${link}`)}`,
  };

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <>
      <div
        onClick={showModal}
        title={`Share this content: ${link}`}
        className={cn('flex cursor-pointer items-center gap-2', className)}
      >
        <BsShare size={iconSize} title="Share icon" />
        <span className="text-sm font-medium">{shareBtnTitle}</span>
      </div>
      <Modal
        onOpenChange={closeModal}
        title={<div className="mt-4 text-lg font-semibold">Share {title}</div>}
        open={open}
        footer={null}
        size="md"
        className="share-modal"
      >
        <div className="grid gap-4 overflow-hidden p-2">
          <div className="border-border flex items-center gap-2 rounded-lg border-2 p-1 px-2">
            <input
              type="text"
              value={link}
              readOnly
              className="flex-1 border-none bg-transparent text-sm outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={cn(
                'bg-primary flex items-center gap-1.5 rounded-md p-2 text-sm font-medium text-white transition-all'
              )}
              title="Copy link"
            >
              {copied ? (
                <IoCheckmark className="text-green-500" size={18} />
              ) : (
                <IoCopyOutline className="text-muted" size={18} />
              )}
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4">Or share via</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => handleShare(shareLinks.facebook)}
              className="flex cursor-pointer flex-col items-center gap-2"
              title="Share on Facebook"
            >
              <FaFacebook size={26} />
              <span className="text-xs font-medium">Facebook</span>
            </button>

            <button
              onClick={() => handleShare(shareLinks.twitter)}
              className="flex cursor-pointer flex-col items-center gap-2"
              title="Share on Twitter"
            >
              <FaTwitter size={26} />
              <span className="text-xs font-medium">Twitter</span>
            </button>

            <button
              onClick={() => handleShare(shareLinks.linkedin)}
              className="flex cursor-pointer flex-col items-center gap-2"
              title="Share on LinkedIn"
            >
              <FaLinkedin size={26} />
              <span className="text-xs font-medium">LinkedIn</span>
            </button>

            <button
              onClick={() => handleShare(shareLinks.whatsapp)}
              className="flex cursor-pointer flex-col items-center gap-2"
              title="Share on WhatsApp"
            >
              <FaWhatsapp size={26} />
              <span className="text-xs font-medium">WhatsApp</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BlogShare;
