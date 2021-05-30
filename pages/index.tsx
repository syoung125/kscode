import { GetStaticProps } from "next";

import MainLayout from "@src/component/common/layouts/main-layout";

import { getPostSlugs, PostSlugsType } from "@src/api/posts";
import { useRouter } from "next/dist/client/router";

export type HomePageProps = {
  postSlugs: PostSlugsType[];
};

function HomePage({ postSlugs }: HomePageProps) {
  const router = useRouter();

  const handleSlugClick = (slug: string) => {
    router.push(`/posts/${slug}`);
  };

  return (
    <MainLayout>
      {postSlugs?.map(({ slug }) => (
        <li onClick={() => handleSlugClick(slug)}>{slug}</li>
      ))}
    </MainLayout>
  );
}

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const postSlugs = await getPostSlugs();
  return {
    props: {
      postSlugs,
    },
  };
};
