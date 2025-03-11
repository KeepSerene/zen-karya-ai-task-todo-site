// Library imports
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

// Component imports
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

// Asset import
import { pageNotFound } from "@/assets/assets";

function RootErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />

      <div className="grow wrapper pt-32 pb-12 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-4xl font-semibold text-center">
          {isRouteErrorResponse(error)
            ? "Oops! We couldn't find that page."
            : "Something went wrong on our end."}
        </h1>

        <p className="max-w-[55ch] text-muted-foreground sm:text-lg text-center mt-4 mb-6">
          {isRouteErrorResponse(error)
            ? "It looks like the page you're looking for doesn't exist! Let's get you back on track."
            : "We're on it! Try refreshing the page or check back later."}
        </p>

        <div className="flex items-center gap-2">
          <Button asChild className="capitalize">
            <Link to="/">Go home</Link>
          </Button>

          <Button asChild variant="ghost" className="capitalize">
            <Link to="/app/inbox">View inbox</Link>
          </Button>
        </div>

        <figure className="mt-10">
          <img src={pageNotFound} alt="" width={560} height={373} />

          <figcaption className="sr-only">
            A visual representation of a missing page (404 error).
          </figcaption>
        </figure>
      </div>

      <Footer />
    </div>
  );
}

export default RootErrorBoundary;
