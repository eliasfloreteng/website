interface ProjectSectionProps {
  id: string
  title: string
  subtitle: string
  children: React.ReactNode
}

export function ProjectSection({
  id,
  title,
  subtitle,
  children,
}: ProjectSectionProps) {
  return (
    <section
      id={id}
      className="flex h-screen flex-col items-center justify-center border-t border-gray-900"
    >
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-6xl font-bold uppercase">{title}</h1>
        <p className="font-soft text-lg">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}
