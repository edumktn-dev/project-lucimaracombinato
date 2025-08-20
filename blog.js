// Dados de exemplo (depois a cliente só adiciona objetos aqui)
const posts = [
    { 
        id: "p-001", 
        date: "2025-08-14", 
        text: `**Quando devo procurar terapia?**

Parece uma pergunta boba, que merece uma resposta obvia: quando eu tiver vontade ou quando sentir necessidade de falar com um especialista sobre algo.

Alem disso, a psicoterapia e um espaco de acolhimento, etico, sem expectativas ou cobrancas. Imagine que maravilhoso e se abrir com alguem que te acolhe e nao fica jogando as coisas na sua cara ou cobrando atitudes. "Mas voce nao largou dele ainda?" "Por que voce fica nesse emprego se reclama tanto?" "Mas, tambem, voce nao da limites - e isso que acontece."

E a pior coisa e o "discurso do heroi": a pessoa diz o que voce precisa fazer como se fosse muito facil...

Porem, mais do que ser aceito e compreendido, fazer psicoterapia e aprender a responsabilizar-se e a sentir-se confortavel com isso; afinal, se eu nao sou responsavel, eu nao mudo nada na minha vida.

Gosto muito de uma pergunta que Viktor Frankl faz em seu livro Em busca de sentido. Eu reproduzo essa pergunta a varios de meus pacientes: "O que voce espera da vida?". Depois da reflexao e da resposta, digo que a pergunta esta errada; a pergunta correta e: "O que a vida espera de voce?". Quando voce muda a pergunta, a pessoa perde a passividade e se torna ativa - ei, a vida esta esperando de voce... E um sentido para a vida nao se encontra virando uma esquina; um sentido para a vida a gente constroi.

Uma pessoa esta pronta para a psicoterapia quando pensa: "O que eu faco agora?". Sabe aquela frase famosa do Sartre: "Nao importa o que fizeram com voce; o que importa e o que voce faz com aquilo que fizeram com voce". Um momento de angustia e indecisao. O que eu faco com esse diagnostico? O que eu faco com essa deslealdade? O que eu faco com tanta rejeicao? O que eu faco com essa solidao? O que eu faco com meus lutos e cicatrizes?

Conhece a matriosca? E uma bonequinha russa com varias bonecas iguais, porem de tamanhos diferentes; uma se encaixa dentro da outra. Fazemos psicoterapia para isso tambem: para entender que so preenchemos a nos mesmos com nos mesmos - com a nossa crianca, que precisa ser ouvida, que precisa de atencao e carinho; preenchemos com o nosso adolescente, muitas vezes revoltado com a vida que estamos levando - nao era isso que ele queria.

Uma frase que escuto muito e com a qual nao concordo e: "Todo mundo precisa de psicoterapia". Para a psicoterapia funcionar, a pessoa precisa sentir que o que esta acontecendo na vida dela pode ser resolvido conversando. E quase magico.

Para finalizar, quando eu era estudante, estavamos discutindo essa questao em sala de aula; nos, alunos inseguros, tentando dar uma resposta mais complexa que a outra, e a professora sabiamente respondeu que fazemos psicoterapia para aprender a amar - a amar os pais com todas as suas imperfeicoes; amar e perdoar a nos mesmos; amar a vida.

**Lucimara Combinato**
**Psicologa**`, 
        image: null, 
        likes: 15 
    }
];

// Funções utilitárias
const fmtDate = (iso) => {
    const d = new Date(iso);
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 
                   'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const getLiked = (id) => {
    try {
        return localStorage.getItem(`like_${id}`) === '1';
    } catch (e) {
        return false;
    }
};

const setLiked = (id, v) => {
    try {
        localStorage.setItem(`like_${id}`, v ? '1' : '0');
    } catch (e) {
        console.warn('Could not save like state');
    }
};

const avatar = './avatar.png';

function formatPostText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/#(\w+)/g, '<span style="color: #7fa985; font-weight: 500;">#$1</span>');
}

function renderPosts() {
    console.log('Iniciando renderização dos posts...');
    const feedEl = document.getElementById('feed');
    
    if (!feedEl) {
        console.error('Elemento feed não encontrado!');
        return;
    }
    
    console.log('Elemento feed encontrado, posts para renderizar:', posts.length);
    
    if (posts.length === 0) {
        feedEl.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Nenhum post encontrado.</p>';
        return;
    }
    
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    feedEl.innerHTML = '';
    
    sortedPosts.forEach((post, index) => {
        console.log(`Renderizando post ${index + 1}:`, post.id);
        
        const liked = getLiked(post.id);
        const likesCount = post.likes + (liked ? 1 : 0);

        const card = document.createElement('article');
        card.className = 'micro-card';

        const formattedText = formatPostText(post.text.replace(/\n/g, '<br/>'));
        
        card.innerHTML = `
            <div class="micro-header">
                <img src="${avatar}" alt="Foto de Lucimara" class="avatar" />
                <div class="who">
                    <strong>Lucimara Combinato</strong>
                    <span class="handle">@lucimaracombinato</span>
                </div>
                <time class="date" datetime="${post.date}">${fmtDate(post.date)}</time>
            </div>
            <div class="micro-text">${formattedText}</div>
            ${post.image ? `<figure class="micro-media"><img src="${post.image}" alt="" loading="lazy"></figure>` : ''}
            <div class="micro-actions">
                <button class="like-btn ${liked ? 'liked' : ''}" aria-pressed="${liked}" aria-label="Curtir postagem" data-post-id="${post.id}">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span class="likes">${likesCount}</span>
                </button>
                <span class="icon-passive" aria-hidden="true">💬</span>
                <span class="icon-passive" aria-hidden="true">↗</span>
            </div>
        `;

        const likeBtn = card.querySelector('.like-btn');
        const likesEl = card.querySelector('.likes');
        
        likeBtn.addEventListener('click', () => {
            const postId = likeBtn.dataset.postId;
            const nowLiked = !getLiked(postId);
            setLiked(postId, nowLiked);
            likeBtn.setAttribute('aria-pressed', String(nowLiked));
            likeBtn.classList.toggle('liked', nowLiked);
            likesEl.textContent = post.likes + (nowLiked ? 1 : 0);
        });

        feedEl.appendChild(card);
        console.log(`Post ${index + 1} renderizado com sucesso`);
    });
    
    console.log('Todos os posts renderizados. Total de elementos no feed:', feedEl.children.length);
}

function handleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initBlog() {
    console.log('Inicializando blog...');
    renderPosts();
    handleMobileMenu();
    console.log('Blog inicializado com sucesso!');
}

// Garantir que o DOM esteja carregado antes de executar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
} else {
    initBlog();
}

// Fallback adicional
setTimeout(() => {
    const feedEl = document.getElementById('feed');
    if (feedEl && feedEl.children.length === 0) {
        console.log('Fallback: forçando inicialização...');
        initBlog();
    }
}, 1000);