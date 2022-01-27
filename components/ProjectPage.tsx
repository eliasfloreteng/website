/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

export default function ProjectPage({
  title,
  description,
  link,
  date,
  image,
  className,
  children,
  ...props
}: {
  title: string,
  description: string,
  link: string,
  date?: string,
  image?: string,
  className?: string,
  children?: React.ReactNode,
  props?: any[]
}): JSX.Element {
  return (
    <div className="w-full">
      <div className="relative border-b-8 border-blue-600">
        <img className="h-96 w-full object-cover" src={image} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
      </div>

      <div className="relative bottom-36 w-full px-4 sm:px-8 md:px-24 lg:w-auto">
        <div className="relative mx-auto w-max rounded-lg bg-white shadow-md lg:max-w-6xl">
          <div className="px-6 pb-8 pt-12 sm:px-12 md:pt-8">
            <h1 className="py-8 text-center text-3xl font-bold md:text-left md:text-7xl">
              {title}
            </h1>
            <p className="mb-8 text-slate-700">{description}</p>
            {link && (
              <div className="flex flex-wrap gap-y-4 gap-x-8">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-auto items-center justify-center space-x-2 rounded py-1 px-2 shadow hover:bg-slate-100 focus:bg-slate-100 sm:py-4 sm:px-6"
                >
                  <span>{link}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-4"
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
            )}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-24">
        <div
          className={`mx-auto -mt-24 mb-16 lg:max-w-6xl ${className || ""}`}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
