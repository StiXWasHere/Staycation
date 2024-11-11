import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="clerk">
      <SignUp path="/sign-up" />
    </div>
  )
  
}