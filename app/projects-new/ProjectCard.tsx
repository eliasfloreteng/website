import Image from "next/image"
import Link from "next/link"

export default function ProjectCard({
  href,
  title,
  image,
  number,
}: {
  href: string
  title: React.ReactNode
  image: string
  number: number
}) {
  return (
    <Link
      href={href}
      className="group relative grid h-72 w-full overflow-hidden shadow-2xl"
    >
      <div className="z-10 col-start-1 row-start-1 bg-black bg-opacity-10"></div>
      <div className="z-10 col-start-1 row-start-1 flex flex-col justify-between">
        <h1 className="m-10 max-w-max rounded-md bg-red-500 px-2 py-1 text-xl font-bold text-slate-50">
          {title}
        </h1>
        <h1 className="m-10 text-xl font-bold text-slate-50">
          {number.toString().padStart(2, "0")}
        </h1>
      </div>
      <Image
        src={image}
        fill
        unoptimized
        alt="portfolio"
        className="col-start-1 row-start-1 h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-125"
      />
    </Link>
  )
}
