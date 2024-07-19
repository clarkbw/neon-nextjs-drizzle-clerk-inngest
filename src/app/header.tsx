"use client";
// the :point_up: use client was necessary to make this module work
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="grid w-full flex-grow items-center bg-zinc-100 p-2 sm:justify-end">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
