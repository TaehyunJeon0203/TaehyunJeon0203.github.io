"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[751],{7549:function(e,t,l){l.r(t),l.d(t,{Head:function(){return c},default:function(){return s}});var a=l(6540),n=l(4794),r=(l(8822),l(2269)),o=l(7946);var i=e=>{let{siteUrl:t,path:l}=e;return(0,a.useEffect)((()=>{const e=document.createElement("div");e.classList.add("global-footer");const a=document.createElement("img");a.src=`https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${t}${l}&count_bg=%23023327&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visit&edge_flat=false`,a.alt="postVisit";const n=document.createElement("p");return n.textContent=`© ${(new Date).getFullYear()}, TaehyunJeon all rights reserved.`,e.appendChild(a),e.appendChild(n),document.body.appendChild(e),()=>{document.body.removeChild(e)}}),[t,l]),null};const c=e=>{let{data:{markdownRemark:t}}=e;return a.createElement(r.A,{title:t.frontmatter.title,description:t.frontmatter.description||t.excerpt})};var s=e=>{let{data:{previous:t,next:l,site:r,markdownRemark:c,allMarkdownRemark:s},location:m}=e;const d=r.siteMetadata.siteUrl,u=s.edges.find((e=>e.node.id===c.id)).node.timeToRead;return a.createElement("div",{className:"global-wrapper"},a.createElement(o.A,null),a.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("h1",{itemProp:"headline"},c.frontmatter.title),a.createElement("p",null,c.frontmatter.date),a.createElement("p",null,u," min read")),a.createElement("section",{dangerouslySetInnerHTML:{__html:c.html},itemProp:"articleBody"}),a.createElement("hr",null)),a.createElement("nav",{className:"blog-post-nav"},a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},a.createElement("li",null,t&&a.createElement(n.Link,{to:t.fields.slug,rel:"prev"},"← ",t.frontmatter.title)),a.createElement("li",null,l&&a.createElement(n.Link,{to:l.fields.slug,rel:"next"},l.frontmatter.title," →")))),a.createElement(i,{siteUrl:d,path:m.pathname,className:"global-footer"}))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-dfe3546dcadb1514f630.js.map