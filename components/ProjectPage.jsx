/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

export default function ProjectPage({
  title,
  description,
  date,
  image,
  children,
  className,
  ...props
}) {
  return (
    <div className="w-full">
      <div className="relative border-b-8 border-blue-600">
        <img className="object-cover h-96 w-full" src={image} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
      </div>

      <div className="w-full lg:w-auto px-4 sm:px-8 md:px-24 relative bottom-36">
        <div className="w-max lg:max-w-6xl bg-white shadow-md rounded-lg mx-auto relative">
          <Link href="/projects">
            <a className="absolute left-0 md:left-auto right-0 px-6 py-3 m-4 font-semibold text-center rounded-xl focus:ring-2 hover:ring-2 ring-blue-400">
              &lt; Back to projects
            </a>
          </Link>

          <div className="px-6 sm:px-12 pb-8 pt-12 md:pt-8">
            <h1 className="text-3xl md:text-7xl font-bold py-8 text-center md:text-left">
              {title}
            </h1>
            <p className="mb-8 text-gray-700">{description}</p>
            <div className="flex flex-wrap gap-y-4 gap-x-8">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-auto items-center justify-center space-x-2 py-1 px-2 sm:py-4 sm:px-6 rounded shadow hover:bg-gray-100 focus:bg-gray-100"
              >
                <span>Lorem, ipsum.</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-4"
                  stroke={4}
                  strokeWidth={4}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-24">
        <div
          className={`-mt-24 mx-auto lg:max-w-6xl mb-16 ${className}`}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
