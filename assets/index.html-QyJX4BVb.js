import{_ as i,r as a,o as c,c as r,a as e,b as t,d as s,w as n,e as d}from"./app-s5JIphqh.js";const m={},h={href:"https://ieeexplore.ieee.org/abstract/document/10096172",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"⭐⭐⭐",-1),p=e("p",null,"北大 & 中科大，arXiv:2306.08368",-1),S=d('<h2 id="一、论文速读" tabindex="-1"><a class="header-anchor" href="#一、论文速读"><span>一、论文速读</span></a></h2><p>本文设计了一个 NL 和 SQL 的中间表示 SSQL，然后使用 seq2seq 模型，输入 NL 和 table schema，输出 SSQL，然后再基于 SSQL 构建出 SQL。</p><p>论文提出了使用 seq2seq 来做 Text2SQL 的两个挑战：</p><ol><li>seq2seq 能否产生模式上正确的 SQL？论文发现，seq2seq 模型能够产生合法的 SQL skeleton，但细节上的 schematic info prediction 容易出错。因此，本文<strong>引入 SSQL 作为 seq2seq 的中间表示</strong>，SSQL 目标是保留 NL 的语义信息，但去除掉 user query 没有表达的 database-schema-related 信息。</li><li>seq2seq 能否产生语义一致的 SQL？论文指出，由于 seq2seq 的单向解码的机制，产生整个语义一致的 sequences 是难以保证的，QA 场景也许有较大容错性，但这在生成 SQL 上会产生灾难性失败。此外，论文发现 seq2seq 模型在使用 beam search 时是能够预测出正确的 SQL，但可能会给他们较低的 scores。为此，<strong>这里引入一个 score re-estimator 来重排所有 candidate predictions</strong>。</li></ol><h2 id="二、中间表示-ssql" tabindex="-1"><a class="header-anchor" href="#二、中间表示-ssql"><span>二、中间表示：SSQL</span></a></h2><p><mark>Semantic-SQL</mark>（SSQL）的设计目标是去除掉标准 SQL 表达式中不必要的 schema-related 信息。主要基于原来的 SQL 语法做了如下改动：</p><ul><li>通过消除掉 JOIN 子句来简化 FROM 语句。SSQL 只预测出需要哪些表，但不需要指明如何 JOIN 起来，后序会使用 Steiner Tree Algorithm 来将使用的 tables JOIN 起来，从而生成 SQL。</li><li>将 TABLE 和 COLUMN 结合为一个 string。标准 SQL 是 column 名和 table 名分开的，这里将输入的 schema 中将 TABLE 和 COLUMN 连接在一起，那输出中也就自然在一起了。</li></ul><p>下面是一个 SSQL 的示例以及 JOIN 子句的预测：</p>',8),_=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240530155606.png",alt:"20240530155606",style:{zoom:"75%"}},null,-1),L=e("h2",{id:"三、score-re-estimator",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#三、score-re-estimator"},[e("span",null,"三、Score Re-estimator")])],-1),g=e("p",null,"由于 seq2seq 在使用 beam search 时，可能会给 correct prediction 赋予较低的 scores，因此这里引入额外的 score re-estimator 来重新排序所有的 candidate predictions。score re-estimator 就是根据 candidate SQL 和 NL query 之间的语义一致性来计算一个得分。",-1),q=e("p",null,"score re-estimator 的实现图示如下：",-1),Q=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240530161340.png",alt:"20240530161340",style:{zoom:"75%"}},null,-1),k=e("p",null,[t("它通过 "),e("code",null,"[CLS]"),t(" 得到一个分数，并将其与 seq2seq score 进行加权组合来得到最终的 score：")],-1),b=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240530161733.png",alt:"20240530161733",style:{zoom:"75%"}},null,-1),f=e("blockquote",null,[e("p",null,"seq2seq score 是在生成 token 时，根据 seq2seq 生成 token 的概率值来计算得到的，这个 score 可以看作是生成该序列的 log-likelihood，即模型认为这个序列是正确输出的相对可能性。在 beam-search 策略中，会选择概率最高的序列作为最终生成的序列。")],-1),x=e("p",null,[t("训练 score re-estimator 的方法，就是期待它能给正确的 NL-SQL pair 以更高的概率分，在做监督训练时，论文还采用了一个 trick："),e("strong",null,"使用 soft logits 作为监督信号"),t("，原论文解释如下：")],-1),T=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240530162604.png",alt:"20240530162604",style:{zoom:"75%"}},null,-1),y=e("p",null,"这样能更加对 beam search 中排名最高的候选者保持怀疑的态度。",-1),N=e("h2",{id:"四、总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#四、总结"},[e("span",null,"四、总结")])],-1),v=e("p",null,"本文模型是通过引入中间表示并使用 seq2seq（T5）来解决 Text2SQL 任务，同时论文中也指出了使用 seq2seq 在 Text2SQL 任务下的难点。",-1),R=e("p",null,"该工作还引入了 SSQL 这样的中间表示，它比 SemQL、RAT-SQL IR 等中间表示要简单不少。",-1);function I(O,w){const l=a("ExternalLinkIcon"),o=a("center");return c(),r("div",null,[e("blockquote",null,[e("p",null,[t("论文："),e("a",h,[t("T5-SR: A Unified Seq-to-Seq Decoding Strategy for Semantic Parsing"),s(l)])]),u,p]),S,s(o,null,{default:n(()=>[_]),_:1}),L,g,q,s(o,null,{default:n(()=>[Q]),_:1}),k,s(o,null,{default:n(()=>[b]),_:1}),f,x,s(o,null,{default:n(()=>[T]),_:1}),y,N,v,R])}const E=i(m,[["render",I],["__file","index.html.vue"]]),A=JSON.parse(`{"path":"/arxiv/2306.08368/","title":"💧 T5-SR：使用 T5 生成中间表示来得到 SQL","lang":"zh-CN","frontmatter":{"title":"💧 T5-SR：使用 T5 生成中间表示来得到 SQL","author":"Bin Yu","createTime":"2024/05/30 10:51:00","permalink":"/arxiv/2306.08368/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"一、论文速读","slug":"一、论文速读","link":"#一、论文速读","children":[]},{"level":2,"title":"二、中间表示：SSQL","slug":"二、中间表示-ssql","link":"#二、中间表示-ssql","children":[]},{"level":2,"title":"三、Score Re-estimator","slug":"三、score-re-estimator","link":"#三、score-re-estimator","children":[]},{"level":2,"title":"四、总结","slug":"四、总结","link":"#四、总结","children":[]}],"readingTime":{"minutes":3.04,"words":912},"git":{"updatedTime":1717830098000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":3}]},"filePathRelative":"notes/Text2SQL/2306.T5-SR.md","categoryList":[{"type":10000,"name":"notes"},{"type":10004,"name":"Text2SQL"}]}`);export{E as comp,A as data};