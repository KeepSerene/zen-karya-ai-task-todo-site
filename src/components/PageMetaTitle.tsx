import { Helmet } from "react-helmet";

function PageMetaTitle({ title }: { title: string }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageMetaTitle;
