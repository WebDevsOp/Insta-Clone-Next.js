import Post from "./Post";
import { useState, useEffect } from 'react'
import { onSnapshot, collection, query, orderBy, Timestamp } from '@firebase/firestore'
import { db } from '../firebase'

// const posts = [
//   {
//     id: "123",
//     username: "Shaik Rehan",
//     userImg:
//       "https://yt3.ggpht.com/yti/APfAmoFV_G4Ix1hgko-tLXkyZdCGH-f9sqMWyOkedxOo=s88-c-k-c0x00ffffff-no-rj-mo",
//     img: "https://assets.justinmind.com/wp-content/uploads/2018/11/Lorem-Ipsum-alternatives-768x492.png",
//     caption:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?",
//   },
// ];

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() =>
    onSnapshot(query(collection(db, 'posts'), orderBy('timeStamp', 'desc')), snaphost => {
      setPosts(snaphost.docs);
    })
    , [db])
    // console.log(posts);
  return (
    <div>
      {posts.map((post) => {
        // console.log(post.id);
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            postImg={[post.data().image]}
            caption={post.data().caption}
          />
        );
      })}
    </div>
  );
};

export default Posts;
