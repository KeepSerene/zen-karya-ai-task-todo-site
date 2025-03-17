// Component imports
import PageMetaTitle from "@/components/PageMetaTitle";
import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <>
      <PageMetaTitle title="Sign in | ZenKaryaX" />

      <section>
        <div className="wrapper flex justify-center">
          <SignIn signUpUrl="/register" />
        </div>
      </section>
    </>
  );
}

export default LoginPage;
