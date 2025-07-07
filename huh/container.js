// container.js
class HuhContain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const isLandscape = screenWidth > screenHeight;
        const width = isLandscape ? screenWidth : screenHeight;
        const height = isLandscape ? screenHeight : screenWidth;

        const gcd = (a, b) => (b ? gcd(b, a % b) : a);
        const widthGcd = gcd(width, height);
        const widthRatio = width / widthGcd;
        const heightRatio = height / widthGcd;

        const containerStyle = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #333;
            color: white;
            padding: 20px;
            box-sizing: border-box;
            border-radius: 10px;
            margin: 20px auto;
            width: 80vw;
            height: calc(80vw / ${widthRatio} * ${heightRatio});
            position: relative;
        `;

        const textStyle = `
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        `;

        const ratioStyle = `
            font-size: 14px;
            color: #aaa;
            margin-top: 10px;
        `;

        const iconStyle = `
            position: absolute;
            width: 24px;
            height: 24px;
            fill: white;
            cursor: pointer;
        `;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .container {
                    ${containerStyle}
                }
                .text {
                    ${textStyle}
                }
                .ratio {
                    ${ratioStyle}
                }
                .icon-save {
                    ${iconStyle}
                    top: 10px;
                    left: 10px;
                }
                .icon-fullscreen {
                    ${iconStyle}
                    bottom: 10px;
                    left: 10px;
                }
                .developing {
                    font-size: 20px;
                    color: white;
                    margin: 0;
                }
            </style>
            <div class="container">
                <!-- 软盘图标 -->
                <svg class="icon-save" viewBox="0 0 24 24">
                    <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zM12 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm4-10H8V5h8v4z"/>
                </svg>

                <!-- 全屏图标 -->
                <svg class="icon-fullscreen" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H7v5zm10 5h-2v3h-3v2h5v-5zm-2-9v2h3v3h2V5h-5z"/>
                </svg>

                <div class="text">huh-Muse</div>
                <div class="ratio">容器比例: ${widthRatio}:${heightRatio}</div>
            </div>
        `;
    }

    setupEventListeners() {
        // 监听 start_test 事件
        window.addEventListener("start_test", () => {
            this.showDevelopingMessage();
        });
    }

    showDevelopingMessage() {
        // 创建 Test 实例并初始化
        const test = new Test();
        const container = this.shadowRoot.querySelector(".container");
        test.initialize(container);
    }
}

customElements.define("huh-contain", HuhContain);