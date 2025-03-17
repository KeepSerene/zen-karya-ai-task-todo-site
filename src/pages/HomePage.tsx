// Component imports
import PageMetaTitle from "@/components/PageMetaTitle";
import { Button } from "@/components/ui/button";

// Library import
import { Link } from "react-router";

// Asset imports
import { heroBannerLg, heroBannerSm } from "@/assets/assets";

function HomePage() {
  return (
    <>
      <PageMetaTitle title="ZenKaryaX – AI-Powered Task & Project Management Reinvented" />

      <div className="px-8 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] items-center gap-8 xl:gap-12">
        <section className="text-center lg:text-left flex flex-col items-center lg:items-start gap-4 lg:gap-6">
          <h1 className="max-w-[22ch] text-4xl md:text-5xl 2xl:text-6xl font-semibold capitalize">
            Supercharge your productivity with{" "}
            <span className="inline-flex bg-gradient-to-t from-primary/50 to-primary/30 rounded-full px-2 overflow-hidden">
              AI-Driven
            </span>{" "}
            task mastery.
          </h1>

          <p className="max-w-[48ch] text-foreground/80 md:text-lg lg:text-xl">
            ZenKaryaX simplifies life for you and your team&mdash;effortless
            task management, limitless possibilities.
          </p>

          <Button asChild size="lg">
            <Link to="/register">Start for free</Link>
          </Button>
        </section>

        <figure className="max-md:max-w-[480px] aspect-square md:aspect-video bg-secondary rounded-2xl overflow-hidden mx-auto md:mx-0">
          <img
            src={heroBannerSm}
            alt=""
            width={480}
            height={480}
            className="md:hidden"
          />

          <img
            src={heroBannerLg}
            alt=""
            width={960}
            height={540}
            className="hidden md:block"
          />

          <figcaption className="sr-only">
            Banner image of ZenKaryaX in action
          </figcaption>
        </figure>
      </div>
    </>
  );
}

export default HomePage;
