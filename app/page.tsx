import Link from "next/link";
import ROUTES from "@/constants/routes";
export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 bg-zinc-900 w-full" style={{ minHeight: "70vh", paddingTop: "10vh" }} >
      <h1 className="text-6xl font-bold">Welcome to the Simple Task App</h1>
      <p className="text-2xl">Task app to keep track of your tasks</p>
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={ROUTES.TASKS.HOME}>
        Get Started
      </Link>
    </div>
  );
}
