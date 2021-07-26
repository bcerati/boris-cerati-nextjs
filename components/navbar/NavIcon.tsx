import { ReactNode } from 'react';

import Link from 'next/link';

interface INavIconProps {
  title: string;
  href: string;
  className: string;
  children: ReactNode;
}
function NavIcon({ children, title, href, className }: INavIconProps) {
  return (
    <Link href={href}>
      <a className={className} title={title}>
        {children}
      </a>
    </Link>
  );
}

export default NavIcon;
