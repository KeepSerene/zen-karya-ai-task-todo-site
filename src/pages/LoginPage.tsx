// Component imports
import PageTitle from "@/components/PageTitle";
import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <>
      <PageTitle title="Sign in | ZenKaryaX" />

      <section>
        <div className="wrapper flex justify-center">
          <SignIn signUpUrl="/register" />
        </div>
      </section>
    </>
  );
}

export default LoginPage;
