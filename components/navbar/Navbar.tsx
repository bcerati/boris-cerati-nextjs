import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGithub,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import NavLink from './NavLink';
import NavIcon from './NavIcon';

function Navbar() {
  return (
    <nav className="w-full py-4 border-t border-b bg-gray-100">
      <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
          <NavLink href="/">Articles</NavLink>
          <NavLink href="/about">Me connaître</NavLink>
          <NavLink href="/cv">Mon CV</NavLink>
          <NavLink href="/contact">Me contacter</NavLink>

          <p className="text-lg text-gray-600">
            <NavIcon
              href="https://twitter.com/bobo_dev"
              title="Mon profil Twitter"
              className="mr-3 inline-block hover:text-blue-500"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </NavIcon>

            <NavIcon
              href="https://github.com/bcerati"
              title="Mon profil Github"
              className="mr-3 inline-block hover:text-black"
            >
              <FontAwesomeIcon icon={faGithub} />
            </NavIcon>

            <NavIcon
              href="https://www.linkedin.com/in/boris-cerati/"
              title="Mon profil LinkedIn"
              className="hover:text-blue-300"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </NavIcon>
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
