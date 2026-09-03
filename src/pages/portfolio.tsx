import * as React from "react"
import { graphql } from "gatsby"
import type { PageProps } from "gatsby"
import { GitHub, Mail, PenTool } from "react-feather"

import Layout from "../components/layout"
import Seo from "../components/seo"
import StackBadge from "../components/StackBadge"
import ArtminMoodboard from "../images/portfolio/artmin-moodboard.webp"
import GrandTradeAutoPreview from "../images/portfolio/grand-trade-auto.gif"
import GravPreview from "../images/portfolio/grav-preview.gif"
import LifeStatsImageOne from "../images/portfolio/lifestats-01.png"
import LifeStatsImageTwo from "../images/portfolio/lifestats-02.png"
import LifeStatsImageThree from "../images/portfolio/lifestats-03.jpg"
import LifeStatsImageFour from "../images/portfolio/lifestats-04.png"
import LifeStatsImageFive from "../images/portfolio/lifestats-05.png"
import LifeStatsImageSix from "../images/portfolio/lifestats-06.png"
import PinpleImageOne from "../images/portfolio/pinple-01.png"
import PinpleImageTwo from "../images/portfolio/pinple-02.png"
import PinpleImageThree from "../images/portfolio/pinple-03.png"
import PinpleImageFour from "../images/portfolio/pinple-04.png"
import ArtminDemoVideo from "../videos/artmin-demo.mp4"
import PictDemoVideo from "../videos/pict-demo.mp4"
import DriendScreenshotOne from "../images/portfolio/driend-screenshot-01.png"
import DriendScreenshotTwo from "../images/portfolio/driend-screenshot-02.png"
import DriendScreenshotThree from "../images/portfolio/driend-screenshot-03.png"
import DriendScreenshotFour from "../images/portfolio/driend-screenshot-04.png"
import DriendScreenshotFive from "../images/portfolio/driend-screenshot-05.png"
import DriendScreenshotSix from "../images/portfolio/driend-screenshot-06.png"
import "../style/portfolio.css"

type ContentItem = string | { what: string; result?: string }

interface StackBadgeStyle {
  backgroundColor: string
  logo?: string
  blackLogo?: boolean
}

interface ActivityProject {
  title: string
  content: ContentItem[]
  link?: string
  video?: { src: string; width: number; height: number }
  images?: {
    src: string
    alt: string
    width: number
    height: number
    size?: "default" | "compact" | "medium" | "wide"
  }[]
}

interface Activity {
  title: string
  role: string
  period: string
  stacks: string[]
  description: ContentItem[]
  projects?: ActivityProject[]
}

interface SideProject {
  date: string
  title: string
  subtitle: string
  description: string
  stacks: string[]
  list: ContentItem[]
  link?: string
  additionalLinks?: { label: string; href: string }[]
  video?: { src: string; width: number; height: number }
  images?: {
    src: string
    alt: string
    width: number
    height: number
    size?: "default" | "compact" | "medium" | "wide"
  }[]
}

interface SkillCategory {
  title: string
  items: string[]
}

interface PortfolioPageData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const STACK_BADGE_STYLES: Record<string, StackBadgeStyle> = {
  JavaScript: {
    backgroundColor: "#F0DB4F",
    logo: "javascript",
    blackLogo: true,
  },
  TypeScript: { backgroundColor: "#3178C6", logo: "typescript" },
  React: { backgroundColor: "#61DAFB", logo: "react", blackLogo: true },
  Vite: { backgroundColor: "#646CFF", logo: "vite" },
  Gatsby: { backgroundColor: "#663399", logo: "gatsby" },
  GraphQL: { backgroundColor: "#E10098", logo: "graphql" },
  Electron: { backgroundColor: "#47848F", logo: "electron" },
  "Tailwind CSS": {
    backgroundColor: "#38BDF8",
    logo: "tailwindcss",
    blackLogo: true,
  },
  "shadcn/ui": { backgroundColor: "#000000", logo: "shadcnui" },
  "React Router": { backgroundColor: "#CA4245", logo: "reactrouter" },
  "Machine Learning": {
    backgroundColor: "#7C3AED",
    logo: "scikitlearn",
  },
  "C++": { backgroundColor: "#00599C", logo: "cplusplus" },
  Socket: { backgroundColor: "#4B5563", logo: "socketdotio" },
  "TCP/IP": { backgroundColor: "#4B5563", logo: "cisco" },
  Django: { backgroundColor: "#092E20", logo: "django" },
  WebSocket: { backgroundColor: "#4B5563", logo: "socketdotio" },
  Docker: { backgroundColor: "#2496ED", logo: "docker" },
  Express: { backgroundColor: "#000000", logo: "express" },
  MySQL: { backgroundColor: "#4479A1", logo: "mysql" },
  PWA: { backgroundColor: "#5A0FC8", logo: "pwa" },
  Expo: { backgroundColor: "#000020", logo: "expo" },
  "React Native": {
    backgroundColor: "#61DAFB",
    logo: "react",
    blackLogo: true,
  },
  Supabase: {
    backgroundColor: "#3ECF8E",
    logo: "supabase",
    blackLogo: true,
  },
  Flutter: { backgroundColor: "#02569B", logo: "flutter" },
  Dart: { backgroundColor: "#0175C2", logo: "dart" },
  Firebase: {
    backgroundColor: "#FFCA28",
    logo: "firebase",
    blackLogo: true,
  },
  Zustand: { backgroundColor: "#374151", logo: "zustand" },
}

const renderRich = (text: string): React.ReactNode => {
  const parts = String(text).split(/\*\*(.+?)\*\*/g)
  return parts.map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  )
}

const StackBadges = ({ stacks }: { stacks: string[] }) => (
  <div className="portfolio-stack-badges">
    {stacks.map(name => {
      const style = STACK_BADGE_STYLES[name] ?? {
        backgroundColor: "#374151",
      }
      return <StackBadge name={name} {...style} key={name} />
    })}
  </div>
)

const ContentList = ({ items }: { items: ContentItem[] }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>
        {typeof item === "string" ? (
          renderRich(item)
        ) : (
          <>
            {renderRich(item.what)}
            {item.result && (
              <>
                {" "}
                → <strong>{item.result}</strong>
              </>
            )}
          </>
        )}
      </li>
    ))}
  </ul>
)

const activities: Activity[] = [
  {
    title: "PICT",
    role: "국립공주대학교 SW중심대학사업 산학캡스톤디자인 · 프론트엔드 리드 (FE 1인 · BE 2인)",
    period: "2026.03 - 2026.06",
    stacks: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Zustand",
    ],
    description: [
      "구직자가 채용 공고를 탐색하고 AI가 이력서를 자동 최적화해 외부 채용 사이트까지 자동 지원하는 ***구직 관리 대시보드***를 프론트엔드 단독으로 설계·구현",
    ],
    projects: [
      {
        title: "PICT — 맞춤형 취업 AI Agent 프론트엔드",
        content: [
          "Figma 와이어프레임 16개 화면 전체를 React로 단독 구현, 상태 관리·라우팅·API 연동 아키텍처 설계",
          {
            what: "백엔드 API 미완성 구간은 Swagger 명세 기반 mock 인프라를 구축해 개발",
            result: "기능 단위로 실 API로 순차 전환",
          },
          "AI 매칭 채용 공고 추천 및 AI 생성 이력서(직무 중심/성과 중심) 챗봇 UI 기반 수정·적용 기능 개발",
          "외부 사이트 세션 연결 → 자동 지원 → 진행 상태 폴링까지 이어지는 비동기 플로우 구현",
          {
            what: "AWS S3 + CloudFront + GitHub Actions 배포 인프라 구축",
            result: "push 시 자동 빌드·배포",
          },
          {
            what: "8주간 단독으로 16개 화면 구현",
            result: "33개 PR 병합",
          },
        ],
        video: { src: PictDemoVideo, width: 960, height: 540 },
      },
    ],
  },
  {
    title: "Grand-trade-Auto",
    role: "2인 프로젝트 (Frontend, Crawling) · AWS 기반 AI 웹서비스 교육과정",
    period: "2025.07",
    stacks: ["React", "TypeScript", "shadcn/ui", "Machine Learning"],
    description: [
      "AWS 기반 AI 웹서비스 교육 과정을 수료하며 ***중고차 가격을 예측하는 웹 서비스***를 개발",
    ],
    projects: [
      {
        title: "AI 기반 중고차 가격 예측 웹 서비스",
        content: [
          "웹 크롤링을 통해 수집한 데이터를 모델에 학습",
          {
            what: "학습된 AI 모델을 활용한 가격 예측 기능 구현",
          },
          "머신러닝 모델 기반 가격 예측 기능 개발",
          "AWS 환경에서의 서비스 구성",
          "데이터 수집을 위한 크롤러 개발",
        ],
        images: [
          {
            src: GrandTradeAutoPreview,
            alt: "Grand-trade-Auto 중고차 가격 예측 화면",
            width: 1300,
            height: 920,
            size: "wide",
          },
        ],
        link: "https://github.com/TaehyunJeon0203/grand-trade-auto",
      },
    ],
  },
]

const likeLionProjects: SideProject[] = [
  {
    date: "2026.07",
    title: "아트민",
    subtitle: "팀 프로젝트 (Frontend) · 2일 해커톤 (FE 1인 · BE 3인)",
    description:
      "카페·식당처럼 다른 용도로 쓰이는 공간의 유휴시간을 예술인 클래스 공간으로 재활용하는 매칭 앱",
    stacks: ["Expo", "React Native", "TypeScript"],
    list: [
      "Figma 디자인 시스템(컬러 토큰·텍스트 스타일) 직접 설계, 사용자·제공자 총 9개 화면 단독 구현",
      "expo-router 기반 사용자/공간 제공자 2-모드 탭 라우팅 구조 설계",
      "목업 데이터로 전체 화면 완성 후 백엔드 API 순차 실 연동 전환",
      "이미지 리사이즈·압축 후 업로드하는 클라이언트 업로드 플로우 구현",
      "로그인 없이 UUID 기반 게스트 인증(X-Guest-Id 헤더) 구조 구현",
    ],
    images: [
      {
        src: ArtminMoodboard,
        alt: "아트민 무드보드",
        width: 1131,
        height: 1600,
        size: "medium",
      },
    ],
    video: { src: ArtminDemoVideo, width: 1280, height: 720 },
  },
  {
    date: "2026.05",
    title: "Clican",
    subtitle: "전태현",
    description:
      "구글 검색 결과의 신뢰도를 AI로 분석해 별점으로 보여주는 크롬 확장 프로그램",
    stacks: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    list: [
      "Google 검색 결과 페이지에 콘텐츠 스크립트를 주입해 제목/URL/스니펫 파싱",
      "백엔드 AI 분석 API 연동 및 신뢰도 점수 → 별점 변환 로직 개발",
      "별점 호버 시 근거(reason)와 태그(tags) 툴팁 UI 구현",
      "Manifest V3 기반 크롬 확장 프로그램 빌드 환경(CRXJS) 구성",
    ],
    link: "https://github.com/TaehyunJeon0203/clican-front",
  },
]

const sideProjects: SideProject[] = [
  {
    date: "2026.06 - 진행중",
    title: "Driend",
    subtitle: "전태현",
    description:
      "드라이브 경로 기록, 방문 지역 사진 등록, SNS 주행 기록 공유가 가능한 드라이브 기록 앱\n애플 앱스토어 배포 및 자동차 동호회 카페 공유, 사용자 호응 확보\n90+ 다운로드 기록 중",
    stacks: ["Expo", "React Native", "TypeScript", "Supabase", "Zustand"],
    list: [
      "백그라운드 자동 주행 감지 및 map-matching 기반 경로 스냅",
      "통과 빈도 기반 그라데이션 도로 지도 + 방문 지역(시/군/구) 사진 스탬프 지도",
      "가속도계·GPS 기반 제로백(0→100km/h) 자동 측정",
      "누적 거리·최고속도·제로백·방문 도시 기준 랭킹 및 친구 시스템",
      "카카오 로그인 및 Supabase 인증 연동",
    ],
    images: [
      {
        src: DriendScreenshotOne,
        alt: "Driend 지도 화면",
        width: 1284,
        height: 2778,
      },
      {
        src: DriendScreenshotTwo,
        alt: "Driend 방문 지역 지도 화면",
        width: 1284,
        height: 2778,
      },
      {
        src: DriendScreenshotThree,
        alt: "Driend 랭킹 화면",
        width: 1284,
        height: 2778,
      },
      {
        src: DriendScreenshotFour,
        alt: "Driend 통계 화면",
        width: 1284,
        height: 2778,
      },
      {
        src: DriendScreenshotFive,
        alt: "Driend 프로필 화면",
        width: 1284,
        height: 2778,
      },
      {
        src: DriendScreenshotSix,
        alt: "Driend 주행 기록 결과 화면",
        width: 1194,
        height: 1493,
      },
    ],
    link: "https://github.com/TaehyunJeon0203/driend",
    additionalLinks: [
      {
        label: "Apple App Store",
        href: "https://apps.apple.com/kr/app/driend/id6794620035",
      },
    ],
  },
  {
    date: "2026.04 - 2026.06",
    title: "Pinple",
    subtitle: "전태현",
    description:
      "공주대학교 천안캠퍼스 학생 전용 소모임 앱 — 지도 기반으로 소모임을 찾고 만들고 참여할 수 있는 서비스",
    stacks: ["Flutter", "Dart", "Firebase"],
    list: [
      "천안캠퍼스 반경 2km 이내 위치 인증 및 학교 이메일 도메인 인증",
      "네이버 지도 기반 소모임 탐색 및 리스트 뷰 전환",
      "지도 핀 기반 소모임 생성/수정/삭제(CRUD)",
      "소모임 참여 신청 및 수락/거절 기능",
    ],
    images: [
      {
        src: PinpleImageOne,
        alt: "Pinple 화면 1",
        width: 1380,
        height: 2800,
      },
      {
        src: PinpleImageTwo,
        alt: "Pinple 화면 2",
        width: 1468,
        height: 2888,
      },
      {
        src: PinpleImageThree,
        alt: "Pinple 화면 3",
        width: 1468,
        height: 2888,
      },
      {
        src: PinpleImageFour,
        alt: "Pinple 화면 4",
        width: 1468,
        height: 2888,
      },
    ],
    link: "https://github.com/TaehyunJeon0203/pinple",
  },
  {
    date: "2025.11",
    title: "LifeStats",
    subtitle: "전태현",
    description:
      "개인 데이터를 기반으로 흥미로운 통계를 시각적으로 보여주는 웹 서비스",
    stacks: ["React", "TypeScript", "Express", "MySQL"],
    list: [
      "개인 데이터 입력 및 저장",
      "통계 정보 시각화",
      "공유 가능한 카드 형태 UI 구성",
      "백엔드와 데이터베이스 연동",
    ],
    images: [
      {
        src: LifeStatsImageOne,
        alt: "LifeStats 화면 1",
        width: 721,
        height: 1558,
      },
      {
        src: LifeStatsImageTwo,
        alt: "LifeStats 화면 2",
        width: 675,
        height: 1457,
      },
      {
        src: LifeStatsImageThree,
        alt: "LifeStats 화면 3",
        width: 458,
        height: 1588,
      },
      {
        src: LifeStatsImageFour,
        alt: "LifeStats 화면 4",
        width: 666,
        height: 1439,
      },
      {
        src: LifeStatsImageFive,
        alt: "LifeStats 화면 5",
        width: 666,
        height: 1439,
      },
      {
        src: LifeStatsImageSix,
        alt: "LifeStats 화면 6",
        width: 699,
        height: 1509,
      },
    ],
    link: "https://github.com/TaehyunJeon0203/lifestats",
    additionalLinks: [
      {
        label: "LifeStats 서비스",
        href: "https://lifestats-sepia.vercel.app/",
      },
    ],
  },
  {
    date: "2024.08",
    title: "Grav",
    subtitle: "전태현",
    description:
      "프로젝트를 빠르게 실행하고 개발 시간을 자동으로 기록하는 프로젝트 매니저",
    stacks: ["Electron", "TypeScript", "Tailwind CSS"],
    list: [
      "프로젝트 이름과 로컬 경로 등록 기능",
      "등록된 프로젝트 목록 관리",
      "VSCode로 빠르게 실행하는 기능",
      "개발 시간 자동 기록 기능",
    ],
    images: [
      {
        src: GravPreview,
        alt: "Grav 프로젝트 카드와 작업 시간 기록 화면",
        width: 2390,
        height: 1582,
        size: "compact",
      },
    ],
    link: "https://github.com/TaehyunJeon0203/grav",
  },
  {
    date: "2023.12",
    title: "TH Blog",
    subtitle: "전태현",
    description: "Gatsby 기반으로 제작한 개인 기술 블로그",
    stacks: ["Gatsby", "React", "TypeScript", "GraphQL"],
    list: [
      "Gatsby 기반 정적 블로그 구축",
      "Markdown 기반 콘텐츠 관리",
      "GitHub Pages를 통한 배포",
    ],
    link: "https://github.com/TaehyunJeon0203/TaehyunJeon0203.github.io",
  },
]

const otherExperience = [
  "군 복무 중 여단 인트라넷 D-day 카운터 개발 → 포상휴가 획득",
  "군 복무 중 행정반 현황판 개발 및 당직 근무자 피드백 기반 개선",
]

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      "React, TypeScript를 기반으로 컴포넌트 단위의 웹 서비스를 구축할 수 있습니다.",
      "Vite, Tailwind CSS 등 프론트엔드 개발 도구를 설정하고 활용할 수 있습니다.",
      "Vanilla JS/CSS만으로도 스크롤 기반 인터랙션 등 인터랙티브한 UI를 구현할 수 있습니다.",
    ],
  },
  {
    title: "Backend & Infra",
    items: [
      "Express, MySQL을 활용해 간단한 API 서버와 데이터베이스를 구축할 수 있습니다.",
      "Docker, AWS(Lambda 등)를 활용한 배포 환경을 구성한 경험이 있습니다.",
      "C++ 기반 소켓 통신으로 클라이언트-서버 프로그램을 구현한 경험이 있습니다.",
    ],
  },
  {
    title: "Interest",
    items: [
      "역할이 다른 여러 AI 에이전트를 동시에 활용해 결과를 합쳐내는 개발 워크플로에 관심이 있습니다.",
      "홈서버를 직접 운영하며 Self-hosted Infrastructure를 구축하는 것에 관심이 있습니다.",
    ],
  },
]

const PortfolioPage = ({ data, location }: PageProps<PortfolioPageData>) => {
  const siteTitle = data.site.siteMetadata.title

  React.useEffect(() => {
    document.body.classList.remove("tech-mode", "daily-mode")
    document.body.classList.add("tech-mode")
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <article className="portfolio-page">
        <header className="portfolio-header">
          <section className="portfolio-header-top">
            <div className="portfolio-greeting">
              <h1>
                안녕하세요!
                <br />
                아이디어를 서비스로 만드는 개발자
                <br />
                <strong>전태현</strong>입니다.
              </h1>
            </div>
            <div className="portfolio-link-groups">
              <div className="portfolio-link-group">
                <p className="portfolio-link-group-title">Contact.</p>
                <a
                  className="portfolio-link-item"
                  href="mailto:jeontaehyun0203@gmail.com"
                >
                  <Mail size={16} />
                  jeontaehyun0203@gmail.com
                </a>
              </div>
              <div className="portfolio-link-group">
                <p className="portfolio-link-group-title">Channel.</p>
                <a className="portfolio-link-item" href="/">
                  <PenTool size={16} />
                  taehyunjeon0203.github.io
                </a>
                <a
                  className="portfolio-link-item"
                  href="https://github.com/TaehyunJeon0203"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub size={16} />
                  github.com/TaehyunJeon0203
                </a>
              </div>
            </div>
          </section>
          <div className="portfolio-intro-box">
            <p>"아 망했다.." 에이전트형 AI를 보고 제가 처음 한 말입니다.</p>
            <p>
              내가 할 일을 위협한다는 생각에 사용을 거부하기도 했지만 현재는
              어떻게 하면 더욱 효율적으로 활용할 수 있을지 고민합니다.
            </p>
            <hr></hr>
            <p>
              장소에 구애받지 않고, 개발이라는 기술 하나로 살아갈 수 있는
              개발자를 목표로 합니다.
            </p>
            <p>
              프론트엔드를 중심으로 사용자에게 직접 와닿는 서비스를 만드는 것에
              흥미를 느낍니다.
            </p>
            <p>
              불편함을 직접 만들어 해결하는 과정과, 서버 운영·인프라 영역에도
              관심이 있습니다.
            </p>
          </div>
        </header>

        <section className="portfolio-section portfolio-activity-section">
          <h2>Activity.</h2>
          {activities
            .slice()
            .reverse()
            .map((activity, index) => (
              <div
                className={`portfolio-entry ${
                  index !== activities.length - 1 ? "has-border" : ""
                }`}
                key={activity.title}
              >
                <div className="portfolio-entry-summary">
                  <h3>{activity.title}</h3>
                  <p className="portfolio-entry-role">{activity.role}</p>
                  <span className="portfolio-entry-period">
                    {activity.period}
                  </span>
                  <StackBadges stacks={activity.stacks} />
                </div>
                <div className="portfolio-entry-details">
                  <ContentList items={activity.description} />
                  {activity.projects &&
                    activity.projects.map(project => (
                      <div
                        className="portfolio-project-block"
                        key={project.title}
                      >
                        <h4>{project.title}</h4>
                        {project.images && (
                          <div className="portfolio-project-images">
                            {project.images.map(image => (
                              <a
                                className="portfolio-project-image-link"
                                href={image.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={image.src}
                              >
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  width={image.width}
                                  height={image.height}
                                  loading="lazy"
                                  className={
                                    image.size === "wide"
                                      ? "is-wide"
                                      : image.size === "compact"
                                      ? "is-compact"
                                      : image.size === "medium"
                                      ? "is-medium"
                                      : undefined
                                  }
                                />
                              </a>
                            ))}
                          </div>
                        )}
                        {project.video && (
                          <video
                            className="portfolio-project-video"
                            controls
                            preload="metadata"
                            width={project.video.width}
                            height={project.video.height}
                          >
                            <source src={project.video.src} type="video/mp4" />
                            브라우저가 동영상 재생을 지원하지 않습니다.
                          </video>
                        )}
                        <ContentList items={project.content} />
                        {project.link && (
                          <a
                            className="portfolio-entry-link"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub Repository →
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          <div className="portfolio-entry portfolio-activity-group">
            <div className="portfolio-entry-summary">
              <h3>멋쟁이 사자처럼 대학 14기</h3>
              <p className="portfolio-entry-role">IT 연합동아리 · 프론트엔드</p>
              <span className="portfolio-entry-period">2026.03 - 활동중</span>
              <StackBadges
                stacks={["JavaScript", "TypeScript", "React", "Vite"]}
              />
            </div>
            <div className="portfolio-entry-details">
              <p>
                다양한 전공의 팀원들과 함께 프론트엔드 기초 이론 및 React 학습,
                팀 프로젝트 진행
              </p>
              <div className="portfolio-subprojects">
                {likeLionProjects.map(project => (
                  <div className="portfolio-subproject" key={project.title}>
                    <div className="portfolio-subproject-head">
                      <h4>{project.title}</h4>
                      <span className="portfolio-entry-period">
                        {project.date}
                      </span>
                    </div>
                    <p className="portfolio-entry-role">{project.subtitle}</p>
                    <StackBadges stacks={project.stacks} />
                    {project.images && (
                      <div className="portfolio-project-images">
                        {project.images.map(image => (
                          <a
                            className="portfolio-project-image-link"
                            href={image.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={image.src}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                              loading="lazy"
                              className={
                                image.size === "wide"
                                  ? "is-wide"
                                  : image.size === "compact"
                                  ? "is-compact"
                                  : image.size === "medium"
                                  ? "is-medium"
                                  : undefined
                              }
                            />
                          </a>
                        ))}
                      </div>
                    )}
                    {project.video && (
                      <video
                        className="portfolio-project-video"
                        controls
                        preload="metadata"
                        width={project.video.width}
                        height={project.video.height}
                      >
                        <source src={project.video.src} type="video/mp4" />
                        브라우저가 동영상 재생을 지원하지 않습니다.
                      </video>
                    )}
                    <p>{project.description}</p>
                    <ContentList items={project.list} />
                    {project.link && (
                      <a
                        className="portfolio-entry-link"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub Repository →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-section portfolio-side-projects-section">
          <h2>Side Projects.</h2>
          <p className="portfolio-section-caption">
            개인 성장과 불편함을 해소하기 위해 개발한 사이드 프로젝트입니다.
          </p>
          {sideProjects.map((project, index) => (
            <div
              className={`portfolio-entry ${
                index !== sideProjects.length - 1 ? "has-border" : ""
              }`}
              key={project.title}
            >
              <div className="portfolio-entry-summary">
                <h3>{project.title}</h3>
                <p className="portfolio-entry-role">{project.subtitle}</p>
                <span className="portfolio-entry-period">{project.date}</span>
                <StackBadges stacks={project.stacks} />
              </div>
              <div className="portfolio-entry-details">
                <p>{project.description}</p>
                {project.images && (
                  <div className="portfolio-project-images">
                    {project.images.map(image => (
                      <img
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        className={
                          image.size === "wide"
                            ? "is-wide"
                            : image.size === "compact"
                            ? "is-compact"
                            : image.size === "medium"
                            ? "is-medium"
                            : undefined
                        }
                      />
                    ))}
                  </div>
                )}
                <ContentList items={project.list} />
                {project.link && (
                  <a
                    className="portfolio-entry-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repository →
                  </a>
                )}
                {project.additionalLinks?.map(additionalLink => (
                  <a
                    className="portfolio-entry-link"
                    href={additionalLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={additionalLink.href}
                  >
                    {additionalLink.label} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="portfolio-section">
          <h2>Other Experience.</h2>
          <ul className="portfolio-other-list">
            {otherExperience.map(item => (
              <li key={item}>{renderRich(item)}</li>
            ))}
          </ul>
        </section>

        <section className="portfolio-section">
          <h2>Skill.</h2>
          {skillCategories.map(category => (
            <div className="portfolio-skill-category" key={category.title}>
              <h3>{category.title}</h3>
              <ul>
                {category.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </article>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="포트폴리오"
    description="아이디어를 서비스로 만드는 개발자, 전태현의 포트폴리오입니다."
  />
)

export default PortfolioPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
