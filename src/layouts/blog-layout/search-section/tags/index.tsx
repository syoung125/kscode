import { useMemo } from "react";
import styled from "styled-components";

import AccordionSection from "@src/components/common/accordion-section";
import Tag from "@src/components/common/tag";
import { useAppContext } from "@src/contexts/app";

export default function TagsSection() {
  const {
    state: { posts },
  } = useAppContext();

  const tags: Record<string, number> = useMemo(() => {
    return posts.reduce((acc, { meta: { tags } }) => {
      tags?.forEach((tag) => {
        if (acc[tag] == null) {
          acc[tag] = 0;
        }
        acc[tag] += 1;
      });
      return acc;
    }, {} as Record<string, number>);
  }, [posts]);

  return (
    <AccordionSection title="Tags" defaultExpanded>
      <Wrapper>
        {Object.entries(tags).map(([key, value]) => (
          <Tag key={key} count={value} href={`/posts?tag=${key}`}>
            {key}
          </Tag>
        ))}
      </Wrapper>
    </AccordionSection>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.8rem;
`;
