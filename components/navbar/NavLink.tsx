import { ReactNode } from 'react';

import Link from 'next/link';

interface INavLinkProps {
  href: string;
  children: ReactNode;
}
function NavLink({ children, href }: INavLinkProps) {
  return (
    <Link href={href}>
      <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">{children}</a>
    </Link>
  );
}

export default NavLink;
