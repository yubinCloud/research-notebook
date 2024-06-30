import{_ as s,r as n,o as r,c,a as e,b as t,d as o,w as l,e as p}from"./app-s5JIphqh.js";const d={},m={href:"http://arxiv.org/abs/2310.06117",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,"⭐⭐⭐⭐",-1),u=e("p",null,"Google DeepMind, ICLR 2024, arXiv:2310.06117",-1),h=e("h2",{id:"论文速读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#论文速读"},[e("span",null,"论文速读")])],-1),_=e("p",null,"该论文受到的启发是：人类再解决一个包含很多细节的具体问题时，先站在更高的层次上解决一些更加抽象的问题，可以拓展一个更宽阔的上下文环境，从而辅助解决这个具体的问题。",-1),L=e("p",null,[t("反应到 LLM 中，就是当问 LLM 一个具体的物理题目时，先让 LLM 解决一个更加高层次的抽象问题 "),e("code",null,"这个问题背后用得到物理定律或法则是什么？"),t(" ，然后再让 LLM 去解决那个包含了很多细节的具体的物理题目，可能效果就会更好，准确率更高。")],-1),k=e("p",null,[t("因此，本论文提出了 "),e("mark",null,"Step-Back"),t(" 的 prompting 思路，示例如下：")],-1),f=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/image-20240510214918541.png",alt:"image-20240510214918541",style:{zoom:"100%"}},null,-1),M=e("p",null,"如上图所示，上半部分中，original question 是一个具体的物理问题，Step-Back Prompting 先让 LLM 进行抽象得到一个 StepBack Question，也就是“这个物理问题背后的物理定律是什么”，然后再去检索这个 StepBack Question 得到相关事实，然后基于以上信息去让 LLM 做 reasoning 得到 final answer。",-1),b=p('<ul><li><strong>Abstraction</strong>：先让 LLM 根据 original question 提出一个更高层次概念的 step-back question，并检索这个 step-back question 的相关事实</li><li><strong>Reasoning</strong>：基于高层次概念或原则的事实，LLM 就可以去推理原始问题的解决方案了。</li></ul><h2 id="分析讨论" tabindex="-1"><a class="header-anchor" href="#分析讨论"><span>分析讨论</span></a></h2><p><strong>StepBack Prompting 思路中的“抽象”通过去除不相关的细节和提炼高级概念或原则来指导具体问题的解决</strong>。</p><p>通过实验分析，<strong>abstraction 对于 LLM 来说是一个简单的任务</strong>，通过一些 few-shot exemplar 即可使用 in-context learning 来学会，<strong>但 reasoning 对于 LLM 来说仍然是最难学会的任务</strong>，在多个 error cases 上做分析，推理仍然是主要的错误来源。</p>',4);function x(v,B){const a=n("ExternalLinkIcon"),i=n("font");return r(),c("div",null,[e("blockquote",null,[e("p",null,[t("论文："),e("a",m,[t("Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models"),o(a)])]),g,u]),h,_,L,k,f,M,e("p",null,[t("简而言之，"),o(i,{color:"blue"},{default:l(()=>[t("Step-Back Prompting 包含两个简单的步骤")]),_:1}),t("：")]),b])}const P=s(d,[["render",x],["__file","index.html.vue"]]),w=JSON.parse(`{"path":"/arxiv/2310.06117/","title":"🐋 Step-Back Prompting：先解决更高层次的问题来提高 LLM 推理能力","lang":"zh-CN","frontmatter":{"title":"🐋 Step-Back Prompting：先解决更高层次的问题来提高 LLM 推理能力","permalink":"/arxiv/2310.06117/","author":"Bin Yu","createTime":"2024/05/10 21:40:00","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"论文速读","slug":"论文速读","link":"#论文速读","children":[]},{"level":2,"title":"分析讨论","slug":"分析讨论","link":"#分析讨论","children":[]}],"readingTime":{"minutes":1.85,"words":556},"git":{"updatedTime":1715426070000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":3}]},"filePathRelative":"notes/LM/2310.Step-Back Prompting：先解决更高层次的问题来提高 LLM 推理能力.md","categoryList":[{"type":10000,"name":"notes"},{"type":10002,"name":"LM"}]}`);export{P as comp,w as data};
