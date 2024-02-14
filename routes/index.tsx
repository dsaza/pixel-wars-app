import { Head } from "$fresh/runtime.ts";
import { getGrid } from "../shared/db.ts";
import { Game } from "../islands/Game.tsx";

export default async function Home() {
  const { tiles } = await getGrid()

  return (
    <>
      <Head>
        <title>Pixel Wars</title>
      </Head>
      <Game initialTiles={tiles} />
    </>
  );
}
