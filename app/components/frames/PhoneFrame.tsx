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
      className={`overflow-hidden rounded-[2rem] border-[3px] border-gray-800 md:rounded-[3rem] md:border-4 ${className ?? ""}`}
      {...props}
    >
      <div className="relative h-[400px] w-[200px] border-[10px] border-gray-900 bg-gray-900 md:h-[580px] md:w-[280px] md:border-[14px]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-gray-800 md:rounded-[2rem]">
          <Image
            src={imageUrl}
            alt={altText ?? "Phone screen content"}
            className="h-full w-full object-cover object-center"
            width={280}
            height={580}
          />
        </div>
        <div className="absolute left-1/2 top-2 h-[18px] w-[60px] -translate-x-1/2 transform rounded-full bg-gray-900 md:h-[25px] md:w-[80px]"></div>
        <div className="absolute bottom-2 left-1/2 h-1 w-[90px] -translate-x-1/2 transform rounded-full bg-gray-900 opacity-50 md:w-[120px]"></div>
      </div>
    </div>
  )
}
