'use client';

import { UserField } from '@/enum';
import { IUser } from '@/types';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const UserNavInfo = ({ user }: { user: IUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none cursor-pointer"
        aria-label="User menu"
      >
        {user[UserField.IMAGE] ? (
          <Image
            src={user[UserField.IMAGE]}
            alt={user[UserField.NAME]}
            width={32}
            height={32}
            className="rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold border border-border">
            {user[UserField.NAME]?.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">{user[UserField.NAME]}</p>
            <p className="text-xs text-muted truncate">{user[UserField.EMAIL]}</p>
          </div>
          <div className="p-2">
            <button
              onClick={() => signOut()}
              className="w-full text-left px-2 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavInfo;
