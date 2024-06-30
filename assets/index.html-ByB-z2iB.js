import{_ as i,r,o as c,c as l,a as e,b as t,d as o,w as s,e as d}from"./app-s5JIphqh.js";const u={},m={href:"https://aclanthology.org/2023.acl-long.136/",target:"_blank",rel:"noopener noreferrer"},p=d('<h2 id="论文速读" tabindex="-1"><a class="header-anchor" href="#论文速读"><span>论文速读</span></a></h2><p>以往 RAG 的工作通常联合微调 retriever 和 LLM 导致紧密耦合，但经常是 LLM 作为一个 black-box 是无法微调的。</p><p>本文提出 <mark>AAR</mark>（Augmented-Adapted Retriever）模型：它选择一个小型的 encoder-decoder 架构的 LM 作为 source LM，并让 retriever 学习 LM 的 preference（&quot;偏好&quot;），从而让 retriever 适配 LM，由于本工作发现不同的 LM 的 preference 是类似的，所以训练好的 retriever 可以作为一个&quot;通用插件&quot;用在不同的 LM 以及不同的 downstream tasks 上。</p><p>具体来说，有一个 pre-trained retriever，一个小型的 encoder-decoder LM 作为 source LM，有一个 NLP 任务作为 source task。对于一个 question，首先让 retriever 检索出 N 个 docs，然后利用 source LM 对这 N 个 docs 使用 <em>FiD cross-attention</em> 机制（FiDAtt）为每个 doc 计算出一个 attention score，然后根据 attention score 选出 Top-K 的 docs。这 Top-K 的 docs 与 human-labeled docs 做并集得到 <strong>positive docs</strong>，之后使用 ANCE 采样得到 <strong>negative docs</strong>。然后就可以拿 positives 和 negatives 来训练 retriever，从而得到 AAR。这样训练得到的 ARR 可以作为一个通用插件并用在未见过的 LLM 和 downstream tasks 上。整个过程的图示如下：</p>',4),h=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240512221504.png",alt:"20240512221504",style:{zoom:"75%"}},null,-1),L=e("h2",{id:"实验",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#实验"},[e("span",null,"实验")])],-1),_=e("p",null,"在论文实验中，retriever 初始化自 Contriever 或者 ANCE，source LM 选择了 Flan-T5，source task 选择了 MS MARCO，因为 Contriever 和 ANCE 都在这个 task 做过微调。",-1),g=e("p",null,"这个模型经过实验，训练后的 AAR 在 PopQA task 上效果很好，在 MMLU task 上结果也还行。",-1),M=e("p",null,"消融实验发现：",-1),A=e("ul",null,[e("li",null,"仅使用 human-labeled docs 和仅使用 FiDAtt 的 Top-K docs 作为 positive docs 都不如合并起来效果好。"),e("li",null,"人类首选的文档和 LM 首选的文档之间的分布差距其实很大，人类也许认为可能一般的文档，LM 也许能从中在另一个角度得到辅助"),e("li",null,"将 Flan-T5 Base 作为 source LM 竟然比 Flan-T5 Large 得到了更好的效果，随着 target LM 的尺寸增加，两种方法都达到了相当的性能，所以，在自适应增强训练阶段使用较小的 LM 作为 source LM 的选择是合理有效的。")],-1),k=e("p",null,"对 LM preference 的文档进行分析，下图是人类偏好文档与 LM 偏好文档的重叠率的图：",-1),v=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240512222947.png",alt:"20240512222947",style:{zoom:"75%"}},null,-1),f=e("p",null,"可以看到，两种文档并不相似，差距还是挺大的，发现 LM 偏好的文档可以从其他角度来帮助 LM，而不是搜索用户喜欢的全部信息。这部分详细信息可以看原论文。",-1),R=e("h2",{id:"总结与分析",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结与分析"},[e("span",null,"总结与分析")])],-1),b=e("p",null,"对这篇论文的一些想法：",-1),x=e("ul",null,[e("li",null,"神奇的是，在一个 LLM 上得到的 preference 竟然可以迁移到其他 LLM，也许是可能大家的训练数据都差不多"),e("li",null,"FiD 是只能用于 encoder-decoder 架构的 LM，现在 decoder-only model 居多的情况下，需要做一些改进了，比如用于衡量 preference 的 score 也许可以由 LLM 直接生成，而不是间接通过 FiD 机制。")],-1);function y(N,C){const a=r("ExternalLinkIcon"),n=r("center");return c(),l("div",null,[e("blockquote",null,[e("p",null,[t("论文："),e("a",m,[t("Augmentation-Adapted Retriever Improves Generalization of Language Models as Generic Plug-In"),o(a)]),t(" ⭐⭐⭐ ACL 2023, Tsinghua & Microsoft，arXiv:2305.17331")])]),p,o(n,null,{default:s(()=>[h]),_:1}),L,_,g,M,A,k,o(n,null,{default:s(()=>[v]),_:1}),f,R,b,x])}const w=i(u,[["render",y],["__file","index.html.vue"]]),q=JSON.parse(`{"path":"/arxiv/2305.17331/","title":"🐋 AAR：训练一个LLM喜欢的检索器来做RAG","lang":"zh-CN","frontmatter":{"title":"🐋 AAR：训练一个LLM喜欢的检索器来做RAG","permalink":"/arxiv/2305.17331/","author":"Bin Yu","createTime":"2024/05/12 21:42:00","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"论文速读","slug":"论文速读","link":"#论文速读","children":[]},{"level":2,"title":"实验","slug":"实验","link":"#实验","children":[]},{"level":2,"title":"总结与分析","slug":"总结与分析","link":"#总结与分析","children":[]}],"readingTime":{"minutes":2.79,"words":836},"git":{"updatedTime":1716026122000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":2}]},"filePathRelative":"notes/RAG/2305.AAR：训练一个LLM喜欢的检索器来做RAG.md","categoryList":[{"type":10000,"name":"notes"},{"type":10003,"name":"RAG"}]}`);export{w as comp,q as data};