import Image from "next/image"
import Link from "next/link"

export default function ProjectCard({
  href,
  title,
  description,
  image,
}: {
  href: string
  title: React.ReactNode
  description: string
  image: string
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl bg-slate-500/10 sm:bg-transparent sm:hover:bg-slate-500/10"
    >
      <Image
        src={image}
        width={360}
        height={190}
        unoptimized
        alt="portfolio"
        className="h-[190px] w-full rounded-2xl object-cover shadow transition-[box-shadow,transform,color] duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg"
      />

      <div className="px-3 py-1">
        <h3 className="py-1 text-2xl font-medium leading-relaxed">{title}</h3>
        <p className="line-clamp-3 py-1">{description}</p>
      </div>
    </Link>
  )
}
