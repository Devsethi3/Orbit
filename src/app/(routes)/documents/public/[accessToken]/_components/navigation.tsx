"use client";

interface NavigationProps {
  documentTitle: string;
}

export const Navigation = ({ documentTitle }: NavigationProps) => {

  return (
    <div
      className="flex items-center justify-center border-b lg:py-4 py-3"
    >
      <div className="font-semibold lg:text-xl text-lg">{documentTitle}</div>
    </div>
  );
};
