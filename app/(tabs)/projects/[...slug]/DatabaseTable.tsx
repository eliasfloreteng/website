import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { NOTION_COLORS, fetchBlockChildren, fetchPages } from "app/_notion/lib"
import { GRADIENTS } from "app/gradients"
import Image from "next/image"
import { urlToSlug } from "../lib"

function TableRow({
  title,
  cover_url,
  properties,
  columns,
  highlight,
}: {
  title: string
  cover_url: string
  properties: PageObjectResponse["properties"]
  columns: string[]
  highlight?: boolean
}) {
  return (
    <tr className={highlight ? "bg-red-100" : ""}>
      <td className="align-middle">
        <a href={cover_url} target="_blank">
          <Image
            src={cover_url}
            alt="Cover image"
            unoptimized
            width={256}
            height={256}
            className="my-0 aspect-square object-cover"
          />
        </a>
      </td>
      <td className="align-middle font-semibold">{title}</td>
      {columns.map((key) => {
        if (key === "Name") {
          return <td key={key}></td>
        }
        const prop = properties[key]
        if (prop?.type === "url") {
          return (
            <td key={key} className="align-middle">
              {prop.url && (
                <a href={prop.url} target="_blank">
                  {new URL(prop.url ?? "").hostname}
                </a>
              )}
            </td>
          )
        } else if (prop?.type === "rich_text") {
          return (
            <td key={key} className="align-middle">
              {prop.rich_text[0]?.plain_text}
            </td>
          )
        } else if (prop?.type === "created_time") {
          return (
            <td key={key} className="align-middle">
              {prop.created_time}
            </td>
          )
        } else if (prop?.type === "date") {
          return (
            <td key={key} className="align-middle">
              {prop.date?.start}
            </td>
          )
        } else if (prop?.type === "multi_select") {
          return (
            <td key={key} className="align-middle">
              {prop.multi_select.map((option) => {
                return (
                  <span
                    key={option.id}
                    className="mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700"
                    style={{
                      backgroundColor: NOTION_COLORS[option.color],
                    }}
                  >
                    {option.name}
                  </span>
                )
              })}
            </td>
          )
        } else if (prop?.type === "select") {
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
}

export default async function DatabaseTable({
  pageId,
  slugs,
}: {
  pageId: string
  slugs: string[]
}) {
  const blocks = await fetchBlockChildren(pageId)

  const block = blocks.find((block) => block.type === "child_database")
  if (!block) return <></>

  const pages = await fetchPages(block.id)
  const items = (pages.results as PageObjectResponse[]).map((page) => ({
    cover_url: page.cover,
    props: page.properties,
    url: page.url,
    slug: urlToSlug(page.url),
  }))

  items.sort((a, b) => {
    const nameA = a.props.Name
    const nameB = b.props.Name
    if (nameA?.type !== "title" || nameB?.type !== "title") return 0
    if (
      nameA.title[0] &&
      nameB.title[0] &&
      nameA.title[0].plain_text < nameB.title[0].plain_text
    ) {
      return -1
    }
    if (
      nameA.title[0] &&
      nameB.title[0] &&
      nameA.title[0].plain_text > nameB.title[0].plain_text
    ) {
      return 1
    }
    return 0
  })

  items.sort((a, b) => {
    const createdA = a.props.Created
    const createdB = b.props.Created
    if (
      createdA?.type !== "date" ||
      createdB?.type !== "date" ||
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

  const columns = items[0]?.props
    ? Object.keys(items[0]?.props).filter((key) => key !== "Name")
    : []

  return (
    <div className="prose mt-6 max-w-full overflow-x-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            {columns.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const title =
              item.props.Name?.type === "title"
                ? item.props.Name.title[0]?.plain_text
                : null
            const cover_url = item.cover_url
              ? item.cover_url.type === "file"
                ? item.cover_url.file.url
                : item.cover_url.external.url
              : null
            return (
              <TableRow
                key={index}
                title={title ?? ""}
                cover_url={cover_url ?? GRADIENTS[index] ?? ""}
                properties={item.props}
                columns={columns}
                highlight={item.slug !== undefined && slugs.includes(item.slug)}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
