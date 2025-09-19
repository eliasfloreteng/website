import { type Metadata } from "next"
import Script from "next/script"
import BackButton from "./components/BackButton"

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The URL you have entered does not lead to a page. Sorry about that.",
}

/**
 * https://codepen.io/Zaku/pen/vFDdw
 */
export default function ErrorPage() {
  return (
    <main className="relative h-screen w-screen bg-black text-center">
      <canvas id="nCanvasRender" className="h-full w-full" />

      <Script
        key="particlesphere-stats"
        id="particlesphere-stats"
        src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r11/Stats.js"
      />
      <Script
        key="particlesphere-dat-gui"
        id="particlesphere-dat-gui"
        src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min.js"
      />
      <Script
        key="particlesphere-script"
        id="particlesphere-script"
        src="/particlesphere/script.js"
        strategy="lazyOnload"
      />

      <div
        className="absolute inset-0 flex animate-fade-in flex-col items-center justify-center gap-6 px-2 opacity-0"
        style={{
          animationDelay: "2.5s",
        }}
      >
        <h1 className="text-5xl font-semibold text-white">
          This page is lost to the void
        </h1>
        <p className="text-xl font-medium text-slate-400">
          404 &ndash; Page not found
        </p>
      </div>

      <BackButton
        className="absolute bottom-6 right-6 animate-fade-in p-2 text-white opacity-0"
        style={{
          animationDelay: "2.5s",
        }}
      >
        Go back
      </BackButton>
    </main>
  )
}
