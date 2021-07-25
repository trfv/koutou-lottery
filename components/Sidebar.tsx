import { useRouter } from "next/router";
import * as React from "react";

const Sidebar = () => {
  const router = useRouter();

  const handleToHome = React.useCallback(() => router.push("./"), []);
  const handleToGenerate = React.useCallback(() => router.push("./generate"), []);
  const handleToAnalyze = React.useCallback(() => router.push("./analyze"), []);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div
      className={`fixed top-0 left-0 h-full p-4 z-10 bg-black text-white transition-all ${
        isOpen ? "w-80" : "w-14"
      }`}
    >
      <div className="flex justify-between">
        {isOpen && <span className="text-base whitespace-nowrap">Koutou Lottery</span>}
        <i className="cursor-pointer" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </i>
      </div>
      <hr className="mt-4 mb-4" />
      <ul className="list-none">
        <li>
          <span className="inline-flex gap-2 items-center cursor-pointer" onClick={handleToHome}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {isOpen && <span className="whitespace-nowrap">Home</span>}
          </span>
        </li>
        <li>
          <span
            className="inline-flex gap-2 items-center cursor-pointer"
            onClick={handleToGenerate}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {isOpen && <span className="whitespace-nowrap">Generate</span>}
          </span>
        </li>
        <li>
          <span className="inline-flex gap-2 items-center cursor-pointer" onClick={handleToAnalyze}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
              />
            </svg>
            {isOpen && <span className="whitespace-nowrap">Analyze</span>}
          </span>
        </li>
      </ul>
      <hr className="mt-4 mb-4" />
      {isOpen && (
        <div>
          <span className="text-xs whitespace-nowrap">
            Copyright © 2021 trfv All Rights Reserved.
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(Sidebar);
