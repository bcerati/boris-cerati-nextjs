import { ReactNode } from 'react';

interface IRightProps {
  year: number;
  title: string;
  children: ReactNode;
}

function Right({ year, title, children }: IRightProps) {
  return (
    <div className="mb-12 flex justify-between items-center w-full right-timeline">
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{year}</h1>
      </div>
      <div className="order-1 bg-gray-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-gray-800 text-xl">{title}</h3>
        <div className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Right;
