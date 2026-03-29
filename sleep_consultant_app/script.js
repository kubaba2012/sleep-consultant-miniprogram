// 页面导航函数
function goToPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// 导航函数
function goToHome() {
    goToPage('home');
}

function goToPlayer(type) {
    // 这里可以根据类型设置不同的音频内容
    goToPage('player');
}

function goToCategory(category) {
    goToPage('category');
}

function goToProfile() {
    goToPage('profile');
}

// 播放控制
let isPlaying = false;
const playPauseBtn = document.querySelector('.play-pause-btn');

function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playPauseBtn.textContent = '⏸️';
    } else {
        playPauseBtn.textContent = '▶️';
    }
}

// 为播放按钮添加事件监听器
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
}

// 音量控制
const volumeSlider = document.getElementById('volume');
if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        console.log('音量:', volume);
    });
}

// 定时控制
const timerSelect = document.getElementById('timer');
if (timerSelect) {
    timerSelect.addEventListener('change', (e) => {
        const duration = e.target.value;
        console.log('定时:', duration, '分钟');
    });
}

// 分类导航
const categoryNavItems = document.querySelectorAll('.nav-item');
categoryNavItems.forEach(item => {
    item.addEventListener('click', () => {
        // 移除所有激活状态
        categoryNavItems.forEach(i => i.classList.remove('active'));
        // 添加当前激活状态
        item.classList.add('active');
        
        console.log('选中分类:', item.textContent);
    });
});

// 搜索功能
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-box input');
if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log('搜索:', query);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                console.log('搜索:', query);
            }
        }
    });
}

// 音频卡片点击事件
const audioCards = document.querySelectorAll('.audio-card');
audioCards.forEach(card => {
    card.addEventListener('click', () => {
        goToPlayer('audio');
    });
});

// 音频项点击事件
const audioItems = document.querySelectorAll('.audio-item');
audioItems.forEach(item => {
    item.addEventListener('click', () => {
        goToPlayer('audio');
    });
});

// 收藏项点击事件
const collectionItems = document.querySelectorAll('.collection-item');
collectionItems.forEach(item => {
    item.addEventListener('click', () => {
        goToPlayer('audio');
    });
});

// 快速功能入口点击事件
const actionBtns = document.querySelectorAll('.action-btn');
actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('快速功能:', btn.textContent);
    });
});

// 设置项点击事件
const settingItems = document.querySelectorAll('.setting-item');
settingItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('设置项:', item.textContent);
    });
});

// 进度条点击事件
const progressTrack = document.querySelector('.progress-track');
if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const position = (e.clientX - rect.left) / rect.width;
        const percentage = Math.min(Math.max(position, 0), 1);
        console.log('进度:', Math.round(percentage * 100) + '%');
        
        // 更新进度条
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = percentage * 100 + '%';
        }
    });
}

// 循环播放按钮点击事件
const repeatBtn = document.querySelector('.repeat-btn');
if (repeatBtn) {
    repeatBtn.addEventListener('click', () => {
        repeatBtn.classList.toggle('active');
        console.log('循环播放:', repeatBtn.classList.contains('active'));
    });
}

// 前一首/后一首按钮点击事件
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        console.log('播放前一首');
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        console.log('播放后一首');
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    console.log('助眠师小程序加载完成');
    
    // 初始化播放状态
    isPlaying = false;
    
    // 添加页面过渡效果
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
    });
    
    // 为所有页面添加触摸滑动支持（可选）
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            // 判断当前页面并执行相应操作
            const activePage = document.querySelector('.page.active');
            
            if (diff > 0 && activePage.id === 'player') {
                // 从右向左滑动且在播放页，返回上一页
                goToHome();
            } else if (diff < 0 && activePage.id === 'home') {
                // 从左向右滑动且在首页，跳转到分类页
                goToCategory('all');
            }
        }
    }
    
    // 模拟音频播放进度
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
        if (isPlaying) {
            currentProgress += 0.001;
            if (currentProgress > 1) {
                currentProgress = 0;
            }
            
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = (currentProgress * 100) + '%';
            }
            
            // 更新时间显示
            const duration = 30 * 60; // 30分钟
            const currentTime = Math.floor(currentProgress * duration);
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            const progressTimeElements = document.querySelectorAll('.progress-time');
            if (progressTimeElements.length > 0) {
                progressTimeElements[0].textContent = timeString;
            }
        }
    }, 100);
    
    // 页面离开时清理定时器
    window.addEventListener('beforeunload', () => {
        clearInterval(progressInterval);
    });
});

// 工具函数

// 显示对话框
function showDialog(title, content) {
    // 创建对话框元素
    const overlay = document.createElement('div');
    overlay.className = 'overlay active';
    overlay.innerHTML = `
        <div class="dialog">
            <h3 class="dialog-title">${title}</h3>
            <p class="dialog-content">${content}</p>
            <div class="dialog-buttons">
                <button class="dialog-btn" onclick="this.closest('.overlay').remove()">确认</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 生成随机颜色
function getRandomColor() {
    const colors = [
        'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'linear-gradient(135deg, #10b981, #34d399)',
        'linear-gradient(135deg, #f59e0b, #fbbf24)',
        'linear-gradient(135deg, #ef4444, #f87171)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 为分类卡片添加随机背景色
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        const colors = [
            'linear-gradient(135deg, #6366f1, #8b5cf6)',
            'linear-gradient(135deg, #10b981, #34d399)',
            'linear-gradient(135deg, #f59e0b, #fbbf24)',
            'linear-gradient(135deg, #ef4444, #f87171)',
            'linear-gradient(135deg, #06b6d4, #22d3ee)',
            'linear-gradient(135deg, #ec4899, #f472b6)'
        ];
        card.style.background = colors[index % colors.length];
    });
});