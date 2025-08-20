const fs = require('fs');
const path = require('path');

// Tentar remover o arquivo com caracteres especiais
const fileName = 'Captura de Tela 2025-08-18 às 00.13.08.png';
const filePath = path.join('public', fileName);

console.log('Tentando remover:', filePath);

try {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('✅ Arquivo removido com sucesso!');
    } else {
        console.log('❌ Arquivo não encontrado');
    }
} catch (error) {
    console.error('Erro ao remover arquivo:', error.message);
}

// Listar arquivos na pasta public para verificar
console.log('\nArquivos na pasta public:');
try {
    const files = fs.readdirSync('public');
    files.forEach(file => {
        console.log('-', file);
    });
} catch (error) {
    console.error('Erro ao listar arquivos:', error.message);
}