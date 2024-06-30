import{_ as i,r as o,o as a,c as s,a as e,b as t,d as r,e as l}from"./app-s5JIphqh.js";const c={},p={href:"http://arxiv.org/abs/2112.09118",target:"_blank",rel:"noopener noreferrer"},d=e("p",null,"⭐⭐⭐⭐⭐",-1),g=e("p",null,"Facebook Research, arXiv:2112.09118",-1),h={href:"https://github.com/facebookresearch/contriever",target:"_blank",rel:"noopener noreferrer"},m=l('<h2 id="一、论文速读" tabindex="-1"><a class="header-anchor" href="#一、论文速读"><span>一、论文速读</span></a></h2><p>本文使用对比学习的方法来对文本检索模型做无监督学习训练，从而实现在多个领域的泛化性。</p><p><strong>提出的 motivation</strong>：在有大量数据集的 domain 上做监督训练得到的 dense retriever 具有强大的表现，但是当被应用到其他 domain 时，表现可能还不如 BM25 这类经典方法。于是想到，无监督学习是迁移学习的一种自然选择，本文的研究问题就是：<strong>有没有可能在无监督的情况下训练一个 dense retriever，并与 BM25 的性能相匹配</strong>。</p><p>本工作提出了 <mark>Contriever</mark> 模型，采用 bi-encoder 架构，query 和 doc 分别进行编码，其相关性得分由两者的 vector representation 的 dot product 计算得出。经验表明，query encoder 与 doc encoder 采用相同的 encoder 通常可以在零样本迁移或者少样本学习的背景下提高鲁棒性（原 paper 第 3 节提出），因此本工作使用了相同的 encoder，encoder 基于 BERT 来进行训练。</p><p>论文的重点创新是其训练思路，下面详细介绍。</p><h2 id="二、模型的训练" tabindex="-1"><a class="header-anchor" href="#二、模型的训练"><span>二、模型的训练</span></a></h2><h3 id="_2-1-对比学习-contrastive-learning" tabindex="-1"><a class="header-anchor" href="#_2-1-对比学习-contrastive-learning"><span>2.1 对比学习（Contrastive Learning）</span></a></h3><p>训练数据包含 positive pairs 和 negative pairs，对比学习采用 InfoNCE 损失，具体如下论文所示：</p><p><img src="https://notebook-img-1304596351.cos.ap-beijing.myqcloud.com/img/1715417066478.png" alt="1715417066478"></p><h3 id="_2-2-构建-positive-pairs" tabindex="-1"><a class="header-anchor" href="#_2-2-构建-positive-pairs"><span>2.2 构建 positive pairs</span></a></h3><p>对比学习的一个关键因素是如何从单个 input 中构建 positive pairs，本文的方法如下：</p><ul><li><strong>反完形填空任务</strong>（<strong>Inverse Cloze Task</strong>，<strong>ICT</strong>）：是一种训练 retriever 的数据增强方法，经常被用来生成用于训练的正样本对，具体来说，ICT 的步骤如下： <ol><li>文本分段：将 document 分割成若干的 segments</li><li>随机采样：从每个 segment 中随机采样出一个 span 的文本作为 query，该 segment 的剩余部分作为 context，(query, context) 就可以作为一个正样本</li><li>训练检索器：训练 retriever，使其能够根据 query 检索出原始的 context</li></ol></li><li><strong>Independent cropping</strong>：从一个 document 中，完全独立随机地采样出两个 span tokens 作为正样本对</li><li><strong>Additional data augmentation</strong>：额外的数据增强，如随即删除单词、替换或者屏蔽等。</li></ul><p>在之后的消融实验中，<strong>该工作发现使用“independent cropping”来训练 retriever 是 ICT 的一个有力替代方案</strong>。</p><h3 id="_2-3-构建大量的-negative-pairs" tabindex="-1"><a class="header-anchor" href="#_2-3-构建大量的-negative-pairs"><span>2.3 构建大量的 negative pairs</span></a></h3><p>这里主要用了两种思路：in-batch negatives 方法和 MoCo 方法。</p><p>in-batch negatives 方法已经在其他论文讲解中介绍了。</p><p><mark>Moco</mark>（Momentum Contrast）是一种用于无监督或自监督学习的对比学习方法，它在处理大规模数据集时特别有效，因为它可以高效地利用大量的负样本。<strong>MoCo 的核心思想是使用一个动态更新的 queue 来存储 negative example 的 vector representation</strong>。</p><p>MoCo 方法的几个关键步骤如下：</p><ol><li><strong>正样本对</strong>：对于每个 input，先按照前面的方法构造一个 positive pair</li><li><strong>负样本队列</strong>：维护了一个 negative queue，用于存储之前 batch 的 negative example 的 vector representation，其大小是固定预先设定的。每个训练步骤中，最新的负样本表示会被加入到 queue 中，而队首则会被移除。queue 反映了最近的训练状态。</li><li><strong>Query Network</strong>：该网络负责对 input query 生成 vector representation，训练过程中会通过梯度下降进行更新</li><li><strong>动量编码器</strong>（momentum encoder）：MoCo 中，负样本的 representation 由动量编码器生成，该编码器的参数更新也不是通过梯度下降更新，而是通过“指数移动平均”来更新（具体可参考原论文）。这意味着动量编码器的参数更新速度较慢，从而在训练过程中提供了更加平滑和一致的负样本表示。</li><li><strong>对比损失</strong>：使用对比损失来训练 encoder，对于每个正样本对，模型需要将其与队列中的负样本区分开来。</li></ol><p>以上就是 MoCo 的思路。</p><h2 id="三、结论" tabindex="-1"><a class="header-anchor" href="#三、结论"><span>三、结论</span></a></h2><p>该工作主要探索了使用 MoCo 技术来基于对比学习和无监督学习来训练 retriever，并发现它表现出良好的检索性能，具有不错的泛化性。</p><p>如果继续对其微调的话，可以进一步改进其表现，从而产生强大的结果。</p>',23);function u(v,_){const n=o("ExternalLinkIcon");return a(),s("div",null,[e("blockquote",null,[e("p",null,[t("论文："),e("a",p,[t("Unsupervised Dense Information Retrieval with Contrastive Learning"),r(n)])]),d,g,e("p",null,[t("Code："),e("a",h,[t("github.com/facebookresearch/contriever"),r(n)])])]),m])}const f=i(c,[["render",u],["__file","index.html.vue"]]),b=JSON.parse(`{"path":"/arxiv/2112.09118/","title":"🐋 Contriever：对比学习来无监督训练文本检索器","lang":"zh-CN","frontmatter":{"title":"🐋 Contriever：对比学习来无监督训练文本检索器","permalink":"/arxiv/2112.09118/","author":"Bin Yu","createTime":"2024/05/11 11:08:00","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"一、论文速读","slug":"一、论文速读","link":"#一、论文速读","children":[]},{"level":2,"title":"二、模型的训练","slug":"二、模型的训练","link":"#二、模型的训练","children":[{"level":3,"title":"2.1 对比学习（Contrastive Learning）","slug":"_2-1-对比学习-contrastive-learning","link":"#_2-1-对比学习-contrastive-learning","children":[]},{"level":3,"title":"2.2 构建 positive pairs","slug":"_2-2-构建-positive-pairs","link":"#_2-2-构建-positive-pairs","children":[]},{"level":3,"title":"2.3 构建大量的 negative pairs","slug":"_2-3-构建大量的-negative-pairs","link":"#_2-3-构建大量的-negative-pairs","children":[]}]},{"level":2,"title":"三、结论","slug":"三、结论","link":"#三、结论","children":[]}],"readingTime":{"minutes":3.83,"words":1148},"git":{"updatedTime":1716026122000,"contributors":[{"name":"yubinCloud","email":"yubin_SkyWalker@yeah.net","commits":3}]},"filePathRelative":"notes/RAG/2112.Contriever：对比学习来无监督训练文本嵌入模型.md","categoryList":[{"type":10000,"name":"notes"},{"type":10003,"name":"RAG"}]}`);export{f as comp,b as data};
