import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome to the Simple Task App</h1>
      <p className="text-2xl">Task app to keep track of your tasks</p>
      <footer className="text-center text-gray-400 text-sm">
        <p>
          Built with ❤️
          <span> & </span>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Next.js {" "}
          </a>
          by {" "}
          <a
            href="https://github.com/ahmed3zzeldeen"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Ahmed M. Ezzeldeen
          </a>
        </p>
      </footer>

    </main>
  );
}
