let ideas = [];
let ideaId = "";

// This Function is called when the user is Logged In to display info on the HTML
function isLoggedIn(){
    document.getElementById('ideaDiv').style.display = 'flex';
}

// This Functions are used to set the modal card of a new Idea to be registered
function hideModal(){
    document.getElementById('myModal').style.display = 'none';
    let html = '';
    questions1.forEach( (question , index) => {
        const div = `
        <div id="formIdeaIndividual" >
            <h2 id="${index}" >${question}</h2>
            <input id="${index}radioyes" name="${index}" type="radio"> SIM </input>
            <input id="${index}radioinprocess" name="${index}" type="radio"> PARCIALMENTE </input>
            <input id="${index}radiono" name="${index}" type="radio"> NÃO </input>
        </div>
        `;
        html += div;
    } );
    document.getElementById('questionBlock').innerHTML = html;
    document.getElementById('sendBtn').style.display = 'block';
}

// Stars the Form 
function createNewIdea(){
    window.location = "form.html";
}


function showIdeas () {
    db.collection(`users/${userId}/ideas`).get().then( snapshot => {
       snapshot.forEach( idea => {
           ideas.push({title: idea._document.proto.fields.title.stringValue,
                       score: parseInt(idea._document.proto.fields.score.integerValue),
                       tips: idea._document.proto.fields.tips.stringValue,
                       questionBlock: idea._document.proto.fields.questionBlock.integerValue
           });
       })
   }).then( () => {
       const ideaDiv = document.getElementById('ideaDiv');
       let html = '';
       ideas.forEach( (idea , index) => {
           const div = `
               <div id="renderedIdea" >
                   <button  class="ideaBtn" id="${index}" onclick="seeIdea(this.id)" >
                   <div>${idea.title}</div>
                   </button>
               </div>
           `;
           html += div;
       } );
       ideaDiv.innerHTML = html;
   })
}


function seeIdea(id) {
    ideaId = id;
    document.getElementById('dashboardDiv').style.display = 'block';
    document.getElementById('ideaTitle').innerText = ideas[ideaId].title;
    document.getElementById('ideaTips').innerText = ideas[ideaId].tips;
    document.getElementById('ideaScore').innerText = "Etapa: " + ideas[ideaId].questionBlock + "/6";
    document.getElementById('dashboardDiv').style.display = 'none';
    document.getElementById('continueFormBtn').style.display = 'block';
}







// THE FOLLOWING CODE IS RESPONSIBLE FOR THE LOGIC BEHIND THE FORM 

const questions1 = ["Você já fez Algum Planejamento de Carreira?", "Tem vontade de ser empreendedor?", "Possui seu currículo estruturado?", "Você conhece quais são as suas competências âncoras?", "Você sabe quais competências precisa desenvolver?", "Você ja descobriu o que mais gosta de fazer?", "Você já fez algum trabalho voluntário?", "Você sabe fazer projetos?", "Já participou de algum programa de liderança ( AIESEC; Junior Achievement, etc.) ?"];
const questions2 = [ "Você tem uma ideia de empreendimento?", "Você sabe qual o problema o seu produto está resolvendo?", "Você já sabe para que é o seu produto?", "Sabe o perfil de quem vai usá-lo?", "Sabe qual é a finalidade do seu produto? A que se aplica?", "Sabe qual é a tecnologia envolvida?", " Sabe quantos potenciais clientes existem nesse mercado?", "Sabe quem faz um produto similar na perspectiva do seu cliente?"];
const questions3 = [ "Você ja construiu a proposta de Valor ?","Você já tem um parceiro ou futuro sócio, que compartilha seu sonho?", "Você já construiu a persona do seu negócio?", "Você sabe o que é um modelo de negócios?", "Você tem clareza do diferencial do seu negócio?", "Você tem uma estratégia inicial para começar?", "Você já fez uma mentoria?"];
const questions4 = ["Você já tem um time?", "Você já definiu os valores do negócio?", "Você já utilizou um Canvas?", "Você sabe quais os principais canais para acessar clientes?", "Você tem mapeado como o usuário usa o seu produto?", "Você tem recursos financeiros iniciais a investir?", "Você dispõe de tempo para empreender?", "Você gostaria de participar de um programa para startups?"];
const questions5 = ["Você já desenvolveu alguma versão do seu produto?", "Você já fez experimentos com seu produto/serviço?", "Você já contatou uma lista de 10 primeiros usuários?", "O seu produto é tecnológico?", "Conhece alguma métrica de startups?", "Você sabe o que é escalabilidade?", "Você já tem MVP?", "Você já fez um pitch?"]; 
const questions6 = ["Você já tem registro/CNPJ?", "Você já sabe quais são os resultados de vendas do seu produto?", "Você sabe quanto o usuário/cliente deverá pagar?", "Você sabe calcular as receitas e os custos?", "Você tem um investidor?", "Você sabe calcular o custo de aquisição de clientes?", "Você já mapeou o processo de vendas?", "Você já fez marketing para o seu negócio?"];

let userScore = 0;
let isNewIdea = true;
let questionBlockIndex = 0;
let numberOfQuestions = 9;

// Checks the answers from the user to set the outcome of such
function checkAnswers() {
    let allchecked = false;
    for (let i = 0; i < numberOfQuestions; i++) {
        if( document.getElementById(`${i}radioyes`).checked === true || document.getElementById(`${i}radiono`).checked === true || document.getElementById(`${i}radioinprocess`).checked === true  ){
           allchecked = true;
        } else {
            allchecked = false;
            break;
        }
    }
    if ( allchecked === false ){
        alert( "Uma pergunta não foi respondida" )
    } else {
        for (let i = 0; i < numberOfQuestions; i++) {
            if ( document.getElementById(`${i}radioyes`).checked === true ) {
                userScore++;
            } else if ( document.getElementById(`${i}radioinprocess`).checked === true ){
                userScore+= 0.5;
            }
        }
        if ( document.getElementById('0radioyes').checked === true){
            questionBlockIndex++;
            alert('Parabéns ! Você passou para a próxima etapa !');
            startNewQuestionBlock();
        } else {
            document.getElementById('sendBtn').style.display = "none";
            questionBlockIndex++;
            finishQuestionary();
        }
    }
}

// Handles Render of a new question block
function startNewQuestionBlock(){

    switch(questionBlockIndex){
        case 1 : 
        let html1 = '';
        questions2.forEach( (question , index) => {
            const div = `
            <div id="formIdeaIndividual" >
                <h2 id="${index}" >${question}</h2>
                <input id="${index}radioyes" name="${index}" type="radio"> SIM </input>
                <input id="${index}radioinprocess" name="${index}" type="radio"> PARCIALMENTE </input>
                <input id="${index}radiono" name="${index}" type="radio"> NÃO </input>
            </div>
            `;
            html1 += div;
        } );
        document.getElementById('questionBlock').innerHTML = html1;
        numberOfQuestions = 8;
        break;
        case 2 :
            let html2 = '';
            questions3.forEach( (question , index) => {
                const div = `
                <div id="formIdeaIndividual" >
                    <h2 id="${index}" >${question}</h2>
                    <input id="${index}radioyes" name="${index}" type="radio"> SIM </input>
                    <input id="${index}radioinprocess" name="${index}" type="radio"> PARCIALMENTE </input>
                    <input id="${index}radiono" name="${index}" type="radio"> NÃO </input>
                </div>
                `;
                html2 += div;
            } );
            document.getElementById('questionBlock').innerHTML = html2;
            numberOfQuestions = 7;
        break;
        case 3 :
            let html3 = '';
            questions4.forEach( (question , index) => {
                const div = `
                <div id="formIdeaIndividual" >
                    <h2 id="${index}" >${question}</h2>
                    <input id="${index}radioyes" name="${index}" type="radio"> SIM </input>
                    <input id="${index}radioinprocess" name="${index}" type="radio"> PARCIALMENTE </input>
                    <input id="${index}radiono" name="${index}" type="radio"> NÃO </input>
                </div>
                `;
                html3 += div;
            } );
            document.getElementById('questionBlock').innerHTML = html3;
            numberOfQuestions = 8;
        break;
        case 4 :
            let html4 = '';
            questions5.forEach( (question , index) => {
                const div = `
                <div id="formIdeaIndividual" >
                    <h2 id="${index}" >${question}</h2>
                    <input id="${index}radioyes" name="${index}" type="radio"> SIM </input>
                    <input id="${index}radioinprocess" name="${index}" type="radio"> PARCIALMENTE </input>
                    <input id="${index}radiono" name="${index}" type="radio"> NÃO </input>
                </div>
                `;
                html4 += div;
            } );
            document.getElementById('questionBlock').innerHTML = html4;
            numberOfQuestions = 8;
        break;
        case 5 :
            let html5 = '';
            questions6.forEach( (question , index) => {
                const div = `
                <div id="formIdeaIndividual" >
                    <h2 id="${index}" >${question}</h2>
                    <input id="${index}radioyes" name="${index}" type="radio"> SIM </input>
                    <input id="${index}radioinprocess" name="${index}" type="radio"> PARCIALMENTE </input>
                    <input id="${index}radiono" name="${index}" type="radio"> NÃO </input>
                </div>
                `;
                html5 += div;
            } );
            document.getElementById('questionBlock').innerHTML = html5;
            numberOfQuestions = 8;
        break;
        case 6 : 
            let html6 = '';
            const div = `
                <h2 id="titleEnd" > Parabéns ! </h2>
                <h3 id="bodyEnd" > Sua idea já passou por todas as etapas devidas. </h3>
                <button id="btnEnd" onclick="finishQuestionary()"> Fechar <button>
            `;
            html6 += div;
            document.getElementById('questionBlock').innerHTML = html6;
            document.getElementById('sendBtn').style.display = 'none';
        break;     
    }
}

// Ends Current Form
function finishQuestionary(){
    document.getElementById("questionBlock").style.display = 'none';
    document.getElementById("sendBtn").style.display = 'none';
    document.getElementById("newFormBtn").style.display = 'block';
    // document.getElementById("image").style.display = 'block';
    //document.getElementById("tips").style.display = 'flex';
    document.getElementById("nextStep").style.display = 'block';
    let tips = "";
    if (userScore === 0) tips = "- Aconselhamento de Carreiras\n - TECNOPUC Experience\n -  Tour TECNPUC";
    else if (userScore > 0 && userScore<=4)tips = "- Evento Ideação";
    else if (userScore>= 5 && userScore<=9)tips = "- Disciplinas 360";
    else if (userScore === 10)tips = "- Disciplina Projetos Desafios da Escola de Negócios\n - Disciplina Laboratório de Criatividade  e Inovação";
    else if (userScore>= 11 && userScore<=14)tips = "- Evento Ideação";
    else if (userScore>= 15 && userScore<=18)tips = "- Torneio Empreendedor ";
    else if (userScore>= 19 && userScore<=22)tips = " - Disciplinas de Empreendorismo das escolas PUCRS 360 \n - Torneio Empreendedor \n - Programa Apple Developer Academy \n - Cursos EDUCON";
    else if (userScore>= 23 && userScore<=26)tips = "- Maratonas e Eventos de Empreendedorismo \n - Programa Rocket Idear ";
    else if (userScore>= 27 && userScore<=30)tips = "- Discilpinas sobre Criatividade e Tecnologia PUCRS \n - Laboratório de Modelagem ";
    else if (userScore>= 31 && userScore<=34)tips = "- Programa Startup Garagem \n ";
    else if (userScore>= 35 && userScore<=38)tips = "- Disciplinas e Certificações de Estudos Focados em Negócios PUCRS \n ";
    else if (userScore>= 39 && userScore<=42)tips = "- Programa Pré-Startup \n ";
    else if (userScore>= 43 && userScore<=50)tips = "- Programa de Desenvolvimento de Startups do TECNOPUC \n ";
    //document.getElementById("tipsH3").innerText = tips;
    console.log(userScore);
    if( isNewIdea == true ){
        const ideaName = document.getElementById('ideaName').value;
        db.collection(`users/${userId}/ideas`).doc(ideaName).set({
            title: ideaName,
            score: userScore,
            tips: tips,
            questionBlock: questionBlockIndex
        })
    } else {
        db.collection(`users/${userId}/ideas`).doc(ideas[ideaId].title).update({
            score: userScore,
            tips: tips,
            questionBlock: questionBlockIndex
        })
    }
}

function continueForm(){
    document.getElementById('idea').style.display = 'none';
    isNewIdea = false;
    userScore = ideas[ideaId].score;
    questionBlockIndex = parseInt(ideas[ideaId].questionBlock);
    document.getElementById('continueForm').style.display= 'block';
    document.getElementById('sendBtn').style.display = 'block';
    startNewQuestionBlock();
}

function startNowBtn(){
    window.location='signUp.html'
}

function showMenu(){
    document.getElementById('menu').style.display = 'block';
}

function closeMenu(){
    document.getElementById('menu').style.display = 'none';
}

function  goToDashboard (){
    window.location='dashboard.html'
}

function sendRating(){
    let ratingTitle = document.getElementById('titleInput').value;
    let ratingBody = document.getElementById('bodyInput').value;
    db.collection('ratings').doc(userId).set({
        title: ratingTitle,
        body: ratingBody,
        timestamp: new Date()
    }).then( () => {
        alert('Avaliação Enviada com Sucesso')
    } )
    setTimeout( () => { window.location = 'dashboard.html' }, 2000 )
}