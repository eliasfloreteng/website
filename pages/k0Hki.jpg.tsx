import khat from "@/public/khat.jpg"
import Image from "next/image"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"

export default function Knocking() {
  const [cookies, setCookies] = useState(true)

  const audio = useRef(null)
  useEffect(() => {
    let playAttempt = setInterval(() => {
      audio?.current
        // @ts-ignore
        ?.play()
        .then(() => {
          clearInterval(playAttempt)
        })
        .catch(() => {}) // Try again if it can't be played
    }, 500)
  }, [])

  const CookieModal = () => (
    <>
      <div className="fixed h-screen w-screen bg-black/80" />
      <div className="fixed left-1/2 top-1/2 z-50 flex max-h-screen min-h-[70vh] w-screen max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col justify-between gap-8 overflow-y-auto bg-white p-6 shadow-lg sm:rounded-3xl md:w-[70vw] md:p-12">
        <div className="space-y-8 text-center">
          <div className="text-8xl">🍪</div>
          <h1 className="text-5xl font-semibold md:text-7xl">Cookies</h1>
        </div>
        <div className="text-lg text-slate-500 md:text-xl">
          Cookies are used to access and store information on your device, to
          offer personalized content and ads based on your data. By choosing
          &quot;Accept&quot; you consent to this site and its associated
          partners to use cookies. You can refuse or withdraw consent by
          choosing &quot;Manage settings&quot;.
        </div>
        <small className="text-slate-500">
          By clicking accept you agree to this site storing cookies on your
          device
        </small>
        <button
          className="rounded-full bg-slate-800 px-8 py-4 text-2xl font-semibold uppercase text-white transition-colors hover:ring-[3px]"
          onClick={() => {
            setCookies(false)
          }}
        >
          Accept
        </button>
        <small className="cursor-pointer text-center uppercase text-slate-500 hover:underline">
          Manage settings
        </small>
      </div>
    </>
  )

  return (
    <>
      <Head>
        <title>k0Hki.jpg</title>
      </Head>
      <div>
        <Image
          alt="two khats hugging it out"
          src={khat}
          layout="fill"
          objectFit="contain"
        ></Image>
        <audio
          ref={audio}
          src="/knocking.mp3"
          autoPlay
          controls={false}
        ></audio>
      </div>
      {cookies && <CookieModal />}
    </>
  )
}
