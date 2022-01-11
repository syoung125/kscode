import { BlogLayout } from "@src/components/common/layouts";

import { Welcome } from "@src/components/blog";

export default function BlogHomePage() {
  return (
    <BlogLayout>
      <Welcome />
    </BlogLayout>
  );
}
