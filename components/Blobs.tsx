export default function Blobs() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 place-items-center">
      <div className="col-start-1 row-start-1 grid grid-flow-col-dense grid-cols-2 place-items-center gap-24">
        <svg
          className="col-span-2 col-start-1 col-end-2 w-1/2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 490 500"
        >
          <defs>
            <linearGradient
              id="a"
              x1="245"
              x2="245"
              y1="473.286"
              y2="26.714"
              gradientTransform="matrix(1 0 0 -1 0 500)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#ff5f6d" />
              <stop offset="1" stopColor="#ffc371" />
            </linearGradient>
          </defs>
          <path
            fill="url(#a)"
            d="M442.8 364.4C382.2 441.8 308.6 478 222.1 472.8s-151-43.9-193.6-116.2S-8.9 221.1 44 166.9 163.6 70.1 244.1 39.1s148.9-3.9 205.2 81.3 54.2 166.5-6.5 244z"
          />
        </svg>
        <svg
          className="col-start-2 row-start-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
        >
          <defs>
            <linearGradient
              id="b"
              x1="250"
              x2="250"
              y1="500"
              y2="0"
              gradientTransform="matrix(1 0 0 -1 0 500)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#4ca1af" />
              <stop offset="1" stopColor="#c4e0e5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#b)"
            d="M428.7 348.7C358 409.9 278.4 456.3 189.7 488S48.9 489 33 396.1s-18.2-189.6-7.1-290.4S88.2-23.8 179.4 19.5s173.3 93.6 246.1 151.1 73.9 116.9 3.2 178.1z"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392 402">
          <defs>
            <linearGradient
              id="c"
              x1="196"
              x2="196"
              y1="364.707"
              y2="37.292"
              gradientTransform="matrix(1 0 0 -1 0 402)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#eecda3" />
              <stop offset="1" stopColor="#ef629f" />
            </linearGradient>
          </defs>
          <path
            fill="url(#c)"
            d="M375.8 289c-17.9 50.1-51.9 75.4-102 75.7s-94.4-5.6-132.7-17.7-76-37.4-113.1-75.7-37.4-77-1-115.9 74.1-69.3 113.1-91 86.6-30.4 142.8-26 90.2 34.8 102 91 8.8 109.5-9.1 159.6z"
          />
        </svg>
      </div>

      <div className="prose col-start-1 row-start-1 w-3/4 rounded-xl bg-slate-100 p-6 shadow-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        magni minima ipsum asperiores, culpa sint cupiditate inventore animi id
        veniam unde vitae nemo a eveniet nobis numquam molestias fuga
        voluptatum?
      </div>
    </div>
  )
}
