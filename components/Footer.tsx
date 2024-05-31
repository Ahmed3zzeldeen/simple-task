import React from 'react'

export default function Footer() {
  return (
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
  )
}
