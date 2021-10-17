import faker from "faker";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Story from "./Story";
const Stories = () => {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  // console.log(suggestions);

  return (
    <div className="scrollbar-thin scrollbar-thumb-black flex mt-8 p-5 bg-white border border-gray-200 rounded-sm overflow-x-scroll space-x-2">
      {session && <Story img={session.user.image} username={session.user.username} />}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};

export default Stories;
