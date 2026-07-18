import type { ImageMetadata } from "astro"
import accord from "../assets/accord.png"
import accordLogo from "../assets/accordLogo.png"
import meetMike from "../assets/meetMike.png"
import meetMikeLogo from "../assets/meetMikeLogo.png"
import mhm from "../assets/mhm.png"
import mhmLogo from "../assets/mhmLogo.png"
import qswap from "../assets/qswap.png"
import qswapLogo from "../assets/qswapLogo.png"
import reachingapp from "../assets/reachingapp.png"
import reachingappLogo from "../assets/reachingappLogo.png"
import reachingappWeb from "../assets/reachingappWeb.jpeg"
import star from "../assets/star.jpeg"
import starLogo from "../assets/starLogo.png"

export interface Project {
  title: string
  link: string
  image: ImageMetadata
  logo: ImageMetadata
}

export const mobileProjects: Project[] = [
  {
    title: "Accord",
    link: "https://accord-app.com",
    image: accord,
    logo: accordLogo,
  },
  {
    title: "ReachingApp",
    link: "https://reachingapp.com",
    image: reachingapp,
    logo: reachingappLogo,
  },
]

export const webProjects: Project[] = [
  {
    title: "MHM Klätterförening",
    link: "https://mhmklatterforening.se",
    image: mhm,
    logo: mhmLogo,
  },
  {
    title: "STAR Personalförening",
    link: "https://starstockholm.se",
    image: star,
    logo: starLogo,
  },
  {
    title: "Qswap",
    link: "https://qswap.se",
    image: qswap,
    logo: qswapLogo,
  },
  {
    title: "ReachingApp",
    link: "https://reachingapp.com",
    image: reachingappWeb,
    logo: reachingappLogo,
  },
]

export const softwareProjects: Project[] = [
  {
    title: "Mike",
    link: "https://meetmike.se",
    image: meetMike,
    logo: meetMikeLogo,
  },
]
