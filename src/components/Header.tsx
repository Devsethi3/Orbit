import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="fixed w-full top-0 bg-white border-b shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <h1 className="text-xl font-bold">Orbit</h1>
          </Link>

          <SearchInput />
          <div className="flex items-center gap-5">
            <OrganizationSwitcher
              afterCreateOrganizationUrl="/dashboard"
              afterLeaveOrganizationUrl="/dashboard"
              afterSelectOrganizationUrl="/dashboard"
              afterSelectPersonalUrl="/dashboard"
              appearance={{
                elements: {
                  organizationSwitcherPopoverFooter: "hidden"
                }
              }}
            />
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8",
                userButtonPopoverFooter: "hidden"
              }
            }} afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
