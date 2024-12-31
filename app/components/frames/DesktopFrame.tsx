import Image from "next/image"

interface DesktopFrameProps extends React.ComponentProps<"div"> {
  imageUrl: React.ComponentProps<typeof Image>["src"]
  altText?: string
}

export function DesktopFrame({
  imageUrl,
  altText,
  className,
  ...props
}: DesktopFrameProps) {
  return (
    <div className={`flex flex-col items-center ${className ?? ""}`} {...props}>
      <div className="overflow-hidden rounded-[2rem] border-[3px] border-gray-800 md:rounded-[3rem] md:border-4">
        <div className="h-[180px] w-[288px] border-[8px] border-gray-900 bg-gray-900 md:h-[360px] md:w-[576px] md:border-[14px]">
          <div className="h-full w-full overflow-hidden rounded-[1.25rem] bg-gray-800 md:rounded-[2rem]">
            <Image
              src={imageUrl}
              alt={altText ?? "Desktop screen content"}
              className="h-full w-full object-cover object-top"
              width={576}
              height={360}
            />
          </div>
        </div>
      </div>
      <div className="-mt-1 h-[12px] w-[calc(288px+16px)] rounded-b-[1.5rem] rounded-t-md border-[1.5px] border-gray-800 bg-gray-900 md:h-[24px] md:w-[calc(576px+32px)] md:rounded-b-[3rem] md:border-2" />
    </div>
  )
}
