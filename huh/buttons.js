class ButtonsSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.uploadPatternBtn = null;
        this.uploadMusicBtn = null;
        this.testButton = null;
        this.createButton = null;
        this.chartSelect = null;
        this.musicSelect = null;
        this.bpmInput = null;
        this.offsetInput = null;
        this.uploadedPatterns = []; // 已上传谱面
        this.uploadedMusics = []; // 已上传音乐
        this.currentChart = null; // 当前选择的谱面
        this.currentMusic = null; // 当前选择的音乐
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeDefaultPattern(); // 初始化默认谱面
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
            display: block;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
        }

        .upload-section {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        .upload-btn {
            flex: 1;
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
            min-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            justify-content: center;
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

        .setting-row {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            margin-bottom: 15px;
        }
        .setting-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
        }
        label {
            font-weight: bold;
            color: var(--text-color);
        }
        select, input {
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 16px;
            transition: all 0.2s ease;
            width: 100%;
            box-sizing: border-box;
            background-color: var(--input-bg);
            color: var(--text-color);
        }

        :host-context(body:not([dark-mode])) select,
        :host-context(body:not([dark-mode])) input {
            border: 1px solid #000;
            background-color: rgba(0, 0, 0, 0.05);
        }
        :host-context(body:not([dark-mode])) select:focus,
        :host-context(body:not([dark-mode])) input:focus {
            outline: none;
            border-color: #ffc0cb;
            box-shadow: 0 0 0 3px rgba(255, 192, 203, 0.3);
        }

        :host-context(body[dark-mode]) select,
        :host-context(body[dark-mode]) input {
            border: 1px solid #fff;
            background-color: rgba(255, 255, 255, 0.1);
        }
        :host-context(body[dark-mode]) select:focus,
        :host-context(body[dark-mode]) input:focus {
            outline: none;
            border-color: #ffc0cb;
            box-shadow: 0 0 0 3px rgba(255, 192, 203, 0.3);
        }

        .button-group {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        .action-btn {
            flex: 1;
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 16px;
            background-color: #4285f4;
            color: white;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            justify-content: center;
        }
        body.dark-mode .action-btn {
            background-color: #2a3b8c;
        }
        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }
        .action-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
            .upload-btn, .action-btn {
                min-width: 120px;
                padding: 8px 12px;
                font-size: 14px;
            }
        }

        .error-message {
            color: #ff4d4d;
            font-size: 14px;
            margin-top: 5px;
            text-align: center;
        }
      </style>
      <div class="upload-section">
        <button class="upload-btn" id="upload-pattern">
          <i class="fas fa-file-upload"></i>
          <span>上传谱面</span>
        </button>
        <button class="upload-btn" id="upload-music">
          <i class="fas fa-music"></i>
          <span>上传音乐</span>
        </button>
      </div>

      <div class="setting-row">
        <div class="setting-group">
          <label for="chartSelect">选择谱面</label>
          <select id="chartSelect"></select>
        </div>
        <div class="setting-group">
          <label for="musicSelect">选择音乐</label>
          <select id="musicSelect"></select>
        </div>
      </div>
      <div class="setting-row">
        <div class="setting-group">
          <label for="bpmInput">BPM</label>
          <input type="number" id="bpmInput" placeholder="例如: 120" value="120">
        </div>
        <div class="setting-group">
          <label for="offsetInput">延时(ms)</label>
          <input type="number" id="offsetInput" placeholder="例如: 0" value="0">
        </div>
      </div>

      <div class="button-group">
        <button class="action-btn" id="testButton">开始测试</button>
        <button class="action-btn" id="createButton">开始制谱</button>
      </div>

      <div id="error-message" class="error-message"></div>
    `;
        this.uploadPatternBtn = this.shadowRoot.getElementById("upload-pattern");
        this.uploadMusicBtn = this.shadowRoot.getElementById("upload-music");
        this.testButton = this.shadowRoot.getElementById("testButton");
        this.createButton = this.shadowRoot.getElementById("createButton");
        this.chartSelect = this.shadowRoot.getElementById("chartSelect");
        this.musicSelect = this.shadowRoot.getElementById("musicSelect");
        this.bpmInput = this.shadowRoot.getElementById("bpmInput");
        this.offsetInput = this.shadowRoot.getElementById("offsetInput");
        this.errorMessage = this.shadowRoot.getElementById("error-message");
    }

    setupEventListeners() {
        this.uploadPatternBtn.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json, .zip"; // 设置允许的文件类型
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const validExtensions = ['.json', '.zip']; // 允许的文件扩展名
                    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
                    if (validExtensions.includes(fileExtension)) {
                        const patternName = file.name;
                        this.uploadedPatterns.push(patternName);
                        this.updateChartSelect();
                        const event = new CustomEvent("pattern_uploaded", {
                            detail: patternName
                        });
                        window.dispatchEvent(event);
                        this.clearError();
                    } else {
                        this.showError("错误：只能上传 .json 或 .zip 格式的谱面文件");
                    }
                }
            };
            input.click();
        });
        this.uploadMusicBtn.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            const validMusicExtensions = ['.mp3', '.wav', '.ogg']; // 更新为允许的音乐文件扩展名
            input.accept = validMusicExtensions.join(','); // 设置允许的文件类型
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
                    if (validMusicExtensions.includes(fileExtension)) {
                        const musicName = file.name;
                        this.uploadedMusics.push(musicName);
                        this.updateMusicSelect();
                        const event = new CustomEvent("music_uploaded", {
                            detail: musicName
                        });
                        window.dispatchEvent(event);
                        this.clearError();
                    } else {
                        this.showError("错误：只能上传 .mp3、.wav 或 .ogg 格式的音乐文件");
                    }
                }
            };
            input.click();
        });

        this.testButton.addEventListener("click", () => {
            this.currentChart = this.chartSelect.value;
            this.currentMusic = this.musicSelect.value;
            const bpm = this.bpmInput.value;
            const offset = this.offsetInput.value;

            if (this.currentChart && this.currentMusic && bpm && offset) {
                const testEvent = new CustomEvent("start_test", {
                    detail: {
                        chart: this.currentChart,
                        music: this.currentMusic,
                        bpm: bpm,
                        offset: offset
                    }
                });
                window.dispatchEvent(testEvent);
            } else {
                this.showError("请选择谱面和音乐，并填写BPM和延时");
            }
        });
				
        this.createButton.addEventListener("click", () => {
            this.currentChart = this.chartSelect.value;
            this.currentMusic = this.musicSelect.value;
            const bpm = this.bpmInput.value;
            const offset = this.offsetInput.value;

            if (this.currentChart && this.currentMusic && bpm && offset) {
                const createEvent = new CustomEvent("start_create", {
                    detail: {
                        chart: this.currentChart,
                        music: this.currentMusic,
                        bpm: bpm,
                        offset: offset
                    }
                });
                window.dispatchEvent(createEvent);
            } else {
                this.showError("请选择谱面和音乐，并填写BPM和延时");
            }
        });

        // 监听选择框的变化，更新当前选择
        this.chartSelect.addEventListener("change", () => {
            this.currentChart = this.chartSelect.value; // 记录当前选择的谱面
        });

        this.musicSelect.addEventListener("change", () => {
            this.currentMusic = this.musicSelect.value; // 记录当前选择的音乐
        });
    }

    initializeDefaultPattern() {
        this.uploadedPatterns.push("huh.json");
        this.updateChartSelect();
        this.currentChart = "huh.json"; // 设置默认选择
        this.chartSelect.value = "huh.json";
    }

    updateChartSelect() {
        const previousSelection = this.currentChart; // 记录当前选择
        this.chartSelect.innerHTML = "";
        this.uploadedPatterns.forEach(pattern => {
            const option = document.createElement("option");
            option.value = pattern;
            option.textContent = pattern;
            this.chartSelect.appendChild(option);
        });
        // 如果之前有选择，并且该选择仍然存在于选项中，则恢复选择
        if (previousSelection && Array.from(this.chartSelect.options).some(option => option.value === previousSelection)) {
            this.chartSelect.value = previousSelection;
        }
    }

    updateMusicSelect() {
        const previousSelection = this.currentMusic; // 记录当前选择
        this.musicSelect.innerHTML = "";
        this.uploadedMusics.forEach(music => {
            const option = document.createElement("option");
            option.value = music;
            option.textContent = music;
            this.musicSelect.appendChild(option);
        });
        // 如果之前有选择，并且该选择仍然存在于选项中，则恢复选择
        if (previousSelection && Array.from(this.musicSelect = options).some(option => option.value === previousSelection)) {
            this.musicSelect.value = previousSelection;
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
    }

    clearError() {
        this.errorMessage.textContent = "";
    }
}

customElements.define("buttons-section", ButtonsSection);