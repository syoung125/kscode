import Style from "./Breadcrumbs.style";

export type BreadcrumbsProps = {
  path: string;
};

export default function Breadcrumbs({ path }: BreadcrumbsProps) {
  return (
    <Style.Wrapper>
      <Style.Path>{path.split("/").join(" > ")}</Style.Path>
    </Style.Wrapper>
  );
}
