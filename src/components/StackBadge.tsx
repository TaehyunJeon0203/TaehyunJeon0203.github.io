import * as React from "react"

export interface StackBadgeProps {
  name: string
  logo?: string
  backgroundColor: string
  blackLogo?: boolean
}

const encodeBadgeName = (name: string): string =>
  encodeURIComponent(name.replace(/-/g, "--").replace(/_/g, "__"))

const StackBadge = ({
  name,
  logo,
  backgroundColor,
  blackLogo = false,
}: StackBadgeProps) => {
  const color = encodeURIComponent(backgroundColor.replace(/^#/, ""))
  const logoName = encodeURIComponent(logo ?? name)
  const src = `https://img.shields.io/badge/${encodeBadgeName(
    name
  )}-${color}?style=flat-square&logo=${logoName}&logoColor=${
    blackLogo ? "black" : "white"
  }`

  return (
    <img
      className="portfolio-stack-badge"
      src={src}
      alt={name}
      height={20}
      decoding="async"
    />
  )
}

export default StackBadge
