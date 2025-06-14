// 设置选项组件
class SettingsSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.musicSelect = null;
        this.bpmInput = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .settings-section {
                    max-width: 600px;
                    margin: 0 auto 30px;
                    padding: 15px;
                    background-color: #f1f1f1;
                    border-radius: 10px;
                }
                body.dark-mode .settings-section {
                    background-color: #2d2d2d;
                }
                .settings-section h4 {
                    margin-top: 0;
                }
                .settings-section select,
                .settings-section input {
                    width: 100%;
                    padding: 8px;
                    margin-top: 5px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                body.dark-mode .settings-section select,
                body.dark-mode .settings-section input {
                    background-color: #3d3d3d;
                    border-color: #555;
                    color: white;
                }
            </style>
            <div class="settings-section">
                <h4>选择音乐</h4>
                <select id="music-select">
                    <option value="">-- 请选择音乐 --</option>
                    <option value="music1">音乐 1</option>
                    <option value="music2">音乐 2</option>
                    <option value="music3">音乐 3</option>
                </select>
                <h4>填写 BPM</h4>
                <input type="number" id="bpm-input" placeholder="请输入 BPM">
            </div>
        `;

        this.musicSelect = this.shadowRoot.getElementById('music-select');
        this.bpmInput = this.shadowRoot.getElementById('bpm-input');
    }

    setupEventListeners() {
        this.musicSelect.addEventListener('change', function() {
            alert(`选择的音乐: ${this.value}`);
            // 这里可以添加选择音乐的逻辑
        });

        this.bpmInput.addEventListener('input', function() {
            alert(`输入的 BPM: ${this.value}`);
            // 这里可以添加处理 BPM 输入的逻辑
        });
    }
}

customElements.define('settings-section', SettingsSection);