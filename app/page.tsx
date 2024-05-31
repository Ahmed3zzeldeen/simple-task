import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-6xl font-bold">Welcome to the Simple Task App</h1>
      <p className="text-2xl">Task app to keep track of your tasks</p>
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/home">
        Get Started
      </Link>
    </>
  );
}
