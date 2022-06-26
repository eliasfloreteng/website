import NextImage, { ImageLoader, ImageProps } from "next/image"

const loader: ImageLoader = ({ src }) => src
export { loader }

export default function Image(props: ImageProps) {
  if (process.env.EXPORTING) {
    return <NextImage {...props} loader={loader} unoptimized />
  } else {
    return <NextImage {...props} />
  }
}
