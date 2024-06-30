import{_ as r,r as o,o as c,c as d,a as e,b as t,d as a,w as l,e as i}from"./app-s5JIphqh.js";const m={},p={href:"https://arxiv.org/abs/1902.01069",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"⭐⭐⭐⭐",-1),u=e("p",null,"KR2ML Workshop at NeurIPS 2019, arXiv:1902.01069",-1),g={href:"https://github.com/naver/sqlova",target:"_blank",rel:"noopener noreferrer"},_={href:"https://blog.csdn.net/u011426236/article/details/135117705",target:"_blank",rel:"noopener noreferrer"},L=i('<h2 id="一、论文速度" tabindex="-1"><a class="header-anchor" href="#一、论文速度"><span>一、论文速度</span></a></h2><p>这篇论文对 SQLNet 进行改进，首次尝试引入 PLM 来获得 context embedding。在实现思路上与 SQLNet 类似，也是先预先构建一个 SQL sketch，然后再填充 slots。</p><p>本文提出的模型 <mark>SQLova</mark> 分为两个 layers：encoding layer 和 NL2SQL layer：</p><ul><li>encoding layer：使用 BERT 来获得 table-aware 和 context-aware 的 question word representation</li><li>NL2SQL layer：使用上一层获得的 encoded representation 来生成 SQL query</li></ul><p>在 NL2SQL layer 中，思路与 SQLNet 类似，使用了多个 model 来填充 SQL sketch 中的不同 slots 从而生成 SQL。</p><h2 id="二、sqlova" tabindex="-1"><a class="header-anchor" href="#二、sqlova"><span>二、SQLova</span></a></h2><p>分别介绍 SQLova 的两个 layers。</p><h3 id="_2-1-encoding-layer" tabindex="-1"><a class="header-anchor" href="#_2-1-encoding-layer"><span>2.1 encoding layer</span></a></h3><p>WikiSQL dataset 的输入是 question 和 table headers，输出是生成的 SQL query 和相应的执行结果，如下图所示：</p>',9),S=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240524102543.png",alt:"20240524102543",style:{zoom:"75%"}},null,-1),v=e("p",null,[t("我们需要将 question 和 table headers 使用 "),e("code",null,"[SEP]"),t(" 分隔符连接起来，开头再加一个 "),e("code",null,"[CLS]"),t("，然后输入给 BERT，BERT 的最后两层输出被拼接起来作为 encoded representation。如下图所示：")],-1),y=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240524103014.png",alt:"20240524103014",style:{zoom:"75%"}},null,-1),x=e("p",null,[t("这样，"),e("strong",null,"通过 encoding layer，我们借助 BERT 对 question 和 table headers 进行编码，得到了一个 table-aware representation"),t("。")],-1),k=e("h3",{id:"_2-2-nl2sql-layer",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-2-nl2sql-layer"},[e("span",null,"2.2 NL2SQL layer")])],-1),b=e("p",null,[t("对于上一层得到的 table-aware representation，"),e("strong",null,"还需要使用 LSTM 做进一步的上下文编码"),t("，这里使用的是 100 维的两层 BiLSTM：一个 question encoder "),e("em",null,"LSTM-q"),t("，一个 header encoder "),e("em",null,"LSTM-h")],-1),Q=e("ul",null,[e("li",null,[e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("msub",null,[e("mi",null,"E"),e("mi",null,"n")])]),e("annotation",{encoding:"application/x-tex"},"E_n")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.1514em"}},[e("span",{style:{top:"-2.55em","margin-left":"-0.0576em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"n")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])])])])]),t(" 表示 question 的第 n 个 token 经过 LSTM-q 后的 encoding vector")]),e("li",null,[e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("msub",null,[e("mi",null,"D"),e("mi",null,"c")])]),e("annotation",{encoding:"application/x-tex"},"D_c")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.1514em"}},[e("span",{style:{top:"-2.55em","margin-left":"-0.0278em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"c")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])])])])]),t(" 表示 header "),e("em",null,"c"),t(" 的经过 LSTM-h 的 encoding vector")])],-1),f=e("p",null,"之后，我们就使用这两个 encoding 来交给不同的 model 预测 slots，如下图所示（从上往下看，BERT 的输出经过 LSTM 再去预测 slots）：",-1),q=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240524104715.png",alt:"20240524104715",style:{zoom:"75%"}},null,-1),w=i('<p>NL2SQL layer 的 6 个 sub-module 不共享参数。这里还用到了 SQLNet 提出的一个关键技术 Column Attention 机制。</p><h3 id="_2-3-execution-guided-decoding" tabindex="-1"><a class="header-anchor" href="#_2-3-execution-guided-decoding"><span>2.3 Execution-guided decoding</span></a></h3><p>SQLOVA 使用了 Execution-guided decoding 技术，以减少不可执行的 query 语句。</p><p>所谓 <mark>Execution-guided decoding</mark> 就是在输出返回结果时对检查生成的 SQL 序列是否是一条语法正确的 SQL 语句，使模型最终输出的 SQL 语句一定是可以无语法错误执行的。它是通过将候选列表中的 SQL 查询按顺序提供给执行器来执行的，并丢弃那些执行失败或返回空结果的查询。该技术可以参考论文 <em>Robust Text-to-SQL Generation with Execution-Guided Decoding</em>.</p><blockquote><p>这里多介绍一下，Execution-guided decoding 作为一种思想，可以应用到多种用于生成 SQL 的模型中，包含自回归类型的模型、基于模型生成的模型等。</p><p>比如在应用到自回归模型时，可以在生成过程的特定阶段（比如 WHERE 子句生成完之后），去尝试执行已经生成的 SQL 并判断是否有编译错误或者运行时错误等，从而排除过滤掉那些会导致错误的候选生成，并优化剩余的生成过程。在排除了错误选项后，模型继续自回归地生成剩余的SQL查询部分，直到形成一个完整的查询。</p></blockquote><h2 id="三、实验" tabindex="-1"><a class="header-anchor" href="#三、实验"><span>三、实验</span></a></h2><p>文章还给出了 human 的 performance，从结果来看，SQLova 已超过了人类表现。</p><p>同时，文章还进行了充分的消融实验以检验各个模块的有效性。可以看出，预训练模型 BERT 的引入对结果有很大提升。即使用词语的上下文对 logical form 的 acc 有很大贡献。</p>',8);function E(T,M){const n=o("ExternalLinkIcon"),s=o("center");return c(),d("div",null,[e("blockquote",null,[e("p",null,[t("论文："),e("a",p,[t("A Comprehensive Exploration on WikiSQL with Table-Aware Word Contextualization"),a(n)])]),h,u,e("p",null,[t("Code: "),e("a",g,[t("SQLova | GitHub"),a(n)])]),e("p",null,[t("参考文章："),e("a",_,[t("将预训练语言模型引入WikiSQL任务 | CSDN"),a(n)])])]),L,a(s,null,{default:l(()=>[S]),_:1}),v,a(s,null,{default:l(()=>[y]),_:1}),x,k,b,Q,f,a(s,null,{default:l(()=>[q]),_:1}),w])}const z=r(m,[["render",E],["__file","index.html.vue"]]),B=JSON.parse(`{"path":"/arxiv/1902.01069/","title":"🐋 SQLova：首次将 PLM 应用到 NL2SQL 中","lang":"zh-CN","frontmatter":{"title":"🐋 SQLova：首次将 PLM 应用到 NL2SQL 中","author":"Bin Yu","createTime":"2024/05/23 20:19:00","permalink":"/arxiv/1902.01069/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"一、论文速度","slug":"一、论文速度","link":"#一、论文速度","children":[]},{"level":2,"title":"二、SQLova","slug":"二、sqlova","link":"#二、sqlova","children":[{"level":3,"title":"2.1 encoding layer","slug":"_2-1-encoding-layer","link":"#_2-1-encoding-layer","children":[]},{"level":3,"title":"2.2 NL2SQL layer","slug":"_2-2-nl2sql-layer","link":"#_2-2-nl2sql-layer","children":[]},{"level":3,"title":"2.3 Execution-guided decoding","slug":"_2-3-execution-guided-decoding","link":"#_2-3-execution-guided-decoding","children":[]}]},{"level":2,"title":"三、实验","slug":"三、实验","link":"#三、实验","children":[]}],"readingTime":{"minutes":3.2,"words":959},"git":{"updatedTime":1717830098000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":3}]},"filePathRelative":"notes/Text2SQL/1906.SQLova.md","categoryList":[{"type":10000,"name":"notes"},{"type":10004,"name":"Text2SQL"}]}`);export{z as comp,B as data};