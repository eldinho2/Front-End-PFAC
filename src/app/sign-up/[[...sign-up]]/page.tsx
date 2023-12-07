import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="bg-gray-bg h-screen flex justify-center items-center">
        <SignUp redirectUrl={'/chat'} />
    </div>
  ) 
}