import Image from 'next/image';

function Header() {
  return (
    <header className="w-full container mx-auto">
      <div className="flex flex-col items-center pt-2 pb-0">
        <Image
          src="/images/profile-color.png"
          alt="Boris CERATI"
          width={128}
          height={128}
        />
      </div>
    </header>
  );
}

export default Header;
