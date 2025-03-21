// Component imports
import Topbar from "@/components/Topbar";
import PageMetaTitle from "@/components/PageMetaTitle";

// Asset import
import { pageNotFound } from "@/assets/assets";

function ProjectDetailErrorBoundary() {
  return (
    <>
      <PageMetaTitle title="Project Not Found" />

      <Topbar tabName="Project unavailable" />

      <section className="wrapper flex flex-col justify-center items-center">
        <figure className="mt-10">
          <img src={pageNotFound} width={360} alt="" />

          <figcaption className="sr-only">
            Illustration representing a missing or inaccessible project.
          </figcaption>
        </figure>

        <h1 className="text-2xl font-semibold capitalize text-center mt-4 mb-2">
          Project not found
        </h1>

        <p className="max-w-[40ch] text-muted-foreground text-center">
          Uh-oh! We couldn't find the project you're looking for. Please verify
          the project ID or explore other available projects.
        </p>
      </section>
    </>
  );
}

export default ProjectDetailErrorBoundary;
