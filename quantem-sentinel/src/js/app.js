
// Quantum Sentinel - Complete Application Logic

// Particle System
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['cyan', 'magenta', 'yellow', 'lime'];
    
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 5) + 's';
        container.appendChild(particle);
    }
}

// Core Application
class QuantumScanner {
    constructor() {
        this.uploadCore = document.getElementById('uploadCore');
        this.fileInput = document.getElementById('fileInput');
        this.analysisDashboard = document.getElementById('analysisDashboard');
        this.threatValue = document.getElementById('threatValue');
        this.threatCircle = document.getElementById('threatCircle');
        this.threatStatus = document.getElementById('threatStatus');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupMouseTracking();
    }

    setupEventListeners() {
        this.uploadCore.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
    }

    setupDragAndDrop() {
        this.uploadCore.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadCore.classList.add('scanning');
        });

        this.uploadCore.addEventListener('dragleave', () => {
            this.uploadCore.classList.remove('scanning');
        });

        this.uploadCore.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadCore.classList.remove('scanning');
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].name.endsWith('.apk')) {
                this.processFile(files[0]);
            }
        });
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.apk')) {
            this.processFile(file);
        } else {
            this.showNotification('Please upload a valid APK file');
        }
    }

    processFile(file) {
        this.showLoading();
        setTimeout(() => this.startAnalysis(), 3000);
    }

    showLoading() {
        this.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        this.loadingOverlay.style.display = 'none';
    }

    startAnalysis() {
        this.hideLoading();
        this.uploadCore.innerHTML = '<div style="color: cyan; font-size: 1rem;">🌀 SCANNING...</div>';
        
        setTimeout(() => {
            this.analysisDashboard.classList.add('active');
            this.animateThreatAnalysis();
        }, 1000);
    }

    animateThreatAnalysis() {
        const threats = this.generateThreatLevels();
        const overallThreat = Math.floor(Object.values(threats).reduce((a, b) => a + b) / Object.values(threats).length);

        this.animateOverallThreat(overallThreat);
        this.animateIndividualThreats(threats);
    }

    generateThreatLevels() {
        return {
            malware: Math.floor(Math.random() * 30) + 70,
            trojans: Math.floor(Math.random() * 40) + 60,
            permissions: Math.floor(Math.random() * 50) + 50,
            injection: Math.floor(Math.random() * 25) + 75,
            network: Math.floor(Math.random() * 35) + 65,
            encryption: Math.floor(Math.random() * 45) + 55
        };
    }

    animateOverallThreat(target) {
        let current = 0;
        const interval = setInterval(() => {
            current++;
            this.threatValue.textContent = current + '%';
            
            const offset = 691.15 - (691.15 * current / 100);
            this.threatCircle.style.strokeDashoffset = offset;
            this.threatCircle.style.stroke = this.getThreatColor(current);

            if (current >= target) {
                clearInterval(interval);
                this.updateThreatStatus(target);
            }
        }, 30);
    }

    animateIndividualThreats(threats) {
        setTimeout(() => {
            Object.keys(threats).forEach(key => {
                const riskElement = document.getElementById(key + 'Risk');
                const detailsElement = document.getElementById(key + 'Details');
                
                riskElement.style.width = threats[key] + '%';
                detailsElement.textContent = this.getThreatDescription(threats[key]);
            });
        }, 1500);
    }

    getThreatColor(level) {
        if (level < 30) return '#00ff88';
        if (level < 60) return '#ffff00';
        if (level < 80) return '#ff6600';
        return '#ff0044';
    }

    getThreatDescription(level) {
        if (level > 80) return 'Critical Risk';
        if (level > 60) return 'High Risk';
        if (level > 40) return 'Medium Risk';
        return 'Low Risk';
    }

    updateThreatStatus(level) {
        const status = level > 80 ? '🚨 CRITICAL THREAT DETECTED' : 
                      level > 60 ? '⚠️ HIGH RISK LEVEL' : '✅ RELATIVELY SAFE';
        
        this.threatStatus.innerHTML = `<span style="color: ${this.getThreatColor(level)}">${status}</span>`;
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            document.body.style.background = `
                radial-gradient(ellipse at ${x * 100}% ${y * 100}%, 
                rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at ${(1-x) * 100}% ${(1-y) * 100}%, 
                rgba(255, 0, 128, 0.1) 0%, transparent 50%),
                #000011
            `;
        });
    }

    showNotification(message) {
        alert(message);
    }
}

// Portal Management
function openPortal() {
    document.getElementById('quantumPortal').classList.add('active');
}

function closePortal() {
    document.getElementById('quantumPortal').classList.remove('active');
}

function handleLogin(e) {
    e.preventDefault();
    alert('🚀 Quantum access granted! Welcome, Security Agent.');
    closePortal();
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    new QuantumScanner();
});
