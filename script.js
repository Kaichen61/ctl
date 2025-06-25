// 剪切板内容
const clipboardData = [
  '1. www.example.com',
  '2. 人工智能的应用。',
  '3. [图片] https://img.freepik.com/free-photo/ai-cloud-concept-with-robot-arm_23-2149739748.jpg',
  '2. 灵感板的重要性。a:视觉化沟通工具：通过图片、色彩、文字、材质等元素的拼贴，将抽象想法转化为直观画面，快速传递设计风格、主题调性或创意方向，避免团队成员或合作方因理解偏差导致效率损耗。b:灵感整合与发散：整合碎片化灵感（如艺术作品、自然景观、文化符号等），帮助创作者梳理思路，发现元素间的潜在关联，激发新的创意组合，尤其适用于设计、广告、影视等创意领域。'
];

const flowArea = document.getElementById('flow-area');
const tip = document.getElementById('tip');

function autoResizeTextarea(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

function createInputBlock() {
  const inputRow = document.createElement('div');
  inputRow.className = 'input-row';
  const textarea = document.createElement('textarea');
  textarea.className = 'main-textarea';
  textarea.placeholder = '请在此输入或粘贴内容...';
  textarea.addEventListener('input', function() {
    autoResizeTextarea(textarea);
  });
  // 初始化高度
  setTimeout(() => autoResizeTextarea(textarea), 0);
  const img = document.createElement('img');
  img.className = 'side-image';
  img.style.display = 'none';
  img.alt = 'AI图片';
  inputRow.appendChild(textarea);
  inputRow.appendChild(img);
  return inputRow;
}

let btn1ClickCount = 0;

// 添加自动滚动函数
function scrollToLatest() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
}

for (let i = 1; i <= 3; i++) {
  document.getElementById('btn' + i).onclick = async () => {
    let newBlock;
    if (i === 3) {
      // 显示4张风格统一的图片
      newBlock = document.createElement('div');
      newBlock.className = 'input-row';
      
      const images = [
        'https://img.freepik.com/free-vector/cute-cat-working-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3717.jpg',
        'https://img.freepik.com/free-vector/cute-cat-gaming-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3714.jpg',
        'https://img.freepik.com/free-vector/cute-cat-with-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3737.jpg',
        'https://img.freepik.com/free-vector/cute-cat-playing-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3729.jpg'
      ];

      images.forEach(src => {
        const img = document.createElement('img');
        img.className = 'side-image';
        img.src = src;
        img.style.display = 'block';
        img.alt = '可爱卡通图';
        newBlock.appendChild(img);
      });

      flowArea.appendChild(newBlock);
      tip.textContent = '已插入4张可爱卡通图';
      setTimeout(scrollToLatest, 100); // 添加滚动
    } else if (i === 2) {
      // 只将上一个输入框内容变灰色，如果已是灰色则变回黑色
      const blocks = flowArea.getElementsByClassName('input-row');
      if (blocks.length > 0) {
        const lastTextarea = blocks[blocks.length - 1].querySelector('textarea');
        if (lastTextarea) {
          if (lastTextarea.classList.contains('placeholder-gray')) {
            lastTextarea.classList.remove('placeholder-gray');
            tip.textContent = '已恢复黑色显示';
          } else {
            lastTextarea.classList.add('placeholder-gray');
            tip.textContent = '已取消黑色显示';
          }
        }
      }
      setTimeout(scrollToLatest, 100); // 添加滚动
    } else {
      if (i === 1) btn1ClickCount++;
      newBlock = createInputBlock();
      const textarea = newBlock.querySelector('textarea');
      const img = newBlock.querySelector('img');
      let value = clipboardData[i - 1];
      if (i === 1) {
        textarea.value = '';
        img.style.display = 'none';
        textarea.focus();
        tip.textContent = '请稍候...';
        setTimeout(() => {
          if (btn1ClickCount === 2) {
            textarea.value = '2. 灵感板的重要性。a:视觉化沟通工具：通过图片、色彩、文字，将抽象想法转化为直观画面，快速传递设计风格、主题调性或创意方向，避免团队成员或合作方因理解偏差导致效率损耗。b:灵感整合与发散：整合碎片化灵感（如艺术作品、自然景观、文化符号等），帮助创作者梳理思路，发现元素间的潜在关联，激发新的创意组合，尤其适用于设计、广告、影视等创意领域。';
          } else if (btn1ClickCount === 3) {
            textarea.value = '3. 创建好的 moodboard 需明确主题，如 "复古未来风卧室"。围绕主题收集素材，可从摄影作品、插画、纺织品纹样中找色彩。合理排版，用大色块奠定基调，将主视觉元素居中，辅助素材如字体、材质小样分布四周，保留呼吸感，确保整体风格统一且有层次。';
          } else {
            textarea.value = value;
          }
          textarea.classList.add('placeholder-gray');
          tip.textContent = `已粘贴剪切板第${i}条内容`;
          textarea.dispatchEvent(new Event('input'));
          setTimeout(scrollToLatest, 100); // 添加滚动
        }, 1000);
      } else {
        textarea.value = value;
        img.style.display = 'none';
        textarea.focus();
        tip.textContent = `已粘贴剪切板第${i}条内容`;
        textarea.dispatchEvent(new Event('input'));
        setTimeout(scrollToLatest, 100); // 添加滚动
      }
      flowArea.appendChild(newBlock);
      if (i !== 3) {
        newBlock.querySelector('textarea').focus();
      }
    }
  };
}

// 一键复制逻辑保持不变
const copyAllBtn = document.getElementById('copy-all');
copyAllBtn.onclick = async () => {
  try {
    const text = clipboardData.map((item, idx) => {
      if (idx === 2) {
        return '3. ![AI图片](https://img.freepik.com/free-photo/ai-cloud-concept-with-robot-arm_23-2149739748.jpg)';
      }
      return item;
    }).join('\n');
    await navigator.clipboard.writeText(text);
    tip.textContent = '剪切板已写入4条内容（含图片链接）';
  } catch (e) {
    tip.textContent = '❌ 剪切板写入失败，请检查浏览器权限';
  }
};

document.getElementById('input-text-btn').onclick = () => {
  const firstBlock = flowArea.querySelector('.input-row');
  if (firstBlock) {
    const textarea = firstBlock.querySelector('textarea');
    const img = firstBlock.querySelector('img');
    if (textarea) textarea.value = 'moodboard 参考链接';
    if (img) img.style.display = 'none';
    tip.textContent = '已输出文字内容：moodboard 参考链接';
    if (textarea) {
      textarea.focus();
      // 触发自适应高度
      textarea.dispatchEvent(new Event('input'));
    }
  }
}; 