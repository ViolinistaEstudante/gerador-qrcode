            document.addEventListener('DOMContentLoaded', function() {
            const textInput = document.getElementById('text');
            const generateBtn = document.getElementById('generate');
            const downloadBtn = document.getElementById('download');
            const qrcodeContainer = document.getElementById('qrcode');
            
            let qrcode = null;
            
            generateBtn.addEventListener('click', generateQRCode);
            textInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    generateQRCode();
                }
            });
            
            downloadBtn.addEventListener('click', downloadQRCode);
            
            function generateQRCode() {
                const text = textInput.value.trim();
                
                if (!text) {
                    alert('Por favor, digite um texto ou URL!');
                    return;
                }
                
                // Limpa o container antes de gerar um novo QR Code
                qrcodeContainer.innerHTML = '';
                
                // Cria o QR Code (sempre preto e branco)
                qrcode = new QRCode(qrcodeContainer, {
                    text: text,
                    width: 200,
                    height: 200,
                    colorDark: "#000000",  // Preto
                    colorLight: "#ffffff", // Branco
                    correctLevel: QRCode.CorrectLevel.H
                });
                
                // Mostra o botão de download
                downloadBtn.style.display = 'block';
            }
            
            function downloadQRCode() {
                if (!qrcode) {
                    alert('Gere um QR Code primeiro!');
                    return;
                }
                
                const canvas = qrcodeContainer.querySelector('canvas');
                if (!canvas) {
                    alert('Não foi possível gerar a imagem para download.');
                    return;
                }
                
                // Cria um link temporário para download
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = canvas.toDataURL('image/png');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
