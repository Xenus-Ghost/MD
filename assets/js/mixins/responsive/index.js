export const breakpoints = {
  phone: 340,
  tablet: 768,
  desktop: 1248,
  desktopWide: 1440,
  FHD: 1920,
}

export default function matchBreakpoint(data = {}) {
  const windowWidth = getWindowWidth()
  for (const breakpoint in this.breakpoints) {
    if (windowWidth > this.breakpoints[breakpoint]) {
      return data.breakpoint
    }
  }
}

export function getWindowWidth() {
  const width = window.innerWidth
  return width
}
