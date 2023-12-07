import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="bg-gray-bg h-screen flex justify-center items-center">
        <SignIn redirectUrl={'/chat'} />
    </div>
  ) 
}