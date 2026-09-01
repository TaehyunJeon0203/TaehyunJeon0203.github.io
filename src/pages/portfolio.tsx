import * as React from "react"
import { graphql } from "gatsby"
import type { PageProps } from "gatsby"
import { GitHub, Mail, PenTool } from "react-feather"

import Layout from "../components/layout"
import PortfolioModeToggle from "../components/PortfolioModeToggle"
import type { PortfolioMode } from "../components/PortfolioModeToggle"
import PortfolioStory from "../components/PortfolioStory"
import Seo from "../components/seo"
import "../style/portfolio.css"

type ContentItem = string | { what: string; result?: string }

interface StackColor {
  bg: string
  light?: boolean
}

interface ActivityProject {
  title: string
  content: ContentItem[]
  link?: string
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

const STACK_COLORS: Record<string, StackColor> = {
  JavaScript: { bg: "#F0DB4F", light: true },
  TypeScript: { bg: "#3178C6" },
  React: { bg: "#61DAFB", light: true },
  Vite: { bg: "#646CFF" },
  Gatsby: { bg: "#663399" },
  GraphQL: { bg: "#E10098" },
  Electron: { bg: "#47848F" },
  "Tailwind CSS": { bg: "#38BDF8", light: true },
  "shadcn/ui": { bg: "#000000" },
  "React Router": { bg: "#CA4245" },
  "Machine Learning": { bg: "#7C3AED" },
  "C++": { bg: "#00599C" },
  Socket: { bg: "#4B5563" },
  "TCP/IP": { bg: "#4B5563" },
  Django: { bg: "#092E20" },
  WebSocket: { bg: "#4B5563" },
  Docker: { bg: "#2496ED" },
  Express: { bg: "#000000" },
  MySQL: { bg: "#4479A1" },
  PWA: { bg: "#5A0FC8" },
  Expo: { bg: "#000020" },
  "React Native": { bg: "#61DAFB", light: true },
  Supabase: { bg: "#3ECF8E", light: true },
  Flutter: { bg: "#02569B" },
  Dart: { bg: "#0175C2" },
  Firebase: { bg: "#FFCA28", light: true },
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
      const color = STACK_COLORS[name] || { bg: "#374151" }
      return (
        <span
          className={`portfolio-stack-badge ${color.light ? "is-light" : ""}`}
          style={{ backgroundColor: color.bg }}
          key={name}
        >
          {name}
        </span>
      )
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
    title: "멋쟁이 사자처럼 대학 14기",
    role: "IT 연합동아리 · 프론트엔드",
    period: "2026.03 - 활동중",
    stacks: ["JavaScript", "React", "Vite"],
    description: [
      "다양한 전공의 팀원들과 함께 ***프론트엔드 기초 이론과 React***를 학습",
      "매주 과제와 스터디를 통해 팀 프로젝트에 필요한 기술 기반을 다지는 중",
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
        link: "https://github.com/TaehyunJeon0203/grand-trade-auto",
      },
    ],
  },
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
      },
    ],
  },
]

const sideProjects: SideProject[] = [
  {
    date: "2023.12",
    title: "TH Blog",
    subtitle: "전태현",
    description: "Gatsby 기반으로 제작한 개인 기술 블로그",
    stacks: ["Gatsby", "React", "GraphQL"],
    list: [
      "Gatsby 기반 정적 블로그 구축",
      "Markdown 기반 콘텐츠 관리",
      "GitHub Pages를 통한 배포",
    ],
    link: "https://github.com/TaehyunJeon0203/TaehyunJeon0203.github.io",
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
    link: "https://github.com/TaehyunJeon0203/grav",
  },
  {
    date: "2025.06",
    title: "Lanssenger",
    subtitle: "팀 프로젝트 (Backend)",
    description: "소켓 통신 기반의 메신저 프로그램",
    stacks: ["C++", "Socket", "TCP/IP"],
    list: [
      "소켓 기반 클라이언트-서버 통신",
      "다중 사용자 메시지 처리",
      "연결 및 세션 관리 로직 구현",
    ],
    link: "https://github.com/TaehyunJeon0203/lanssenger",
  },
  {
    date: "2025.10",
    title: "DevChat",
    subtitle: "팀 프로젝트 (Frontend)",
    description: "개발자들을 위한 실시간 채팅 웹 애플리케이션",
    stacks: [
      "React",
      "TypeScript",
      "shadcn/ui",
      "Django",
      "WebSocket",
      "Docker",
    ],
    list: [
      "GitHub OAuth 로그인",
      "실시간 채팅 기능",
      "방 단위 대화 흐름 설계",
      "프론트엔드-백엔드 협업 구조 구성",
    ],
    link: "https://github.com/knu-devchat",
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
    link: "https://github.com/TaehyunJeon0203/lifestats",
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
    link: "https://github.com/TaehyunJeon0203/pinple",
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
  {
    date: "2026.06 - 진행중",
    title: "Driend",
    subtitle: "전태현",
    description:
      "드라이브를 자동으로 기록하고, 방문한 지역을 모으고, 친구와 랭킹을 겨루는 드라이브 기록 앱",
    stacks: ["Expo", "React Native", "TypeScript", "Supabase", "Zustand"],
    list: [
      "백그라운드 자동 주행 감지 및 map-matching 기반 경로 스냅",
      "통과 빈도 기반 그라데이션 도로 지도 + 방문 지역(시/군/구) 사진 스탬프 지도",
      "가속도계·GPS 기반 제로백(0→100km/h) 자동 측정",
      "누적 거리·최고속도·제로백·방문 도시 기준 랭킹 및 친구 시스템",
      "카카오 로그인 및 Supabase 인증 연동",
    ],
    link: "https://github.com/TaehyunJeon0203/driend",
  },
  {
    date: "2026.07",
    title: "Borrow",
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

const PORTFOLIO_MODE_KEY = "portfolioMode"

const PortfolioPage = ({ data, location }: PageProps<PortfolioPageData>) => {
  const siteTitle = data.site.siteMetadata.title
  const [mode, setMode] = React.useState<PortfolioMode>("summary")

  React.useEffect(() => {
    document.body.classList.remove("tech-mode", "daily-mode")
    document.body.classList.add("tech-mode")

    try {
      if (localStorage.getItem(PORTFOLIO_MODE_KEY) === "story") {
        setMode("story")
      }
    } catch {
      // Storage can be unavailable in privacy-restricted browsing contexts.
    }
  }, [])

  const changeMode = (nextMode: PortfolioMode) => {
    setMode(nextMode)
    try {
      localStorage.setItem(PORTFOLIO_MODE_KEY, nextMode)
    } catch {
      // The selected mode still applies for the current session.
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className={mode === "story" ? "portfolio-story-mode" : undefined}>
        <PortfolioModeToggle mode={mode} onChange={changeMode} />
        {mode === "story" && <PortfolioStory />}
      </div>
      <article className="portfolio-page" hidden={mode === "story"}>
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
            <p>
              장소에 구애받지 않고, 개발이라는 기술 하나로 살아갈 수 있는
              개발자를 목표로 합니다.
            </p>
            <p>
              프론트엔드를 중심으로 사용자에게 직접 가닿는 서비스를 만드는 것에
              흥미를 느낍니다.
            </p>
            <p>
              불편함을 직접 만들어 해결하는 과정과, 서버 운영·인프라 영역에도
              관심이 있습니다.
            </p>
          </div>
        </header>

        <section className="portfolio-section">
          <h2>Activity.</h2>
          {activities.map((activity, index) => (
            <div
              className={`portfolio-entry ${
                index !== activities.length - 1 ? "has-border" : ""
              }`}
              key={activity.title}
            >
              <div className="portfolio-entry-head">
                <h3>{activity.title}</h3>
                <span className="portfolio-entry-period">
                  {activity.period}
                </span>
              </div>
              <p className="portfolio-entry-role">{activity.role}</p>
              <StackBadges stacks={activity.stacks} />
              <ContentList items={activity.description} />
              {activity.projects &&
                activity.projects.map(project => (
                  <div className="portfolio-project-block" key={project.title}>
                    <h4>{project.title}</h4>
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
          ))}
        </section>

        <section className="portfolio-section">
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
              <div className="portfolio-entry-head">
                <h3>{project.title}</h3>
                <span className="portfolio-entry-period">{project.date}</span>
              </div>
              <p className="portfolio-entry-role">{project.subtitle}</p>
              <StackBadges stacks={project.stacks} />
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
