import * as React from "react"
import { graphql } from "gatsby"
import type { PageProps } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../style/resume.css"

interface ResumePageData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const activities = [
  {
    period: "2026.03 ~ 활동 중",
    title: "멋쟁이 사자처럼 대학 14기",
    description: "프론트엔드 파트 활동 및 팀 프로젝트 참여",
    children: [
      {
        period: "2026.08",
        title: "멋쟁이 사자처럼 애니멀리그",
        description: "14기 해커톤 참여",
      },
      {
        period: "2026.05",
        title: "AI 기반 썸머 해커톤 캠프",
        description: "충남대·공주대 연합 해커톤 참여",
      },
    ],
  },
  {
    period: "2026.03 ~ 2026.07",
    title: "PICT",
    description:
      "국립공주대학교 SW중심대학사업 산학캡스톤디자인 프론트엔드 담당",
    children: [
      {
        period: "2026.07",
        title: "AI·SW중심대학 디지털 경진대회",
        description: "학교 대표 참가 · 총 57개 대학 중 29위",
      },
    ],
  },
  {
    period: "2025.07",
    title: "AWS 기반 AI 웹서비스 교육 과정",
    description: "교육 과정 수료 및 팀 웹 서비스 개발",
  },
  {
    period: "2022.03 ~ 2024.06",
    title: "Striking Arts 게임 개발 동아리",
    description: "게임 개발 동아리 교육 참여 및 C 언어 교육 진행",
  },
]

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "React Native / Expo",
      "Zustand",
    ],
  },
  {
    title: "Backend & Data",
    skills: ["MySQL", "Supabase"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "AWS", "GitHub Actions", "Vercel"],
  },
]

const ResumePage = ({ data, location }: PageProps<ResumePageData>) => {
  React.useEffect(() => {
    document.body.classList.remove("daily-mode")
    document.body.classList.add("tech-mode", "resume-mode")

    return () => document.body.classList.remove("resume-mode")
  }, [])

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <article className="resume-page">
        <header className="resume-hero">
          <div className="resume-identity">
            <img src="/images/taehyun.JPG" alt="전태현 프로필 사진" />
            <div>
              <h1>
                전 태 현 <span>Taehyun Jeon</span>
              </h1>
            </div>
          </div>
          <p className="resume-intro">
            AI를 활용하는 데서 그치지 않고, 개인용 AI 하네스를 직접 만들고
            개발 과정에 적용하는 프론트엔드 개발자입니다. React와 TypeScript를
            중심으로 아이디어를 사용 가능한 서비스로 구현하며, AI 에이전트와
            사용자 피드백을 바탕으로 제품의 완성도를 높입니다.
          </p>
        </header>

        <div className="resume-content">
          <aside className="resume-sidebar" aria-label="기본 정보">
            <section className="resume-section resume-contact">
              <h2>연락처</h2>
              <address>
                <dl>
                  <div>
                        <dt>전화</dt>
                    <dd>
                      <a href="tel:+821065673027">010-6567-3027</a>
                    </dd>
                  </div>
                  <div>
                        <dt>이메일</dt>
                    <dd>
                      <a href="mailto:jeontaehyun0203@gmail.com">
                        jeontaehyun0203@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div>
                        <dt>지역</dt>
                    <dd>경기도 평택시</dd>
                  </div>
                  <div>
                        <dt>포트폴리오</dt>
                    <dd>
                      <a href="https://taehyunjeon0203.github.io/portfolio">
                        <span className="resume-url-part">taehyunjeon0203.github.io</span>
                        <wbr />
                        <span className="resume-url-part">/portfolio</span>
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>이력서</dt>
                    <dd>
                      <a href="https://taehyunjeon0203.github.io/resume">
                        <span className="resume-url-part">taehyunjeon0203.github.io</span>
                        <wbr />
                        <span className="resume-url-part">/resume</span>
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>GitHub</dt>
                    <dd>
                      <a href="https://github.com/TaehyunJeon0203">
                        github.com/TaehyunJeon0203
                      </a>
                    </dd>
                  </div>
                </dl>
              </address>
            </section>

            <section className="resume-section">
              <h2>기술 스택</h2>
              {skillGroups.map(group => (
                <div className="resume-skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="resume-skill-list">
                    {group.skills.map(skill => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section className="resume-section">
              <h2>자격증</h2>
              <div className="resume-compact-entry">
                <strong>정보처리기사</strong>
                <span>필기 합격 2026.08 · 실기 예정</span>
              </div>
            </section>
          </aside>

          <div className="resume-main">
            <section className="resume-section resume-projects">
              <h2>프로젝트</h2>
              <div className="resume-portfolio-callout">
                <a href="https://taehyunjeon0203.github.io/portfolio">
                  프로젝트 상세 내용 · 포트폴리오 보기 → taehyunjeon0203.github.io/portfolio
                </a>
                <p>시연 영상과 GIF가 포함되어 있어 웹 열람을 권장합니다.</p>
              </div>
              <ul className="resume-project-list">
                <li><strong>개인용 OpenCode 하네스</strong> — 구독 모델별 에이전트 배분·요구사항 인터뷰·Figma MCP 연동</li>
                <li><strong>아트민</strong> — 유휴 공간 매칭 앱 FE 단독 개발, 무박 2일간 9개 화면 구현</li>
                <li><strong>Driend</strong> — 드라이브 기록 앱 개발·앱스토어 출시, 한 달간 90회 이상 다운로드</li>
                <li><strong>Clican</strong> — 검색 결과 신뢰도를 별점과 근거로 표시하는 크롬 확장 MVP 개발</li>
                <li><strong>Pinple</strong> — 3인 팀에서 캠퍼스 소모임 앱 개발 대부분 담당, 네이버 지도·인증 연동</li>
                <li><strong>PICT</strong> — AI 구직 관리 대시보드 FE 단독 개발, 8주간 16개 화면 구현</li>
                <li><strong>LifeStats</strong> — 개인 통계의 SNS 공유 카드 구현 및 Vercel 배포</li>
                <li><strong>Grand-trade-Auto</strong> — 중고차 가격 예측 서비스 FE·크롤러 개발, 매물 62,000개 수집</li>
                <li><strong>Grav</strong> — 프로젝트 바로 실행과 작업 시간 자동 기록을 지원하는 Electron 앱 개발</li>
                <li><strong>TH Blog</strong> — 일상·기술 전환형 Gatsby 블로그 제작, Markdown 관리·배포 자동화</li>
              </ul>
            </section>

            <section className="resume-section">
              <h2>활동</h2>
              <div className="resume-timeline">
                {activities.map(activity => (
                  <div className="resume-entry" key={activity.title}>
                    <p className="resume-period">{activity.period}</p>
                    <div>
                      <h3>{activity.title}</h3>
                      <p>{activity.description}</p>
                      {activity.children && (
                        <div className="resume-subentries">
                          {activity.children.map(child => (
                            <div className="resume-subentry" key={child.title}>
                              <span className="resume-subentry-period">
                                {child.period}
                              </span>
                              <div>
                                <strong>{child.title}</strong>
                                <p>{child.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section">
              <h2>학력</h2>
              <div className="resume-timeline">
                <div className="resume-entry">
                  <p className="resume-period">
                    <span>2025.03 ~</span>
                    <span className="resume-period-end">
                      2027.02
                      <small>(졸업 예정)</small>
                    </span>
                  </p>
                  <div>
                    <h3>공주대학교 소프트웨어학과</h3>
                  </div>
                </div>
                <div className="resume-entry">
                  <p className="resume-period">2021.03 ~ 2024.11</p>
                  <div>
                    <h3>공주대학교 정보통신공학과</h3>
                  </div>
                </div>
              </div>
            </section>

            <section className="resume-section">
              <h2>군 복무</h2>
              <div className="resume-entry">
                <p className="resume-period">2022.05 ~ 2023.11</p>
                <div>
                  <h3>대한민국 육군 · 병장</h3>
                  <p className="resume-meta">7사단 3여단 · 체계운용병</p>
                  <ul className="resume-detail-list">
                    <li>여단 인트라넷 D-day 카운터 개발</li>
                    <li>당직 현황판 개발 및 근무자 피드백 기반 개선</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>
        </div>
      </article>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="이력서 · 전태현"
    description="프론트엔드 개발자 전태현의 이력서입니다."
    url="/resume"
  />
)

export default ResumePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
