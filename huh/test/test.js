class Test {
    constructor() {
        this.container = null;
    }

    initialize(container) {
        this.container = container;
        this.render();
    }

    render() {
        if (!this.container) return;

        // 清空容器
        this.container.innerHTML = '';

        // 创建画布
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置画布尺寸
        canvas.width = this.container.clientWidth;
        canvas.height = this.container.clientHeight;

        // 设置画布样式
        canvas.style.position = 'absolute';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        // 添加画布到容器
        this.container.appendChild(canvas);

        // 绘制背景
        ctx.fillStyle = '#444';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制文字
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('还在开发中', canvas.width / 2, canvas.height / 2);
    }
}

// 将Test类暴露给全局作用域
window.Test = Test;