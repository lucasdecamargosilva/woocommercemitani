(function () {
    function isValidBRPhone(nums) {
        function setErr(msg) {
            var el = document.getElementById('q-phone-error');
            if (el) el.textContent = msg;
        }
        if (nums.length < 10) { setErr('Número incompleto — informe DDD + número'); return false; }
        if (nums.length > 11) { setErr('Número longo demais'); return false; }
        if (!/^[1-9][1-9]/.test(nums)) { setErr('DDD inválido'); return false; }
        if (nums.length === 11 && nums[2] !== '9') { setErr('Celular deve começar com 9 após o DDD'); return false; }
        var local = nums.length === 11 ? nums.slice(3) : nums.slice(2);
        if (/^(\d)\1+$/.test(local)) { setErr('Número não parece real — confira'); return false; }
        if (/(\d)\1{5,}/.test(local)) { setErr('Número não parece real — confira'); return false; }
        if (/^(?:01234567|12345678|23456789|34567890|98765432|87654321|76543210|0123456789|1234567890)/.test(local)) { setErr('Número não parece real — confira'); return false; }
        return true;
    }

    (function() {
        function injectPLBadge() {
            try {
                if (document.querySelector('.pl-seo-badge')) return;
                var path = window.location.pathname;
                var isProduct = path.includes('/product/') || document.querySelector('meta[property="og:type"][content="product"]');
                if (!isProduct) return;
                var b = document.createElement('div');
                b.className = 'pl-seo-badge';
                b.style.cssText = 'text-align:center;padding:4px 0;margin:0;opacity:0.5;line-height:1;';
                var a = document.createElement('a');
                a.href = 'https://provoulevou.com.br?utm_source=widget&utm_medium=lojista&utm_campaign=mitani';
                a.target = '_blank';
                a.rel = 'noopener';
                a.title = 'Experimente Óculos Online — Provou Levou';
                a.style.cssText = 'display:inline-block;text-decoration:none;border:0;outline:0;';
                var img = document.createElement('img');
                img.src = 'https://i.ibb.co/MD3B4FQf/Logo-provou-preto-1.png';
                img.alt = 'Experimente Óculos Online — Provou Levou';
                img.style.cssText = 'height:12px;width:auto;border:0;display:block;';
                a.appendChild(img);
                b.appendChild(a);
                document.body.appendChild(b);
            } catch(e) {}
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectPLBadge);
        else injectPLBadge();
        setTimeout(injectPLBadge, 2500);
    })();

    const apiKey = "pl_live_05a91a70d8864176ba2bba49e190f3e7d59d381ff23c82a42712f207898a64b5";
    window.PROVOU_LEVOU_API_KEY = apiKey;

    const WEBHOOK_PROVA = 'https://n8n.segredosdodrop.com/webhook/gerador-oculos-mitani';
    const WEBHOOK_CHECK_LIMIT = 'https://n8n.segredosdodrop.com/webhook/mitani-check-limit';

    let scrollY = 0;

    function lockBodyScroll() {
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflowY = 'scroll';
    }

    function unlockBodyScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, scrollY);
    }

    const html = `<div id="q-modal-ia" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;font-family:inter,system-ui,sans-serif;">
        <style>
            #q-modal-ia { --q-primary: #7c3aed; --q-border: #e5e7eb; --q-text: #111; --q-text-muted: #6b7280; --q-bg: #fff; --q-bg-hover: #f9fafb; }
            #q-modal-ia.dark { --q-bg: #0a0a0a; --q-text: #fff; --q-text-muted: #9ca3af; --q-bg-hover: #1a1a1a; --q-border: #374151; }
            #q-card-ia { background: var(--q-bg); color: var(--q-text); width: 90vw; max-width: 500px; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); display: flex; flex-direction: column; overflow: hidden; position: relative; }
            .q-card-ia.is-result #q-step-photo { display: none; }
            .q-card-ia.is-result #q-step-result { display: flex; }
            .q-card-ia.is-result #q-loading-box { display: none; }
            #q-close-btn { position: absolute; top: 12px; right: 12px; background: none; border: none; color: var(--q-text); font-size: 24px; cursor: pointer; z-index: 10; }
            .q-step { display: none; padding: 24px; }
            #q-step-photo { display: flex; flex-direction: column; gap: 16px; }
            #q-step-result { display: none; flex-direction: column; gap: 16px; }
            .q-face-frame { width: 100%; aspect-ratio: 1; border: 2px dashed var(--q-border); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; background: var(--q-bg-hover); }
            .q-face-frame:hover { background: var(--q-bg-hover); border-color: var(--q-primary); }
            .q-face-placeholder { font-size: 14px; color: var(--q-text-muted); text-align: center; }
            #q-final-view-img { width: 100%; border-radius: 8px; }
            .q-upload-btns { display: flex; gap: 8px; }
            .q-upload-btn { flex: 1; padding: 12px; border: 1px solid var(--q-border); border-radius: 8px; background: var(--q-bg-hover); color: var(--q-text); cursor: pointer; font-weight: 500; font-size: 14px; }
            .q-upload-btn:hover { border-color: var(--q-primary); }
            .q-input-phone { width: 100%; padding: 12px; border: 1px solid var(--q-border); border-radius: 8px; font-size: 14px; background: var(--q-bg); color: var(--q-text); }
            .q-input-phone:focus { outline: none; border-color: var(--q-primary); }
            .q-input-phone.is-error { border-color: #ef4444; }
            #q-phone-error { color: #ef4444; font-size: 12px; display: none; }
            .q-btn-black { width: 100%; padding: 12px; background: var(--q-primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; }
            .q-btn-black:hover { opacity: 0.9; }
            .q-btn-black:disabled { opacity: 0.5; cursor: not-allowed; }
            .q-btn-outline { width: 100%; padding: 12px; background: transparent; color: var(--q-text); border: 1px solid var(--q-border); border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; }
            .q-btn-outline:hover { background: var(--q-bg-hover); }
            .q-loading-box { display: none; text-align: center; padding: 40px 24px; }
            .q-loading-texts { margin-bottom: 16px; }
            .q-loading-t1 { font-weight: 600; margin-bottom: 8px; }
            .q-loading-bar { background: var(--q-bg-hover); height: 4px; border-radius: 2px; overflow: hidden; }
            .q-loading-bar > div { height: 100%; background: var(--q-primary); animation: loading 2s ease-in-out infinite; }
            @keyframes loading { 0%, 100% { width: 0%; } 50% { width: 100%; } }
        </style>
        <div id="q-card-ia" class="q-card-ia">
            <button id="q-close-btn">✕</button>

            <div id="q-step-photo" class="q-step">
                <h3 style="margin:0;font-size:16px;font-weight:600;">Experimente Óculos Online</h3>
                <p style="margin:0;color:var(--q-text-muted);font-size:13px;">Tire ou envie uma foto seu rosto e veja como fica com nossos óculos</p>

                <div class="q-face-frame" id="q-face-frame">
                    <div class="q-face-placeholder" id="q-face-placeholder">
                        <div style="font-size:24px;margin-bottom:8px;">📷</div>
                        Clique para enviar foto
                    </div>
                    <img id="q-pre-img" style="width:100%;height:100%;object-fit:cover;border-radius:8px;display:none;">
                </div>

                <div class="q-upload-btns">
                    <button class="q-upload-btn" id="q-btn-camera">📷 Câmera</button>
                    <button class="q-upload-btn" id="q-btn-gallery">🖼️ Galeria</button>
                </div>

                <input type="file" id="q-camera-input" accept="image/*" capture="environment" style="display:none;">
                <input type="file" id="q-gallery-input" accept="image/*" style="display:none;">

                <div style="border-top:1px solid var(--q-border);padding-top:12px;">
                    <label style="display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer;">
                        <input type="checkbox" id="q-accept-terms" style="cursor:pointer;">
                        <span>Aceito que minha foto seja usada para melhorar o provador</span>
                    </label>
                </div>

                <div id="q-validation-hint" style="color:#ef4444;font-size:12px;display:none;"></div>
                <button class="q-btn-black" id="q-btn-generate">Provar Óculos</button>

                <div id="q-provas-restantes" style="text-align:center;font-size:12px;color:var(--q-text-muted);"></div>
            </div>

            <div id="q-loading-box" class="q-loading-box">
                <div class="q-loading-texts">
                    <div class="q-loading-t1">Gerando sua prova...</div>
                    <div style="font-size:13px;color:var(--q-text-muted);">Isso pode levar alguns segundos</div>
                </div>
                <div class="q-loading-bar"><div></div></div>
            </div>

            <div id="q-step-result" class="q-step">
                <h3 style="margin:0;font-size:16px;font-weight:600;">Sua Prova</h3>
                <img id="q-final-view-img" alt="Resultado da prova">
                <div id="q-provas-restantes-result" style="text-align:center;font-size:12px;color:var(--q-text-muted);margin:0;"></div>
                <button class="q-btn-outline" id="q-btn-back">Voltar</button>
            </div>
        </div>
    </div>`;

    function initWidget() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = html;
        document.body.appendChild(modalContainer);

        const modal = document.getElementById('q-modal-ia');
        const closeBtn = document.getElementById('q-close-btn');
        const backBtn = document.getElementById('q-btn-back');
        const cameraInput = document.getElementById('q-camera-input');
        const galleryInput = document.getElementById('q-gallery-input');
        const phoneInput = document.getElementById('q-phone-input');
        const preImg = document.getElementById('q-pre-img');
        const facePlaceholder = document.getElementById('q-face-placeholder');
        const genBtn = document.getElementById('q-btn-generate');
        const photoStep = document.getElementById('q-step-photo');

        let userPhoto = null;

        function closeModal() {
            modal.style.display = 'none';
            unlockBodyScroll();
        }

        function openModal() {
            modal.style.display = 'flex';
            lockBodyScroll();
        }

        closeBtn.onclick = closeModal;
        backBtn.onclick = closeModal;
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        document.getElementById('q-btn-camera').onclick = () => cameraInput.click();
        document.getElementById('q-btn-gallery').onclick = () => galleryInput.click();
        document.getElementById('q-face-frame').onclick = () => galleryInput.click();

        function handleImageSelect(file) {
            if (!file.type.startsWith('image/')) { alert('Selecione uma imagem'); return; }
            var reader = new FileReader();
            reader.onload = (e) => {
                userPhoto = e.target.result;
                preImg.src = userPhoto;
                preImg.style.display = 'block';
                facePlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }

        cameraInput.onchange = (e) => { if (e.target.files[0]) handleImageSelect(e.target.files[0]); };
        galleryInput.onchange = (e) => { if (e.target.files[0]) handleImageSelect(e.target.files[0]); };

        function extractProductImage() {
            var img = document.querySelector('.woocommerce-product-gallery__image img');
            return img ? img.src : document.querySelector('meta[property="og:image"]')?.content || '';
        }

        function getProductName() {
            var el = document.querySelector('.product_title');
            return el ? el.textContent.trim() : 'Produto';
        }

        genBtn.onclick = async () => {
            const terms = document.getElementById('q-accept-terms');
            if (!userPhoto) { alert('Envie uma foto para continuar'); return; }
            if (!terms.checked) { alert('Aceite os termos para continuar'); return; }

            const productImage = extractProductImage();
            if (!productImage) { alert('Não consegui encontrar a imagem do produto'); return; }

            const loadingBox = document.getElementById('q-loading-box');
            const resultStep = document.getElementById('q-step-result');
            loadingBox.style.display = 'block';
            photoStep.style.display = 'none';

            try {
                const response = await fetch(WEBHOOK_PROVA, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        client_photo: userPhoto,
                        product_image: productImage,
                        product_name: getProductName(),
                        store: 'mitani',
                        origin: window.location.origin
                    })
                });

                if (response.ok) {
                    const blob = await response.blob();
                    loadingBox.style.display = 'none';
                    document.getElementById('q-final-view-img').src = URL.createObjectURL(blob);
                    document.getElementById('q-card-ia').classList.add('is-result');
                    resultStep.style.display = 'flex';
                } else {
                    throw new Error('Erro na geração');
                }
            } catch (e) {
                alert('ALTA DEMANDA\nAguarde alguns segundos para tentar novamente.');
                loadingBox.style.display = 'none';
                photoStep.style.display = 'flex';
            }
        };

        const openBtn = document.createElement('button');
        openBtn.style.cssText = 'padding:8px 16px;background:#7c3aed;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:14px;';
        openBtn.textContent = '👓 Provar Óculos';
        openBtn.onclick = openModal;

        var productSection = document.querySelector('.woocommerce-product-details');
        if (productSection) { productSection.appendChild(openBtn); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
