import Image from "next/image";
import { useRouter } from "next/router";
import {
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
const Header = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <div className="sticky z-50 top-0 bg-white border-b shadow-sm">
      {/* Left */}
      <div className="flex justify-between mx-5 max-w-6xl lg:mx-auto">
        <div className="relative hidden w-24 cursor-pointer lg:inline-grid">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        {/* Middle */}
        <div className="max-w-sm">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 flex items-center pointer-events-none">
              <SearchIcon className="pl-1 w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block pl-10 w-full bg-gray-50 focus:border-black border-gray-300 rounded-md focus:ring-black sm:text-sm"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon
            className="navBtn"
            onClick={() => {
              router.push("/");
            }}
          />
          <PlusCircleIcon
            className="h-6 cursor-pointer hover:scale-125 transition-all duration-150 ease-out md:hidden"
            onClick={() => {
              setOpen(true);
              console.log(open);
            }}
          />
          {session ? (
            <>
              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -right-2 -top-1 flex items-center justify-center w-5 h-5 text-white text-xs bg-red-500 rounded-full animate-pulse">
                  3
                </div>
              </div>
              <UserGroupIcon className="navBtn" />
              <PlusCircleIcon
                className="navBtn"
                onClick={() => {
                  setOpen(true);
                  console.log(open);
                }}
              />
              <HeartIcon className="navBtn" />
              <img
                src={session?.user?.image}
                alt="Profile Pic"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
