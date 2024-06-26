import { useRouter } from "next/router";
import styled from "styled-components";
import { GetServerSidePropsContext } from "next";

import ScrollPagenation from "@src/components/common/scroll-pagenation";
import PostListItem from "@src/components/post-list/post-list-item";
import { GREEN } from "@src/constants/palette";
import { breakpoints } from "@src/styles/theme";
import PostService from "@src/services/post.service";
import { Post } from "@src/types/post.type";

type PostListPageProps = {
  posts: Post[];
};

export default function PostListPage({ posts }: PostListPageProps) {
  const router = useRouter();
  const tag = String(router.query.tag);

  return (
    <Container>
      <Wrapper>
        <Title>
          <em>{tag}</em> 관련 글 목록 <small>({posts.length} 개)</small>
        </Title>
        <ScrollPagenation data={posts} renderItem={PostListItem} />
      </Wrapper>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const tag = String(context.query.tag);
  const posts: Post[] = await PostService.getPosts({ tag });

  return { props: { posts } };
}

const Container = styled.div`
  flex: 1;

  overflow-x: hidden;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  padding: 1.6rem 1.4rem;
  max-width: 700px;

  margin: 0 auto;

  ${breakpoints.medium} {
    padding: 1.4rem 1.2rem;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.scheme.$gray400};
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  > em {
    color: ${GREEN};
  }

  > small {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.scheme.$gray100};
  }
`;
