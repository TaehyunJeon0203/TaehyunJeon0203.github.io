import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../style/about.css"

const AboutPage = () => {
  return (
    <Layout>
      <Seo title="About" />
      <div className="about-container">
        <section className="about-section">
          <h1>About Me</h1>
          <div className="about-content">
            <p>
              안녕하세요! 저는 웹 개발자 전태현입니다. 새로운 기술을 배우고
              적용하는 것을 좋아하며, 사용자 경험을 개선하는 것에 큰 관심이
              있습니다.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>기술 스택</h2>
          <div className="tech-stack">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>TypeScript</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>블로그 소개</h2>
          <div className="about-content">
            <p>
              이 블로그는 제가 배우고 경험한 것들을 기록하고 공유하는
              공간입니다. 기술 블로그에서는 웹 개발과 관련된 내용을 다루며, 일상
              블로그에서는 개발자의 일상과 생각들을 나눕니다.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutPage
