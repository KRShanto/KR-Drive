import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { storage, db, auth } from "@/config/firebase";
import useAuthStore from "@/stores/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
import shortid from "shortid";
import Media from "@/types/media";
import NotLoggedInMessage from "@/components/NotLoggedInMessage";
import useLoadingStore from "@/stores/loading";

export default function Media() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [media, setMedia] = useState<Media | null>(null);
  const [txtFile, setTxtFile] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { user } = useAuthStore((state) => state);
  const { turnOff, turnOn } = useLoadingStore((state) => state);

  async function getMedia() {
    if (id && user != "loading" && user != null) {
      // setLoading(true);
      turnOn();

      const docRef = doc(db, "media", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Media;

        if (data.authorizedUsers.includes(user.uid)) {
          setMedia(data);
          // setLoading(false);
          turnOff();
        } else {
          setNotFound(true);
          // setLoading(false);
          turnOff();
        }
      } else {
        setNotFound(true);
        // setLoading(false);
        turnOff();
      }
    }
  }

  async function fetchTxtFile() {
    if (media) {
      const url = media.url;
      const response = await fetch(url);
      const data = await response.text();
      setTxtFile(data);
    }
  }

  useEffect(() => {
    getMedia();
  }, [id, user]);

  useEffect(() => {
    fetchTxtFile();
  }, [media]);

  if (notFound) return <h1>The media is not found bro :(</h1>;

  if (!user) return <NotLoggedInMessage task="create text" />;

  return (
    <div>
      <h1>Media</h1>
      {media && <h2>{media.title}</h2>}

      {media && media.type === "TXT" && (
        <div className="txt-body">
          <pre>{txtFile}</pre>
        </div>
      )}
    </div>
  );
}
