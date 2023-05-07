/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"

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
  title: string | React.ReactNode
  description?: string | React.ReactNode | null
  link?: string | null
  image?: string | null
  date?: string | null
  className?: string | null
  children?: React.ReactNode
  props?: any[]
}) {
  const router = useRouter()

  return (
    <div className="w-full">
      <div className="group peer relative border-b-8 border-blue-600 hover:animate-[cursor-loading_1000ms_ease-in-out_1]">
        {image && (
          <img className="h-96 w-full object-cover" src={image} alt="" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 transition-opacity duration-500 group-hover:opacity-0 group-hover:delay-1000"></div>
      </div>

      <div
        className={`relative z-10 w-full px-4 transition-[bottom] duration-500 peer-hover:-bottom-4 peer-hover:delay-1000 sm:px-8 md:px-24 lg:w-auto ${
          image ? "bottom-36" : ""
        }`}
      >
        <div className="relative mx-auto max-w-max rounded-lg bg-white shadow-md lg:max-w-6xl">
          <button
            className="absolute left-0 right-0 m-4 rounded-xl px-6 py-3 text-center font-semibold ring-blue-400 hover:ring-2 focus:ring-2 md:left-auto"
            onClick={() => {
              router.back()
            }}
          >
            &lt; Go back
          </button>

          <div
            className={`px-6 pb-8 pt-12 sm:px-12 md:pt-8 ${
              image ? "" : "mt-8"
            }`}
          >
            <h1 className="py-8 text-center text-3xl font-bold md:text-left md:text-7xl">
              {title}
            </h1>
            {description && (
              <div className="mb-8 text-slate-700">{description}</div>
            )}
            {link && (
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-auto items-center justify-center space-x-2 rounded px-2 py-1 shadow hover:bg-slate-100 focus:bg-slate-100 sm:px-6 sm:py-4"
                >
                  <span>{new URL(link).hostname}</span>
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

      <div className={`px-4 sm:px-8 md:px-24 ${image ? "" : "mt-12"}`}>
        <div
          className={`mx-auto mb-16 lg:max-w-6xl ${image ? "-mt-24" : ""} ${
            className || ""
          }`}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
