import type { Route, Info } from './+types/home';
import { Welcome } from '../welcome/welcome';
import { z } from 'zod';
import { useLoaderData } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader() {
  const quote = z
    .object({
      id: z.number(),
      quote: z.string(),
      author: z.string(),
    })
    .parse(
      await fetch('https://dummyjson.com/quotes/random').then((r) => r.json())
    );

  return {
    quote,
  };
}

export default function Home() {
  const loaderData: Awaited<ReturnType<typeof loader>> = useLoaderData();
  return <Welcome quote={loaderData.quote} />;
}
