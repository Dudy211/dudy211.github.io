// 游戏铺面展示区组件
class GameContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.playIcon = null;
        this.fullscreenIcon = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .game-container {
                    position: relative;
                    width: 80%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding-top: 56.25%; /* 16:9 宽高比 */
                    background-color: #000;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .game-placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    text-align: center;
                }
                .play-icon, .fullscreen-icon {
                    position: absolute;
                    font-size: 24px;
                    cursor: pointer;
                    color: white;
                }
                .play-icon {
                    top: 20px;
                    left: 20px;
                }
                .fullscreen-icon {
                    top: 20px;
                    right: 20px;
                }
            </style>
            <div class="game-container">
                <div class="game-placeholder">
                    <h3>sim-projM</h3>
                </div>
                <i class="fas fa-play play-icon" id="play-icon"></i>
                <i class="fas fa-expand fullscreen-icon" id="fullscreen-icon"></i>
            </div>
        `;

        this.playIcon = this.shadowRoot.getElementById('play-icon');
        this.fullscreenIcon = this.shadowRoot.getElementById('fullscreen-icon');
    }

    setupEventListeners() {
        this.playIcon.addEventListener('dblclick', function() {
            alert('开始游戏');
            // 这里可以添加开始游戏或播放的逻辑
        });

        this.fullscreenIcon.addEventListener('dblclick', function() {
            alert('全屏游戏');
            // 这里可以添加全屏游戏的逻辑
        });
    }
}

customElements.define('game-container', GameContainer);