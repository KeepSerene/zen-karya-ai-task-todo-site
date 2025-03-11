// Component imports
import PageTitle from "@/components/PageTitle";
import { SignUp } from "@clerk/clerk-react";

function RegisterPage() {
  return (
    <>
      <PageTitle title="Create an account | ZenKaryaX" />

      <section>
        <div className="wrapper flex justify-center">
          <SignUp signInUrl="/login" />
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
