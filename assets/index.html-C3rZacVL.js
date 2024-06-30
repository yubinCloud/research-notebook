import{_ as r,r as i,o as c,c as m,a as e,b as s,d as t,w as n,e as l}from"./app-s5JIphqh.js";const d={},p={href:"http://arxiv.org/abs/2312.11242",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"⭐⭐⭐⭐",-1),h=e("p",null,"arXiv:2312.11242, 北航 & Tencent",-1),g={href:"https://github.com/wbbeyourself/MAC-SQL",target:"_blank",rel:"noopener noreferrer"},_=l('<h2 id="一、论文速读" tabindex="-1"><a class="header-anchor" href="#一、论文速读"><span>一、论文速读</span></a></h2><p>本文提出了一个使用多个 agents 进行互相合作的框架 <mark>MAC-SQL</mark> 来解决 Text2SQL 任务。</p><p>MAC-SQL 主要由 3 种 agents 组成：</p><ul><li><em><strong>Selector</strong></em>：通过去除掉 inference 时无关的信息来把一个大的数据库分解为更小的数据库</li><li><em><strong>Decomposer</strong></em>：通过 prompt 的方法来把一个复杂的 question 分解为渐进性的几个可以被独立解决的 sub-questions</li><li><em><strong>Refiner</strong></em>：用于检测和自动改正 SQL 的错误</li></ul><blockquote><p>原论文对三者的描述：</p><p>Specifically, the <strong>Decomposer</strong> disassembles complex questions into simpler sub-questions and addresses them sequentially through chain-of-thought reasoning. If required, the <strong>Selector</strong> decomposes a large database into smaller sub-databases to minimize interference from irrelevant information. Meanwhile, the <strong>Refiner</strong> utilizes an external tool for SQL execution, acquires feedback, and refines any incorrect SQL queries.</p></blockquote><p>下面是基于三个 agents 来实现 MAC-SQL 的算法流程：</p>',6),f=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/1717468121886(1).png",alt:"1717468121886(1)",style:{zoom:"75%"}},null,-1),b=e("h2",{id:"二、mac-sql",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#二、mac-sql"},[e("span",null,"二、MAC-SQL")])],-1),L=e("h3",{id:"_2-1-selector-agent",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-1-selector-agent"},[e("span",null,"2.1 Selector agent")])],-1),S=e("blockquote",null,[e("p",null,"The Selector agent is designed to automatically decompose a large database into smaller sub-databases to minimize interference from irrelevant information.")],-1),k=e("p",null,"由于现实世界种的数据库特别大，包含了许多 tables 和 columns，一次 LLM 的 API Call 可能无法处理这些多的 schemas，因此需要使用 Selector 来去除掉无关信息并得到的一个较小的 schema。",-1),q=e("p",null,"如下是一个使用 Selector 的 prompt 示例：",-1),Q=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240604103503.png",alt:"20240604103503",style:{zoom:"75%"}},null,-1),x=l('<p>可以看到，Selector 的 prompt 包含四部分：task desc、instruction、demonstrations 和一个 text example，期望的输出是一个 JSON，里面枚举了所有选择后的 tables，并将它们分成 3 类：</p><ul><li>&quot;keep_all&quot;</li><li>&quot;drop_all&quot;</li><li>一个相关的 column list</li></ul><p>这个 JSON 中的 schema 输入给 <em>Decomposer</em> agent。</p><h3 id="_2-2-decomposer-agent" tabindex="-1"><a class="header-anchor" href="#_2-2-decomposer-agent"><span>2.2 Decomposer agent</span></a></h3><blockquote><p>The primary purpose of the Decomposer is to systematically decompose complex questions into progressively refined sub-questions, which can then be solved individually.</p></blockquote><p>当面对复杂问题时，生成的 SQL 经常会有缺陷，因此一个自然的想法就是像 CoT 一样将其分解为 sub-questions 再解决。</p><p>图示：</p>',7),y=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240604104837.png",alt:"20240604104837",style:{zoom:"75%"}},null,-1),v=l('<p>可以看到，最后一个 sub-question 就是原来的 user question 了，所以最后一步生成的 SQL 就是 <em>Decomposer</em> 输出的 SQL。</p><p>具体来说，Decomposer 可以用 CoT 或者 least-to-most 两种 prompt 策略来实现。</p><h3 id="_2-3-refiner-agent" tabindex="-1"><a class="header-anchor" href="#_2-3-refiner-agent"><span>2.3 Refiner agent</span></a></h3><blockquote><p>The primary function of the Refiner is to detect and automatically rectify SQL errors.</p></blockquote><p>对于一个 SQL，Refiner 首先从下面三个角度来诊断：</p><ul><li>句法正确性</li><li>可执行性</li><li>DB 检索后是否为非空结果</li></ul><p>如果检查通过，这个 SQL 被输出为最终答案，否则，就执行 <em>correction</em> 操作。之后，修正后的 SQL 仍需重新诊断，重复这个过程直至检查通过或者达到最大重复次数。</p><p>具体的 correction 过程包括基于原始 SQL 和错误反馈信息或修改引导信号进行推理，生成修改后的结果。</p><p>图示：</p>',9),C=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240604110556.png",alt:"20240604110556",style:{zoom:"75%"}},null,-1),M=e("p",null,"最后论文还指出，单靠一个 refiner agent 提供的帮助也是有限的，不可避免还存在一些错误的问题，这需要再系统层面进行更多的优化。",-1),T=e("h2",{id:"三、指令微调的-sql-llama",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#三、指令微调的-sql-llama"},[e("span",null,"三、指令微调的 SQL-Llama")])],-1),A=e("p",null,"本文基于 Code Llama 7B，使用前面介绍的 3 个 agents 的指令数据进行微调，得到了 SQL-Llama，让 model 在 database simplification、question decomposition、SQL generation 和 SQL correction 方面的能力得到增强。",-1),D=e("p",null,"用于微调的数据是基于三个 agents 在 BIRD 和 Spider 数据集上得到的。",-1),w=e("p",null,"这个过程的关键挑战是：model 的训练过程需要平衡它的 complexity 和 performance。也就是需要在维持其较高的 performance 时有效处理 db 相关任务的复杂度。",-1),R=e("h2",{id:"四、实验",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#四、实验"},[e("span",null,"四、实验")])],-1),z=e("p",null,"论文在 BIRD 数据集上做的测试，baseline 只选择了 LLM-based 的方案，并没有选择非 LLM 的 baseline。实验结果如下图所示：",-1),B=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240604113131.png",alt:"20240604113131",style:{zoom:"75%"}},null,-1),I=e("p",null,"论文还做了消融实验，证明了三个 agents 在提高 acc 方面都发挥了重要的作用。",-1),N=e("p",null,"另外论文还发现，ICL 中增加 demonstrations 的数量可以让效果更好。",-1),j=e("p",null,"论文最后还给出了 error cases 的统计分析，可以参考原论文。",-1),E=e("h2",{id:"五、总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#五、总结"},[e("span",null,"五、总结")])],-1),P=e("p",null,"本论文利用多个 agents 合作的思路来解决 Text2SQL 任务，同时提供了一个开源的 SQL-Llama 模型，在 BIRD 数据集上实现了 SOTA 效果。",-1);function O(V,J){const a=i("ExternalLinkIcon"),o=i("center");return c(),m("div",null,[e("blockquote",null,[e("p",null,[s("论文："),e("a",p,[s("MAC-SQL: A Multi-Agent Collaborative Framework for Text-to-SQL"),t(a)])]),u,h,e("p",null,[s("Code: "),e("a",g,[s("MAC-SQL | GitHub"),t(a)])])]),_,t(o,null,{default:n(()=>[f]),_:1}),b,L,S,k,q,t(o,null,{default:n(()=>[Q]),_:1}),x,t(o,null,{default:n(()=>[y]),_:1}),v,t(o,null,{default:n(()=>[C]),_:1}),M,T,A,D,w,R,z,t(o,null,{default:n(()=>[B]),_:1}),I,N,j,E,P])}const G=r(d,[["render",O],["__file","index.html.vue"]]),H=JSON.parse(`{"path":"/arxiv/2312.11242/","title":"🌙 MAC-SQL：多个 Agents 合作来解决 Text2SQL","lang":"zh-CN","frontmatter":{"title":"🌙 MAC-SQL：多个 Agents 合作来解决 Text2SQL","author":"Bin Yu","createTime":"2024/06/03 21:27:00","permalink":"/arxiv/2312.11242/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"一、论文速读","slug":"一、论文速读","link":"#一、论文速读","children":[]},{"level":2,"title":"二、MAC-SQL","slug":"二、mac-sql","link":"#二、mac-sql","children":[{"level":3,"title":"2.1 Selector agent","slug":"_2-1-selector-agent","link":"#_2-1-selector-agent","children":[]},{"level":3,"title":"2.2 Decomposer agent","slug":"_2-2-decomposer-agent","link":"#_2-2-decomposer-agent","children":[]},{"level":3,"title":"2.3 Refiner agent","slug":"_2-3-refiner-agent","link":"#_2-3-refiner-agent","children":[]}]},{"level":2,"title":"三、指令微调的 SQL-Llama","slug":"三、指令微调的-sql-llama","link":"#三、指令微调的-sql-llama","children":[]},{"level":2,"title":"四、实验","slug":"四、实验","link":"#四、实验","children":[]},{"level":2,"title":"五、总结","slug":"五、总结","link":"#五、总结","children":[]}],"readingTime":{"minutes":3.8,"words":1139},"git":{"updatedTime":1717830098000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":2}]},"filePathRelative":"notes/Text2SQL/2312.MAC-SQL.md","categoryList":[{"type":10000,"name":"notes"},{"type":10004,"name":"Text2SQL"}]}`);export{G as comp,H as data};
