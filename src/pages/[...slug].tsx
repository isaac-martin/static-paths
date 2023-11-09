import type {InferGetStaticPropsType, GetStaticProps, GetStaticPaths} from 'next';
import {useRouter} from 'next/router';

export const getStaticPaths = (async () => {
  // these paths won't work because they are encoded - if you go to /path%2F1, it will correctly show, but if you go to to /path/1, it will show the loading indicator
  const failingPaths = Array.from(Array(3).keys()).map((i) => ({
    params: {
      slug: [`path/${i}`], // this will be encoded and end up as /path%2F1${i}%5D
    },
  }));

  // these paths will work because they are not encoded - if you go to /working/1, it will correctly show

  const workingPaths = Array.from(Array(3).keys()).map((i) => ({
    params: {
      slug: `working/${i}`.split('/'),
      // returns ['working',i]
    },
  }));

  const paths = [...failingPaths, ...workingPaths];

  return {
    paths,
    fallback: true,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const slug = JSON.stringify(context?.params?.slug);
  await new Promise((r) => setTimeout(r, 5000));

  if (!slug.includes('path') && !slug.includes('working'))
    return {
      notFound: true,
    };

  return {props: {context: JSON.stringify(context)}};
}) satisfies GetStaticProps<{
  context: any;
}>;

export default function Page({context}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {isFallback} = useRouter();

  if (isFallback) return <div>Loading ...</div>;
  return <code>{JSON.stringify(context)}</code>;
}
