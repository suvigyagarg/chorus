"use client";
import { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Playlists from "./playlists/playlists";
import { getUserId } from "@/lib/actions";

export default function Sidebar({ session }) {
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      setActive("Foryou");
    } else if (pathname === "/yourLibrary") {
      setActive("yourLibrary");
    } else if (pathname === "/audiobook") {
      setActive("audiobook");
    } else if (pathname === "/liked") {
      setActive("liked");
    } else if (pathname === "/albums") {
      setActive("albums");
    } else if (pathname === "/artists") {
      setActive("artists");
    } else if (pathname === "/recommend") {
      setActive("recommend");
    }
  }, [pathname]);

  const handleCreatePlaylist = async () => {
    const userId = await getUserId();

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        name: 'New Playlist', 
        public: false, 
        description: '',
      }),
  })
  const playlistData = await playlistResponse.json();
  console.log(playlistData);
  const playlistId = playlistData.id;
  router.push(`/playlist/${playlistId}`);
}

  const handleClick = (item) => {
    setActive(item);
  };
  return (
    <div className={styles.section}>
      <div className={styles.home}>
        <div className={styles.homeButton}>
          <Image width="25" height="25" src="/audio-waves.png" alt="" />
          <p>Chorus</p>
        </div>
      </div>
      <div className={styles.sidebarList}>
        <div className={styles.recommend}>
          <p>Recommended</p>
          <div className={styles.recommendList}>
            <Link href="/">
              <div
                className={`${styles.listItem} ${
                  active === "Foryou" ? styles.active : ""
                }`}
                onClick={() => handleClick("Foryou")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="bi bi-music-player"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm1 0v3h6V3zm3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  <path d="M11 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                </svg>
                <p>For You</p>
              </div>
            </Link>
            <Link href = "/yourLibrary">
            <div
              className={`${styles.listItem} ${
                active === "yourLibrary" ? styles.active : ""
              }`}
              onClick={() => handleClick("yourLibrary")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-music-note"
                viewBox="0 0 16 16"
              >
                <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
                <path d="M9 3v10H8V3z" />
                <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
              </svg>
              <p>Library</p>
            </div>
            </Link>
            
          </div>
        </div>
        <div className={styles.myMusic}>
          <p>My Music</p>
          <div className={styles.myMusicList}>
            <Link href="/liked">
              <div
                className={`${styles.listItem} ${
                  active === "liked" ? styles.active : ""
                }`}
                onClick={() => handleClick("liked")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg>
                <p>Liked Songs</p>
              </div>
            </Link>
            <Link href="/albums">
            <div
              className={`${styles.listItem} ${
                active === "albums" ? styles.active : ""
              }`}
              onClick={() => handleClick("albums")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-journal-album"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 4a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm1 7a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
              </svg>
              <p>Albums</p>
            </div>
            </Link>
            <Link href="/artists">
            <div
              className={`${styles.listItem} ${
                active === "artists" ? styles.active : ""
              }`}
              onClick={() => handleClick("artists")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-vinyl-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
              </svg>
              <p>Artists</p>
            </div>
            </Link>
            <Link href="/recommend">
            <div
              className={`${styles.listItem} ${
                active === "recommend" ? styles.active : ""
              }`}
              onClick={() => handleClick("recommend")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-clock"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
              </svg>
              <p>Recommendations</p>
            </div>
            </Link>
          </div>
        </div>
        <div className={styles.playlist}>
          <p>Playlists</p>
          <Playlists session={session} />
        </div>
      </div>
      <div className={styles.newPlaylist}>
        <div className={styles.newPlaylistButton}>
          <div className={styles.newPlaylistButtonWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-music-note-list"
              viewBox="0 0 16 16"
            >
              <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2" />
              <path d="M12 3v10h-1V3z" />
              <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z" />
              <path d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5" />
            </svg>
            <p onClick={handleCreatePlaylist}>New Playlist</p>
          </div>
        </div>
      </div>
    </div>
  );
}

