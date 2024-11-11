import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="clerk">
        <SignIn path="/sign-in" />
      </div>
   
  );
}