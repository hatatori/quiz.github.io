
questoes = [
{
	pergunta:'Assinale a alternativa que apresenta corretamente o endereço eletrônico de e-mail da pessoa que recebeu a mensagem de forma oculta. <img src="https://s3.amazonaws.com/qcon-assets-production/images/provas/64570/8b8bfb0d8913262a0d7b.png"> ',
	items:['gustavo_sorriso','ana_bela','clovis_alto','flavia_santa','danilo_forte'],
	resposta: 4
},{
	pergunta:'Quanto é um mais um?',
	items:['dois', 'três', 'quatro'],
	resposta: 0
},{
	pergunta:'Whatsapp pertence ao:',
	items:['apple', 'google', 'facebook','amazon'],
	resposta: 2
}
]

respostas = {}

	// for(i in respostas){
	// 	console.log('sua escolha: '+respostas[i])
	// 	console.log("resposta: "+questoes[i].resposta)
	// 	console.log(respostas[i]==questoes[i].resposta)
	// }

	//render

	radio = "<label><input type='radio' name='{questao}'>{nome}</label>"
	s = ""
	a = 0

	function setar_items(...args){
		s = ""
		a++
		alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		for(i in args[0]){
			nome = args[0][i]
			s += "<label><input type='radio' name='q"+a+"'><div></div>"+alfabeto[i]+") "+nome+"</label>"
		}
		return s
	}

	// setar_items(['eita','vamos'])

	function cria_questao(a){
		div = document.createElement("div")
		div.innerHTML += "<p>"+a+") "+questoes[a].pergunta+"</p>"
		div.innerHTML += setar_items(questoes[a].items)
		div.innerHTML += "<button class='invisible' onclick=verifica_reposta("+a+")>Verificar Resposta</button>"
		div.innerHTML += "<div id='alternativa"+a+"' class='resposta errado invisible'>resposta</div>"
		ok.appendChild(div)
	}

	function verifica_reposta(n){


		t = document.querySelector('#alternativa'+""+n)
		k = t.parentElement.querySelectorAll("input")
		
		for(i in k){
			if(k[i].checked)
				respostas[n] = i
		}

		if(questoes[n].resposta==respostas[n]){
			t.innerHTML = "Resposta Correta"
			t.classList.add("certo")
			t.classList.remove("errado")
			t.classList.remove("invisible")
		}else{
			t.innerHTML = "Resposta Incorreta"
			t.classList.add("errado")
			t.classList.remove("certo")
			t.classList.remove("invisible")
		}
		
	}

	cria_questao(0)
	cria_questao(1)
	cria_questao(2)

	label = document.querySelectorAll("label")
	
	for(i in label){
		label[i].onclick=function(e){
			console.log(this.parentElement.querySelector("button").classList.remove("invisible"))
		}
	}

