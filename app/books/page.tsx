import { type Metadata } from "next"
import Link from "next/link"
import Markdown from "~/_components/Markdown"

type Book = {
  emoji: string
  title: string
  author: string
  description: string
  duration: string
  podcastUrl: string
  notebookUrl?: string
}

const books: Book[] = [
  {
    emoji: "🤔",
    title: "Factfulness: A Guide to a Fact-Based Worldview ",
    author: "Hans Rosling",
    description: `The provided text consists of excerpts from the book **"Factfulness: Ten Reasons We're Wrong About the World—and Why Things Are Better Than You Think,"** authored by Hans Rosling, Ola Rosling, and Anna Rosling Rönnlund. The primary purpose of the book is to address widespread **global ignorance and misconceptions** by promoting a **fact-based worldview**, which often reveals that the world is much better than commonly perceived. The authors attribute this ignorance to **innate "dramatic instincts,"** such as the tendency to perceive a "gap" between the rich and poor or to constantly fear negative developments, which lead people to systematically answer factual questions incorrectly. The text uses **data, statistics, and personal anecdotes** (including the author's past as a sword-swallower) to explain and counteract these instincts, arguing for the importance of measuring change by rates and using simple tools like the **four income levels** to accurately understand global progress in areas like health, poverty, and population growth.`,
    duration: "21:30",
    podcastUrl:
      "https://notebooklm.google.com/notebook/55189271-7a22-42a8-8ac3-c6500daf3d66?artifactId=b9ee17da-dd2e-4f74-91eb-9bc882d474f3",
    notebookUrl:
      "https://notebooklm.google.com/notebook/55189271-7a22-42a8-8ac3-c6500daf3d66",
  },
  {
    emoji: "🧠",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: `This excerpt from *Sapiens: A Brief History of Humankind* **explores the trajectory of Homo sapiens** from an unremarkable animal to the dominant species, arguing that **cognitive revolutions and the creation of shared myths** facilitated large-scale cooperation and cultural evolution. The text traces significant historical shifts, including the **Agricultural Revolution's unintended consequences** and the rise of imagined orders like nations and corporations. It also **discusses the development of money, empires, and scientific thought**, highlighting how these elements have shaped human societies and our relationship with the natural world. Finally, the source **contemplates the future of humanity**, considering how scientific advancements, particularly in biology, might lead to the emergence of "superhumans" and a new era of intelligent design.`,
    duration: "44:59",
    podcastUrl:
      "https://notebooklm.google.com/notebook/3da96c94-07d4-4729-bfe5-1f5328775eb5/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/3da96c94-07d4-4729-bfe5-1f5328775eb5",
  },
  {
    emoji: "😴",
    title: "Why We Sleep: Power of Sleep and Dreams",
    author: "Matthew Walker",
    description: `This document explores the **critical importance of sleep**, highlighting its profound impact on **brain and body health**. It details the **different stages of sleep**, like NREM and REM, and their respective roles in **memory consolidation, emotional regulation, and creativity**. The text also addresses the **widespread issue of sleep deprivation**, exposing its detrimental effects on **physical health (cardiovascular, metabolic, immune)**, **mental well-being (psychiatric conditions)**, and **cognitive functions** such as learning and attention. Furthermore, it examines societal factors contributing to poor sleep, including **work schedules and artificial light**, while also discussing conditions like **insomnia and narcolepsy**, and the **ineffectiveness and dangers of common sleep aids** compared to behavioural therapies.`,
    duration: "25:39",
    podcastUrl:
      "https://notebooklm.google.com/notebook/3bacd9d8-aec0-4abe-a6ab-f95ef046f290/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/3bacd9d8-aec0-4abe-a6ab-f95ef046f290",
  },
  {
    emoji: "🌱",
    title: "Atomic Habits: Building Better Systems",
    author: "James Clear",
    description: `This document presents excerpts from James Clear's book, *Atomic Habits*, which focuses on the **science of habit formation and change**. Clear outlines a framework based on **four laws of behaviour change: making habits obvious, attractive, easy, and satisfying**. He explains how **identity plays a crucial role** in sustaining habits, advocating for small, consistent actions that reinforce the desired self-image. The text further explores the **neurological underpinnings of habits, particularly the role of dopamine**, and offers **practical strategies** such as environment design, commitment devices, and habit tracking to cultivate positive behaviours and eliminate negative ones.`,
    duration: "26:18",
    podcastUrl:
      "https://notebooklm.google.com/notebook/88806b7a-2aa2-4e16-bc01-e7b1ef5beeb3/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/88806b7a-2aa2-4e16-bc01-e7b1ef5beeb3",
  },
  {
    emoji: "📔",
    title: "Steve Jobs Biography: Early Life and Apple Leadership",
    author: "Walter Isaacson",
    description: `This excerpt provides an **in-depth look at the life and career of Steve Jobs**, drawing from a biography that details his personal history and professional journey. It explores his **childhood experiences, including his adoption and relationship with his adoptive father, Paul Jobs**, highlighting how these shaped his character and design philosophy. The text also chronicles his **founding of Apple with Steve Wozniak**, his initial departure and subsequent return to the company, and the **development of iconic products like the Macintosh, iMac, and iPod**. Furthermore, it touches upon his **leadership style, characterized by a demanding perfectionism and a "reality distortion field,"** as well as his **battles with competitors like Microsoft and Google**. The excerpts conclude with insights into his **later life, including his fight with cancer and his vision for Apple's future,** showing a complex individual driven by a desire to merge technology and artistry.`,
    duration: "33:31",
    podcastUrl:
      "https://notebooklm.google.com/notebook/6f7adba1-fdbc-4a9f-9b8d-9a731a1cf073/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/6f7adba1-fdbc-4a9f-9b8d-9a731a1cf073",
  },
  {
    emoji: "✨",
    title: "Insanely Simple: Apple's Obsession",
    author: "Ken Segall",
    description: `This book, **"Insanely Simple: The Obsession That Drives Apple's Success" by Ken Segall**, published in 2012 by Portfolio/Penguin, explores how a relentless focus on simplicity propelled Apple to extraordinary success. Segall, a creative director who worked on marketing campaigns for Apple and NeXT, analyses how this philosophy, deeply ingrained by Steve Jobs, influenced everything from product design like the iPhone's single button to business practices such as maintaining small, efficient teams. The text contrasts Apple's streamlined approach with the complexities observed at other major technology companies like Intel and Dell, highlighting the impact of clear communication, decisive leadership, and an unwavering commitment to a singular vision. It also details specific examples from Apple's history, including the creation of iconic ad campaigns like "Think different" and the challenges faced in product naming and development, all through the lens of simplicity.`,
    duration: "15:13",
    podcastUrl:
      "https://notebooklm.google.com/notebook/b088d865-90a7-4455-8c95-01173d57d649/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/b088d865-90a7-4455-8c95-01173d57d649",
  },
  {
    emoji: "💪",
    title: "The 4-Hour Body",
    author: "Tim Ferriss",
    description: `This document, "The 4-Hour Body," explores **optimisation across various aspects of human performance and health**. It introduces the **Pareto Principle (80/20 rule)** as a guiding philosophy, focusing on the "minimum effective dose" for maximum results in areas such as **fat loss and muscle gain**. The text covers practical applications like the **Slow-Carb Diet**, **targeted exercise routines (e.g., kettlebell swings, high-intensity training, sprinting mechanics)**, and **strategies for injury prevention and recovery**. Furthermore, it touches upon **sexual performance, sleep optimisation, and longevity**, all while advocating for **data-driven self-experimentation** and critical evaluation of scientific claims.`,
    duration: "23:19",
    podcastUrl:
      "https://notebooklm.google.com/notebook/b2f55fff-db7f-4753-b672-4c7c448b595a/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/b2f55fff-db7f-4753-b672-4c7c448b595a",
  },
  {
    emoji: "✨",
    title: "The Disciplined Pursuit of Less",
    author: "Greg McKeown",
    description: `This text explores **Essentialism**, a disciplined approach to identifying and focusing on what is truly vital while eliminating the trivial many. It contrasts the **"Way of the Essentialist"**—characterised by deliberate choice, focused execution, and creating space for meaningful work—with the **"Way of the Nonessentialist,"** which often leads to being overworked, underutilised, and lacking clear purpose due to an inability to say no. The author highlights **key practices for Essentialists**, such as making difficult trade-offs, prioritising rest and play, setting clear boundaries, and embracing routines, all aimed at achieving a higher level of contribution and a more fulfilling life by doing **"less but better."**`,
    duration: "24:47",
    podcastUrl:
      "https://notebooklm.google.com/notebook/b83a9c90-cb0b-4e46-8ac9-5f99cba2d709/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/b83a9c90-cb0b-4e46-8ac9-5f99cba2d709",
  },
  {
    emoji: "✨",
    title: "The Laws of Simplicity",
    author: "John Maeda",
    description: `This document comprises excerpts from "The Laws of Simplicity" by John Maeda, published by The MIT Press in 2006. The book explores the concept of simplicity across design, technology, business, and life, proposing **ten laws** such as reduction, organisation, and the importance of context, alongside **three keys** for technological simplicity: away, open, and power. Maeda illustrates these principles with practical examples, from the design of an iPod to the organisation of a wardrobe, and discusses how the perception of simplicity is influenced by factors like time savings, knowledge acquisition, and emotional connection. The author, an MIT professor, also reflects on his personal journey to understand simplicity, acknowledging that complexity and simplicity are interdependent and that achieving simplicity often involves a balance between seemingly contradictory elements, such as trusting a "Master" versus relying on an "undo" function.`,
    duration: "53:09",
    podcastUrl:
      "https://notebooklm.google.com/notebook/b8a72990-e5a3-452c-8bf1-9e4436316a31/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/b8a72990-e5a3-452c-8bf1-9e4436316a31",
  },
  {
    emoji: "😠",
    title: "Against Intellectual Monopoly",
    author: "Michele Boldrin and David K. Levine",
    description: `This document, **"Against Intellectual Monopoly" by David K. Levine**, critically examines the concept of "intellectual property," specifically patents and copyrights. It argues that, contrary to common belief, these monopolies often **hinder rather than promote innovation and economic prosperity**, citing historical examples like James Watt's steam engine patent and the early software industry. The text explores how **competition fosters creativity**, using the success of open-source software and the fashion industry as evidence, and analyses the **social costs of intellectual monopolies**, including increased prices and reduced access to vital goods like medicines. It also **challenges the legal and economic justifications for intellectual property**, suggesting that many perceived benefits are outweighed by the inefficiencies and rent-seeking behaviour they encourage, proposing that "ordinary" property rights are sufficient for creators.`,
    duration: "33:02",
    podcastUrl:
      "https://notebooklm.google.com/notebook/a3dad3a3-1063-48ca-9dfb-772fac203ed4/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/a3dad3a3-1063-48ca-9dfb-772fac203ed4",
  },
  {
    emoji: "⏳",
    title: "The 4-Hour Workweek",
    author: "Tim Ferriss",
    description: `This compilation presents excerpts from "The 4-Hour Work Week" by Timothy Ferriss, a book positioned as a **manifesto for a mobile lifestyle** and a blueprint for escaping traditional 9-5 work. It features **endorsements from various influential figures** who praise its unconventional approach to productivity and living. The content outlines key concepts such as **"mini-retirements" and "lifestyle design,"** contrasting them with the conventional deferred-life plan. It also details practical strategies like **automation, outsourcing, and effective time management** through principles like the 80/20 rule and Parkinson's Law, along with methods for **product testing and building a virtual business.** Ferriss challenges readers to **overcome fears and societal norms** to pursue ambitious, exciting lives by prioritising time and mobility over accumulating wealth for a distant retirement.`,
    duration: "22:00",
    podcastUrl:
      "https://notebooklm.google.com/notebook/9f25f90e-d7d6-4517-a766-0c73c4fe01b1/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/9f25f90e-d7d6-4517-a766-0c73c4fe01b1",
  },
  {
    emoji: "🧠",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: `This compilation explores the intricate workings of human judgment and decision-making, primarily through the lens of **System 1** (fast, intuitive thinking) and **System 2** (slower, effortful reasoning). It examines various **cognitive biases and heuristics** that influence our perceptions, such as the **anchoring effect**, where initial values skew subsequent estimates, and the **availability heuristic**, which leads us to judge frequency based on the ease of recall. The text further discusses phenomena like **loss aversion** and **framing effects**, demonstrating how the presentation of information significantly impacts choices, often leading to decisions that deviate from rational economic models. Finally, it touches on the **illusion of skill** and **planning fallacy**, highlighting our tendency towards overconfidence and unrealistic optimism, even in the face of contradictory evidence, and proposes methods like the **premortem** to mitigate such errors.`,
    duration: "41:33",
    podcastUrl:
      "https://notebooklm.google.com/notebook/52f797a5-a983-4419-b608-5f007a97c171/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/52f797a5-a983-4419-b608-5f007a97c171",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "Building Better Parent-Child Relationships (in Swedish)",
    author: "Martin Forster",
    description: `This document offers a comprehensive guide to **democratic parenting**, emphasising a positive parent-child relationship over strict discipline. It highlights the importance of **warmth and clear boundaries**, asserting that children need both to thrive and develop self-confidence. The text supports its claims with **research findings**, detailing how effective communication, play, and consistent routines can prevent common behavioural issues like tantrums and sibling conflicts. Additionally, it explores how **parental expectations**, particularly concerning gender roles, and the judicious use of **attention and consequences** shape a child's development, all while advocating for a balanced approach to modern challenges like screen time and peer problems.`,
    duration: "05:51",
    podcastUrl:
      "https://notebooklm.google.com/notebook/a84a0b9b-61d4-46e8-b009-aadd2a075b41/audio",
    notebookUrl:
      "https://notebooklm.google.com/notebook/a84a0b9b-61d4-46e8-b009-aadd2a075b41",
  },
]

export const metadata: Metadata = {
  title: "Books in Podcast Form",
  description:
    "A collection of books I've enjoyed, with AI-generated podcast summaries.",
}

export default function BooksPage() {
  return (
    <main>
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-2 text-5xl font-bold uppercase text-white drop-shadow-lg md:text-7xl">
          Books in Podcast Form
        </h1>
        <p className="mb-8 font-soft text-lg text-gray-200 md:text-2xl">
          {metadata.description}
        </p>
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {books.map((book) => (
            <div
              key={book.title}
              className="relative flex w-full max-w-full flex-col items-start rounded-xl border border-gray-800 bg-black bg-opacity-70 p-6 text-left shadow-lg transition-transform"
            >
              <span className="mb-2 text-4xl">{book.emoji}</span>
              <h2 className="text-2xl font-bold text-white">{book.title}</h2>
              <h3 className="text-md mb-2 font-semibold text-gray-300">
                by {book.author}
              </h3>
              <div className="mb-2 text-sm text-gray-400">
                Duration: {book.duration}
              </div>
              <Markdown
                content={book.description}
                className="mb-4 max-h-[350px] w-full overflow-auto break-words"
              />
              <Link
                href={book.podcastUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block rounded-lg border border-blue-500 bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                🎧 Listen to AI Podcast
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
