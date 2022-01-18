import SEO from "@src/components/common/seo";
import { Welcome } from "@src/components/home";

function HomePage() {
  return (
    <>
      <SEO canonicalPath="/" title="Seoyoung's Tech Blog" />
      <Welcome />
    </>
  );
}

export default HomePage;
