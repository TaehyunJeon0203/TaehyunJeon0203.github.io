"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[989],{8771:function(e,t,a){var n=a(7294),l=a(1883);t.Z=()=>{var e,t;const a=(0,l.useStaticQuery)("3257411868"),r=null===(e=a.site.siteMetadata)||void 0===e?void 0:e.author;null===(t=a.site.siteMetadata)||void 0===t||t.social;return n.createElement("div",{className:"bio"},(null==r?void 0:r.name)&&n.createElement("p",null,"Written by ",n.createElement("strong",null,r.name)," ",(null==r?void 0:r.summary)||null))}},7387:function(e,t,a){a.d(t,{Z:function(){return i}});var n=a(7294),l=a(1883);var r=e=>{let{title:t,isRootPath:a}=e;return n.createElement("header",{className:"global-header"},n.createElement("nav",{className:"navbar"},n.createElement(l.Link,{to:"/",className:"navbar-brand"},t)))};var i=e=>{let{location:t,title:a,children:l}=e;const i="/"===t.pathname;return n.createElement("div",{className:"global-wrapper "+(i?"root":"subpage")},n.createElement(r,{title:a,isRootPath:i}),n.createElement("main",null,l),n.createElement("footer",null,"© ",(new Date).getFullYear(),", TaehyunJeon all rights reserved."))}},9357:function(e,t,a){var n=a(7294),l=a(1883);t.Z=e=>{var t,a,r;let{description:i,title:o,children:c}=e;const{site:m}=(0,l.useStaticQuery)("2841359383"),s=i||m.siteMetadata.description,u=null===(t=m.siteMetadata)||void 0===t?void 0:t.title;return n.createElement(n.Fragment,null,n.createElement("title",null,u?`${o} | ${u}`:o),n.createElement("meta",{name:"description",content:s}),n.createElement("meta",{property:"og:title",content:o}),n.createElement("meta",{property:"og:description",content:s}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:creator",content:(null===(a=m.siteMetadata)||void 0===a||null===(r=a.social)||void 0===r?void 0:r.twitter)||""}),n.createElement("meta",{name:"twitter:title",content:o}),n.createElement("meta",{name:"twitter:description",content:s}),c)}},4982:function(e,t,a){a.r(t),a.d(t,{Head:function(){return c}});var n=a(7294),l=a(1883),r=a(8771),i=a(7387),o=a(9357);const c=e=>{let{data:{markdownRemark:t}}=e;return n.createElement(o.Z,{title:t.frontmatter.title,description:t.frontmatter.description||t.excerpt})};t.default=e=>{var t;let{data:{previous:a,next:o,site:c,markdownRemark:m},location:s}=e;const u=(null===(t=c.siteMetadata)||void 0===t?void 0:t.title)||"Title";return n.createElement(i.Z,{location:s,title:u},n.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("h1",{itemProp:"headline"},m.frontmatter.title),n.createElement("p",null,m.frontmatter.date)),n.createElement("section",{dangerouslySetInnerHTML:{__html:m.html},itemProp:"articleBody"}),n.createElement("hr",null),n.createElement("footer",null,n.createElement(r.Z,null))),n.createElement("nav",{className:"blog-post-nav"},n.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},n.createElement("li",null,a&&n.createElement(l.Link,{to:a.fields.slug,rel:"prev"},"← ",a.frontmatter.title)),n.createElement("li",null,o&&n.createElement(l.Link,{to:o.fields.slug,rel:"next"},o.frontmatter.title," →")))))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-c91542f91fa52faedaad.js.map