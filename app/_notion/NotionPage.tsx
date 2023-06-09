import {
  NOTION_COLORS,
  fetchBlockChildren,
  fetchPages,
  notion,
} from "../_notion/lib"
import { NotionRenderer } from "@notion-render/client"
import "@notion-render/client/dist/theme.css"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { GRADIENTS } from "app/gradients"
import Image from "next/image"

export interface NotionPageProps {
  pageId: string
  className?: string
}

export default async function NotionPage({
  pageId,
  className,
}: NotionPageProps) {
  const blocks = await fetchBlockChildren(pageId)

  const renderer = new NotionRenderer({
    client: notion,
  })
  const html = await renderer.render(...blocks)

  return (
    <>
      {blocks.map(async (block) => {
        if (block.type !== "child_database") {
          return null
        }
        const pages = await fetchPages(block.id)
        let items = (pages.results as PageObjectResponse[]).map((page) => ({
          cover_url: page.cover,
          props: page.properties,
        }))
        items.sort((a, b) => {
          const nameA = a.props.Name
          const nameB = b.props.Name
          if (nameA.type !== "title" || nameB.type !== "title") return 0
          if (nameA.title[0].plain_text < nameB.title[0].plain_text) {
            return -1
          }
          if (nameA.title[0].plain_text > nameB.title[0].plain_text) {
            return 1
          }
          return 0
        })
        items.sort((a, b) => {
          const createdA = a.props.Created
          const createdB = b.props.Created
          if (
            createdA.type !== "date" ||
            createdB.type !== "date" ||
            !createdA.date ||
            !createdB.date
          )
            return 0
          if (createdA.date.start < createdB.date.start) {
            return 1
          }
          if (createdA.date.start > createdB.date.start) {
            return -1
          }
          return 0
        })

        const columns = Object.keys(items[0].props).filter(
          (key) => key !== "Name"
        )

        return (
          <div
            key={block.child_database.title}
            className="prose mt-6 max-w-full overflow-x-auto"
          >
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  {columns.map((key) => {
                    return <th key={key}>{key}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const cover_url = item.cover_url
                    ? item.cover_url.type === "file"
                      ? item.cover_url.file.url
                      : item.cover_url.external.url
                    : null
                  return (
                    <tr key={index}>
                      <td className="align-middle">
                        <a href={cover_url || ""} target="_blank">
                          <Image
                            src={cover_url || GRADIENTS[index]}
                            alt="Cover image"
                            unoptimized
                            width={256}
                            height={256}
                            className="my-0 aspect-square object-cover"
                          />
                        </a>
                      </td>
                      <td className="align-middle font-semibold">
                        {item.props.Name.type === "title"
                          ? item.props.Name.title[0].plain_text
                          : null}
                      </td>
                      {columns.map((key) => {
                        if (key === "Name") {
                          return <td key={key}></td>
                        }
                        const prop = item.props[key]
                        if (prop.type === "url") {
                          return (
                            <td key={key} className="align-middle">
                              {prop.url && (
                                <a href={prop.url} target="_blank">
                                  {new URL(prop.url ?? "").hostname}
                                </a>
                              )}
                            </td>
                          )
                        } else if (prop.type === "rich_text") {
                          return (
                            <td key={key} className="align-middle">
                              {prop.rich_text[0].plain_text}
                            </td>
                          )
                        } else if (prop.type === "created_time") {
                          return (
                            <td key={key} className="align-middle">
                              {prop.created_time}
                            </td>
                          )
                        } else if (prop.type === "date") {
                          return (
                            <td key={key} className="align-middle">
                              {prop.date?.start}
                            </td>
                          )
                        } else if (prop.type === "multi_select") {
                          return (
                            <td key={key} className="align-middle">
                              {prop.multi_select.map((option) => {
                                return (
                                  <span
                                    key={option.id}
                                    className="mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700"
                                    style={{
                                      backgroundColor:
                                        NOTION_COLORS[option.color],
                                    }}
                                  >
                                    {option.name}
                                  </span>
                                )
                              })}
                            </td>
                          )
                        } else if (prop.type === "select") {
                          return (
                            <td key={key} className="align-middle">
                              <span className="mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700">
                                {prop.select?.name}
                              </span>
                            </td>
                          )
                        } else {
                          return <td key={key}></td>
                        }
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })}

      <div
        className={
          "notion-render prose prose-slate max-w-none prose-blockquote:font-normal prose-blockquote:not-italic " +
            className || ""
        }
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </>
  )
}
