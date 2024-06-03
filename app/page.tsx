import Link from "next/link";
import ROUTES from "@/constants/routes";
export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 bg-zinc-900 w-full" style={{ minHeight: "70vh", paddingTop: "10vh" }} >
      <h1 className="font-bold sm:text-base md:text-xl lg:text-3xl xl:text-5xl 2xl:text-7xl">Welcome to the Simple Task App</h1>
      <p className="sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Task app to keep track of your tasks</p>
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
      md:text-sm lg:text-base xl:text-lg 2xl:text-xl
      sm:py-1 md:py-3 lg:py-4
      sm:px-2 md:px-4 lg:px-6
      " href={ROUTES.TASKS.HOME}>
        Get Started
      </Link>
    </div>
  );
}
