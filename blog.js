// Dados de exemplo (depois a cliente só adiciona objetos aqui)
const posts = [
    { 
        id: "p-002", 
        date: "2025-08-20", 
        text: `**Luto**

Luto é quando perdemos algo ou alguém que nos era muito amado e valioso. A perda de um emprego e o fim de um relacionamento também são considerados luto. Vivemos um tempo onde é comum medicar a pessoa que está enlutada, apesar do luto não ser doença. Os casos que necessitam de medicação devem ser avaliados e acompanhados por um psiquiatra.

Os sintomas mais comuns do luto são: dificuldades para dormir, dificuldades para se alimentar, dores no corpo, sistema imunológico fragilizado, choro, raiva, tristeza, desânimo, desamparo, insegurança, falta de concentração e sentimentos de culpa.

Dra. Elisabeth Kubler Ross descreve cinco fases do luto são elas: negação, raiva, barganha, depressão e aceitação. Mas o luto não é uma corrida de obstáculos e cada um deve vivê-lo à sua maneira.

Dra. Sarah Vieira compara o luto com uma montanha russa no escuro... Ninguém sabe a hora que vai cair, pode estar tudo bem, de repente uma música, um cheiro te traz uma lembrança.

Apesar da morte ser a única certeza que temos, ela causa muito espanto. A gente tenta se esconder e se afastar da morte, como se ela não fosse parte da vida, procuramos um culpado tentando manter o controle da situação e não encaramos o fato de que a morte sempre foi inevitável.

Jung traz a morte como uma terrível brutalidade, as pessoas são arrancadas de nós de forma muito abrupta. A pessoa que mais amamos ou a única pessoa que amávamos. E a resposta mais comum é desespero na ausência é revela a importância que tinha a presença.

Eu comparo perder um ente querido a perder um membro do corpo: um braço uma perna. Aconteceu uma ruptura, cortou um pouco de si. E o que resta é o silêncio.

O que devemos fazer? Reabilitar-se, reinventar-se, costurar os pedaços, sobreviver. O luto exige mudanças, mudança de conceitos, de postura, de valores.

O luto exige reflexões sobre o outro lado da vida e sobre o sentido dessa vida, saímos modificados dessa experiência construímos outro conceito de vida e de morte. Fica evidente que não há tempo a perder.

Devemos aprender a honrar nossos entes queridos, porque somos o legado de alguém.

O luto é uma experiência individual, porém, não deve ser vivido sozinho o apoio de amigos e familiares são fundamentais.

**Podemos falar mais sobre isso no seu tempo!**`, 
        image: null, 
        likes: 8 
    },
    { 
        id: "p-001", 
        date: "2025-08-14", 
        text: `**Quando devo procurar terapia?**

Parece uma pergunta boba, que merece uma resposta óbvia: quando eu tiver vontade ou quando sentir necessidade de falar com um especialista sobre algo.

Além disso, a psicoterapia é um espaço de acolhimento, ético, sem expectativas ou cobranças. Imagine que maravilhoso é se abrir com alguém que te acolhe e não fica jogando as coisas na sua cara ou cobrando atitudes. "Mas você não largou dele ainda?" "Por que você fica nesse emprego se reclama tanto?" "Mas, também, você não dá limites - é isso que acontece."

E a pior coisa é o "discurso do herói": a pessoa diz o que você precisa fazer como se fosse muito fácil...

Porém, mais do que ser aceito e compreendido, fazer psicoterapia é aprender a responsabilizar-se e a sentir-se confortável com isso; afinal, se eu não sou responsável, eu não mudo nada na minha vida.

Gosto muito de uma pergunta que Viktor Frankl faz em seu livro Em busca de sentido. Eu reproduzo essa pergunta a vários de meus pacientes: "O que você espera da vida?". Depois da reflexão e da resposta, digo que a pergunta está errada; a pergunta correta é: "O que a vida espera de você?". Quando você muda a pergunta, a pessoa perde a passividade e se torna ativa - ei, a vida está esperando de você... E um sentido para a vida não se encontra virando uma esquina; um sentido para a vida a gente constrói.

Uma pessoa está pronta para a psicoterapia quando pensa: "O que eu faço agora?". Sabe aquela frase famosa do Sartre: "Não importa o que fizeram com você; o que importa é o que você faz com aquilo que fizeram com você". Um momento de angústia e indecisão. O que eu faço com esse diagnóstico? O que eu faço com essa deslealdade? O que eu faço com tanta rejeição? O que eu faço com essa solidão? O que eu faço com meus lutos e cicatrizes?

Conhece a matriosca? É uma bonequinha russa com várias bonecas iguais, porém de tamanhos diferentes; uma se encaixa dentro da outra. Fazemos psicoterapia para isso também: para entender que só preenchemos a nós mesmos com nós mesmos - com a nossa criança, que precisa ser ouvida, que precisa de atenção e carinho; preenchemos com o nosso adolescente, muitas vezes revoltado com a vida que estamos levando - não era isso que ele queria.

Uma frase que escuto muito e com a qual não concordo é: "Todo mundo precisa de psicoterapia". Para a psicoterapia funcionar, a pessoa precisa sentir que o que está acontecendo na vida dela pode ser resolvido conversando. É quase mágico.

Para finalizar, quando eu era estudante, estávamos discutindo essa questão em sala de aula; nós, alunos inseguros, tentando dar uma resposta mais complexa que a outra, e a professora sabiamente respondeu que fazemos psicoterapia para aprender a amar - a amar os pais com todas as suas imperfeições; amar e perdoar a nós mesmos; amar a vida.

**Lucimara Combinato**
**Psicóloga**`, 
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