import{_ as r,r as l,o as p,c,a as e,b as a,d as t,w as o,e as n}from"./app-s5JIphqh.js";const d={},h={href:"https://dl.acm.org/doi/10.1145/3654930",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"⭐⭐⭐⭐",-1),u=e("p",null,"arXiv:2402.16347, SIGMOD 2024",-1),L=e("p",null,"人大",-1),g={href:"https://github.com/RUCKBReasoning/codes",target:"_blank",rel:"noopener noreferrer"},_=n('<h2 id="一、论文速读" tabindex="-1"><a class="header-anchor" href="#一、论文速读"><span>一、论文速读</span></a></h2><p>本文提出一个开源的专门用于 Text2SQL 任务的 LLM —— <mark>CodeS</mark>，有多个参数规模的版本（1B ~ 15B），它是基于 <strong>StarCdoer</strong> 基座模型，使用 Text2SQL 相关的数据集继续训练得到的。同时，论文提出了在训练这个模型和使用这个模型一些方法。</p><p>论文提出的一些 challenges 和解决方案：</p><ul><li><strong>C1：如何让小模型具备复杂的 Text2SQL 推理能力</strong>？由于现有的 PLM（如 LLaMA-2）的训练数据中，与 SQL 相关的内容只占预料的很小一部分，这种数据偏差可能会阻碍模型的 SQL 生成能力。因此，本文提出一种<strong>增量预训练方法</strong>，利用与 Text2SQL 任务相关的数据集来训练。</li><li><strong>C2：如何生成一个好的 prompt 来解决 Schema Link 的困难</strong>？本文提出了一系列过滤方法，筛选出只与问题有关的 schema 输送给 LLM。</li><li><strong>C3：如何让 LLM 自适应地迁移到新 domain 的 DB 中</strong>？这个问题的主要障碍在于缺乏用于微调的 pairs，因此本文提出了一种<strong>双向数据增强技术</strong>，在少量人工操作下生成足够的微调数据集。</li></ul><p>总的来说，为了解决这三个问题，论文一共引入了三个组件来分别解决：Incremental pre-training（下图 a）、Database prompt construction（下图 b）、New Domain Adaption（下图 c）：</p>',5),S=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240614144553.png",alt:"20240614144553",style:{zoom:"75%"}},null,-1),C=n('<p>另外，上图的 (d) 和 (e) 展示 CodeS 模型的使用方式。</p><h2 id="二、增量预训练-incremental-pre-training" tabindex="-1"><a class="header-anchor" href="#二、增量预训练-incremental-pre-training"><span>二、增量预训练（Incremental pre-training）</span></a></h2><p>从 3 个维度来收集用于训练的数据：</p><ul><li><strong>SQL 相关数据</strong>：使用了 StarCoder 的与训练语料库种的 SQL 片段</li><li><strong>NL 相关数据</strong>：从多个来源收集了 4.5GB 的高质量对话数据</li><li><strong>NL2Code 数据</strong>：主要包含如下四类数据： <ul><li>CoNaLa、StaQC 包含需要 NL2Python 和 NL2SQL 的 pairs</li><li>CodeAlpaca 包含许多与代码相关的指令遵顼数据</li><li>Jupyter-structured-clean-dedup 是 StarCoder 的预训练语料库的子集</li><li>NL-SQL-458K 是本文精心制作的一个数据集，包含大量的 NL-SQL pairs</li></ul></li></ul><p>使用上面数据，对 StarCoder 进行增量预训练：对 SQL 相关数据做 2 个 epoch 的训练，对 NL 相关和 NL2Code 相关数据做 1 个 epoch 的训练。</p><p>训练的思路就是给定一个 sequence，让 LLM 能够最大化整个 sequence 的 likelihood，这可以通过计算每个 token 的条件概率的乘积来实现：</p>',6),f=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240614152443.png",alt:"20240614152443",style:{zoom:"75%"}},null,-1),b=n('<h2 id="三、database-prompt-construction" tabindex="-1"><a class="header-anchor" href="#三、database-prompt-construction"><span>三、Database prompt construction</span></a></h2><p>高质量的 prompt 能够为 LM 提供有价值的见解，从而提高 LLM 的表现。为了构造一个好的 prompt，这里主要采用了两个关键策略：schema filter 和 value retriever。</p><h3 id="_3-1-schema-filter" tabindex="-1"><a class="header-anchor" href="#_3-1-schema-filter"><span>3.1 Schema Filter</span></a></h3><p>由于 LLM 的 context window 装不下整个 DB 的 schema 信息，因此有必要过滤出有用的 schema。<mark>Schema Filter</mark> 的作用就是为一个 question 筛选出最相关的 tables 和 columns。</p><p>筛选的方法是：计算每个 column 与 question 的相关性分数，然后基于这些分数来选出 Top-K1 的 tables，然后对这些 tables 的每一个选出其中 Top-K2 的 columns。</p><h3 id="_3-2-value-retriever" tabindex="-1"><a class="header-anchor" href="#_3-2-value-retriever"><span>3.2 Value Retriever</span></a></h3><p>Value retriver 用于从 DB 中检索出与 question 相关的 cell values 并用于执行 schema linking。</p><p>这里使用了”由粗到细“的匹配方法：先使用 BM25 索引来快速粗粒度的初始搜索，然后使用 LCS 进行细粒度匹配。这种方式极大减少了 LCS 调用次数，提高了检索速度。</p><h3 id="_3-3-db-metadata" tabindex="-1"><a class="header-anchor" href="#_3-3-db-metadata"><span>3.3 DB metadata</span></a></h3><p>DB 有 4 类 metadata 也对于构建 prompt 很有用：</p><ol><li>Column Data Types：列的数据类型限制了它允许的操作</li><li>Comments：能够有效解决一些 column 的命名会让人产生歧义的问题</li><li>Representative DB values：每一列中选出一些有代表的 cell values 是很有用的</li><li>Primary and Foreign Keys：在实践中，使用唯一标识符来表示主键，为每个外键表示为 <code>{T1}.{COL1} = {T2}.{COL2}</code> 的形式来构建 prompt</li></ol><h3 id="_3-4-prompt-构建" tabindex="-1"><a class="header-anchor" href="#_3-4-prompt-构建"><span>3.4 prompt 构建</span></a></h3><p>有了上面的方案，我们可以得到如下用于构建 prompt 的信息：</p>',13),k=e("img",{src:"https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/20240614154929.png",alt:"20240614154929",style:{zoom:"75%"}},null,-1),v=n('<p>有了这些信息，就可以构建出一个 prompt 来让 LLM 根据 question 生成 SQL 了。</p><h2 id="四、new-domain-adaption" tabindex="-1"><a class="header-anchor" href="#四、new-domain-adaption"><span>四、New Domain Adaption</span></a></h2><p>现实场景下，我们会面临各种 domain 的数据库，为了做适应性微调，这里提出了一个<strong>双向数据增强技术</strong>，以较小的注释成本来自动生成大量可靠且通用的 question-SQL pairs。</p><h3 id="_4-1-question-sql-增强" tabindex="-1"><a class="header-anchor" href="#_4-1-question-sql-增强"><span>4.1 Question -&gt; SQL 增强</span></a></h3><p>这部分 augmentation 是寻找与人类偏好一致的 question-sql pairs。具体来说，就是先从用户那里收集一些真实的、有代表性的 NL question，然后再手动注释对应的 SQL，从而获得一些高质量的 pairs。</p><p>上面得到的 pairs 还是不足以微调的。进一步引入了一个 two-stage 的 prompting 方法：</p><ul><li>先 prompt GPT3.5 来生成潜在的问题，然后从真实问题中吸取灵感、有效捕捉用户意图</li><li>再让 GPT3.5 为这些问题合成对应的 SQL 查询</li></ul><h3 id="_4-2-sql-question-增强" tabindex="-1"><a class="header-anchor" href="#_4-2-sql-question-增强"><span>4.2 SQL -&gt; Question 增强</span></a></h3><p>使用一组通用 template 来生成通用的 pairs，这里使用的是 Spider 的常见 SQL template，比如 <code>返回 {TABLE} 的最低 {COLUMN}</code>，以及对应的 SQL template <code>SELECT {COLUMN} FROM {TABLE} GROUP BY {COLUMN} ORDER BY COUNT(*) ASC LIMIT 1</code>。</p><p>这些生成的 question 可能看起来有点死板，因此可以使用 GPT3.5 对它们进行重新表述。</p><h2 id="五、codes-的使用" tabindex="-1"><a class="header-anchor" href="#五、codes-的使用"><span>五、CodeS 的使用</span></a></h2><p>有两种使用方式：监督微调 or few-shot ICL。</p><h3 id="_5-1-监督微调" tabindex="-1"><a class="header-anchor" href="#_5-1-监督微调"><span>5.1 监督微调</span></a></h3><p>使用我们在 New Domain Adaption 得到的 domain-specific 数据，利用 DB prompt + question 就可以对 CodeS 做 SFT 了。</p><p>微调之后，就可以使用这个 LLM 输入 DB prompt + NL 来输出 SQL 了。</p><h3 id="_5-2-few-shot-icl" tabindex="-1"><a class="header-anchor" href="#_5-2-few-shot-icl"><span>5.2 Few-shot ICL</span></a></h3><p>为了让 ICL 效果更好，这里使用一个 retriever 从 dataset 中检索出有价值的 K 个 demonstrations 来做 ICL。</p><p><strong>最基本的方法是，根据 question 的 semantic similarity 来做检索，但这会有一个问题：检索时会过于重视 question 中的 entities</strong>。但我们的想法是，demonstrations 应该更偏向翻译问题的 pattern。比如对于问题 ”1949 年出生的歌手中谁唱了最多的歌曲“，retriever 可能会检索出很多关于歌手或者歌曲的数据。</p><p>为了避免过度强调 entities，这里掩盖掉 question 中的 entities，使其专注于 question 的核心结构。</p><p>具体来说，这里使用 NLTK 工具来删除 question 中识别到的实体，并使用 SimCSE 来评估句子相似度。称这里提出的检索方法为 <mark>question-pattern-aware demonstration retriever</mark>。</p><h2 id="六、实验" tabindex="-1"><a class="header-anchor" href="#六、实验"><span>六、实验</span></a></h2><h3 id="_6-1-延迟和部署要求" tabindex="-1"><a class="header-anchor" href="#_6-1-延迟和部署要求"><span>6.1 延迟和部署要求</span></a></h3><p>CodeS 可以进行私有化部署，之前的 DIN-SQL + GPT4 在 Spider 数据集上平均每个 sample 花费 60s，但是本文的 1B、3B、7B 和 15B 的版本的 inference 时间分别为 0.6s、0.9s、1.1s 和 1.5s。</p><p>另外，CodeS 还很适合实际部署，当以 Float16 精度操作时，这些变体分别需要 10G、13G、20G 和 35G 的 GPU 内存容量。</p><p>这样，我们就可以在本地机器上部署 CodeS，而不需要昂贵的 GPT-4 API。</p><h3 id="_6-2-其他的实验" tabindex="-1"><a class="header-anchor" href="#_6-2-其他的实验"><span>6.2 其他的实验</span></a></h3><p>具体参考原论文。包括微调的评估、ICL 的评估和消融实验。</p><h2 id="七、总结" tabindex="-1"><a class="header-anchor" href="#七、总结"><span>七、总结</span></a></h2><p>这篇论文开源了一个很不错的 Text2SQL 领域的 LLM，并同时开放了相关的新的数据集，在实际部署时，无论是基于 CodeS 还是另外再微调，这篇论文的思路都值得参考。</p>',29);function x(q,Q){const s=l("ExternalLinkIcon"),i=l("center");return p(),c("div",null,[e("blockquote",null,[e("p",null,[a("论文："),e("a",h,[a("CodeS: Towards Building Open-source Language Models for Text-to-SQL"),t(s)])]),m,u,L,e("p",null,[a("Code: "),e("a",g,[a("CodeS | GitHub"),t(s)])])]),_,t(i,null,{default:o(()=>[S]),_:1}),C,t(i,null,{default:o(()=>[f]),_:1}),b,t(i,null,{default:o(()=>[k]),_:1}),v])}const w=r(d,[["render",x],["__file","index.html.vue"]]),B=JSON.parse(`{"path":"/arxiv/2402.16347/","title":"🌙 CodeS：Text2SQL 领域的开源语言模型","lang":"zh-CN","frontmatter":{"title":"🌙 CodeS：Text2SQL 领域的开源语言模型","author":"Bin Yu","createTime":"2024/06/12 11:20:00","permalink":"/arxiv/2402.16347/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"一、论文速读","slug":"一、论文速读","link":"#一、论文速读","children":[]},{"level":2,"title":"二、增量预训练（Incremental pre-training）","slug":"二、增量预训练-incremental-pre-training","link":"#二、增量预训练-incremental-pre-training","children":[]},{"level":2,"title":"三、Database prompt construction","slug":"三、database-prompt-construction","link":"#三、database-prompt-construction","children":[{"level":3,"title":"3.1 Schema Filter","slug":"_3-1-schema-filter","link":"#_3-1-schema-filter","children":[]},{"level":3,"title":"3.2 Value Retriever","slug":"_3-2-value-retriever","link":"#_3-2-value-retriever","children":[]},{"level":3,"title":"3.3 DB metadata","slug":"_3-3-db-metadata","link":"#_3-3-db-metadata","children":[]},{"level":3,"title":"3.4 prompt 构建","slug":"_3-4-prompt-构建","link":"#_3-4-prompt-构建","children":[]}]},{"level":2,"title":"四、New Domain Adaption","slug":"四、new-domain-adaption","link":"#四、new-domain-adaption","children":[{"level":3,"title":"4.1 Question -> SQL 增强","slug":"_4-1-question-sql-增强","link":"#_4-1-question-sql-增强","children":[]},{"level":3,"title":"4.2 SQL -> Question 增强","slug":"_4-2-sql-question-增强","link":"#_4-2-sql-question-增强","children":[]}]},{"level":2,"title":"五、CodeS 的使用","slug":"五、codes-的使用","link":"#五、codes-的使用","children":[{"level":3,"title":"5.1 监督微调","slug":"_5-1-监督微调","link":"#_5-1-监督微调","children":[]},{"level":3,"title":"5.2 Few-shot ICL","slug":"_5-2-few-shot-icl","link":"#_5-2-few-shot-icl","children":[]}]},{"level":2,"title":"六、实验","slug":"六、实验","link":"#六、实验","children":[{"level":3,"title":"6.1 延迟和部署要求","slug":"_6-1-延迟和部署要求","link":"#_6-1-延迟和部署要求","children":[]},{"level":3,"title":"6.2 其他的实验","slug":"_6-2-其他的实验","link":"#_6-2-其他的实验","children":[]}]},{"level":2,"title":"七、总结","slug":"七、总结","link":"#七、总结","children":[]}],"readingTime":{"minutes":6.52,"words":1957},"git":{"updatedTime":1718353734000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":1}]},"filePathRelative":"notes/Text2SQL/2402.CodeS.md","categoryList":[{"type":10000,"name":"notes"},{"type":10004,"name":"Text2SQL"}]}`);export{w as comp,B as data};