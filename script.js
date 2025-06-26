// 剪切板内容
const clipboardData = [
  '可爱猫咪风格统一的4张图片：\n- https://img.freepik.com/free-vector/cute-cat-working-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3717.jpg\n- https://img.freepik.com/free-vector/cute-cat-gaming-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3714.jpg\n- https://img.freepik.com/free-vector/cute-cat-with-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3737.jpg\n- https://img.freepik.com/free-vector/cute-cat-playing-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3729.jpg',
  '3. 创建好的 moodboard 需明确主题，如 "复古未来风卧室"。围绕主题收集素材，可从摄影作品、插画、纺织品纹样中找色彩。',
  '2. 灵感板的重要性。a:视觉化沟通工具：通过图片、色彩、文字、材质等元素的拼贴，将抽象想法转化为直观画面。b:灵感整合与发散：整合碎片化灵感（如艺术作品、自然景观、文化符号等），帮助创作者梳理思路，发现元素间的潜在关联。',
  'www.example.com'
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

for (let i = 1; i <= 2; i++) {
  document.getElementById('btn' + i).onclick = async () => {
    let newBlock;
    if (i === 2) {
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
    } else {
      if (i === 1) btn1ClickCount++;
      // btn1第2次点击，延迟后插入猫咪图片，并置灰，需btn2恢复
      if (btn1ClickCount === 2) {
        newBlock = document.createElement('div');
        newBlock.className = 'input-row';
        tip.textContent = '请稍候...';
        setTimeout(() => {
          const images = [
            'https://img.freepik.com/free-vector/cute-cat-working-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3717.jpg',
            'https://img.freepik.com/free-vector/cute-cat-gaming-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3714.jpg',
            'https://img.freepik.com/free-vector/cute-cat-with-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3737.jpg',
            'https://img.freepik.com/free-vector/cute-cat-playing-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3729.jpg'
          ];
          newBlock.innerHTML = images.map(src => `<img class=\"side-image cat-gray\" src=\"${src}\" style=\"display:block;filter: grayscale(0.5) brightness(1.2);opacity:0.5;\" alt=\"可爱卡通图\">`).join('');
          tip.textContent = '已插入4张可爱卡通图（灰色显示，点击btn2恢复）';
          flowArea.appendChild(newBlock);
        }, 800);
        return;
      }
      // btn1第3次点击，分行粘贴a、b内容
      if (btn1ClickCount === 3) {
        newBlock = createInputBlock();
        const textarea = newBlock.querySelector('textarea');
        const img = newBlock.querySelector('img');
        const fullText = '2. 灵感板的重要性。a:视觉化沟通工具：通过图片、色彩、文字，将抽象想法转化为直观画面，快速传递设计风格、主题调性或创意方向，避免团队成员或合作方因理解偏差导致效率损耗。b:灵感整合与发散：整合碎片化灵感（如艺术作品、自然景观、文化符号等），帮助创作者梳理思路，发现元素间的潜在关联，激发新的创意组合，尤其适用于设计、广告、影视等创意领域。';
        const aMatch = fullText.match(/a:(.*?)b:/);
        const bMatch = fullText.match(/b:(.*)$/);
        const title = '2. 灵感板的重要性。';
        const aText = aMatch ? aMatch[1].trim() : '';
        const bText = bMatch ? bMatch[1].trim() : '';
        let aTextProcessed = aText.replace('，快速传递设计风格、主题调性或创意方向，避免团队成员或合作方因理解偏差导致效率损耗。', '');
        let bTextProcessed = bText.replace('，激发新的创意组合，尤其适用于设计、广告、影视等创意领域。', '');
        tip.textContent = '请稍候...';
        setTimeout(() => {
          textarea.value = title + '\na. ' + aTextProcessed + '\nb. ' + bTextProcessed;
          textarea.classList.add('placeholder-gray');
          textarea.dispatchEvent(new Event('input'));
          flowArea.appendChild(newBlock);
          autoResizeTextarea(textarea);
          tip.textContent = '已分行粘贴a、b内容';
        }, 800);
        return;
      }
      // btn1第4次点击，粘贴moodboard文字
      if (btn1ClickCount === 4) {
        newBlock = createInputBlock();
        const textarea = newBlock.querySelector('textarea');
        const img = newBlock.querySelector('img');
        let text3 = '3. 创建好的 moodboard 需明确主题，如 "复古未来风卧室"。围绕主题收集素材，可从摄影作品、插画、纺织品纹样中找色彩。合理排版，用大色块奠定基调，将主视觉元素居中，辅助素材如字体、材质小样分布四周，保留呼吸感，确保整体风格统一且有层次。';
        text3 = text3.replace('合理排版，用大色块奠定基调，将主视觉元素居中，辅助素材如字体、材质小样分布四周，保留呼吸感，确保整体风格统一且有层次。', '');
        tip.textContent = '请稍候...';
        setTimeout(() => {
          textarea.value = text3;
          textarea.classList.add('placeholder-gray');
          textarea.dispatchEvent(new Event('input'));
          flowArea.appendChild(newBlock);
          autoResizeTextarea(textarea);
          tip.textContent = '已粘贴moodboard内容';
        }, 800);
        return;
      }
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
          textarea.value = clipboardData[3]; // www.example.com
          textarea.classList.add('placeholder-gray');
          tip.textContent = `已粘贴剪切板第${i}条内容`;
          textarea.dispatchEvent(new Event('input'));
          flowArea.appendChild(newBlock);
          autoResizeTextarea(textarea);
        }, 800);
        return;
      } else {
        textarea.value = value;
        img.style.display = 'none';
        textarea.focus();
        tip.textContent = `已粘贴剪切板第${i}条内容`;
        textarea.dispatchEvent(new Event('input'));
      }
      flowArea.appendChild(newBlock);
      if (i !== 2) {
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

// 页面加载后渲染粘贴板内容
window.addEventListener('DOMContentLoaded', () => {
  const clipboardBarContent = document.getElementById('clipboard-bar-content');
  if (clipboardBarContent) {
    clipboardBarContent.innerHTML = clipboardData.map(item => {
      // 检查是否为图片链接列表
      if (item.startsWith('可爱猫咪风格统一的4张图片')) {
        // 提取所有图片链接
        const imgUrls = item.match(/https?:\/\/[^\s\n]+/g);
        if (imgUrls) {
          // 横向排列图片，左侧加12px padding
          return `<div style=\"display:flex;gap:12px;align-items:center;padding-left:12px;\">` + imgUrls.map(url => `<img src=\"${url}\" style=\"max-width:120px;max-height:120px;vertical-align:middle;border-radius:8px;box-shadow:0 2px 8px #eee;display:block;\" alt=\"猫图\" />`).join('') + '</div>';
        }
      }
      // 普通文本
      return `<span>${item}</span>`;
    }).join('<br>');
  }
});

// btn2点击时，恢复猫咪图片为彩色
document.getElementById('btn2').onclick = () => {
  const blocks = flowArea.getElementsByClassName('input-row');
  if (blocks.length > 0) {
    // 恢复最后一行所有猫咪图片的灰色滤镜
    const imgs = blocks[blocks.length - 1].querySelectorAll('img.cat-gray');
    if (imgs.length > 0) {
      imgs.forEach(img => {
        img.style.filter = '';
        img.style.opacity = '1';
      });
      tip.textContent = '已恢复猫咪图片彩色显示';
    } else {
      // 兼容原有逻辑
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
  }
}; 