import { gql, useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

const GET_SONG_DETAILS = gql`
query getSongDetails($songSlug: ID!) {
    song(id: $songSlug, idType: SLUG) {
      songFields {
        songTitle
        lyrics
        link
        genre {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export default function Song() {
    const { query = {} } = useRouter();
    const { songSlug } = query;

    const {loading, error, data} = useQuery(GET_SONG_DETAILS, {
        variables: { songSlug }
    });

    const songData = data?.song?.songFields;

    if (loading) return "loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <Layout>
            <Link href="/albums">
                <p className="backButton">View All Albums</p>
            </Link>
            <h1 className="title">{songData.songTitle}</h1>
            <p className="details">Song Link: {songData.link}</p>
            <p>
                Genre:
                {songData.genre.nodes.map((genre) => genre.name)
                .join(", ")}
            </p>
            <h3 className="details">Lyrics</h3>
            <div className="details lyrics">{songData.lyrics}</div>
        </Layout>
    );
}