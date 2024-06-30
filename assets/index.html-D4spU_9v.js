import{_ as s,r as l,o as r,c as o,a as e,b as t,d as i,w as c,e as p}from"./app-s5JIphqh.js";const h={},u={href:"http://arxiv.org/abs/1804.07461",target:"_blank",rel:"noopener noreferrer"},d=e("p",null,"⭐⭐⭐⭐",-1),m=e("p",null,"arXiv:1804.07461, ICLR 2019",-1),g={href:"https://gluebenchmark.com/",target:"_blank",rel:"noopener noreferrer"},b=e("h2",{id:"一、论文速读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、论文速读"},[e("span",null,"一、论文速读")])],-1),f=e("p",null,"GLUE benchmark 包含 9 个 NLU 任务来评估 NLP 模型的语义理解能力。这些任务均为 sentence or sentence-pair NLU tasks，语言均为英语。",-1),_=e("h2",{id:"二、glue-任务列表",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#二、glue-任务列表"},[e("span",null,"二、GLUE 任务列表")])],-1),k=e("p",null,"下图是各个任务的一个统计：",-1),x=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240629193525.png",alt:"20240629193525",style:{zoom:"75%"}},null,-1),y=p('<h3 id="_2-1-cola-corpus-of-linguistic-acceptability" tabindex="-1"><a class="header-anchor" href="#_2-1-cola-corpus-of-linguistic-acceptability"><span>2.1 CoLA（Corpus of Linguistic Acceptability）</span></a></h3><p><strong>单句子分类任务</strong>。每个 sentence 被标注为是否合乎语法的单词序列，是一个二分类任务。</p><p>样本个数：训练集 8551 个，开发集 1043 个，测试集 1063 个。</p><blockquote><p>label = 1（合乎语法） 的 examples：</p><ul><li>She is proud.</li><li>she is the mother.</li><li>Will John not go to school?</li></ul><p>label = 0（不合乎语法） 的 examples：</p><ul><li>Mary wonders for Bill to come.</li><li>Yes, she used.</li><li>Mary sent.</li></ul></blockquote><p>注意到，这里面的句子看起来不是很长，有些错误是性别不符，有些是缺词、少词，有些是加s不加s的情况，各种语法错误。但我也注意到，有一些看起来错误并没有那么严重，甚至在某些情况还是可以说的通的。</p><h3 id="_2-2-sst-2-the-stanford-sentiment-treebank" tabindex="-1"><a class="header-anchor" href="#_2-2-sst-2-the-stanford-sentiment-treebank"><span>2.2 SST-2（The Stanford Sentiment Treebank）</span></a></h3><p><strong>单句子分类任务</strong>：给定一个 sentence（电影评论中的句子），预测其情感是 positive 还是 negative，是一个二分类任务。</p><p>样本个数：训练集 67350 个，开发集 873 个，测试集 1821 个。</p><blockquote><p>label = 1（positive）的 examples：</p><ul><li>two central performances</li><li>against shimmering cinematography that lends the setting the ethereal beauty of an asian landscape</li><li>a better movie</li></ul><p>label = 0（negative）的 examples：</p><ul><li>so pat it makes your teeth hurt</li><li>eastwood &#39;s dirty harry period .</li><li>faced with the possibility that her life is meaningless , vapid and devoid of substance , in a movie that is definitely meaningless , vapid and devoid of substance</li></ul></blockquote><p>注意到，由于句子来源于电影评论，又有它们情感的人类注释，不同于CoLA的整体偏短，有些句子很长，有些句子很短，长短并不整齐。</p><h3 id="_2-3-mrpc-the-microsoft-research-paraphrase-corpus" tabindex="-1"><a class="header-anchor" href="#_2-3-mrpc-the-microsoft-research-paraphrase-corpus"><span>2.3 MRPC（The Microsoft Research Paraphrase Corpus）</span></a></h3><p><strong>相似性和释义任务</strong>：给定两个 sentence（来自于在线新闻），判断两个句子在语义上是否等效。</p><p>样本个数：训练集 3668 个，开发集 408 个，测试集 1725 个。</p><blockquote><p>label = 1（正样本，两个 sentence 语义相同）的 examples：</p><ul><li>Example 1: <ul><li>The largest gains were seen in prices, new orders, inventories and exports.</li><li>Sub-indexes measuring prices, new orders, inventories and exports increased.</li></ul></li><li>Example 2: <ul><li>Trading in Loral was halted yesterday; the shares closed on Monday at $ 3.01.</li><li>The New York Stock Exchange suspended trading yesterday in Loral, which closed at $ 3.01 Friday.</li></ul></li></ul><p>label = 2（负样本，两个 sentence 语义不同）的 examples：</p><ul><li>Example 1： <ul><li>Earnings per share from recurring operations will be 13 cents to 14 cents.</li><li>That beat the company &#39;s April earnings forecast of 8 to 9 cents a share.</li></ul></li><li>Example 2： <ul><li>He beat testicular cancer that had spread to his lungs and brain.</li><li>Armstrong, 31, battled testicular cancer that spread to his brain.</li></ul></li></ul></blockquote><p>本任务的数据集，包含两句话，每个样本的句子长度都非常长，且数据不均衡，正样本占比 68%，负样本仅占 32%。</p><h3 id="_2-4-stsb-the-semantic-textual-similarity-benchmark" tabindex="-1"><a class="header-anchor" href="#_2-4-stsb-the-semantic-textual-similarity-benchmark"><span>2.4 STSB（The Semantic Textual Similarity Benchmark）</span></a></h3><p><strong>相似性和释义任务</strong>。预测两个 sentence 的相似性得分，评分为 0~5 的一个 float。</p><p>样本个数：训练集 5749 个，开发集 1379 个，测试集 1377 个。</p><blockquote><ul><li>Example 1： <ul><li>A plane is taking off.</li><li>An air plane is taking off.</li><li>score：5.000</li></ul></li><li>Example 2： <ul><li>A man is playing a large flute.</li><li>A man is playing a flute.</li><li>score：3.800</li></ul></li></ul></blockquote><p>整体句子长度适中偏短，且均衡。</p><h3 id="_2-5-qqp-the-quora-question-pairs" tabindex="-1"><a class="header-anchor" href="#_2-5-qqp-the-quora-question-pairs"><span>2.5 QQP（The Quora Question Pairs）</span></a></h3><p><strong>相似性和释义任务</strong>。预测两个 question 在语义上是否等效，是二分类任务。</p><p>样本个数：训练集 363,870 个，开发集 40,431 个，测试集 390,965 个。</p><blockquote><p>label = 1（positive，等效）的 Examples：</p><ul><li>Example 1： <ul><li>How can I improve my communication and verbal skills?</li><li>What should we do to improve communication skills?</li></ul></li><li>Example 2: <ul><li>What has Hillary Clinton done that makes her trustworthy?</li><li>Why do Democrats consider Hillary Clinton trustworthy?</li></ul></li></ul><p>label = 0（negative，不等效）：</p><ul><li>Example 1： <ul><li>Why are you so sexy?</li><li>How sexy are you?</li></ul></li><li>Example 2： <ul><li>Which programming languages are common to develop in the area of gamification?</li><li>Who is the worst Director in the history of MNIT/MREC?</li></ul></li></ul></blockquote><p>任务类似于 MRPC，这个任务的正负样本也不均衡，负样本占 63%，正样本是 37%，而且这个训练集、测试集都非常大，这里的测试集比其他训练集都要多好几倍。</p><h3 id="_2-6-mnli-the-multi-genre-natural-language-inference-corpus" tabindex="-1"><a class="header-anchor" href="#_2-6-mnli-the-multi-genre-natural-language-inference-corpus"><span>2.6 MNLI（The Multi-Genre Natural Language Inference Corpus）</span></a></h3><p><strong>自然语言推断任务</strong>。给定 premise 和 hypothesis 两个 sentence，预测两者关系：entailment or condradiction or neutral。</p><p>样本个数：训练集392, 702个，开发集dev-matched 9, 815个，开发集dev-mismatched9, 832个，测试集test-matched 9, 796个，测试集test-dismatched9, 847个。因为MNLI是集合了许多不同领域风格的文本，所以又分为了matched和mismatched两个版本的数据集，matched指的是训练集和测试集的数据来源一致，mismached指的是训练集和测试集来源不一致。</p><blockquote><ul><li>Example 1： <ul><li>premise：The man is playing a guitar.</li><li>hypothesis：The man is singing while playing the guitar.</li><li>label：neutral</li><li>前提描述了一个男人正在弹吉他，而假设则进一步提出这个男人在弹吉他的同时还在唱歌。由于前提没有提及唱歌这一行为，所以我们不能从前提直接推断出假设是正确的（非蕴含），同时也不能断定它是错误的（非矛盾）。因此，这个文本对的关系被标记为中立。</li></ul></li></ul></blockquote><p>总体训练集很充足，GLUE 论文作者使用并推荐 SNLI 数据集作为辅助训练数据。</p><h3 id="_2-7-qnli-qusetion-answering-nli" tabindex="-1"><a class="header-anchor" href="#_2-7-qnli-qusetion-answering-nli"><span>2.7 QNLI（Qusetion-answering NLI）</span></a></h3><p><strong>自然语言推断任务</strong>。给定一个 question 和来自 Wikipedia 的 sentence，判断两者关系：蕴含 or 不蕴含。</p><p>数据是从 SQuAD 1.0（The Stanford Question Answering Dataset）中转换而来。</p><p>样本个数：训练集104, 743个，开发集5, 463个，测试集5, 461个。</p><blockquote><p>Example:</p><ul><li>Which collection of minor poems are sometimes attributed to Virgil?</li><li>A number of minor poems, collected in the Appendix Vergiliana, are sometimes attributed to him.</li><li>label: 1（蕴含）</li></ul></blockquote><p>总体就是问答句子组成的问答对，一个是问题，一个是句子信息，后者包含前者的答案就是蕴含，不包含就是不蕴含，是一个二分类。</p><h3 id="_2-8-rte-the-recognizing-textual-entailment-datasets" tabindex="-1"><a class="header-anchor" href="#_2-8-rte-the-recognizing-textual-entailment-datasets"><span>2.8 RTE（The Recognizing Textual Entailment datasets）</span></a></h3><p><strong>自然语言推断任务</strong>。判断两个 sentence 是否互为蕴含，二分类任务。</p><p>数据来源于一系列的年度文本蕴含挑战赛。</p><p>样本个数：训练集2, 491个，开发集277个，测试集3, 000个。</p><blockquote><p>Example:</p><ul><li>Herceptin was already approved to treat the sickest breast cancer patients, and the company said, Monday, it will discuss with federal regulators the possibility of prescribing the drug for more breast cancer patients.</li><li>Herceptin can be used to treat breast cancer.</li><li>label: 1（蕴含）</li></ul></blockquote><h3 id="_2-9-wnli-winograd-nli" tabindex="-1"><a class="header-anchor" href="#_2-9-wnli-winograd-nli"><span>2.9 WNLI（Winograd NLI）</span></a></h3><p><strong>自然语言推断任务</strong>。预测两个句子对是否有关（蕴含、不蕴含），二分类任务。</p><p>数据来源于指代消解比赛。训练集两个类别是均衡的，测试集是不均衡的，65% 是不蕴含。</p><p>样本个数：训练集635个，开发集71个，测试集146个。</p><blockquote><p>Example:</p><ul><li>Bill passed the half-empty plate to John because <strong>he</strong> was hungry.</li><li>Bill was hungry.</li><li>label: 0（不愿韩）</li></ul></blockquote><p>这个数据集是数量最少，训练集600多个，测试集才100多个。同时目前GLUE上这个数据集还有些问题。</p>',47),w=e("p",null,"参考文章：",-1),q={href:"https://www.zhihu.com/tardis/sogou/art/522017847",target:"_blank",rel:"noopener noreferrer"};function L(v,E){const a=l("ExternalLinkIcon"),n=l("center");return r(),o("div",null,[e("blockquote",null,[e("p",null,[t("论文："),e("a",u,[t("GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding"),i(a)])]),d,m,e("p",null,[t("Site: "),e("a",g,[t("https://gluebenchmark.com/"),i(a)])])]),b,f,_,k,i(n,null,{default:c(()=>[x]),_:1}),y,e("blockquote",null,[w,e("ul",null,[e("li",null,[e("a",q,[t("GLUE 基准数据集介绍 | 知乎"),i(a)])])])])])}const N=s(h,[["render",L],["__file","index.html.vue"]]),S=JSON.parse(`{"path":"/arxiv/1804.07461/","title":"🌙 GLUE benchmark：NLU 的多任务 benchmark","lang":"zh-CN","frontmatter":{"title":"🌙 GLUE benchmark：NLU 的多任务 benchmark","permalink":"/arxiv/1804.07461/","author":"Bin Yu","createTime":"2024/06/29 17:34:00","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"一、论文速读","slug":"一、论文速读","link":"#一、论文速读","children":[]},{"level":2,"title":"二、GLUE 任务列表","slug":"二、glue-任务列表","link":"#二、glue-任务列表","children":[{"level":3,"title":"2.1 CoLA（Corpus of Linguistic Acceptability）","slug":"_2-1-cola-corpus-of-linguistic-acceptability","link":"#_2-1-cola-corpus-of-linguistic-acceptability","children":[]},{"level":3,"title":"2.2 SST-2（The Stanford Sentiment Treebank）","slug":"_2-2-sst-2-the-stanford-sentiment-treebank","link":"#_2-2-sst-2-the-stanford-sentiment-treebank","children":[]},{"level":3,"title":"2.3 MRPC（The Microsoft Research Paraphrase Corpus）","slug":"_2-3-mrpc-the-microsoft-research-paraphrase-corpus","link":"#_2-3-mrpc-the-microsoft-research-paraphrase-corpus","children":[]},{"level":3,"title":"2.4 STSB（The Semantic Textual Similarity Benchmark）","slug":"_2-4-stsb-the-semantic-textual-similarity-benchmark","link":"#_2-4-stsb-the-semantic-textual-similarity-benchmark","children":[]},{"level":3,"title":"2.5 QQP（The Quora Question Pairs）","slug":"_2-5-qqp-the-quora-question-pairs","link":"#_2-5-qqp-the-quora-question-pairs","children":[]},{"level":3,"title":"2.6 MNLI（The Multi-Genre Natural Language Inference Corpus）","slug":"_2-6-mnli-the-multi-genre-natural-language-inference-corpus","link":"#_2-6-mnli-the-multi-genre-natural-language-inference-corpus","children":[]},{"level":3,"title":"2.7 QNLI（Qusetion-answering NLI）","slug":"_2-7-qnli-qusetion-answering-nli","link":"#_2-7-qnli-qusetion-answering-nli","children":[]},{"level":3,"title":"2.8 RTE（The Recognizing Textual Entailment datasets）","slug":"_2-8-rte-the-recognizing-textual-entailment-datasets","link":"#_2-8-rte-the-recognizing-textual-entailment-datasets","children":[]},{"level":3,"title":"2.9 WNLI（Winograd NLI）","slug":"_2-9-wnli-winograd-nli","link":"#_2-9-wnli-winograd-nli","children":[]}]}],"readingTime":{"minutes":5.89,"words":1766},"git":{"updatedTime":1719725199000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":2}]},"filePathRelative":"notes/LLM 评估/1804.GLUE.md","categoryList":[{"type":10000,"name":"notes"},{"type":10001,"name":"LLM 评估"}]}`);export{N as comp,S as data};