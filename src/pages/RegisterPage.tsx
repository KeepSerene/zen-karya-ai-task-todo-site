// Component imports
import PageMetaTitle from "@/components/PageMetaTitle";
import { SignUp } from "@clerk/clerk-react";

function RegisterPage() {
  return (
    <>
      <PageMetaTitle title="Create an account | ZenKaryaX" />

      <section>
        <div className="wrapper flex justify-center">
          <SignUp signInUrl="/login" />
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
