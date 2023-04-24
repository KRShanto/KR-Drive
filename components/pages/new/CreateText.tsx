import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { storage, db, auth } from "@/config/firebase";
import useAuthStore from "@/stores/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import shortid from "shortid";
import Media from "@/types/media";
import NotLoggedInMessage from "@/components/NotLoggedInMessage";

export default function CreateText() {
  const router = useRouter();
  const { under } = router.query as { under: string };

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const { user } = useAuthStore((state) => state);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user === null || user === "loading") return;

    const id = shortid.generate();
    const path = `${name}-${id}.txt`;
    const storageRef = ref(storage, path);
    const metadata = {
      customMetadata: {
        authorizedUsers: JSON.stringify([user.uid]),
      },
    };

    // upload file to firebase storage
    await uploadString(storageRef, content, "raw", metadata).then(
      async (snapshot) => {
        // get download url
        const downloadURL = await getDownloadURL(storageRef);

        // add file to firebase firestore
        const data: Media = {
          id,
          title: name,
          url: downloadURL,
          type: "File",
          parent: under,
          createdAt: new Date(),
          description: "",
          creator: user.uid,
          authorizedUsers: [user.uid],
        };

        await setDoc(doc(db, "media", id), data);
      }
    );

    router.push(`/media/${id}`);
  }

  if (!user) return <NotLoggedInMessage task="create text" />;

  return (
    <div id="CreateText">
      <h1 className="heading">Create Text File</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" className="btn skyblue">
          Create
        </button>
      </form>
    </div>
  );
}
