import Style from "./index.style";

export type BreadcrumbsProps = {
  path: string;
  title: string;
};

export default function Breadcrumbs({ path, title }: BreadcrumbsProps) {
  const paths = path.split("/");

  const replaceFileNameToTitle = (paths: string[]) => {
    return [...paths.slice(0, paths.length - 1), title];
  };

  return (
    <Style.Wrapper>
      <Style.Path>{replaceFileNameToTitle(paths).join(" > ")}</Style.Path>
    </Style.Wrapper>
  );
}
