import * as React from "react"
import { ChevronLeft, ChevronRight } from "react-feather"

import "../style/PortfolioStory.css"

interface StoryPage {
  eyebrow: string
  title: string
  paragraphs: readonly string[]
}

type TurnDirection = "previous" | "next"

interface TurnState {
  direction: TurnDirection
  target: number
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
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatch = () => setMatches(mediaQuery.matches)

    updateMatch()
    mediaQuery.addEventListener("change", updateMatch)
    return () => mediaQuery.removeEventListener("change", updateMatch)
  }, [query])

  return matches
}

const StoryPageContent = ({
  page,
  pageNumber,
  side,
}: {
  page: StoryPage
  pageNumber: number
  side?: "left" | "right"
}) => (
  <section className={`story-page${side ? ` story-page-${side}` : ""}`}>
    <div className="story-page-content">
      <p className="story-eyebrow">{page.eyebrow}</p>
      <h2>{page.title}</h2>
      {page.paragraphs.map((paragraph, index) => (
        <p key={`${page.title}-${index}`}>{paragraph}</p>
      ))}
    </div>
    <span className="story-page-number" aria-hidden="true">
      {pageNumber}
    </span>
  </section>
)

const PortfolioStory = () => {
  const isSinglePage = useMediaQuery("(max-width: 700px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const [pageIndex, setPageIndex] = React.useState(0)
  const [turn, setTurn] = React.useState<TurnState | null>(null)
  const touchStart = React.useRef<{ x: number; y: number } | null>(null)
  const pageStep = isSinglePage ? 1 : 2
  const lastPageIndex = isSinglePage
    ? STORY_PAGES.length - 1
    : Math.max(0, STORY_PAGES.length - (STORY_PAGES.length % 2 || pageStep))
  const canGoPrevious = pageIndex > 0
  const canGoNext = pageIndex < lastPageIndex

  React.useEffect(() => {
    if (!isSinglePage) {
      setPageIndex(index => index - (index % 2))
    }
    setTurn(null)
  }, [isSinglePage])

  React.useEffect(() => {
    if (prefersReducedMotion && turn) {
      setPageIndex(turn.target)
      setTurn(null)
    }
  }, [prefersReducedMotion, turn])

  const goToPage = React.useCallback(
    (target: number, direction: TurnDirection) => {
      if (turn) return

      const safeTarget = Math.max(0, Math.min(target, lastPageIndex))
      if (safeTarget === pageIndex) return

      if (prefersReducedMotion) {
        setPageIndex(safeTarget)
        return
      }

      setTurn({ direction, target: safeTarget })
    },
    [lastPageIndex, pageIndex, prefersReducedMotion, turn]
  )

  const goPrevious = React.useCallback(() => {
    goToPage(pageIndex - pageStep, "previous")
  }, [goToPage, pageIndex, pageStep])

  const goNext = React.useCallback(() => {
    goToPage(pageIndex + pageStep, "next")
  }, [goToPage, pageIndex, pageStep])

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
        goToPage(0, "previous")
      } else if (event.key === "End") {
        event.preventDefault()
        goToPage(lastPageIndex, "next")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrevious, goToPage, lastPageIndex])

  const finishTurn = () => {
    if (!turn) return
    setPageIndex(turn.target)
    setTurn(null)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current
    const touch = event.changedTouches[0]
    touchStart.current = null
    if (!start || !touch) return

    const distanceX = touch.clientX - start.x
    const distanceY = touch.clientY - start.y
    if (
      Math.abs(distanceX) < 45 ||
      Math.abs(distanceX) <= Math.abs(distanceY)
    ) {
      return
    }

    if (distanceX > 0) goPrevious()
    else goNext()
  }

  const visibleEnd = isSinglePage
    ? pageIndex + 1
    : Math.min(pageIndex + 2, STORY_PAGES.length)
  const pageStatus = isSinglePage
    ? `${pageIndex + 1} / ${STORY_PAGES.length}쪽`
    : `${pageIndex + 1}–${visibleEnd} / ${STORY_PAGES.length}쪽`

  const renderRestingPages = () => (
    <>
      <StoryPageContent
        page={STORY_PAGES[pageIndex]}
        pageNumber={pageIndex + 1}
        side={isSinglePage ? undefined : "left"}
      />
      {!isSinglePage && STORY_PAGES[pageIndex + 1] && (
        <StoryPageContent
          page={STORY_PAGES[pageIndex + 1]}
          pageNumber={pageIndex + 2}
          side="right"
        />
      )}
    </>
  )

  const renderTurningPages = () => {
    if (!turn) return renderRestingPages()

    if (isSinglePage) {
      return (
        <>
          <StoryPageContent
            page={STORY_PAGES[turn.target]}
            pageNumber={turn.target + 1}
          />
          <div
            className={`story-turning-page is-${turn.direction}`}
            onAnimationEnd={finishTurn}
            aria-hidden="true"
          >
            <StoryPageContent
              page={STORY_PAGES[pageIndex]}
              pageNumber={pageIndex + 1}
            />
          </div>
        </>
      )
    }

    const leftIndex = turn.direction === "next" ? pageIndex : turn.target
    const rightIndex =
      turn.direction === "next" ? turn.target + 1 : pageIndex + 1
    const frontIndex =
      turn.direction === "next" ? pageIndex + 1 : turn.target + 1
    const backIndex = turn.direction === "next" ? turn.target : pageIndex

    return (
      <>
        <StoryPageContent
          page={STORY_PAGES[leftIndex]}
          pageNumber={leftIndex + 1}
          side="left"
        />
        <StoryPageContent
          page={STORY_PAGES[rightIndex]}
          pageNumber={rightIndex + 1}
          side="right"
        />
        <div
          className={`story-turning-page is-${turn.direction}`}
          onAnimationEnd={finishTurn}
          aria-hidden="true"
        >
          <div className="story-turn-front">
            <StoryPageContent
              page={STORY_PAGES[frontIndex]}
              pageNumber={frontIndex + 1}
              side="right"
            />
          </div>
          <div className="story-turn-back">
            <StoryPageContent
              page={STORY_PAGES[backIndex]}
              pageNumber={backIndex + 1}
              side="left"
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <article
      className="portfolio-story"
      aria-labelledby="portfolio-story-title"
    >
      <header className="story-heading">
        <p>PORTFOLIO STORY</p>
        <h1 id="portfolio-story-title">만드는 사람의 프롤로그</h1>
        <span>전태현 · Sample edition</span>
      </header>

      <div
        className={`story-book${isSinglePage ? " is-single-page" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => (touchStart.current = null)}
      >
        <div className="story-pages">{renderTurningPages()}</div>
        <button
          type="button"
          className="story-click-zone story-click-previous"
          onClick={goPrevious}
          disabled={!canGoPrevious || Boolean(turn)}
          aria-label="이전 페이지"
          aria-describedby="story-page-status"
          aria-hidden="true"
          tabIndex={-1}
        >
          <span aria-hidden="true">이전</span>
        </button>
        <button
          type="button"
          className="story-click-zone story-click-next"
          onClick={goNext}
          disabled={!canGoNext || Boolean(turn)}
          aria-label="다음 페이지"
          aria-describedby="story-page-status"
          aria-hidden="true"
          tabIndex={-1}
        >
          <span aria-hidden="true">다음</span>
        </button>
      </div>

      <nav className="story-controls" aria-label="스토리 페이지 탐색">
        <button
          type="button"
          onClick={goPrevious}
          disabled={!canGoPrevious || Boolean(turn)}
          aria-label="이전 페이지"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          이전
        </button>
        <p id="story-page-status" aria-live="polite" aria-atomic="true">
          {pageStatus}
        </p>
        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext || Boolean(turn)}
          aria-label="다음 페이지"
        >
          다음
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </nav>
      <p className="story-keyboard-hint">
        키보드 방향키와 Home / End 또는 화면 스와이프로 이동할 수 있습니다.
      </p>
    </article>
  )
}

export default PortfolioStory
