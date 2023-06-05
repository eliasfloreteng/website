import khat from "@/public/khat.jpg"
import { Metadata } from "next"
import Image from "next/image"
import { CookieModal } from "./CookieModal"

export const metadata: Metadata = {
  title: "k0Hki.jpg",
  description: "two khats hugging it out",
}

export default function Knocking() {
  return (
    <>
      <Image
        alt="two khats hugging it out"
        className="object-contain"
        src={khat}
        fill
      ></Image>
      <CookieModal />
    </>
  )
}
