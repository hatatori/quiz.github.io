respostas = "110011110001100101010000110111101111000010101100000100101100001000010011000101000010001000101000010000101011000010110000100110010110001010001010000101011100011110000100011001101010000100010010100110001011000000011100111110010000000010010001010000110110100101100101000001001101100001000011011001001010".split("")

lab = "<label><input type='radio' name='{questao}'>{nome}</label>"

quest = qts.innerHTML.split("\n\n\n")

questoes = []

estrutura = {
	pergunta: "alguma coisa",
	enunciado: ['Certo','Errado'],
	resposta: 0,
	numero: 0,
	marcado: 0,
	rec : [],

	items : function(){
		n = 0
		return this.enunciado.map(e=>"<label><input onclick='estrutura.gravar("+(n++)+","+this.numero+",this)' type='radio' name='q"+this.numero+"'><div></div>"+e+"</label>").join("")
	},

	gravar:function(e,a,c){
		//posição da questão, número da questão, botao
		this.rec[a] = e
		x = document.querySelector("#bt"+this.numero)
		x.setAttribute('res',e)
		document.querySelector("#bt"+a).setAttribute("res",e)
	},


	estrutura : function(){
		div = document.createElement("div")
		div.id = "e"+this.numero
		div.res = this.resposta
		div.innerHTML = "<p>"+this.pergunta+"</p>"
		div.innerHTML += this.items()
		div.innerHTML += "<div id='res' class='resposta'></div>"
		div.innerHTML += "<button v="+this.numero+" id=bt"+this.numero+" onclick='estrutura.verifica(this)' res="+this.resposta+">Verificar resposta</button>"
		return div
	},

	go : function(){
		ok.appendChild(this.estrutura())
	},

	verifica: function(a){

		posicao_botao = a.getAttribute('v') 
		resposta_botao = a.getAttribute('res') 

		console.log(posicao_botao-1)

		tk = document.cookie.match(/lista=.+/g)[0].split("=")[1].split("")
		tk[posicao_botao-1] = resposta_botao
		tk = tk.join("")
		document.cookie="lista="+tk


		if(  resposta_botao == respostas[posicao_botao-1] ){
			tag = a.parentElement.querySelector("#res")
			tag.innerHTML="Correto"

			tag.classList.remove("certo")
			tag.classList.remove("errado")

			tag.classList.toggle("certo")


		}else{
			tag = a.parentElement.querySelector("#res")
			tag.innerHTML="Inorreto"

			tag.classList.remove("certo")
			tag.classList.remove("errado")

			tag.classList.toggle("errado")
		}

	}
}

q = qts.innerHTML.split("\n\n\n")
nume = 0
for(i=0;i<q.length;i++){	
	estrutura.pergunta = nume+1+") "+q[i]
	estrutura.numero++
	estrutura.go()
	nume++
}

//checar

function checar_tudo(){
	
	z = document.cookie.match(/lista=.+/g)[0].split("=")[1]

	console.log(z)

	for(i=0;i<z.length;i++){

		console.log(z[i])

		el = document.querySelector("#e"+(i+1))

		if(z[i] != "x"){
			el.querySelectorAll('label')[z[i]].click()
			el.querySelector('button').click()
		}

	}
}


//cookies

// console.log(document.cookie.match(/lista/g))

if(document.cookie.match(/lista/g) == null){

	tx = ""
	for(i=0;i<respostas.length;i++){
		tx += "x"
	}

	document.cookie="lista="+tx
	document.cookie.match(/lista=.+/g)[0].split("=")[1]
}

checar_tudo()
