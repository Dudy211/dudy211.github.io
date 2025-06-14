// 上传按钮组件
class UploadSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.uploadPatternBtn = null;
        this.uploadMusicBtn = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .upload-section {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 30px 0;
                }
                .upload-btn {
                    padding: 10px 15px;
                    background-color: #4285f4;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: background-color 0.3s;
                }
                body.dark-mode .upload-btn {
                    background-color: #2a3b8c;
                }
                .upload-btn:hover {
                    background-color: #3367d6;
                }
                body.dark-mode .upload-btn:hover {
                    background-color: #3a4d9c;
                }
            </style>
            <div class="upload-section">
                <button class="upload-btn" id="upload-pattern">
                    <i class="fas fa-file-upload"></i>
                    <span>上传铺面</span>
                </button>
                <button class="upload-btn" id="upload-music">
                    <i class="fas fa-music"></i>
                    <span>上传音乐</span>
                </button>
            </div>
        `;

        this.uploadPatternBtn = this.shadowRoot.getElementById('upload-pattern');
        this.uploadMusicBtn = this.shadowRoot.getElementById('upload-music');
    }

    setupEventListeners() {
        this.uploadPatternBtn.addEventListener('click', function() {
            alert('上传铺面');
            // 这里可以添加上传铺面的逻辑
        });

        this.uploadMusicBtn.addEventListener('click', function() {
            alert('上传音乐');
            // 这里可以添加上传音乐的逻辑
        });
    }
}

customElements.define('upload-section', UploadSection);