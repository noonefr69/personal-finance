import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { SiGithub, SiGoogle } from "react-icons/si";

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-5 m-10 relative rounded-2xl" id="backgroundLeft">
        <div className="m-10">{/* SVG unchanged */}</div>
        <div className="text-white m-10 absolute bottom-0">
          <h1 className="text-4xl font-bold mb-5">
            Keep track of your money and save for your future
          </h1>
          <p>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
      <div className="col-span-7 flex flex-col justify-center items-center m-10">
        <div className="bg-white w-4/5 h-1/2 rounded-2xl p-10">
          <h1 className="text-4xl font-semibold mb-8">Login</h1>
          <div className="space-y-4 h-full flex flex-col pb-14 justify-center">
            <form
              className="w-full"
              action={async () => {
                "use server";
                await signIn("google");
                redirect("/home");
              }}
            >
              <button
                type="submit"
                className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition"
              >
                <SiGoogle />
                Sign in with Google
              </button>
            </form>

            <form
              className="w-full"
              action={async () => {
                "use server";
                await signIn("github");
                redirect("/home");
              }}
            >
              <button
                type="submit"
                className="cursor-pointer w-full flex items-center justify-center gap-3 bg-gray-800 text-white rounded-lg py-3 px-4 font-medium shadow-sm hover:bg-gray-900 transition"
              >
                <SiGithub />
                Sign in with GitHub
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
