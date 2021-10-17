import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";
const Feed = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <main className="grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-4xl lg:max-w-5xl xl:grid-cols-3">
      {/* Stories */}
      <section className="col-span-2">
        <Stories />
        <Posts />
        {/* Posts */}
      </section>
      <section className="hidden md:col-span-1 xl:inline-grid">
        {/* Mini Profile */}
        <div className="fixed top-20">
          <MiniProfile />

          {/* Suggestions */}
          {session ? <Suggestions /> : null}
        </div>
      </section>
    </main>
  );
};

export default Feed;
