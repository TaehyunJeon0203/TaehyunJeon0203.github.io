import * as React from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import HTMLFlipBook from "react-pageflip"

import "../style/PortfolioStory.css"

interface StoryPage {
  eyebrow: string
  title: string
  paragraphs: readonly string[]
}

type PageOrientation = "portrait" | "landscape"

interface PageFlipApi {
  flip: (page: number) => void
  flipNext: () => void
  flipPrev: () => void
  getCurrentPageIndex: () => number
  turnToPage: (page: number) => void
}

interface PageFlipHandle {
  pageFlip: () => PageFlipApi
}

interface PageFlipEvent<T> {
  data: T
  object: PageFlipApi
}

interface PageFlipInitData {
  page: number
  mode: PageOrientation
}

interface StoryPageProps {
  page: StoryPage
  pageNumber: number
}

// 임시 프롤로그입니다. 실제 원고로 교체할 때 이 배열의 내용만 바꾸면 됩니다.
const STORY_PAGES = [
  {
    eyebrow: "Prologue",
    title: "작은 불편에서 시작된 이야기",
    paragraphs: [
      "무언가를 만드는 일은 늘 사소한 질문에서 시작되었습니다. 왜 이 과정은 이렇게 오래 걸릴까, 조금 더 자연스러운 방법은 없을까.",
      "그 질문을 화면 위에 옮기고, 손에 잡히는 서비스로 완성하는 과정이 좋았습니다.",
    ],
  },
  {
    eyebrow: "01 · Curiosity",
    title: "호기심을 코드로 옮기다",
    paragraphs: [
      "프론트엔드를 중심으로 사용자가 처음 마주하는 장면을 설계합니다. 낯선 기능도 설명 없이 이해할 수 있는 흐름을 고민합니다.",
      "필요하다면 데이터와 서버의 경계까지 건너가며, 아이디어가 실제로 작동하는 데 필요한 기술을 배웁니다.",
    ],
  },
  {
    eyebrow: "02 · Practice",
    title: "완성하며 배우는 사람",
    paragraphs: [
      "개인 프로젝트와 팀 프로젝트를 거치며 빠르게 시도하고, 피드백을 받고, 다시 다듬는 습관을 길렀습니다.",
      "완벽한 첫 줄보다 끝까지 작동하는 결과물을 중요하게 생각합니다. 그 과정에서 얻은 기준은 다음 작업의 출발점이 됩니다.",
    ],
  },
  {
    eyebrow: "03 · Next Chapter",
    title: "다음 장을 준비하며",
    paragraphs: [
      "장소에 구애받지 않고 기술로 문제를 해결하는 개발자를 목표로 합니다. 더 좋은 사용자 경험과 오래 유지되는 구조를 함께 만들고 싶습니다.",
      "이 짧은 프롤로그 뒤의 이야기는, 앞으로 완성할 서비스와 배움으로 계속 채워질 예정입니다.",
    ],
  },
] as const satisfies readonly StoryPage[]

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  )

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatch = () => setMatches(mediaQuery.matches)

    updateMatch()
    mediaQuery.addEventListener("change", updateMatch)
    return () => mediaQuery.removeEventListener("change", updateMatch)
  }, [query])

  return matches
}

const StoryPageContent = React.forwardRef<HTMLDivElement, StoryPageProps>(
  ({ page, pageNumber }, ref) => (
    <div
      className={`story-page story-page--${
        pageNumber % 2 === 1 ? "left" : "right"
      }`}
      ref={ref}
      role="group"
      aria-label={`${pageNumber} / ${STORY_PAGES.length} 페이지`}
    >
      <section className="story-page-content">
        <p className="story-eyebrow">{page.eyebrow}</p>
        <h2>{page.title}</h2>
        {page.paragraphs.map((paragraph, index) => (
          <p key={`${page.title}-${index}`}>{paragraph}</p>
        ))}
      </section>
      <span className="story-page-number" aria-hidden="true">
        {pageNumber}
      </span>
    </div>
  )
)

StoryPageContent.displayName = "StoryPageContent"

const PortfolioStory = () => {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const isMobile = useMediaQuery("(max-width: 700px)")
  const bookRef = React.useRef<PageFlipHandle>(null)
  const [currentPage, setCurrentPage] = React.useState(0)
  const [orientation, setOrientation] =
    React.useState<PageOrientation>("landscape")
  const lastPageIndex =
    orientation === "portrait" ? STORY_PAGES.length - 1 : STORY_PAGES.length - 2
  const canGoPrevious = currentPage > 0
  const canGoNext = currentPage < lastPageIndex

  const goToPage = React.useCallback(
    (page: number) => {
      const pageFlip = bookRef.current?.pageFlip()
      if (!pageFlip) return

      if (prefersReducedMotion) pageFlip.turnToPage(page)
      else pageFlip.flip(page)
    },
    [prefersReducedMotion]
  )

  const goPrevious = React.useCallback(() => {
    const pageFlip = bookRef.current?.pageFlip()
    if (!pageFlip || !canGoPrevious) return

    if (prefersReducedMotion) {
      const pageStep = orientation === "portrait" ? 1 : 2
      pageFlip.turnToPage(Math.max(0, currentPage - pageStep))
    } else {
      pageFlip.flipPrev()
    }
  }, [canGoPrevious, currentPage, orientation, prefersReducedMotion])

  const goNext = React.useCallback(() => {
    const pageFlip = bookRef.current?.pageFlip()
    if (!pageFlip || !canGoNext) return

    if (prefersReducedMotion) {
      const pageStep = orientation === "portrait" ? 1 : 2
      pageFlip.turnToPage(Math.min(lastPageIndex, currentPage + pageStep))
    } else {
      pageFlip.flipNext()
    }
  }, [canGoNext, currentPage, lastPageIndex, orientation, prefersReducedMotion])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return

      const target = event.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goPrevious()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        goNext()
      } else if (event.key === "Home") {
        event.preventDefault()
        goToPage(0)
      } else if (event.key === "End") {
        event.preventDefault()
        goToPage(lastPageIndex)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrevious, goToPage, lastPageIndex])

  const handleInit = (event: PageFlipEvent<PageFlipInitData>) => {
    setCurrentPage(event.data.page)
    setOrientation(event.data.mode)
  }

  const handleFlip = (event: PageFlipEvent<number>) => {
    setCurrentPage(event.data)
  }

  const handleOrientationChange = (event: PageFlipEvent<PageOrientation>) => {
    setOrientation(event.data)
    setCurrentPage(event.object.getCurrentPageIndex())
  }

  return (
    <article className="portfolio-story" aria-label="포트폴리오 스토리">
      <div className="story-book-shell">
        <HTMLFlipBook
          key={`${isMobile ? "mobile" : "desktop"}-${
            prefersReducedMotion ? "reduced-motion" : "animated"
          }`}
          ref={bookRef}
          className="story-flipbook"
          style={{}}
          width={isMobile ? 460 : 600}
          height={isMobile ? 667 : 870}
          size="stretch"
          minWidth={240}
          maxWidth={isMobile ? 460 : 680}
          minHeight={348}
          maxHeight={isMobile ? 667 : 986}
          startPage={currentPage}
          drawShadow={!prefersReducedMotion}
          flippingTime={prefersReducedMotion ? 1 : 800}
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.32}
          showCover={false}
          mobileScrollSupport={false}
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners={false}
          disableFlipByClick
          onInit={handleInit}
          onFlip={handleFlip}
          onChangeOrientation={handleOrientationChange}
        >
          {STORY_PAGES.map((page, index) => (
            <StoryPageContent
              key={page.title}
              page={page}
              pageNumber={index + 1}
            />
          ))}
        </HTMLFlipBook>
        <button
          type="button"
          className="story-page-navigation story-page-previous"
          onClick={goPrevious}
          disabled={!canGoPrevious}
          aria-label="이전 페이지"
        >
          <ChevronLeft size={18} aria-hidden="true" focusable="false" />
        </button>
        <button
          type="button"
          className="story-page-navigation story-page-next"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="다음 페이지"
        >
          <ChevronRight size={18} aria-hidden="true" focusable="false" />
        </button>
      </div>
    </article>
  )
}

export default PortfolioStory
