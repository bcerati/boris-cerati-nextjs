import AboutMe from './AboutMe';

import MyTwitterFeed from './MyTwitterFeed';

function RightBar() {
  return (
    <aside className="hidden md:w-1/3 w-full lg:block flex flex-col items-center px-3">
      <AboutMe />
      <MyTwitterFeed />
    </aside>
  );
}

export default RightBar;
