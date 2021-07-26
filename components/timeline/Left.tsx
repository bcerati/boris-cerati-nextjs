import { ReactNode } from 'react';

interface ILeftProps {
  year: number;
  title: string;
  children: ReactNode;
}

function Left({ year, title, children }: ILeftProps) {
  return (
    <div className="mb-12 flex justify-between flex-row-reverse items-center w-full left-timeline">
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
        <h1 className="mx-auto text-white font-semibold text-lg">{year}</h1>
      </div>
      <div className="order-1 bg-blue-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-black text-xl">{title}</h3>
        <div className="text-sm font-medium leading-snug tracking-wide text-black text-opacity-100">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Left;
