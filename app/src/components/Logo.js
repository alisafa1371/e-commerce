import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    //Link is like <a href=""></a>
    <Link className="flex gap-3 items-center" href="/">
      <Image src="/logo.svg" alt="logo" width={42} height={42} />
      <span className="hidden sm:inline-block font-extrabold text-3xl text-gray-700">
        Epic Store
      </span>
    </Link>
  );
}

export default Logo;
