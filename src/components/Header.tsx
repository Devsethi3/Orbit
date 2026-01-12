import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

const Header = () => {
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);

  return (
    <header className="fixed w-full top-0 bg-white border-b shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <h1 className="text-xl font-bold lg:block hidden">Orbit</h1>
          </Link>

          <div className="hidden md:block flex-1">
            <SearchInput />
          </div>

          <div className="flex items-center gap-3">
            <button
              className="md:hidden outline-none"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="w-9 h-9 p-2.5 border rounded-md" />
            </button>

            <OrganizationSwitcher
              afterCreateOrganizationUrl="/dashboard"
              afterLeaveOrganizationUrl="/dashboard"
              afterSelectOrganizationUrl="/dashboard"
              afterSelectPersonalUrl="/dashboard"
              appearance={{
                elements: {
                  organizationSwitcherPopoverFooter: "hidden",
                },
              }}
            />
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                  userButtonPopoverFooter: "hidden",
                },
              }}
              afterSignOutUrl="/"
            />
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            showMobileSearch ? "h-16" : "h-0"
          }`}
        >
          <div className="p-2">
            <SearchInput isMobile onClose={() => setShowMobileSearch(false)} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
