import * as React from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import HTMLFlipBook from "react-pageflip"

import "../style/PortfolioStory.css"

interface StoryPage {
  eyebrow: string
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
    paragraphs: [
      "'아 이거 망했네..', 이건 내가 에이전트형 LLM을 보고 처음 한 말이다.",
      "나는 공주대학교 소프트웨어학과의 학생이다.",
      "개발은 고2 때 처음 접해봤으며, Hello World가 참 반가웠던 기억이 있다.",
      "이후 개발을 깊게 공부하진 않았다. 그저 다른 학생들처럼 입시를 준비하고, 학교생활을 했을 뿐이다.",
      "22년 5월 나는 나라의 부름을 받고 복무를 시작했다.",
      "체계병으로 복무하기 위해 기술행정병 신청을 2번이나 했다. 군대에 가려고 헌혈도 하고, 자격증도 따야 하는 세상이 참 웃겼다.",
      "내가 군에서 맡은 일은 전산관리, 군용 서버 관리였다",
      "어느날 여단장의 명령으로 여단 홈페이지에 D-Day 카운터를 만드는 임무를 받게되었다.",
      "이 때 까지만 해도 난 정말 기본적인 웹개발 밖에 몰랐다.",
    ],
  },
  {
    eyebrow: "01 · Curiosity",
    paragraphs: [
      "아는 사람은 알겠지만 군대의 컴퓨터는 인트라넷에 연결되어 있다.",
      "인트라넷은 우리가 흔하게 접하는 인터넷과는 반대되는 개념이다. 완전한 폐쇄망. 즉, 구글의 풍부한 정보에 접할 수 없는 환경이다.",
      "이런 환경에서 나같은 개발 초보가 IDE도 없이 메모장으로 코드를 짠다는 건 정말 어려운 일이었다.",
      "일단 웹 개발 관련 책을 한 권 주문했다.",
      "난 구글 대신 그 책을 뒤져가며 코드를 짰다.",
      "일과시간이 끝난 후에도 통신실에 박혀서 코드를 짰다.",
      "정훈과에서 아이콘과 같은 것들을 제작해 주어서 그나마 편하게 진행할 수 있었다.",
      "약 1주일 간의 노력 끝에 D-Day 카운터를 완성해서 여단 홈페이지에 적용했고, 난 포상휴가 4박 5일을 받았다.",
      "이 때 처음으로 개발에 관심이 생기고 개발자도 살아가는 나를 상상했던 것 같다.",
    ],
  },
  {
    eyebrow: "02 · Practice",
    paragraphs: [
      "이후 당직근무를 서며 메모장에 코드를 쳐서 만든 당직 현황판도 당직 근무자들이 아주 유용하게 사용했다.",
      "다른 근무자들이 필요한 기능, 오류 등을 피드백해주면 난 다음 근무 때 반영했다.",
      "지금도 누군가가 업데이트하며 사용하고 있다면 참 뿌듯할텐데.",
      "어느날, 동기가 신기한 걸 보여준다며 GPT라는 걸 보여줬다. 난 '그저 조금 더 업그레이드된 심심이구나.'라고 생각했다.",
      "하지만 누가 알았을까.. 그 업그레이드된 심심이가 내가 할 귀찮은 일들을 모두 해줄 줄이야..",
      "누군가는 AI로 인해 개발자가 망했다고 한다. 신입으로 입사해야 하는 내 입장에서 어느정도는 동의한다. 하지만 어쩌겠는가 이미 그 세상은 왔고 난 거기에 적응해서 살 길을 찾아야지..",
    ],
  },
  {
    eyebrow: "03 · Next Chapter",
    paragraphs: [
      "길었던 군생활을 마치고, 나는 개인 블로그를 개설했다. 물론 일반적인 네이버, 티스토리같은 블로그는 아니다. gatsby 기반으로 직접 만든 블로그이다.",
      "기술 블로그를 목적으로 만들었지만, 뭘 써야할 지 감도 안잡혔기에 일단 여행을 다니며 여행 기록을 작성했다.",
      "마크다운으로 글을 쓴다는 게 정말 어색했지만 한편으론 내가 꽤나 멋있어 보였다.",
      "이후 개발을 더 깊게 공부하기 위해 정보통신공학과에서 소프트웨아학과로 전과했다.",
      "납땜, 회로이론같은 지루한 과목들을 배우다가, 내가 관심있는 분야를 배우니 숨통이 트였다.",
      "학기 중에는 강의를 열심히 들었고, 방학 기간에는 내가 만들고 싶은 걸 만들었다. Gatsby 블로그 다음 프로젝트는 Grav였다.",
      "IDE를 열고 원하는 작업 폴더를 찾아서 여는 것이 불편해서 만든 프로그램이다. Electron으로 만들었고, Tailwild CSS도 처음 사용해봤다.",
    ],
  },
  {
    eyebrow: "03 · Next Chapter",
    paragraphs: [
      "디자인이 참 어려웠다. 지금 봐도 정말 촌스러운 디자인이다. 게임 배포 플랫폼인 스팀의 라이브러리를 따라한 디자인이었는데, 광택 효과를 만드는 게 참 어려웠다. 스팀의 플레이타임과 비슷하게 개발 시간을 기록하는 기능도 있어서 한 동안 참 유용하게 사용했던 기억이 있다.",
      "다음으로 진행했던 프로젝트는 Lanssenger이다. C++강의시간에 한 팀플이었다. AI가 막 발전하던 시기여서 AI를 사용해서 정말 엉망진창으로 만들었다. 버전관리, 팀원과의 협업도 매끄럽지 못해 참 어려웠던 기억이 있다. 이 때 Git 협업 플로우의 중요성을 깨달았다.",
      "이를 기반으로 다음 팀플 DevChat에선 조금 더 부드러운 협업을 진행할 수 있었다. 이번엔 웹으로 진행했기 때문에 shadcn/ui도 사용해보았다.",
      "이 무렵쯤 에이전트형 AI를 접했고, 난 '아 이거 망했네...'라고 말했다. 생산성을 높일 생각은 안하고 내 자리를 위협한다는 생각만 하고 있었던 것이다. 그래서 더욱 에이전트형 AI는 기피했다. 그냥 쓰고싶지 않았다.",
    ],
  },
  {
    eyebrow: "03 · Next Chapter",
    paragraphs: [
      "25년도 여름방학 기간엔 AWS 기반 AI 웹서비스 교육과정을 수료했고, 해당 과정에서 Grand-trade-Auto 라는 중고차 가격 예측 웹서비스를 개발했다. 중고차 가격 정보 수집을 위한 웹 크롤러를 만들고, 프론트엔드를 담당했다. 이전에 사용해봐서 익숙한 shadcn/ui를 적극 활용했다",
      "이후 개인 데이터를 기반으로 재밌는 통계들을 보여주고, 그걸 인스타그램과 같은 SNS에 공유할 수 있는 서비스인 LifeStats",
      "공주대학교 학생들을 위한 소모임 앱 Pinple 등의 서비스를 만들었다.",
    ],
  },
  {
    eyebrow: "03 · Next Chapter",
    paragraphs: [
      "26년도 1학기에는 캡스톤디자인에 참가하여 맞춤형 취업 AI Agent인 PICT를 만들었다. 프론트엔드로 참가했다. BE 2명 AI 1명과 함께 진행했다. 나는 Figma 와이어프레임을 설계하고, 웹에 구현까지 진행했다.",
      "이 즈음 부터 에이전트형 AI를 적극 활용했던 것 같다. 이전엔 그저 LLM에게 물어보고, 코드를 짜맞추며 프로젝트를 진행했다면, 이 프로젝트에선 Figma MCP를 연결하여 활용하고, 서브에이전트를 활용하는 등 기본적인 하네스 구조를 활용하여 생산성을 높일 수 있었다.",
      "이 프로젝트 이후부터 '거부하기보단 받아들이고 잘 활용하자.'라는 생각을 가졌다.",
    ],
  },
  {
    eyebrow: "03 · Next Chapter",
    paragraphs: [
      "이 무렵쯤 멋쟁이사자처럼 대학 14기에 뽑혀 활동을 시작하게 되었다.",
      "Frontend 파트로 들어갔으며, 1학기에는 기초 공부, 방학기간에는 아이디어톤, 해커톤 등 여러 대회에 참가했다.",
      "아이디어톤에서는 구글 검색 결과의 신뢰도를 AI로 분석해 별점으로 보여주는 확장 프로그램 Clican을 구현했다.",
      "무박 2일 해커톤에서는 종강시즌 대학가 카페들의 유휴시간을 예술인 클래스 공간으로 재활용하는 매칭 플랫폼을 개발했다.",
      "실무에서 일하고 있는 팀원이 있어서 이 날은 코드 짜는 법을 배웠다기 보단, 부드럽고 깔끔한 협업, 버전관리를 배울 수 있었다. 깔끔한 git flow는 개발을 편하게 해준다는 걸 다시 깨달았다.",
      "이 날도 역시 AI를 적극 활용했다.",
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
  ({ page, pageNumber }, ref) => {
    const filterId = `story-paper-noise-${React.useId().replace(/:/g, "")}`

    return (
      <div
        className={`story-page story-page--${
          pageNumber % 2 === 1 ? "left" : "right"
        }`}
        ref={ref}
        role="group"
        aria-label={`${pageNumber} / ${STORY_PAGES.length} 페이지`}
      >
        <svg
          className="story-paper-noise"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
        >
          <filter
            id={filterId}
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves={4}
              seed={pageNumber * 17}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
        <section className="story-page-content">
          <p className="story-eyebrow">{page.eyebrow}</p>
          {page.paragraphs.map((paragraph, index) => (
            <p key={`${pageNumber}-${index}`}>{paragraph}</p>
          ))}
        </section>
        <span className="story-page-number" aria-hidden="true">
          {pageNumber}
        </span>
      </div>
    )
  }
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
              key={`story-page-${index}`}
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
