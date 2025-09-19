import AccordImage from "../_images/accord.png"
import AccordLogo from "../_images/accordLogo.png"
import ReachingAppImage from "../_images/reachingapp.png"
import ReachingAppWebImage from "../_images/reachingappWeb.jpeg"
import ReachingAppLogo from "../_images/reachingappLogo.png"
import StarImage from "../_images/star.jpeg"
import StarLogo from "../_images/starLogo.png"
import MeetMikeImage from "../_images/meetMike.png"
import MeetMikeLogo from "../_images/meetMikeLogo.png"
import MhmImage from "../_images/mhm.png"
import MhmLogo from "../_images/mhmLogo.png"
import QswapImage from "../_images/qswap.png"
import QswapLogo from "../_images/qswapLogo.png"
import type Image from "next/image"

export interface Project {
  id: string
  title: string
  link: string
  image: React.ComponentProps<typeof Image>["src"]
  logo: React.ComponentProps<typeof Image>["src"]
}

export const mobile_projects: Project[] = [
  {
    id: "accord",
    title: "Accord",
    link: "https://accord-app.com",
    image: AccordImage,
    logo: AccordLogo,
  },
  {
    id: "reachingapp",
    title: "ReachingApp",
    link: "https://reachingapp.com",
    image: ReachingAppImage,
    logo: ReachingAppLogo,
  },
]

export const web_projects: Project[] = [
  {
    id: "mhm",
    title: "MHM Klätterförening",
    link: "https://mhmklatterforening.se",
    image: MhmImage,
    logo: MhmLogo,
  },
  {
    id: "star",
    title: "STAR Personalförening",
    link: "https://starstockholm.se",
    image: StarImage,
    logo: StarLogo,
  },
  {
    id: "qswap",
    title: "Qswap",
    link: "https://qswap.se",
    image: QswapImage,
    logo: QswapLogo,
  },
  {
    id: "reachingapp",
    title: "ReachingApp",
    link: "https://reachingapp.com",
    image: ReachingAppWebImage,
    logo: ReachingAppLogo,
  },
]

export const software_projects: Project[] = [
  {
    id: "mike",
    title: "Mike",
    link: "https://meetmike.se",
    image: MeetMikeImage,
    logo: MeetMikeLogo,
  },
]
