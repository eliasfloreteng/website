import Image from "next/image"

interface PhoneFrameProps extends React.ComponentProps<"div"> {
  imageUrl: React.ComponentProps<typeof Image>["src"]
  altText?: string
}

export function PhoneFrame({
  imageUrl,
  altText,
  className,
  ...props
}: PhoneFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[3rem] border-4 border-gray-800 ${className ?? ""}`}
      {...props}
    >
      <div className="relative h-[580px] w-[280px] border-[14px] border-gray-900 bg-gray-900">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gray-800">
          <Image
            src={imageUrl}
            alt={altText ?? "Phone screen content"}
            className="h-full w-full object-cover object-center"
            width={280}
            height={580}
          />
        </div>
        <div className="absolute left-1/2 top-2 h-[25px] w-[80px] -translate-x-1/2 transform rounded-full bg-gray-900"></div>
        <div className="absolute bottom-2 left-1/2 h-1 w-[120px] -translate-x-1/2 transform rounded-full bg-gray-900 opacity-50"></div>
      </div>
    </div>
  )
}
