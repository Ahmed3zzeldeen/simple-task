import React from 'react'

export default function Footer() {
  return (
    <footer
      className="flex justify-center items-center bg-zinc-900 text-sm text-center text-gray-400"
      style={{
        height: "10vh",
        width: "100%",
      }}
    >
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
  )
}
