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
      <div className="overflow-hidden rounded-[3rem] border-4 border-gray-800">
        <div className="h-[360px] w-[576px] border-[14px] border-gray-900 bg-gray-900">
          <div className="h-full w-full overflow-hidden rounded-[2rem] bg-gray-800">
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
      <div className="-mt-1 h-[24px] w-[calc(576px+32px)] rounded-b-[3rem] rounded-t-md border-2 border-gray-800 bg-gray-900" />
    </div>
  )
}
