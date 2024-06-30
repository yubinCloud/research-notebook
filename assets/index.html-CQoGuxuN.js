import{_ as n,r as t,o as r,c as s,a as e,b as a,d as i,w as c,e as h}from"./app-s5JIphqh.js";const d={},p={href:"http://arxiv.org/abs/2303.13547",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"⭐⭐⭐⭐",-1),m=e("p",null,"arXiv:2303.13547",-1),S=e("p",null,"这篇论文呢综合评估了 ChatGPT 在 zero-shot Text2SQL 任务上的表现。",-1),T=e("p",null,"dataset 使用了 Spider、Spider-SYN、Spider-DK、Spider-Realistic、Spider-CG、ADVETA、CSpider、DuSQL、SParC 以及 CoSQL。",-1),_=e("p",null,"由于 ChatGPT 生成的 SQL 多样性，所以这里主要使用了 execution accuracy 作为 metric。",-1),g=e("h2",{id:"一、使用的-prompt",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、使用的-prompt"},[e("span",null,"一、使用的 Prompt")])],-1),x=e("p",null,"下图展示了使用 ChatGPT 来做 Text2SQL 的 prompts：",-1),L=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240529195521.png",alt:"20240529195521",style:{zoom:"75%"}},null,-1),C=h('<ul><li>上半的 prompt 是单轮对话的场景</li><li>下半的 prompt 是多轮对话的场景</li></ul><h2 id="二、evaluation-metrics" tabindex="-1"><a class="header-anchor" href="#二、evaluation-metrics"><span>二、Evaluation Metrics</span></a></h2><p>这里主要使用了三个 evaluation metric：</p><ul><li><strong>valid SQL</strong>（<strong>VA</strong>）：成功执行的 SQL 语句比例。</li><li><strong>execution accuracy</strong>（<strong>EX</strong>）：执行结果与标准 SQL 匹配的比例</li><li><strong>test-suite accuracy</strong>（<strong>TS</strong>）：测试套件是一组用于测试软件或系统特定部分的测试用例。在 Text2SQL 任务中，测试套件由一系列设计好的查询组成，这些查询旨在全面测试模型对不同 SQL 操作的理解和执行能力。这个指标通过执行测试套件中的所有测试用例，并根据执行准确性来评估模型的整体性能。它不仅考虑单个查询的成功执行，还考虑整个测试套件的覆盖率和成功率。</li></ul><h2 id="三、实验结果" tabindex="-1"><a class="header-anchor" href="#三、实验结果"><span>三、实验结果</span></a></h2><p>整体上来说，ChatGPT 表现出很强的 Text2SQL 能力。</p><p>下面总结一些结论：</p><ul><li>在 Spider 数据集上，ChatGPT 的表现比 SOTA 低了 14%，但是 ChatGPT 是 zero-shot 的，且未在 training set 上做 fine-tune。</li><li>在 Spider-SYN 和 Spider-Realistic 上，ChatGPT 表现也很不错，但与 SOTA 的差距稍大了一点，这也体现了当前的模型已经具备这两个场景的鲁棒性</li><li>在多轮对话的场景和需要外部知识的场景下，ChatGPT 由于其强大的世界知识和上下文建模能力，表现特别好。</li><li>在跨语言泛化的 Text2SQL 能力上，ChatGPT 的能力有待进一步改进。</li></ul><p>做了一些 case study，发现 ChatGPT 总在一些小细节上犯错，论文给出了 4 个 error case：</p><ol><li>ChatGPT 倾向于使用 LEFT JOIN 来设计 JOIN，但这模式在 Spider 数据集上并不经常出现</li><li>ChatGPT 经常对 database structure 产生迷惑性，导致找不到具体的 column</li><li>由于生成的 SQL 缺少正确的语义解释性，导致生成错误的带有嵌套 SQL 的 WHERE 子句</li><li>在 copy 特定 values 时出现错误，比如未保留大小写敏感性</li></ol><h2 id="四、总结" tabindex="-1"><a class="header-anchor" href="#四、总结"><span>四、总结</span></a></h2><p>可以看出，ChatGPT 在 Text2SQL 任务上表现还不错，但仍然有不少的提高空间：</p><ul><li>与 ChatGPT 进行多轮交互，以解决生成不可执行的 SQL 语句的问题</li><li>利用 DB 的报错来设计多轮对话，从而确保生成的 SQL 正确性</li><li>引入 in-context learning</li></ul>',13);function v(P,Q){const o=t("ExternalLinkIcon"),l=t("center");return r(),s("div",null,[e("blockquote",null,[e("p",null,[a("论文："),e("a",p,[a("A comprehensive evaluation of ChatGPT's zero-shot Text-to-SQL capability"),i(o)])]),u,m]),S,T,_,g,x,i(l,null,{default:c(()=>[L]),_:1}),C])}const k=n(d,[["render",v],["__file","index.html.vue"]]),G=JSON.parse(`{"path":"/arxiv/2303.13547/","title":"🌙 评估 ChatGPT 的 zero-shot Text2SQL 能力","lang":"zh-CN","frontmatter":{"title":"🌙 评估 ChatGPT 的 zero-shot Text2SQL 能力","author":"Bin Yu","createTime":"2024/05/28 22:30:00","permalink":"/arxiv/2303.13547/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"一、使用的 Prompt","slug":"一、使用的-prompt","link":"#一、使用的-prompt","children":[]},{"level":2,"title":"二、Evaluation Metrics","slug":"二、evaluation-metrics","link":"#二、evaluation-metrics","children":[]},{"level":2,"title":"三、实验结果","slug":"三、实验结果","link":"#三、实验结果","children":[]},{"level":2,"title":"四、总结","slug":"四、总结","link":"#四、总结","children":[]}],"readingTime":{"minutes":2.45,"words":734},"git":{"updatedTime":1717830098000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":2}]},"filePathRelative":"notes/Text2SQL/2303.全面评估 ChatGPT 的 zero-shot Text2SQL 能力.md","categoryList":[{"type":10000,"name":"notes"},{"type":10004,"name":"Text2SQL"}]}`);export{k as comp,G as data};
