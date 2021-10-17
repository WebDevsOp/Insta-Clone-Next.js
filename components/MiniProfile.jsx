import { signIn, signOut, useSession } from "next-auth/react";
const MiniProfile = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-between ml-10 mt-14">
      {/* <h1>This is MiniProfile</h1> */}
      <img
        className="p-[2px] w-16 h-16 border rounded-full"
        src={
          session?.user.image ||
          "https://i.pinimg.com/474x/3c/63/1a/3c631aab6d165c9abafa4e387ebf6936.jpg"
        }
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user.username || "Anonymous"}</h2>
        <h3 className="text-gray-400 text-sm">Welcome to Instagram</h3>
      </div>

      <button
        className="text-blue-400 text-sm font-semibold"
        onClick={session ? signOut : signIn}
      >
        {session ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};

export default MiniProfile;
