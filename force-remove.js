const fs = require('fs');
const path = require('path');

console.log('=== TENTATIVA DE REMOÇÃO FORÇADA ===');

// Diferentes variações do nome do arquivo
const possibleNames = [
    'Captura de Tela 2025-08-18 às 00.13.08.png',
    'Captura de Tela 2025-08-18 às 00.13.08.png',
    'Captura de Tela 2025-08-18 as 00.13.08.png',
    'Captura de Tela 2025-08-18 às 00.13.08.png'
];

// Listar todos os arquivos primeiro
console.log('\n1. Listando TODOS os arquivos na pasta public:');
try {
    const files = fs.readdirSync('public');
    files.forEach((file, index) => {
        console.log(`${index}: "${file}" (length: ${file.length})`);
        // Mostrar códigos dos caracteres
        const codes = [];
        for (let i = 0; i < file.length; i++) {
            codes.push(file.charCodeAt(i));
        }
        console.log(`   Char codes: ${codes.join(', ')}`);
    });
} catch (error) {
    console.error('Erro ao listar arquivos:', error.message);
}

// Tentar remover por índice (se for o primeiro arquivo com "Captura")
console.log('\n2. Tentando remover por padrão:');
try {
    const files = fs.readdirSync('public');
    const targetFile = files.find(file => file.includes('Captura'));
    
    if (targetFile) {
        console.log(`Encontrado arquivo: "${targetFile}"`);
        const fullPath = path.join('public', targetFile);
        fs.unlinkSync(fullPath);
        console.log('✅ Arquivo removido com sucesso!');
    } else {
        console.log('❌ Arquivo não encontrado');
    }
} catch (error) {
    console.error('Erro:', error.message);
}

// Verificar se ainda existe
console.log('\n3. Verificação final:');
try {
    const files = fs.readdirSync('public');
    const remaining = files.filter(file => file.includes('Captura'));
    if (remaining.length === 0) {
        console.log('✅ Arquivo removido com sucesso!');
    } else {
        console.log('❌ Arquivo ainda existe:', remaining);
    }
} catch (error) {
    console.error('Erro na verificação:', error.message);
}